import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (request: NextRequest) => {
  try {
    // Get the token from the request object
    const token = request.cookies.get("token")?.value || "";
    console.log(token);

    // Extract the data from token
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    // Return the user id from the decoded token
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
