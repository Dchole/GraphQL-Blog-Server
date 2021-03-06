import { verify } from "jsonwebtoken";

export function getUserId(request) {
  const Authorization = request.get("Authorization");
  if (Authorization) {
    const token = Authorization.replace("Bearer ", "");
    // @ts-ignore
    const { userId } = verify(token, process.env.JWT_SECRET);
    return userId;
  }

  throw new Error("Not Authenticated");
}
