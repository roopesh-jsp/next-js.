import { getUser } from "@/actions/auth.actions";
import NavLinks from "./NavLinks";

async function Navbar() {
  const data = await getUser();
  const user = {
    _id: data?._id,
    name: data?.name,
    email: data?.email,
  };
  console.log(user);

  return <NavLinks user={user} />;
}

export default Navbar;
