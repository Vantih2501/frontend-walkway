import Link from 'next/link'
import React from 'react'

const SignContainer = () => {
  return (
    <div className="flex gap-3 items-center">
          <Link
            href="/register"
            className="flex justify-center items-center text-sm w-24 h-9 2xl:w-28 2xl:h-10 rounded-full bg-primary hover:opacity-75"
            style={{ color: "white" }}
          >
            Sign Up
          </Link>
          <Link
            href="/login"
            className="flex justify-center items-center text-sm w-24 h-9 2xl:w-24 2xl:h-9 rounded-full bg-white hover:bg-zinc-50"
          >
            Sign In
          </Link>
    </div>
  )
}

export default SignContainer