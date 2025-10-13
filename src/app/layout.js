import Header from "./components/Header";
import Footer from "./components/Footer";
import "./globals.css";

export const metadata = {
  icons: { icon: "/favicon/favicon.ico" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-black">
        <a href="#content" className="sr-only focus:not-sr-only focus:absolute focus:p-2">
          Skip to content
        </a>

        <Header />

        <main
          id="content"
          className="pt-16 md:pt-20"
          style={{ paddingTop: "calc(4rem + env(safe-area-inset-top, 0px))" }}
        >
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
