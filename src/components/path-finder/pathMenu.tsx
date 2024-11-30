'use client'

import { usePath } from '@/contexts/path-finder/usePath'
import React from 'react'

const PathMenu = () => {

    const {setSelectedType} = usePath();

  return (
    <div className='w-full bg-white flex justify-center'>
        <div className='w-4/6 h-24 flex justify-between items-center'>
            <button className='flex h-3/5 w-28 rounded-lg justify-center items-center gap-2' onClick={()=>setSelectedType('start')}>Start Point <div className='h-5 w-5 bg-red-500' /></button>
            <button className='flex h-3/5 w-28 rounded-lg justify-center items-center gap-2' onClick={()=>setSelectedType('end')}>End Point <div className='h-5 w-5 bg-green-500' /></button>
            <button className='flex h-3/5 w-28 rounded-lg justify-center items-center gap-2' onClick={()=>setSelectedType('wall')}>Wall <div className='h-5 w-5 bg-black' /></button>
        </div>
    </div>
  )
}

export default PathMenu