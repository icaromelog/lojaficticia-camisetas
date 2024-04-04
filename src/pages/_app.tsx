import { Header } from '@/components/Header';
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <title>
        Logo Ipsum Camisetas
      </title>
      <Header></Header>
      <Component {...pageProps} />
    </>
  );
}
