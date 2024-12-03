import { config } from '#/config/app'
import { formatPhoneNumber } from '#/utils/formatter'
import { Modal, Tag, Image, Button } from 'antd'
import dayjs from 'dayjs'
import React from 'react'
import { GrMapLocation } from 'react-icons/gr'

interface OrderDetailProps {
    openModal: boolean
    setOpenModal: (value: boolean) => void
    order: Order | undefined,
}

const OrderDetailModal = ({openModal, setOpenModal, order}: OrderDetailProps) => {
  return (
		<Modal
			title={"Detail Order"}
			open={openModal}
			onCancel={() => setOpenModal(false)}
			footer={[
				<Button type='primary' className='rounded-lg text-xs px-8 py-5'>
					Export
				</Button>
			]}
			width={800}
		>
			<div className="space-y-6 py-6">
				<header className="flex items-center justify-between pb-6 border-b">
					<div className="flex flex-1 items-center">
						<Tag
							className="rounded-full text-[10px]"
							color={`${order?.status === "confirmed" ? "green" : "red"}`}
						>
							{order?.status}
						</Tag>
						<p className="text-sm">
							{dayjs(order?.order_date).format("DD MMMM YYYY")}
						</p>
					</div>
					<p>
						Nomor Resi: <span className="text-green-600">{order?.receipt}</span>
					</p>
				</header>
				<main className="grid grid-cols-2 gap-12 pb-6 border-b">
					<div className="space-y-6">
						<div className="flex gap-4 text-sm pb-6 border-b">
							<Image
								preview={false}
								alt={"product"}
								src={`${config.apiUrl}/product/uploads/${
									order?.orderItems[0].productDetail.product.productPhotos.find(
										(t) => t.photoType == "front"
									)?.image
								}`}
								className="rounded-xl !size-16 object-contain border bg-primary-100"
							/>
							<div className="flex-1 space-y-2">
								<h1 className="w-4/5 line-clamp-2 text-sm">
									{order?.orderItems.find((item) => item.productDetail.product.brand.name)?.productDetail.product.brand.name}  
               			 			{" "}{order?.orderItems.find((item) => item.productDetail.product.name)?.productDetail.product.name}
								</h1>
								<div className="flex gap-3 text-zinc-400 text-xs">
									<p>Size: {order?.orderItems[0].productDetail.size}</p>
									<p>Quantity: {order?.orderItems.length}</p>
								</div>
							</div>
							<h1 className="text-sm text-green-600">
								Rp. {order?.order_total.toLocaleString("id-ID")}
							</h1>
						</div>
						<div className="text-sm">
							<h1 className="text-sm font-semibold">Customer Details</h1>
							<div className="flex justify-between items-center py-4 border-b">
								<p className="text-zinc-400">Name</p>
								<p className="font-normal">{order?.address.contact_name}</p>
							</div>
							<div className="flex justify-between items-center py-4 border-b">
								<p className="text-zinc-400">Address</p>
								<p className="font-normal text-right line-clamp-2 w-1/2">{order?.address.address}</p>
							</div>
							<div className="flex justify-between items-center py-4 border-b">
								<p className="text-zinc-400">Phone Number</p>
								<p className="font-normal">
									{formatPhoneNumber(order?.address.contact_number)}
								</p>
							</div>
							<div className="flex justify-between items-center py-4 border-b">
								<p className="text-zinc-400">Email</p>
								<p className="font-normal">{"Name@example.com"}</p>
							</div>
							<div className="flex justify-between items-center pt-4">
								<p className="text-zinc-400">Order Date</p>
								<p className="font-normal">
									{dayjs(order?.order_date).format("DD MMMM YYYY")}
								</p>
							</div>
						</div>
					</div>
					<div className="text-sm space-y-6 flex flex-col">
						<div className="flex justify-between items-center pb-4 border-b">
							<p className="text-zinc-400">Payment Method</p>
							<p className="font-normal">Bank BCA</p>
						</div>
						<div className="space-y-3 pb-5 border-b">
							<h1 className="text-sm font-normal">
								{order?.address.contact_name} |
								<span className="font-normal text-zinc-600">
									{" "}
									{formatPhoneNumber(order?.address.contact_number)}
								</span>
							</h1>
							<div className="flex gap-3">
								<GrMapLocation size={20} />
								<div className="flex-1">
									<h1 className="text-sm font-normal mb-1">JNE</h1>
									<p className="text-xs text-zinc-400">
										Jalan Kemuning Raya No. 15, Kelurahan Menteng, Kecamatan
										Menteng, Kota Jakarta Pusat, DKI Jakarta 10310, Indonesia.
									</p>
								</div>
							</div>
						</div>
						<div className="flex-1">
							<div className="flex-1 space-y-1">
								<div className="flex justify-between items-center">
									<p className="text-zinc-500">Subtotal (2 Product)</p>
									<p className="text-zinc-500 font-normal">Rp. 5,000,000</p>
								</div>
								<div className="flex justify-between items-center ">
									<p className="text-zinc-500">Shipping</p>
									<p className="text-zinc-500 font-normal">Rp. 24,000</p>
								</div>
							</div>
						</div>
						<div className="py-4 px-3 bg-zinc-100">
							<div className="flex justify-between items-center">
								<p className="font-semibold">ORDER TOTAL</p>
								<p className="font-semibold">Rp. 5,024,000</p>
							</div>
						</div>
					</div>
				</main>
			</div>
		</Modal>
	);
}

export default OrderDetailModal