import { Poppins, Montserrat } from "next/font/google";

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	preload: false,
});

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	preload: false,
});


export default function RootLayout({ children } : { children: React.ReactNode }) {
	return (
		<div>
      {children}
    </div>
	);
}
