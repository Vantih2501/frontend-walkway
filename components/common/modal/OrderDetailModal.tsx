import { Modal, Tag, Image } from 'antd'
import React from 'react'
import { GrMapLocation } from 'react-icons/gr'

interface OrderDetailProps {
    open: boolean
    isItem: Order | undefined,
    setIsItem: (value: Order | undefined) => void
}

const OrderDetailModal = ({isItem, setIsItem, open, setOpenModal}: OrderDetailProps) => {
  return (
		<Modal
            title={'Detail Order'}
			open={open}
			onCancel={() => setOpenModal(false)}
			footer={null}
			width={800}
		>
			<div className="space-y-8 py-6">
				<header className="flex items-center justify-between pb-8 border-b">
					<div className="flex flex-1 items-center">
						<Tag color="green" className="text-xs rounded-full">
							Active
						</Tag>
						<p className="text-sm">10 September 2024</p>
					</div>
					<p>
						Nomor Resi: <span className="text-green-600">JFKS-743578</span>
					</p>
				</header>
				<main className="grid grid-cols-2 gap-12 pb-8 border-b">
					<div className="space-y-8">
						<div className="flex gap-4 text-sm pb-8 border-b">
							<Image
								preview={false}
								alt=""
								src={""}
								className="rounded-xl !size-20 object-contain border !border-zinc-300"
							/>
							<div className="flex-1 space-y-2">
								<h1 className="w-3/5 line-clamp-2 text-base">
									New Balance 1906R Silver Metallic Sea Salt
								</h1>
								<div className="flex gap-3 text-zinc-400 text-sm">
									<p>Size: 12</p>
									<p>Quantity: 1</p>
								</div>
							</div>
							<h1 className="text-base">Rp. 2,500,000</h1>
						</div>
						<div>
							<h1 className="text-base font-medium">Customer Details</h1>
							<div className="flex justify-between items-center py-4 border-b">
								<p className="text-zinc-400">Name</p>
								<p className="font-medium">Nadyne Lourensia Saebrina</p>
							</div>
							<div className="flex justify-between items-center py-4 border-b">
								<p className="text-zinc-400">Address</p>
								<p className="font-medium">Jl. Mawar A, No. 18 RT/RW 004/001</p>
							</div>
							<div className="flex justify-between items-center py-4 border-b">
								<p className="text-zinc-400">Phone Number</p>
								<p className="font-medium">08583292040</p>
							</div>
							<div className="flex justify-between items-center py-4 border-b">
								<p className="text-zinc-400">Email</p>
								<p className="font-medium">Saebrinan@gmail.com</p>
							</div>
							<div className="flex justify-between items-center py-4">
								<p className="text-zinc-400">Order Date</p>
								<p className="font-medium">02 September 2024</p>
							</div>
						</div>
					</div>
					<div className="space-y-8">
						<div className="flex justify-between items-center py-4 border-b">
							<p className="text-zinc-400">Payment Method</p>
							<p className="font-medium">Bank BCA</p>
						</div>
						<div className="space-y-3 pb-5 border-b">
							<h1 className="text-sm font-medium">
								Nama Penerima |
								<span className="font-normal">+62 895-4234-234</span>
							</h1>
							<div className="flex gap-3">
								<GrMapLocation />
								<div className="flex-1">
									<h1 className="text-sm font-medium mb-1">JNE Pengiriman</h1>
									<p className="text-xs text-zinc-500">
										Jalan Kemuning Raya No. 15, Kelurahan Menteng, Kecamatan
										Menteng, Kota Jakarta Pusat, DKI Jakarta 10310, Indonesia.
									</p>
								</div>
							</div>
						</div>
						<div className="flex flex-col">
							<div className='flex-1'>
								<div className="flex justify-between items-center">
									<p className="text-zinc-400">Subtotal (2 Product)</p>
									<p className="text-zinc-600 font-medium">Rp. 5,000,000</p>
								</div>
								<div className="flex justify-between items-center ">
									<p className="text-zinc-400">Shipping</p>
									<p className="text-zinc-600 font-medium">Rp. 24,000</p>
								</div>
							</div>
							<div className='py-4 px-3'>
								<div className="flex justify-between items-center">
									<p className="font-medium">ORDER TOTAL</p>
									<p className="font-medium">Rp. 5,024,000</p>
								</div>
							</div>
						</div>
					</div>
				</main>
			</div>
		</Modal>
	);
}

export default OrderDetailModal