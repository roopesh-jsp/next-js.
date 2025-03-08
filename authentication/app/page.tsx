"use client";
import CilckButton from "@/compontents/CilckButton";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  async function handleLogout() {
    try {
      const res = await axios.get("http://localhost:3000/api/users/logout");
      console.log(res);

      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div>
      hai
      <button onClick={handleLogout}>logout</button>
    </div>
  );
}
