import { Poppins } from "next/font/google";
import RainbowCursor from "../components/RainbowCursor/RainbowCursor";
import Preloader from "../components/Preloader/Preloader";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-primary",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata = {
  title: "Akbar Riski | Full-Stack Developer",
  description:
    "I'm Akbar, a Full-Stack Developer with over 8 years of experience crafting end-to-end web solutions. From intuitive front-end interfaces to powerful back-end systems, I build scalable, efficient, and reliable web applications.",
  keywords: [
    "Full-Stack Developer",
    "Web Developer",
    "Front-End",
    "Back-End",
    "Portfolio",
  ],
  authors: [{ name: "Akbar Riski" }],
  openGraph: {
    title: "Akbar Riski | Full-Stack Developer",
    description:
      "Full-Stack Developer with over 8 years of experience crafting end-to-end web solutions.",
    type: "website",
  },
};

const themeInit = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t==="dark"?"dark":"light");}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body className={poppins.variable}>
        <Preloader />
        <RainbowCursor />
        {children}
      </body>
    </html>
  );
}
