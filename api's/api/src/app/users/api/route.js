import { users } from "@/app/data/data.js";
import { cookies, headers } from "next/headers";

export async function GET(req) {
  // const headersList = headers();
  // console.log((await headersList).get("User-Agent")); to read headers
  // (await cookies()).set("limit", 30); 

  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");
  const filteredUsers = query
    ? users.filter((user) => user.name.includes(query))
    : users;

  return new Response(JSON.stringify(filteredUsers));
}

export async function POST(req) {
  const body = await req.json();
  users.push(body.user);

  return new Response(
    JSON.stringify({
      msg: "sucess",
      user: body.user,
    }),
    {
      headers: {
        "Content-Type": "application/json",
      },
      status: 201,
    }
  );
}
