import { Sofia_Sans } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local"

const sofia_bold = localFont({
    src: '../../public/Font/SofiaProBold.ttf',
    display: 'swap',
    variable:'--sofia-bold'
  })


const inter = Sofia_Sans({ subsets: ["latin"] ,weight:'400'});

export const metadata = {
    title: "Sure Guide",
    description: "One Place Solution For All Your Query",
};

export default function RootLayout({ children })
{
    return (
        <html lang="en" className={`${sofia_bold.variable}`}>
            <body >{children}</body>
        </html>
    );
}
