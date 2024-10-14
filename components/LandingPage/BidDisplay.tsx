import React from 'react'
import CarouselUi from './ui/Carousel'
import { products } from '#/mock-data/products'

const BidDisplay = () => {
  return (
		<div className="p-24 flex items-center h-full">
			<div className="w-full space-y-16">
				<h1 className="montserrat.className font-bold text-center text-6xl leading-[79px] mb-14 2xl:text-7xl 2xl:leading-[100px] 2xl:mb-20">
					Get rare items, at the <br /> best prices. Bid Now!
				</h1>
				<CarouselUi dataFetch={products} variant={"bid"} />
			</div>
		</div>
	);
}

export default BidDisplay