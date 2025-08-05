import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Post from "@/models/post.models";
import connectDb from "@/utils/connectDb";
import Image from "next/image";

export default async function Home() {
  connectDb();
  const data = await Post.find();
  console.log(data);

  return (
    <div>
      <h1 className="text-center text-4xl font-extrabold uppercase mt-10">
        posts
      </h1>
      <div className=" max-w-[1200px] mx-auto my-10 flex gap-3">
        {data?.map((ele) => {
          return (
            <Card id={ele._id} className="max-w-sm">
              <CardHeader>
                <img src={ele.image} alt="image" className="w-full h-60" />
              </CardHeader>
              <CardContent>
                <h2 className="text-2xl font-bold capitalize">{ele.title}</h2>
                <p className="text-sm font-light">{ele.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
