import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "ToDoApp with Prisma ",
  description: "code example to lean NextJS 15 and Prisma",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
