import 'antd/dist/reset.css';
import { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { Provider } from './provider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  preload: false,
});

export const metadata: Metadata = {
  title: {
    template: '%s - Walkway',
    default: 'Walkway',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      {/* ugh */}
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />

      <body className={poppins.className}>
        <Script src='/api/env' strategy={'beforeInteractive'}></Script>
        <Provider>{children}</Provider>
      </body>
    </html>
  );
}
