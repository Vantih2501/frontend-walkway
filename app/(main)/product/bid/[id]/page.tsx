"use client";

import React, { useEffect, useState } from "react";
import { Alert, Breadcrumb, Button, Form, Modal, Spin, Tooltip } from "antd";
import { EyeOutlined, InfoCircleOutlined } from "@ant-design/icons";
import Image from "next/image";
import ProductImage from "#/components/DetailProduct/ui/ProductImage";
import BidUserDisplay from "#/components/Auction/ui/BidUserDisplay";
import { useBid } from "#/hooks/bid";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useAuth } from "#/hooks/auth";
import { getAccessToken } from "#/utils/token";
import BidInput from "#/components/common/input/BidInput";
import { useOrder } from "#/hooks/order";

dayjs.extend(duration);

interface BidStatus {
  state: "not_started" | "in_progress" | "ended";
  message: string;
}

const BidPage = ({ params }: { params: { id: string } }) => {
  const [sizeGuideModal, setSizeGuideModal] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("00:00:00");
  const [bidStatus, setBidStatus] = useState<BidStatus>({
    state: "not_started",
    message: "Auction has not started",
  });

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();

  const token = getAccessToken();
  const { fetchBid, postBidAmount } = useBid();
  const { bid, isLoading: isBidLoading } = fetchBid(params.id);
  const { getUser } = useAuth();
  const { user } = getUser(token);

  const currentHighestBid = bid?.bidParticipants.length
    ? Math.max(...bid.bidParticipants.map((b) => b.amount))
    : bid?.start_price || 0;

    console.log(bid, user)

  const userCurrentBid =
    bid?.bidParticipants.find((b) => b.user.email === user?.email)?.amount || 0;

  useEffect(() => {
    if (!bid) return;

    const updateAuctionStatus = () => {
      const now = dayjs();
      const startDate = dayjs(bid.start_date);
      const endDate = dayjs(bid.end_date);

      if (now.isBefore(startDate)) {
        setBidStatus({
          state: "not_started",
          message: "Begins at",
        });
        return startDate;
      } else if (now.isAfter(endDate)) {
        setBidStatus({
          state: "ended",
          message: "Auction ended",
        });
        return null;
      } else {
        setBidStatus({
          state: "in_progress",
          message: "Ends in",
        });
        return endDate;
      }
    };

    const targetDate = updateAuctionStatus();
    if (!targetDate) return;

    const interval = setInterval(() => {
      const now = dayjs();
      const diff = targetDate.diff(now);

      if (diff <= 0) {
        clearInterval(interval);
        setTimeRemaining("00:00:00");
        updateAuctionStatus();
        return;
      }

      const time = dayjs.duration(diff);
      setTimeRemaining(
        `${String(time.hours()).padStart(2, "0")}:${String(
          time.minutes()
        ).padStart(2, "0")}:${String(time.seconds()).padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [bid]);

  const handleBidSubmit = async (values: { bid_amount: number }) => {
    try {
      if (!user) {
        // setError("Please log in to place a bid");
        return;
      }

      const bidAmount = Number(values.bid_amount.toString().replace(/,/g, ""));

      if (bidAmount <= currentHighestBid) {
        // setError("Your bid must be higher than the current highest bid");
        return;
      }

      setLoading(true);

      await postBidAmount(params.id, user.email, bidAmount);
    } catch (error) {
      // setError("Failed to place bid. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (isBidLoading) {
    return (
      <div className="w-screen h-[86vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        <div className="-space-y-3 lg:col-span-5">
          <div className="relative z-50 flex flex-col items-center p-4 space-y-2 text-white shadow-sm rounded-tl-xl rounded-tr-xl bg-primary-300">
            <span className="text-lg font-light">{bidStatus.message}</span>
            <h2 className="text-2xl font-semibold">{timeRemaining}</h2>
          </div>

          {bid && (
            <ProductImage imageUrl={bid.productDetail.product.productPhotos} />
          )}
        </div>

        <div className="space-y-6 lg:col-span-7">
          <div className="space-y-4">
            <Breadcrumb
              items={[
                {
                  title: <a href="">{bid?.productDetail.product.brand.name}</a>,
                },
                {
                  title: bid?.productName,
                },
              ]}
            />
            <h1 className="pb-4 text-3xl font-semibold border-b sm:text-4xl">
              {bid?.productName}
            </h1>
          </div>

          <div className="space-y-6 bg-white rounded-lg ">
            <div>
              <p className="mb-1 text-sm text-gray-500">
                {bidStatus.state === "not_started"
                  ? "Starting Price:"
                  : "Current Highest Bid:"}
              </p>
              <h1 className="text-2xl font-medium">
                Rp {currentHighestBid.toLocaleString("en-US")}
              </h1>
            </div>

            {bid && user && (
              <BidUserDisplay participant={bid.bidParticipants} user={user} />
            )}

            <div className="flex items-center justify-between py-3 border-b">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">
                  {bid?.productDetail.size}
                </h1>
                <p className="text-gray-600">Shoe size</p>
                <Tooltip title="Click 'Size Guide' for detailed sizing information">
                  <InfoCircleOutlined className="text-gray-400" />
                </Tooltip>
              </div>
              <Button
                icon={<EyeOutlined />}
                onClick={() => setSizeGuideModal(true)}
                type="text"
              >
                Size Guide
              </Button>
            </div>

            <Form form={form} onFinish={handleBidSubmit} className="space-y-4">
              <div className="flex flex-col gap-4 sm:flex-row">
                <div className="px-4 py-2 bg-gray-50 rounded-xl h-min">
                  <p className="text-xs text-gray-600">Your current bid</p>
                  <h1 className="text-base font-medium">
                    Rp {userCurrentBid.toLocaleString("en-US")}
                  </h1>
                </div>

                <BidInput
                  placeholder={
                    userCurrentBid
                      ? "Increase your bid"
                      : "Place your first bid"
                  }
                  disabled={bidStatus.state !== "in_progress" || loading}
                  minimumBid={
                    currentHighestBid > 0
                      ? currentHighestBid + 5000
                      : bid?.start_price || 0
                  }
                />

                <Form.Item className="mb-0">
                  <Button
                    className="w-full h-14 rounded-xl sm:w-auto"
                    type="primary"
                    htmlType="submit"
                    loading={loading}
                    disabled={bidStatus.state !== "in_progress"}
                  >
                    {loading ? "Processing..." : "Place Bid"}
                  </Button>
                </Form.Item>
              </div>
            </Form>
          </div>
        </div>
      </div>

      <Modal
        title="Size Guide"
        open={sizeGuideModal}
        onCancel={() => setSizeGuideModal(false)}
        footer={null}
        width={600}
      >
        <div className="mt-4 border border-gray-200 rounded-xl">
          <div className="p-4 text-sm font-semibold border-b">
            {bid?.productDetail.product.brand.name} Size Guide
          </div>
          <div className="max-h-[500px] overflow-y-auto">
            <Image
              src="/image/size-guide.png"
              alt="size guide"
              width={500}
              height={1000}
              quality={100}
              className="w-full h-auto"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BidPage;
