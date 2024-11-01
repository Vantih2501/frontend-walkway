"use client";
import React, { useEffect, useState } from "react";
import { Button, Card, Collapse, CollapseProps, Image, Spin } from "antd";
import OrderItem from "#/components/Checkout/OrderItem";
import AddressList from "#/components/Checkout/AddressList";
import { getAccessToken, getCheckoutToken } from "#/utils/token";
import { useProduct } from "#/hooks/product";
import { useOrder } from "#/hooks/order";
import { useAuth } from "#/hooks/auth";

export default function Checkout() {
  const token = getCheckoutToken()
  const { getCheckoutData, getCourierRate } = useProduct()

  const { getUser } = useAuth();
  const auth_token = getAccessToken();
  const { user } = getUser(auth_token);

  const { postProduct } = useOrder()
  const { product, isLoading, isError } = getCheckoutData(token)
  const [rate, setRate] = useState<any>([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    const getRate = async () => {
      try {
        const rate = await getCourierRate({ zipcode: 17713 }, product)
        console.log(rate.pricing)
        setRate(rate.pricing)
      } catch (error) {
        console.log(error)
      }
    }

    getRate()
  }, [product])

  const [delivery, setDelivery] = useState<{ courier: string; price: number } | null>(null);

  if (isLoading) {
    return (
      <div className="w-screen h-[86vh] flex items-center justify-center">
        <Spin size="large" />
      </div>
    )
  }

  const items: CollapseProps['items'] = [
    {
      key: '1',
      label: (
        <h2 className="text-xl flex justify-between items-center">
          <p>Choose Delivery: </p>
          <p>{delivery ? `${delivery.courier}` : ""}</p>
        </h2>
      ),
      children: (
        <div className="flex items-start flex-col gap-2">
          {rate.map((data: any) => (
            <Button
              block
              key={data.company}
              onClick={() => setDelivery({ courier: data.courier_name, price: data.price })}
              className="flex justify-between"
            >
              <p className="font-medium">{data.courier_name} <span className="text-gray-400">({data.courier_service_name})</span></p>
              <p className="flex gap-5"><span className="text-gray-400">{data.duration}</span><span className="text-green-700">Rp {data.price.toLocaleString('en-US')}</span></p>
            </Button>
          ))}
        </div>
      ),
    }
  ];

  const handleCheckout = async () => {
    if (!product || !delivery) {
      return 'failed'
    }

    try {
      setLoading(true)
      const response = await postProduct({
        orderTotal: product.reduce((acc, val) => acc + val.product.price, 0) + delivery.price,
        orderShip: delivery.price,
        orderItems: product,
        customer: user
      })

      window.snap.pay(response.token)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-7xl flex items-center min-h-[86vh] mx-auto">
      <div className="w-full">
        <div className="rounded-lg bg-[#f2f2f2] w-full p-6 space-y-2">
          <h2 className="text-2xl font-medium tracking-wide">Your Items</h2>
          <div className="flex justify-between gap-2">
            <div className="w-4/6 p-6 space-y-8 bg-white rounded-lg">
              {product && product.map((product) => (
                <OrderItem data={product} />
              ))}

              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

              <AddressList />

              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

              <Collapse items={items} ghost expandIconPosition="end" className="delivery-select"></Collapse>
            </div>
            <div className="w-2/6 p-6 space-y-6 bg-white rounded-lg">
              <h2 className="text-xl">Order Summary</h2>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              <div className="space-y-2">
                <div className="flex justify-between">
                  <h3 className="text-base text-gray-500">Order Subtotal</h3>
                  <p className="text-gray-500 font-medium">Rp {product?.reduce((acc, val) => acc + val.product.price, 0).toLocaleString('en-US')}</p>
                </div>
                <div className="flex justify-between">
                  <h3 className="text-base text-gray-500">Shipping</h3>
                  <p className="text-gray-500 font-medium">Rp {delivery?.price ? delivery?.price.toLocaleString('en-US') : "-"}</p>
                </div>
              </div>
              <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />
              <div className="flex justify-between">
                <h3 className="text-base  font-medium">Order Total</h3>
                <p className=" font-medium">Rp {product && delivery?.price ? (product?.reduce((acc, val) => acc + val.product.price, 0) + delivery?.price).toLocaleString('en-US') : '-'}</p>
              </div>
              <Button loading={loading} block type="primary" size="large" disabled={!delivery?.price} onClick={handleCheckout}>Proceed to Payment</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
