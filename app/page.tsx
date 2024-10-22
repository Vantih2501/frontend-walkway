import {
  HeroSection,
  BrandBanner,
  OurCollection,
  ProductDisplay,
  BidDisplay,
} from "#/components/LandingPage/page";
import React from "react";
import MainLayout from "./(guest)/(user)/layout";
import { useProduct } from "#/hooks/product";

export default function Home() {
  
  return (
    <MainLayout>
      <HeroSection />
      <BrandBanner />
      <ProductDisplay />
      <BidDisplay />
      <OurCollection />
    </MainLayout>
  );
}
