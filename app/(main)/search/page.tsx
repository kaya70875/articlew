'use client';

import { signOut } from 'next-auth/react'
import React from 'react'

export default function page() {
  return (
    <div>
      Home Page
      <p onClick={() => signOut()}>Sign Out</p>
    </div>
  )
}
