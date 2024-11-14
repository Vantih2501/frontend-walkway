import { Button, Image, Modal, Tag } from "antd";
import React from "react";
import { useRouter } from "next/navigation";
import dayjs from "dayjs";

interface OrderHistoryProps {
	order: Order;
    openModal: boolean;
    setOpenModal: (value: boolean) => void;
}

const OrderHistoryModal = ({order, openModal, setOpenModal}: OrderHistoryProps) => {
	const route = useRouter()

	const isRedirect = () => {
		route.push(``);
	};

	return (
		<Modal
            className="p-5 rounded-xl"
            footer={[
                <Button block type="primary" className="text-xs h-11" onClick={isRedirect}>
                    Buy Again
                </Button>
            ]}
			open={openModal}
			title="Order History"
			onCancel={() => setOpenModal(false)}
			destroyOnClose
		>
			<div className="space-y-5 py-4">
				<div className="flex justify-between pb-5 border-b">
					<div className="flex items-center gap-1">
						<Tag className="rounded-full text-[10px]" color={`${order.status === "comftimed" ? "green" : "red"}`}>
							{order.status}
						</Tag>
						<p className="text-sm">{dayjs(order.order_date).format("DD MMMM YYYY")}</p>
					</div>
					<h1 className="text-sm">
						Resi: <span className="text-green-600">{order.receipt}</span>
					</h1>
				</div>
				<div className="flex gap-4 text-sm">
					<Image alt="" src="" sizes="70px" className="rounded-xl bg-zinc-50" />
					<div className="flex-1 space-y-2">
						<h1 className="w-3/5 line-clamp-2">Product Name</h1>
						<div className="flex gap-3">
							<p>Size: 14</p>
							<p>Quantity: 1</p>
						</div>
					</div>
					<h1>Rp. 2,324,000</h1>
				</div>
				<div className="space-y-3 pb-5 border-b">
					<h1 className="text-sm font-medium">
						Nama Penerima |<span className="font-normal">+62 895-4234-234</span>
					</h1>
					<div>
						<Image alt="" src="" sizes="20" />
						<div>
							<h1 className="text-sm font-medium">JNE Pengiriman</h1>
							<p className="text-xs text-zinc-500">
								Jalan Kemuning Raya No. 15, Kelurahan Menteng, Kecamatan
								Menteng, Kota Jakarta Pusat, DKI Jakarta 10310, Indonesia.
							</p>
						</div>
					</div>
				</div>
				<div className="pb-5 border-b">
					<div className="flex justify-between items-center mb-3 text-sm">
						<h1>Subtotal (2 Product)</h1>
						<p>Rp. 5,000,000</p>
					</div>
					<div className="flex justify-between items-center text-sm">
						<h1>Shipping</h1>
						<p>Rp. 24,000</p>
					</div>
				</div>
                <div className="flex justify-between items-center font-medium text-base mt-5">
                    <h1>ORDER TOTAL</h1>
                    <p>Rp. 5,024,000</p>
                </div>
			</div>
		</Modal>
	);
};

export default OrderHistoryModal;
