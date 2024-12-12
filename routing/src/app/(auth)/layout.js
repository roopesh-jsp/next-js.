import Link from "next/link";

export default function layout({ children }) {
  return (
    <div>
      <nav className="flex gap-10 bg-slate-400 my-10 p-5 text-yellow-400 text-xl font-bold">
        <Link href={"/login"}>login</Link>
        <Link href={"/register"}>register</Link>
        <Link href={"/reset"}>reset</Link>
      </nav>
      {children}
    </div>
  );
}
