import type { Metadata } from "next";
import './globals.css';
import { cn } from "@/lib/utils";



export const metadata: Metadata = {
  title: "Cowrite",
  description: "Writing is better together",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
          className={cn(
            "min-h-screen font-sans antialiased",
          )}
        >
        {children}
      </body>
    </html>
  );
}
