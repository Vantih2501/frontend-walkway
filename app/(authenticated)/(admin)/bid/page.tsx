import { Col, Row } from "antd";
import React from "react";
import BidAdminDisplay from "#/components/Admin/Bid/BidAdminDisplay";
import BidSider from "#/components/Admin/Bid/BidSider";

const page = () => {
	return (
		<div className="overflow-hidden h-full">
			<Row gutter={24} style={{ height: "100%" }}>
				<Col span={17}>
					<BidAdminDisplay/>
				</Col>
				<Col span={7}>
					<BidSider/>
				</Col>
			</Row>
		</div>
	);
};

export default page;
