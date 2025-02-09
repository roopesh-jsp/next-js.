import { users } from "@/app/data/data";
import { redirect } from "next/navigation";

// import { useRouter } from "next/router";

export async function GET(req, { params }) {
  // const body = await req.json();
  const id = (await params).id;
  const user = users.find((ele) => ele.id === parseInt(id));
  if (!user) {
    // return new Response(
    //   JSON.stringify({
    //     msg: "no user found",
    //   })
    // );
    redirect("/users/api");
  }
  return new Response(JSON.stringify(user));
}

export async function PATCH(req, { params }) {
  const body = await req.json();
  console.log(body);

  const idx = users.findIndex((ele) => ele.id === parseInt(params.id));

  users[idx].name = body.name;
  return Response.json({
    msg: "updated text",
    id: params.id,
  });
}

export async function DELETE(req, { params }) {
  const id = params.id;

  const idx = users.findIndex((ele) => ele.id === id);

  users.splice(idx, 1);
  console.log(users);

  return Response.json({
    msg: "deleted",
    id: id,
  });
}
