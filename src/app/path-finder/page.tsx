import Grid from '@/components/path-finder/grid'
import PathMenu from '@/components/path-finder/pathMenu'
import { PathProvider } from '@/contexts/path-finder/usePath'
import React from 'react'

const Page = () => {
  return (
    <div className='h-[41rem] bg-gray-200'>
      <PathProvider>
        <PathMenu/>
        <Grid/>
      </PathProvider>
    </div>
  )
}

export default Page