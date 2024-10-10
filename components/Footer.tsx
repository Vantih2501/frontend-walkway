"use client";

import React from 'react';
import { Card } from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, TwitterSquareFilled } from '@ant-design/icons';

export default function Footer() {
  return(
    <Card className='mt-12 cardFooter rounded-none'>
        <div className="flex container mx-auto">
        <div className="text-footer flex">
            <div className="walk w-1/4">
            <img src='/logo.svg' alt='' width={220} />
            <p className='mt-4' style={{ color:'white' }}>Explore the latest in sneaker styles, from timeless classics to modern designs. Find your perfect pair and step up your look today!</p>
            </div>
            <div className="away ml-32 w-1/5">
                <p className='font-medium text-white text-base'>Kategori</p>
                <a href="" style={{ color:"#d4d4d8",	fontWeight: 400 }}>Brands</a> <br /><br />
                <a href="" style={{ color:"#d4d4d8",	fontWeight: 400 }}>Sneakers</a><br /><br />
                <a href="" style={{ color:"#d4d4d8",	fontWeight: 400 }}>Auction</a> <br /><br />
                <a href="" style={{ color:"#d4d4d8",	fontWeight: 400 }}>Hottest</a>
            </div>
            <div className="waway">
            <p className='font-medium text-white text-base'>Social Media</p>
            <TwitterOutlined style={{ fontSize:'25px', color:"white" }} />
            <InstagramOutlined style={{ fontSize:'25px', color:"white" }} className='mx-3' />
            <FacebookOutlined style={{ fontSize:'25px', color:"white" }} className='mx-1' />
            </div>
        </div>
        <img className='img-bg-footer' src='/background-footer.png' alt=''/>
        </div>
    </Card>
  )
};

