import { NextRequest } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest): string => {
  try {
    const token = request.cookies.get("token")?.value || "";

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as JwtPayload;

    return typeof decodedToken === "object" && "id" in decodedToken
      ? (decodedToken.id as string)
      : "";
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Token verification failed";
    throw new Error(message);
  }
};
