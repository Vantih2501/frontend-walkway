import React from 'react'
import HeroSection from './components/HeroSection'
import ProductDisplay from './components/ProductDisplay'
import BrandBanner from './components/BrandBanner'
import BidDisplay from './components/BidDisplay'
import OurCollection from './components/OurCollection'

const LandingPage = () => {
  return (
    <div>
        <HeroSection/>
        <BrandBanner/>
        <ProductDisplay/>
        <BidDisplay/>
        <OurCollection/>
    </div>
  )
}

export default LandingPage