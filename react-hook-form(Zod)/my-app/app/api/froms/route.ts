// import { formValidation } from "../../page";
// import { NextResponse } from "next/server";

// export async function POST(request: Request) {
//   const body: unknown = await request.json();

//   // Validate the body using Zod's safeParse
//   console.log(body);

//   const result = formValidation.safeParse(body);

//   let zodErr: { [key: string]: string } = {};

//   if (!result.success) {
//     result.error.issues.forEach((issue) => {
//       zodErr = { ...zodErr, [issue.path[0]]: issue.message };
//     });

//     return NextResponse.json({ errors: zodErr }, { status: 400 });
//   }

//   return NextResponse.json({ success: true });
// }
