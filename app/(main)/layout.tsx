import Navbar from "#/components/common/navigation/Navbar"
import Footer from "#/components/Footer/page"

interface LayoutProps {
  children: React.ReactNode
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <main>
      <Navbar />
      {children}
      <Footer />
    </main>
  )
}