"use client"
import Navbar from "#/components/common/navigation/Navbar"
import Footer from "#/components/common/footer/Footer"
import { useAuth } from "#/hooks/auth";
import { getAccessToken } from "#/utils/token";

interface LayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: LayoutProps) {
  const { getUser } = useAuth();
	const token = getAccessToken();
	const { user, isLoading, isError } = getUser(token);

  if (isLoading) {
    return <>loading...</>
  }

  return (
    <main>
      <Navbar user={user} />
      <div className="min-h-[80vh]">{children}</div>
      <Footer />
    </main>
  )
}