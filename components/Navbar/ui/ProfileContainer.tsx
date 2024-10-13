import Link from 'next/link'
import React from 'react'

const ProfileContainer = () => {
  return (
    <div className="flex gap-3 items-center">
          <Link
            href="/login"
            className="flex justify-center items-center text-sm w-24 h-9 2xl:w-24 2xl:h-9 rounded-full bg-white hover:bg-zinc-50"
          >
            Sign In
          </Link>
    </div>
  )
}

export default ProfileContainer