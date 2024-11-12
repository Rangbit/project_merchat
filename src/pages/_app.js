import Header from "@/component/layout/Header";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <div className="w-full h-full">
      <Header />
      <div className="w-full h-[100hv - 61px]">
        <Component {...pageProps} />
      </div>
    </div>
  );
}
