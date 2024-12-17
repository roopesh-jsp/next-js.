import { users } from "@/app/data/data.js";

export async function GET(req) {
  return new Response(JSON.stringify(users));
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
