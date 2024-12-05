import GuestHero from '@/components/guest/GuestHero'
import React from 'react'
import Features from '@/components/guest/Features'
import CTA from '@/components/guest/CTA'
import Pricing17 from '@/components/guest/Pricing'
import Contact24 from '@/components/guest/Contact'

const index = () => {
  return (
    <div className='min-h-[100vh]'>
        <div className='lg:max-w-[80%] md:max-w-[80%] max-w-[85%] mx-auto'>
            <GuestHero />
            <Features />
            <CTA />
            <Pricing17 />
            <Contact24 />
        </div>
    </div>
  )
}   

export default index