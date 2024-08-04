"use client"
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Signup() {
   return (
    <div className='container'>
        <Image src="/logo1.png" alt="logo"  width={80} height={80} />
        <h1>Page Not Found</h1>
        <Link className='link' href="/">Take me Home</Link>

        <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
        }

        .container h1{
         color: white
        }

        .link{
        color: white;
        }
        
      `}</style>

    </div>
   )
}
