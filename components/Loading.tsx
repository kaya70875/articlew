import { CircularProgress, CircularProgressProps } from '@mui/material'
import React from 'react'

interface LoadingProps extends CircularProgressProps {}

export default function Loading(props : LoadingProps) {
  return (
    <div className='flex items-center justify-center w-full h-48'>
      <CircularProgress {...props} />
    </div>
  )
}
