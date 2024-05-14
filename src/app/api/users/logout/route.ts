import connect from "@/dbConfig/db";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
  try {
    // Create response
    const response = NextResponse.json({
      success: true,
      message: "Logged out successfully.",
    });

    // Remove token from cookies
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    // Send response
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
