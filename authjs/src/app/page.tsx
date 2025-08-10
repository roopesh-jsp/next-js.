import LoginButton from "@/components/auth/Login-button";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="container mx-auto my-2 flex flex-col items-center">
      <h1 className="text-3xl text-center font-extrabold my-10 ">Home</h1>
      <LoginButton mode="redirect">
        <Button
          variant={"default"}
          size="lg"
          className="capitalize hover:bg-stone-700 "
        >
          sign in
        </Button>
        <p>1:23:00</p>
      </LoginButton>
    </div>
  );
}
