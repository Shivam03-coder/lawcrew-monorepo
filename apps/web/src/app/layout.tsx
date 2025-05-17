import { type Metadata } from "next";
import "@/styles/globals.css";
import { appfonts } from "@/fonts";
import AppProvider from "@/providers/app-providers";
import { TrpcProvider } from "@lawcrew/trpc-client/src/provider";

export const metadata: Metadata = {
  title: "1ST MEDIA LINK",
  description: "A LAW MANAGEMENT SOFTWARE",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <TrpcProvider>
      <html suppressHydrationWarning lang="en" className={appfonts}>
        <body>
          <AppProvider>{children}</AppProvider>
        </body>
      </html>
    </TrpcProvider>
  );
}
