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

// Inline script MUST be before any other <head> children so the browser applies
// data-theme before parsing global.css — eliminates FOUC / light-flash on load.
const themeInitScript = `(function(){try{var t=localStorage.getItem("theme");document.documentElement.setAttribute("data-theme",t==="light"?"light":"dark");}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Critical: apply theme BEFORE global.css is fetched/parsed */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className={poppins.variable}>
        <Preloader />
        <RainbowCursor />
        {children}
      </body>
    </html>
  );
}
