/* eslint-disable @next/next/no-page-custom-font */
import { Raleway } from "next/font/google";
import "./globals.scss";

const raleway = Raleway({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="da">
      <head>
        <title>Wellcome Fitness & Spa</title>
        <meta name="description" content="Afsluttende eksamen MMD F24" />
        <link rel="stylesheet" href="https://use.typekit.net/owy3ilv.css"></link>
        {/* Fonte */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
        <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />
        <link
          rel="icon"
          type="image/svg+xml"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%22256%22 height=%22256%22 viewBox=%220 0 100 100%22><rect width=%22100%22 height=%22100%22 rx=%2220%22 fill=%22%23373837%22></rect><path fill=%22%23fff%22 d=%22M74.64 27.54L77.78 27.54L65.36 72.46L62.22 72.46L49.94 32.02L37.46 72.46L34.45 72.46L22.22 27.54L25.30 27.54L36.05 68.43L48.40 27.54L51.60 27.54L63.82 68.69L74.64 27.54Z%22></path></svg>"
        />
        {/* // Noindex, nofollow */}
        <meta name="robots" content="noindex, nofollow"></meta>
      </head>
      <body className={raleway.className}>{children}</body>
    </html>
  );
}
