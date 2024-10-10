import React from 'react'
import HeroSection from './components/HeroSection'
import ProductDisplay from './components/ProductDisplay'
import BrandBanner from './components/BrandBanner'

const LandingPage = () => {
  return (
    <div>
        <HeroSection/>
        <BrandBanner/>
        <ProductDisplay/>
    </div>
  )
}

export default LandingPage