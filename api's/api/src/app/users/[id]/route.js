import { users } from "@/app/data/data";
// import { useRouter } from "next/router";

export async function GET(req, { params }) {
  const id = await params.id;
  const user = users.find((ele) => ele.id === parseInt(id));
  if (!user) {
    return new Response(
      JSON.stringify({
        msg: "no user found",
      })
    );
  }
  return new Response(JSON.stringify(user));
}
