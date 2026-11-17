import "./globals.css";

export const metadata = {
  title: "Sabbir Ahmed — Frontend Developer & UI Engineer | SabbirOS",
  description:
    "Interactive portfolio inspired by modern desktop & mobile operating systems, featuring draggable windows, real-time widgets, and an interactive developer terminal.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased overflow-x-hidden">
      <body className="min-h-full h-full flex flex-col font-sans overflow-x-hidden max-w-[100vw]">
        {children}
      </body>
    </html>
  );
}
