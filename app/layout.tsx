import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import {
  ClerkProvider,
} from '@clerk/nextjs'
import { dark } from "@clerk/themes";
import { Provider } from "./Provider";



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
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: "#FF6D00",
          fontSize: "16px"

        },
      }}
    >
      <html lang="en">
        <body
          className={cn(
            "min-h-screen font-sans antialiased",
          )}
        >
          <Provider>
            {children}
          </Provider>

        </body>
      </html>
    </ClerkProvider>
  );
}
