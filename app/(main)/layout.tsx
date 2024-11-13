"use client"
import { useEffect, useState } from "react"
import Navbar from "#/components/common/navigation/Navbar"
import Footer from "#/components/common/footer/Footer"
import { useAuth } from "#/hooks/auth"
import { getAccessToken } from "#/utils/token"
import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"
import { Poppins } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  preload: false,
})

interface LayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: LayoutProps) {
  // Use state to handle client-side rendering
  const [isMounted, setIsMounted] = useState(false)
  const { getUser } = useAuth()
  const token = getAccessToken()
  const { user, isLoading, isError } = getUser(token)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted || isLoading) {
    return null
  }

  return (
    <main className={poppins.className}>
      <Navbar user={user} />
      <div>{children}</div>
      <Footer />
    </main>
  )
}