"use client"
import { useEffect, useState } from "react"
import Navbar from "#/components/common/navigation/Navbar"
import Footer from "#/components/common/footer/Footer"
import { useAuth } from "#/hooks/auth"
import { getAccessToken } from "#/utils/token"
import { LoadingOutlined } from "@ant-design/icons"
import { Spin } from "antd"

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
    <main>
      <Navbar user={user} />
      <div>{children}</div>
      <Footer />
    </main>
  )
}