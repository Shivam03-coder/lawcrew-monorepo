import { type Metadata } from "next";
import "@/styles/globals.css";
import { appfonts } from "@/fonts";
import AppProvider from "@/components/providers/app-providers";
import { TrpcProvider } from "@lawcrew/trpc-client/src/provider";
export const metadata: Metadata = {
  title: "1ST MEDIA LINK",
  description: "A PROJECT MANAGEMENT SOFTWARE",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={appfonts}>
      <body>
        <TrpcProvider>
          <AppProvider>{children}</AppProvider>
        </TrpcProvider>
      </body>
    </html>
  );
}
