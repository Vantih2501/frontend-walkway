"use client";

import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
import { TokenUtil } from "#/utils/token";
import { Montserrat, Poppins } from "next/font/google";

const montserrat = Montserrat({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	preload: false,
});

const poppins = Poppins({
	subsets: ["latin"],
	weight: ["300", "400", "500", "600", "700"],
	preload: false,
});

TokenUtil.loadToken();
export const Provider = ({ children }: any) => {
	// useEffect(() => {
	//   // @ts-ignore
	//   document.documentElement.style.opacity = 1
	// }, []);

	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#4E7772",
					fontFamily: poppins.style.fontFamily,
				},
				components: {
					Statistic: {
						fontFamily: montserrat.style.fontFamily,
						contentFontSize: 40,
						titleFontSize: 14,
					},
				},
			}}
		>
			{children}
		</ConfigProvider>
	);
};
