import { Providers } from "@/src/components/Providers";
import "./globals.css";

export const metadata = {
  title: "OptiScale - A/B Testing Tool",
  description: "Advanced A/B testing platform for optimization",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
