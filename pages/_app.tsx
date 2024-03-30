import Footer from '@/components/Footer';
import '@/styles/globals.css';
import '@/styles/colors.css';
import '@/styles/common.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
}
