"use client"
import Navbar from "#/components/common/navigation/Navbar"
import Footer from "#/components/common/footer/Footer"
import { useAuth } from "#/hooks/auth";
import { getAccessToken } from "#/utils/token";
import { Spin } from "antd";

interface LayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: LayoutProps) {
  const { getUser } = useAuth();
	const token = getAccessToken();
	const { user, isLoading, isError } = getUser(token);

  // if (isLoading) {
  //   return <Spin size="large" />
  // }

  return (
    <main>
      <Navbar user={user} />
      <div>{children}</div>
      <Footer />
    </main>
  )
}