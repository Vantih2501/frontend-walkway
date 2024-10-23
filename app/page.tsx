"use client"
import {
  HeroSection,
  BrandBanner,
  OurCollection,
  ProductDisplay,
  BidDisplay,
} from "#/components/LandingPage/page";
import React from "react";
import MainLayout from "./(guest)/(user)/layout";
import { useAuth } from "#/hooks/auth";
import { getAccessToken } from "#/utils/token";

export default function Home() {
  const { getUser } = useAuth();

  const token = getAccessToken();

  const { user } = getUser(token || '');
  console.log(user)
  return (
    <MainLayout user={user}>
      <HeroSection />
      <BrandBanner />
      <ProductDisplay />
      <BidDisplay />
      <OurCollection />
    </MainLayout>
  );
}
