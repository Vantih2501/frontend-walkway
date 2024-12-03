"use client";

import React from 'react';
import { Card } from 'antd';
import { FacebookOutlined, InstagramOutlined, TwitterOutlined, TwitterSquareFilled } from '@ant-design/icons';

export default function Footer() {
  return(
    <Card className='mt-12 rounded-none cardFooter'>
        <div className="container flex mx-auto">
        <div className="flex text-footer">
            <div className="w-1/4 walk">
            <img src='/logo.svg' alt='' width={220} />
            <p className='mt-4' style={{ color:'white' }}>Explore the latest in sneaker styles, from timeless classics to modern designs. Find your perfect pair and step up your look today!</p>
            </div>
            <div className="w-1/5 ml-32 away">
                <p className='text-base font-medium text-white'>Kategori</p>
                <a href="" style={{ color:"#d4d4d8",	fontWeight: 400 }}>Brands</a> <br /><br />
                <a href="" style={{ color:"#d4d4d8",	fontWeight: 400 }}>Sneakers</a><br /><br />
                <a href="" style={{ color:"#d4d4d8",	fontWeight: 400 }}>Auction</a> <br /><br />
                <a href="" style={{ color:"#d4d4d8",	fontWeight: 400 }}>Hottest</a>
            </div>
            <div className="waway">
            <p className='text-base font-medium text-white'>Social Media</p>
            <a href="http://"><TwitterOutlined style={{ fontSize:'25px', color:"white" }} /></a>
            <a href="http://"><InstagramOutlined style={{ fontSize:'25px', color:"white" }} className='mx-3' /></a>
            <a href="http://"><FacebookOutlined style={{ fontSize:'25px', color:"white" }} className='mx-1' /></a>
            </div>
        </div>
        <img className='img-bg-footer' src='/background-footer.png' alt=''/>
        </div>
    </Card>
  )
};


