import localFont from "next/font/local";
import "./globals.css";

// Load fonts from public/fonts directory
const geistSans = localFont({
  src: "/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata = {
  title: "Authentication App",
  description: "A simple authentication app with Next.js and FastAPI",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        style={{ fontFamily: "var(--font-geist-sans), Arial, sans-serif" }}
      >
        {children}
      </body>
    </html>
  );
}
