import "../styles/globals.css";

export const metadata = {
  title: "Cavo | Shoes Prime Mirror",
  description: "Cavo premium footwear catalog for images, details, and reviews with a separate admin workspace.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" dir="ltr" data-theme="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] antialiased">{children}</body>
    </html>
  );
}
