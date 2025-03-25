import type { Metadata } from "next";
import {
  ColorSchemeScript,
  mantineHtmlProps,
  MantineProvider,
} from "@mantine/core";
import "./globals.css";

export const metadata: Metadata = {
  title: "Discord Colored Text Generator",
  description: "Discord Colored Text Generator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <head>
        <ColorSchemeScript defaultColorScheme="dark" />
      </head>
      <body className="antialiased">
        <MantineProvider>{children}</MantineProvider>
      </body>
    </html>
  );
}
