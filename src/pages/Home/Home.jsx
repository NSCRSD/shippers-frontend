import React from 'react';

import { images } from '../../constants';
import { QuoteSection } from '../../components';


const Home = () => {
  return (
    <div className='flex flex-col items-center justify-center w-full'>
      <div
        className="relative h-[400px] bg-cover w-full bg-center flex items-center justify-center text-white text-center px-4"
        style={{
          backgroundImage: `url(${images.img})`,
        }}
      >
        <div className="absolute inset-0 bg-black/20"></div>
        <h1 className="text-3xl md:text-5xl font-bold max-w-2xl z-10">
          Seamless Regulatory Services in Just One Click
        </h1>
      </div>
      <QuoteSection />
    </div>
    
  )
}

export default Home
