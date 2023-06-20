import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VotON: Decentralized Voting Platform",
  description: "Vote in the TON blockchain using your EVM wallet",
  authors: [{ name: "Two and a Half Grams" }],
  keywords: [
    "VotON",
    "decentralized",
    "voting",
    "platform",
    "TON",
    "blockchain",
    "EVM",
    "wallet",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <html className="h-full" lang="en">
      <body className={`${inter.className} h-full flex flex-col`}>
        <div id="root" className="flex flex-col flex-1">
          <header className="pt-12">
            <nav className="flex items-start justify-center mb-24">
              <Link href="/" className="link mr-4">
                Home
              </Link>
              <Link href="/ecrecover-tool" className="link mr-4">
                ECRecover Tool
              </Link>
              <Link href="/deploy-contract" className="link mr-4">
                Deploy Contract
              </Link>
              <Link href="/ballots" className="link">
                Ballots Dashboard
              </Link>
            </nav>
          </header>
          <div className="flex flex-col flex-grow items-center">{children}</div>
          <footer className="mt-12 text-gray-600 text-sm text-center pb-12 flex-shrink-0">
            &copy; {currentYear} {metadata.authors[0].name}
          </footer>
        </div>
        <div id="modal-root"></div>
      </body>
    </html>
  );
}
