import bcryptjs from "bcryptjs";
import connect from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    // Destructure the request body
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    // Find the user with email
    const user = await User.findOne({ email });

    // Check if user exists in the database
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log("User found");

    // Check if password is correct
    const valisPassword = bcryptjs.compare(password, user.password);

    // Return error if password is incorrect
    if (!valisPassword) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 401 }
      );
    }
    console.log("Password matched");

    // Create data object to be sent in token
    const tokenData = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    // Create token
    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: "1h",
    });

    // Create response object
    const response = NextResponse.json({
      success: true,
      message: "User logged in successfully.",
    });

    // Set token in cookies
    response.cookies.set("token", token, { httpOnly: true });

    // Send response
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
