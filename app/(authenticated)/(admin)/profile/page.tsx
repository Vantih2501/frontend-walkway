import CarouselStock from '#/components/Admin/Dashboard/CarouselStock'
import { products } from '#/mock-data/products'
import React from 'react'

const page = () => {
  return (
    <div className='w-[900px] h-fit'>
        <CarouselStock dataFetch={products}/>
    </div>
  )
}

export default page