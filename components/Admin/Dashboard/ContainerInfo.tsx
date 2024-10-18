import React from 'react'
import CardInfo from './ui/CardInfo';
import { LuDollarSign } from 'react-icons/lu';

const ContainerInfo = ({className}: {className: string}) => {
  return (
		<div className={`${className}`}>
			<CardInfo
				title={"Total Revenue"}
				value={"Rp. 300,000K"}
				Icon={LuDollarSign}
			/>
			<CardInfo title={"Total Sales"} value={"201"} Icon={LuDollarSign} />
			<CardInfo title={"Total Product"} value={"20"} Icon={LuDollarSign} />
		</div>
	);
}

export default ContainerInfo