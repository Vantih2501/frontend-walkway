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
				<div className="flex max-h-screen">
					<Sider />
					<div className="flex flex-1 flex-col gap-6 p-8 2xl:gap-8 max-h-screen">
						<Header />
						<main className="h-full flex-1 overflow-y-auto">
							{children}
						</main>
					</div>
				</div>
			</body>
		</html>
	);
}
