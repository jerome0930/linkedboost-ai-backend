import "./globals.css";

export const metadata = {
  title: "LinkedBoost AI",
  description: "LinkedBoost AI is a Chrome extension for creating and improving LinkedIn posts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
