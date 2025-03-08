import jwt from "jsonwebtoken";
export async function checkToken(token: string | undefined) {
  try {
    if (!token) return null;
    const decodedToken = jwt.verify(token, "seceret");
    // console.log(decodedToken);

    return decodedToken;
  } catch (error) {
    console.log(error);
  }
}
