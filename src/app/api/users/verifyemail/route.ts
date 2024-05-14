import connect from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    // Get token from request body
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    // Find user from database by token
    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    // Return error if user not found
    if (!user) {
      return NextResponse.json(
        { message: "Invalid verify link." },
        { status: 400 }
      );
    }
    console.log(user);

    // Remove verifyToken and verifyTokenExpiry
    user.isVarified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    // Save user in the database
    await user.save();

    // Return response
    return NextResponse.json({
      success: true,
      message: "Email is verified successfully.",
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
