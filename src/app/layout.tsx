"use client";

import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ModalProvider } from "@/providers/ModalProvider";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <ModalProvider>
          <html lang="en">
            <body>{children}</body>
          </html>
      </ModalProvider>
    </ClerkProvider>
  );
}
