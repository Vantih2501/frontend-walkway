import Footer from "#/components/Footer/page";
import Navbar from "#/components/common/navigation/Navbar";
import { Poppins } from "next/font/google";

export default function MainLayout({ children, user }: { children: React.ReactNode, user?: User }) {
	return (
		<>
			<Navbar user={user} />
			<main className="">{children}</main>
			<Footer />
		</>
	);
}
