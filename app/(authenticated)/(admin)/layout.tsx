import Sider from "#/components/Admin/Layout/Sider";
import Header from "#/components/Admin/Layout/Header";
import { Poppins } from "next/font/google";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	preload: false,
});

export default function AdminLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={poppins.className}>
				<div className="flex max-h-screen overflow-hidden">
					<Sider />
					<div className="w-full flex flex-col justify-between max-h-screen p-8 gap-6 2xl:gap-8">
						<Header />
						<main className="h-full">
							{children}
						</main>
					</div>
				</div>
			</body>
		</html>
	);
}
