import { Inter } from "next/font/google";
import "./globals.css";
import "./admin/admin.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Technoyogyai - Technology Blogger",
  description: "Share ideas, technologies and more by Yog Prakash Sah",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} font-sans antialiased bg-white text-gray-900`}
      >
        {children}
      </body>
    </html>
  );
}
