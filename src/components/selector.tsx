'use client'

import { useRouter } from 'next/navigation';

const Selector = () => {

    const router = useRouter();

    const handleSelect = (path:string)=>{
        router.push(path);
    }

  return (
    <div className='h-[5rem] flex bg-blue-500 w-full gap-1 text-white font-bold text-xl'>
        <button className='w-full border-2' onClick={()=>handleSelect('path-finder')}>Path Finder</button>
        <button className='w-full border-2' onClick={()=>handleSelect('sorting')}>Sorting</button>
    </div>
  )
}

export default Selector