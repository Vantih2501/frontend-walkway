import Footer from "#/components/Footer/page";
import {
  HeroSection,
  BidDisplay,
  BrandBanner,
  OurCollection,
  ProductDisplay,
} from "#/components/LandingPage/page";
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
      <Navbar/>
      <HeroSection />
      <BrandBanner />
      <ProductDisplay />
      <BidDisplay />
      <OurCollection />
      <Footer/>
    </div>
  );
}
