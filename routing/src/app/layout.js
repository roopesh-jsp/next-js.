import Link from "next/link";
import "./globals.css";
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className=" bg-slate-100 text-blue-400 p-5">
          <ul className="flex gap-10 list-none font-semibold text-xl">
            <Link href={"/"}>home</Link>
            <Link href={"/products"}>products</Link>
            <Link href={"/login"}>auth</Link>
            <Link href={"/about"}>about</Link>
          </ul>
        </nav>
        {children}
      </body>
    </html>
  );
}
