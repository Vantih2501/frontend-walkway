import DetailProduct from '#/components/DetailProduct/DetailProduct'
import { SimiliarProduct } from '#/components/DetailProduct/SimiliarProduct'
import React from 'react'

const page = () => {
  return (
    <div>
        <DetailProduct/>
        <SimiliarProduct/>
    </div>
  )
}

export default page