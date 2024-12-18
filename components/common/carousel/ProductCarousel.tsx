"use client";

import React, { useRef } from "react";
import { ProductCard } from "#/components/common/card/ProductCard";
import { Carousel, Button } from "antd";
import { HiArrowRight, HiArrowLeft } from "react-icons/hi2";
import Link from "next/link";
import { urlFormatter } from "#/utils/formatter";

interface CarouselProps {
  product: Product[];
}

const ProductCarousel = ({ product }: CarouselProps) => {
  const carouselRef = useRef<any>(null);

  const handleNext = () => {
    carouselRef.current.next();
  };

  const handlePrev = () => {
    carouselRef.current.prev();
  };

  return (
    <div className="relative">
      <Button
        type="primary"
        shape="circle"
        icon={<HiArrowLeft className="flex items-center justify-center" />}
        onClick={handlePrev}
        className="absolute z-20 transform -translate-y-1/2 bg-primary top-1/2 left-4"
      />
      <Carousel
        ref={carouselRef}
        dots={false}
				autoplay={true}
				autoplaySpeed={5000}
        slidesToShow={4}
        responsive={[
          { breakpoint: 2560, settings: { slidesToShow: 5 } },
          { breakpoint: 1440, settings: { slidesToShow: 4 } },
          { breakpoint: 1024, settings: { slidesToShow: 3 } },
          { breakpoint: 768, settings: { slidesToShow: 1 } },
        ]}
      >
        {product.filter((product) => product.status !== 'inactive').map((product) => (
          <Link href={`/product/${urlFormatter(product?.brand.name)}/${urlFormatter(product.name)}`} key={product.id} className="px-1 hover:text-inherit">
            <ProductCard
              price={product?.price}
              productName={product.name}
              imageUrl={product?.productPhotos.toString()}
            />
          </Link>
        ))}
      </Carousel>
      <Button
        type="primary"
        shape="circle"
        icon={<HiArrowRight className="flex items-center justify-center" />}
        onClick={handleNext}
        className="absolute z-20 transform -translate-y-1/2 bg-primary top-1/2 right-4"
      />
    </div>
  );
};

export default ProductCarousel;
