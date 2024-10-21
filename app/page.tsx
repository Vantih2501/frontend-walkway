import {
  HeroSection,
  BidDisplay,
  BrandBanner,
  OurCollection,
  ProductDisplay,
} from "#/components/LandingPage/page";
import React from "react";
import MainLayout from "./(guest)/(user)/layout";

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
