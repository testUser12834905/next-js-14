import { ApolloWrapper } from "@/lib/apolloWrapper";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark">
        <ApolloWrapper>{children}</ApolloWrapper>
      </body>
    </html>
  );
}
