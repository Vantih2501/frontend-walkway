"use client";

import React, { useEffect, useState } from "react";
import { Breadcrumb, Button, Form, Input, Modal, Spin } from "antd";
import { EyeOutlined } from "@ant-design/icons";
import Image from "next/image";
import ProductImage from "#/components/DetailProduct/ui/ProductImage";
import BidUserDisplay from "#/components/Auction/ui/BidUserDisplay";
import { useBid } from "#/hooks/bid";
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";
import { useAuth } from "#/hooks/auth";
import { getAccessToken } from "#/utils/token";
import PriceInput from "#/components/common/input/PriceInput";
import BidInput from "#/components/common/input/BidInput";
import { useOrder } from "#/hooks/order";

dayjs.extend(duration);

const Bid = ({ params }: { params: { id: string } }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("00:00:00");
  const [status, setStatus] = useState("Begins at");
  const [ended, setEnded] = useState(false);
  const [loading, setLoading] = useState(false);

  const token = getAccessToken();
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const { fetchBid } = useBid();
  const { bid, isLoading } = fetchBid(params.id);

  const { getUser } = useAuth();
  const { user } = getUser(token);

  const { postBidToken } = useOrder();

  useEffect(() => {
    if (bid) {
      const startDate = dayjs(bid.start_date);
      const endDate = dayjs(bid.end_date);
      const now = dayjs();

      const isBeforeStart = now.isBefore(startDate);
      const isAfterStart = now.isAfter(startDate) && now.isBefore(endDate);
      const isEnded = now.isAfter(endDate);

      setEnded(isEnded);

      let targetDate = isBeforeStart ? startDate : endDate;
      let countdownType = isBeforeStart ? "Begins at" : "Ends in";

      setStatus(countdownType);

      const interval = setInterval(() => {
        const now = dayjs();
        const diff = targetDate.diff(now);
        if (diff > 0) {
          const time = dayjs.duration(diff);
          setTimeRemaining(
            `${String(time.hours()).padStart(2, "0")}:${String(
              time.minutes()
            ).padStart(2, "0")}:${String(time.seconds()).padStart(2, "0")}`
          );
        } else {
          clearInterval(interval);
          setTimeRemaining("00:00:00");
          setEnded(true);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [bid]);

  if (isLoading) {
    return (
      <div className="w-screen h-[86vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  const onFinish = async (values: any) => {
    try {
      const formattedPrice = Number(values.price.toString().replace(/,/g, ""));
      setLoading(true);
      const response = await postBidToken({
        orderTotal: formattedPrice,
        orderItems: bid,
        customer: user,
        // orderTotal: bid && Math.max(...bid.bidParticipants.map((bid) => bid.amount)),
        // // orderShip: delivery.price,
      });
      window.snap.pay(response.token);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-16 px-52 2xl:px-72">
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-5">
          {bid && (
            <div className="space-y-3">
              <div className="flex flex-col items-center -space-y-1">
                <span className="text-lg font-light">
                  {ended ? "Ended" : status}
                </span>
                <h2 className="text-2xl font-semibold">{timeRemaining}</h2>
              </div>
              <ProductImage
                imageUrl={bid.productDetail.product.productPhotos}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col col-span-7 space-y-7">
          <div className="flex flex-col space-y-4">
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
            <h1 className="pb-5 border-b text-4xl font-semibold 2xl:text-5xl 2xl:leading-[60px]">
              {bid?.productName}
            </h1>
          </div>

          <div className="space-y-4">
            {dayjs() < dayjs(bid?.start_date) ? (
              <div>
                <p className="mb-1 text-sm text-zinc-400">Starting Price:</p>
                <h1 className="text-2xl font-medium">
                  Rp {bid?.start_price.toLocaleString("en-us")}
                </h1>
              </div>
            ) : (
              <div>
                <p className="mb-1 text-sm text-zinc-400">
                  Current Highest Bid:
                </p>
                <h1 className="text-2xl font-medium">
                  Rp{" "}
                  {bid && bid.bidParticipants.length >= 0 ?
                    Math.max(
                      ...bid.bidParticipants.map((bid) => bid.amount)
                    ).toLocaleString("en-Us") : 0}
                </h1>
              </div>
            )}

            {bid && user && (
              <BidUserDisplay participant={bid.bidParticipants} user={user} />
            )}

            <div className="flex items-center justify-between pb-3 border-b border-zinc-300">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">
                  {bid?.productDetail.size}
                </h1>
                <p>Shoe size</p>
              </div>
              <Button icon={<EyeOutlined />} type="text" onClick={showModal}>
                Size Guide
              </Button>
              <Modal
                title={"SIZE GUIDE"}
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
              >
                <div className="mt-4 border rounded-xl border-zinc-300">
                  <div className="p-5 text-sm font-semibold border-b border-zinc-300">
                    Adidas Men`s
                  </div>
                  <div className="overflow-y-auto h-[500px] ">
                    <Image
                      src={"/image/size-guide.png"}
                      alt={"size guide"}
                      width={500}
                      height={1000}
                      quality={100}
                      className="w-full h-auto"
                    />
                  </div>
                </div>
              </Modal>
            </div>
          </div>

          <Form onFinish={onFinish}>
            <div className="flex items-start justify-between gap-4 h-fit">
              <Form.Item className="mb-0">
                <div className="px-4 py-2 my-auto w-max bg-zinc-100 rounded-xl">
                  <p className="text-xs text-zinc-600">Your bid</p>
                  <h1 className="text-base font-medium truncate">
                    Rp{" "}
                    {bid &&
                      bid.bidParticipants.find(
                        (bid) => bid.user.email == user?.email
                      )
                      ? bid.bidParticipants
                        .find((bid) => bid.user.email == user?.email)
                        ?.amount.toLocaleString("en-US")
                      : 0}
                  </h1>
                </div>
              </Form.Item>
              {/* <Form.Item className="w-full mb-0">
                <Input
                  className="rounded-xl h-14"
                  placeholder={
                    bid &&
                    bid.bidParticipants.find(
                      (bid) => bid.user.email == user?.email
                    )
                      ? "Add your Bid"
                      : "Post your Bid"
                  }
                  variant="filled"
                />
              </Form.Item> */}

              <BidInput
                placeholder={
                  bid &&
                    bid.bidParticipants.find(
                      (bid) => bid.user.email == user?.email
                    )
                    ? "Add your Bid"
                    : "Post your Bid"
                }
              // required={false}
              />

              <Form.Item className="mb-0">
                <Button
                  className="h-14 rounded-xl"
                  block
                  type="primary"
                  htmlType="submit"
                >
                  Bid Now
                </Button>
              </Form.Item>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Bid;
