import type { Metadata } from 'next';
import { Fraunces, Inter, Caveat, Plus_Jakarta_Sans } from 'next/font/google';
import Navbar from '@/components/Navbar';
import './globals.css';

const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-display', weight: ['400', '500', '600', '700'] });
const inter = Inter({ subsets: ['latin'], variable: '--font-body', weight: ['400', '500', '600', '700'] });
const caveat = Caveat({ subsets: ['latin'], variable: '--font-script', weight: ['500', '600', '700'] });
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['700', '800'],
});

export const metadata: Metadata = {
  title: 'ServeLink — Find. Serve. Make an Impact.',
  description:
    'Discover meaningful volunteer opportunities that fit your schedule, your interests, and your goals — built for NHS, HHS, and student volunteers.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} ${caveat.variable} ${jakarta.variable}`}
    >
      <body>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
