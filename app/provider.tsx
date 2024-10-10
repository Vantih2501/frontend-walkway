"use client";

import React, { useEffect } from "react";
import { ConfigProvider } from "antd";
import { TokenUtil } from "#/utils/token";

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
					fontFamily: "'Poppins', sans-serif",
				},
				components: {
					Statistic: {
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
