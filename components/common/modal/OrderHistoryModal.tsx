import { Button, Image, Modal, Tag } from "antd";
import React from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";
import { config } from "#/config/app";
import { urlFormatter } from "#/utils/formatter";

interface OrderHistoryProps {
	order: Order;
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
}

const OrderHistoryModal = ({order, openModal, setOpenModal}: OrderHistoryProps) => {
	const route = useRouter()

	const isRedirect = () => {
		route.push(
			`/product/${order.orderItems[0].productDetail.product.brand.name}/${urlFormatter(order.orderItems[0].productDetail.product.name)}`
		);
	};
	console.log(order)
	return (
		<Modal
            className="p-5 rounded-xl w-[1000px]"
            footer={[
                <Button block type="primary" className="text-xs h-11" onClick={isRedirect}>
                    Buy Again
                </Button>
            ]}
			open={openModal}
			title="Order Detail"
			onCancel={() => setOpenModal(false)}
			destroyOnClose
		>
			<div className="space-y-5 py-4">
				<div className="flex item-center justify-between pb-4 border-b">
					<div className="flex items-center">
						<Tag className="rounded-full text-[10px]" color={`${order.status === "confirmed" ? "green" : "red"}`}>
							{order.status}
						</Tag>
						<p className="text-xs">{dayjs(order.order_date).format("DD MMMM YYYY")}</p>
					</div>
					<h1 className="text-xs">
						Nomor resi: <span className="text-green-600">{order.receipt}</span>
					</h1>
				</div>
				<div className="flex gap-4 text-sm pb-5 border-b">
					<Image 
					preview={false}
					alt="" 
					src={`${config.apiUrl}/product/uploads/${order.orderItems[0].productDetail.product.productPhotos.find(t => t.photoType == 'front')?.image}`} 
					className="rounded-xl !size-20 object-contain border !border-zinc-300" />
					<div className="flex-1 space-y-2">
						<h1 className="w-3/5 line-clamp-2">{order.orderItems[0].productDetail.product.name}</h1>
						<div className="flex gap-3 text-zinc-400">
							<p>Size: {order.orderItems[0].productDetail.size}</p>
							<p>Quantity: {order.orderItems.length}</p>
						</div>
					</div>
					<h1>Rp. {order.order_total.toLocaleString('id-ID')}</h1>
				</div>
				<div className="space-y-3 pb-5 border-b">
					<h1 className="text-sm font-medium">
						Nama Penerima |<span className="font-normal">+62 895-4234-234</span>
					</h1>
					<div className="flex gap-3">
						<Image alt="" src="" sizes="20" />
						<div>
							<h1 className="text-sm font-medium mb-1">JNE Pengiriman</h1>
							<p className="text-xs text-zinc-500">
								Jalan Kemuning Raya No. 15, Kelurahan Menteng, Kecamatan
								Menteng, Kota Jakarta Pusat, DKI Jakarta 10310, Indonesia.
							</p>
						</div>
					</div>
				</div>
				<div className="pb-5 border-b">
					<div className="flex justify-between items-center mb-3 text-sm">
						<h1>Subtotal ({`${order.orderItems.length}`} Product)</h1>
						<p>Rp. {(order.order_total * order.orderItems.length).toLocaleString('id-ID')}</p>
					</div>
					<div className="flex justify-between items-center text-sm">
						<h1>Shipping</h1>
						<p>Rp. 24,000</p>
					</div>
				</div>
                <div className="flex justify-between items-center font-medium text-base mt-5">
                    <h1>ORDER TOTAL</h1>
                    <p>Rp. {(24000 + order.order_total).toLocaleString('id-ID')}</p>
                </div>
			</div>
		</Modal>
	);
};

export default OrderHistoryModal;
