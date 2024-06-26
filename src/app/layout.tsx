import './globals.css'
import React from 'react';
import { Inter } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Analytics } from '@vercel/analytics/react';
import SnackbarProviderWrapper from '@/providers/SnackbarProviderWrapper';
import GoogleAdsense from '@/components/GoogleAdsense';

export const metadata = {
  title: 'Muhammad Bilal Mohib-ul-Nabi - Full Stack Typescript/NextJS/FastAPI Developer',
  description: `I am a full-stack developer based in Pakistan,
  with
  four
  years
of
experience
  in
  web
development.
  I
am
a
computer
science
graduate
and
freelance
professional,
  I
have
engaged
  in
  numerous
projects,
  primarily
focusing
on
technologies
such
as
NextJS,
  ReactJS,
  FastAPIs,
  and
PostgreSQL
databases.`,
}

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SnackbarProviderWrapper>
          <Header />
          {children}
          <Footer />
        </SnackbarProviderWrapper>
        <Analytics />

        <GoogleAdsense
          pId={process.env.GOOGLE_ADSENSE_PUB_ID!}
        />
      </body>
    </html>
  );
}
