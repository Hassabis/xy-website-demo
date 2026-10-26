import type { Metadata, Viewport } from 'next';
import { Instrument_Serif, Inter, JetBrains_Mono, Noto_Serif_SC } from 'next/font/google';
import 'lenis/dist/lenis.css';
import './globals.css';
import Providers from '@/components/Providers';

const serif = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-serif',
});
const sans = Inter({ subsets: ['latin'], variable: '--font-sans' });
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });
const cn = Noto_Serif_SC({
  weight: ['400', '600'],
  variable: '--font-cn',
  preload: false,
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : 'http://localhost:3107'),
  title: '光隙摄影 Lumen Studio · 人像 / 婚礼 / 商业 / 旅拍',
  description: '常驻上海的独立摄影工作室。用镜头留住那些转瞬即逝的光，和光里的人。',
  openGraph: {
    title: '光隙摄影 Lumen Studio',
    description: '用镜头留住那些转瞬即逝的光，和光里的人。',
    images: ['/photos/01.jpg'],
    type: 'website',
  },
};

export const viewport: Viewport = {
  themeColor: '#0c0b09',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN" className={`${serif.variable} ${sans.variable} ${mono.variable} ${cn.variable}`}>
      <body>
        <Providers>{children}</Providers>
        <div className="grain" aria-hidden />
      </body>
    </html>
  );
}
