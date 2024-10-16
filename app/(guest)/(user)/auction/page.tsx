import { CurrentAuction } from '#/components/Auction/CurrentAuction'
import DetailAuction from '#/components/Auction/DetailAuction'
import React from 'react'

const page = () => {
  return (
    <div>
        <DetailAuction/>
        <CurrentAuction/>
    </div>
  )
}

export default page