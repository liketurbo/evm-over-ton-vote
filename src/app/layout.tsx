import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VotON: Decentralized Voting Platform",
  description: "Vote in the TON blockchain using your EVM wallet",
  author: "Two and a Half Grams",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const currentYear = new Date().getFullYear();

  return (
    <html lang="en">
      <body
        className={`${inter.className} flex flex-col items-center justify-between min-h-screen`}
      >
        <header className="pt-12">
          <nav className="flex items-start justify-center mb-24">
            <a
              href="https://ecrecover-tool.com"
              className="link mr-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              ECRecover Tool
            </a>
            <a
              href="https://current-votings.com"
              className="link mr-4"
              target="_blank"
              rel="noopener noreferrer"
            >
              Currently Ongoing Votings
            </a>
            <a
              href="https://voting-contract-deploy-tool.com"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              Voting Contract Deploy Tool
            </a>
          </nav>
        </header>
        {children}
        <footer className="mt-12 text-gray-600 text-sm text-center pb-12">
          &copy; {currentYear} {metadata.author}
        </footer>
      </body>
    </html>
  );
}
