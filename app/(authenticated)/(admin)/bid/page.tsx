"use client";

import { Col, Row } from "antd";
import React, { useState } from "react";
import BidAdminDisplay from "#/components/Admin/Bid/BidAdminDisplay";
import AddBidSider from "#/components/Admin/Bid/AddBidSider";
import EditBidSider from "#/components/Admin/Bid/EditBidSider";

const Page = () => {
	const [collapsed, setCollapsed] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const handleEditClick = () => {
		setIsEditing(true);
		setCollapsed(true);
	};

	const handleAddClick = () => {
		setIsEditing(false);
		setCollapsed(true);
	};

	const handleDiscard = () => {
		setCollapsed(false)
	}

	return (
		<Row gutter={24} style={{ height: "100%" }}>
			<Col
				span={collapsed ? 17 : 24}
				xxl={collapsed ? 18 : 24}
				style={{
					transition: "flex 0.2s ease-in-out",
				}}
			>
				<BidAdminDisplay 
				collapsed={collapsed} 
				handleEditClick={handleEditClick}
				handleAddClick={handleAddClick}
				/>
			</Col>
			<Col
				span={7}
				xxl={6}
				className={`transition-all duration-100 ease-in-out ${
					collapsed ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
				}`}
				style={{
					height: "100%",
					position: "relative",
					overflow: "hidden",
				}}
			>
				{isEditing ? <EditBidSider handleDiscard={handleDiscard}/> : <AddBidSider handleDiscard={handleDiscard}/>}
			</Col>
		</Row>
	);
};

export default Page;
