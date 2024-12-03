import "antd/dist/reset.css";
import { Metadata } from "next";
import { Poppins, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Provider } from "./provider";
import { config } from "#/config/app";
import NextTopLoader from "nextjs-toploader";

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

export const metadata: Metadata = {
  title: {
    template: "%s - Walkway",
    default: "Walkway",
  },
};

declare global {
  interface Window {
    snap: any
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* ugh */}
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={poppins.className}>
        <>
          <>
            <Script src={config.sandboxUrl} strategy={"beforeInteractive"} data-client-key={config.clientKey}></Script>
            <NextTopLoader
              color="#4E7772"
              initialPosition={0.08}
              crawlSpeed={200}
              height={3}
              showSpinner={false}
              easing="ease"
              speed={200}
              shadow="0 0 10px #4E7772,0 0 5px #4E7772"
            />
            <Provider>
              <main>{children}</main>
            </Provider>
          </>
        </>
      </body>
    </html>
  );
}
