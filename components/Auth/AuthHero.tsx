import React from 'react'
import Image from 'next/image'

const AuthHero = () => {
  return (
    <>
    <div className="absolute h-full w-full z-0">
          <Image
            src={"/image/card-image.png"}
            alt={"Login Background"}
            fill
            className="object-cover"
          />
        </div>
        <div
          className="absolute z-10 h-full w-full p-9 2xl:p-14 flex flex-col justify-between
                bg-gradient-to-t from-zinc-900/75 from-20% via-transparent via-30% to-zinc-900 to-100%"
        >
          <Image
            src={"/walkway-logo.svg"}
            alt="walkway logo"
            width={160}
            height={48}
            className="h-9 2xl:h-12"
          />
          <div className="h-auto">
            <p className="text-white/90 leading-6 mb-4 2xl:text-2xl 2xl:font-medium 2xl:leading-9 2xl:mb-5">
              "Shoes are an important part of your look. I think if your outfit
              isn't anything special then fun footwear is a great way to jazz it
              up and make after your outfit more interesting."
            </p>
            <p className="text-white/90 text-sm 2xl:text-xl 2xl:font-medium">
              - Christian Siriano
            </p>
          </div>
        </div>
        </>
  )
}

export default AuthHero