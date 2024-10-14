import {
  HeroSection,
  BidDisplay,
  BrandBanner,
  OurCollection,
  ProductDisplay,
} from "#/components/Landing-Page/page";
import Navbar from "#/components/Navbar/Navbar";
import React from "react";

export default function Home() {
  // const router = useRouter();

  // useEffect(() => {
  //   if(router) {
  //     router.push('/home');
  //   }
  // }, [router]);

  return (
    <div>
      <HeroSection />
      <BrandBanner />
      <ProductDisplay />
      <BidDisplay />
      <OurCollection />
    </div>
  );
}
