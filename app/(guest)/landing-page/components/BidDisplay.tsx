import React from 'react'
import CarouselUi from './ui/Carousel'
import { products } from '../../mock-data/products'

const BidDisplay = () => {
  return (
		<div className="p-24 flex items-center">
			<div className="w-full space-y-16">
				<h1 className='text-center text-7xl font-bold leading-[89px]'>Get rare items, at the best prices. Bid Now!</h1>
				<CarouselUi dataFetch={products} variant={"bid"}/>
			</div>
		</div>
  )
}

export default BidDisplay