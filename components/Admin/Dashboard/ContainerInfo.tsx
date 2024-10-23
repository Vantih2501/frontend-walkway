import React from 'react'
import CardInfo from './ui/CardInfo';
import { LuDollarSign } from 'react-icons/lu';
import { PiWallet } from "react-icons/pi";
import { IoCubeOutline } from "react-icons/io5";


const ContainerInfo = ({className}: {className: string}) => {
  return (
		<div className={`${className}`}>
			<CardInfo
				title={"Total Revenue"}
				value={"RP. 300,000K"}
				Icon={LuDollarSign}
			/>
			<CardInfo title={"Total Sales"} value={"201"} Icon={PiWallet} />
			<CardInfo title={"Total Product"} value={"20"} Icon={IoCubeOutline} />
		</div>
	);
}

export default ContainerInfo