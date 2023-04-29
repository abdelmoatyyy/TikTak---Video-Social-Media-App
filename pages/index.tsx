import Image from 'next/image'
import { Inter } from 'next/font/google'
import App from 'next/app'
import React from 'react';
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <h1 className='text font-bold underline'>Home</h1>
  )
}
