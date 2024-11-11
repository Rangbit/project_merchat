import Header from "@/component/layout/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="w-full h-[calc(100% - 61px)]"></div>
      <Component {...pageProps} />
    </div>
  );
}
