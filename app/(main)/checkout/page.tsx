"use client";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Collapse,
  CollapseProps,
  Form,
  Image,
  message,
  Modal,
  Spin,
} from "antd";
import OrderItem from "#/components/Checkout/OrderItem";
import AddressList from "#/components/Checkout/AddressList";
import { getAccessToken, getCheckoutToken } from "#/utils/token";
import { useProduct } from "#/hooks/product";
import { useOrder } from "#/hooks/order";
import { useAuth } from "#/hooks/auth";
import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useUser } from "#/hooks/user";
import { formatPhoneNumber } from "#/utils/formatter";
import ChangeAddressModal from "#/components/common/modal/ChangeAddressModal";
import AddressModalForm from "#/components/common/modal/AddressModal";

export default function Checkout() {
  const checkout_token = getCheckoutToken();
  const auth_token = getAccessToken();

  const { getCheckoutData, getCourierRate } = useProduct();
  const { getUser } = useAuth();
  const { user, isLoading: userLoading } = getUser(auth_token);
  const { getAddress, fetchAddress, postAddress } = useUser();
  const { postToken } = useOrder();

  const [form] = Form.useForm();

  const { address, isLoading: addressLoading } = getAddress(
    user?.defaultAddress
  );
  const { address: addresses, isLoading: addressesLoading } = fetchAddress(
    user?.email
  );
  const { product, isLoading: productLoading } =
    getCheckoutData(checkout_token);

  const [rate, setRate] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenChange, setIsOpenChange] = useState(false);

  const [delivery, setDelivery] = useState<any>(null);

  useEffect(() => {
    const getRate = async () => {
      if (address && product) {
        try {
          setIsLoading(true);
          setRate([]);
          setDelivery(null);
          const rateResponse = await getCourierRate(address, product);
          setRate(rateResponse.pricing);
        } catch (error) {
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    getRate();
  }, [address, product]);

  if (productLoading || userLoading) {
    return (
      <div className="w-screen h-[86vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    );
  }

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: (
        <h2 className="flex items-center justify-between text-xl">
          <p>Choose Delivery: </p>
          <p>
            {delivery
              ? `${delivery.courier_name} (${delivery.courier_service_name})`
              : ""}
          </p>
        </h2>
      ),
      children: isLoading ? (
        <div className="flex items-center justify-center w-full h-56">
          <Spin size="large" />
        </div>
      ) : (
        <div className="flex flex-col items-start gap-2">
          {rate.length > 0 ? (
            rate.map((data: any, index: number) => (
              <Button
                block
                key={index}
                onClick={() => setDelivery(data)}
                className="flex justify-between"
              >
                <p className="font-medium">
                  {data.courier_name}{" "}
                  <span className="text-gray-400">
                    ({data.courier_service_name})
                  </span>
                </p>
                <p className="flex gap-5">
                  <span className="text-gray-400">{data.duration}</span>
                  <span className="text-green-700">
                    Rp {data.price.toLocaleString("en-US")}
                  </span>
                </p>
              </Button>
            ))
          ) : (
            <div>No shipping service available</div>
          )}
        </div>
      ),
    },
  ];

  const handleCheckout = async () => {
    if (!product || !delivery) {
      return "failed";
    }

    try {
      setLoading(true);
      // const response = await postToken({
      //   orderTotal:
      //     product.reduce((acc: any, val: any) => acc + val.product.price, 0) +
      //     delivery.price,
      //   orderShip: delivery.price,
      //   orderItems: product,
      //   customer: user,
      // });

      const response = await postToken({
        orderTotal: product.reduce(
          (acc: any, val: CartItem) =>
            acc + val.productDetail.product.price * val.quantity,
          0
        ),
        delivery: delivery,
        orderItems: product,
        customer: user,
      });

      window.snap.pay(response.token);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddressFinish = async (values: any) => {
    try {
      message.success("Address created successfully.");
      await postAddress({ ...values, email: user?.email }, auth_token);
      setIsOpenAdd(false);
    } catch (error: any) {
      message.error(
        `Error Occurred: ${error.response.body.message}`
      );
      setIsOpenAdd(false);
    } finally {
      setIsOpenAdd(false);
      form.resetFields();
    }
  };

  return (
    <div className="max-w-7xl flex items-center min-h-[86vh] mx-auto py-3">
      <div className="w-full p-6 space-y-2 rounded-lg bg-zinc-50">
        <h2 className="text-2xl font-medium tracking-wide">Your Items</h2>
        <div className="flex justify-between gap-2">
          <div className="w-4/6 p-6 space-y-8 bg-white rounded-lg">
            {product &&
              product.map((product: any) => (
                <OrderItem data={product} key={product.id} />
              ))}

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-xl">Address</h2>
                {address ? (
                  <Button
                    type="default"
                    icon={<EditOutlined />}
                    onClick={() => setIsOpenChange(true)}
                  >
                    Change Address
                  </Button>
                ) : (
                  <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={() => setIsOpenAdd(true)}
                  >
                    Add Address
                  </Button>
                )}
                <AddressModalForm
                  form={form}
                  open={isOpenAdd}
                  onCancel={() => setIsOpenAdd(false)}
                  onFinish={handleAddressFinish}
                />
                <ChangeAddressModal
                  onAdd={() => {
                    setIsOpenChange(false);
                    setIsOpenAdd(true);
                  }}
                  user={user}
                  open={isOpenChange}
                  loading={addressesLoading}
                  address={addresses}
                  onCancel={() => setIsOpenChange(false)}
                />
              </div>
              <div className="px-5 space-y-1">
                {address ? (
                  <>
                    <p>
                      <span className="font-medium">
                        {address?.contact_name}
                      </span>{" "}
                      | {formatPhoneNumber(address?.contact_number)}
                    </p>
                    <p className="w-3/5 leading-snug">{address?.address}</p>
                  </>
                ) : (
                  <p className="leading-snug">No address available</p>
                )}
              </div>
            </div>

            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

            <Collapse
              items={items}
              ghost
              expandIconPosition="end"
              className="delivery-select"
            />
          </div>
          <div className="w-2/6 p-6 space-y-6 bg-white rounded-lg">
            <h2 className="text-xl">Order Summary</h2>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="space-y-2">
              <div className="flex justify-between">
                <h3 className="text-base text-gray-500">Order Subtotal</h3>
                <p className="font-medium text-gray-500">
                  Rp{" "}
                  {product
                    ?.reduce(
                      (acc: any, val: CartItem) =>
                        acc + val.productDetail.product.price * val.quantity,
                      0
                    )
                    .toLocaleString("en-US")}
                </p>
              </div>
              <div className="flex justify-between">
                <h3 className="text-base text-gray-500">Shipping</h3>
                <p className="font-medium text-gray-500">
                  Rp{" "}
                  {delivery?.price
                    ? delivery?.price.toLocaleString("en-US")
                    : "-"}
                </p>
              </div>
            </div>
            <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
            <div className="flex justify-between">
              <h3 className="text-base font-medium">Order Total</h3>
              <p className="font-medium ">
                Rp{" "}
                {product && delivery?.price
                  ? (
                      product?.reduce(
                        (acc: any, val: CartItem) =>
                          acc + val.productDetail.product.price * val.quantity,
                        0
                      ) + delivery.price
                    ).toLocaleString("en-US")
                  : "-"}
              </p>
            </div>
            <Button
              loading={loading}
              block
              type="primary"
              size="large"
              disabled={!delivery?.price}
              onClick={handleCheckout}
            >
              Proceed to Payment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
