import connect from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
  try {
    //
    const userId = await getDataFromToken(request);

    // Find the user data from database except password
    const user = await User.findById(userId).select("-password");

    // Return error if user not found
    if (!user) {
      throw new Error("User not found");
    }

    return NextResponse.json({
      success: true,
      message: "User fetched successfully",
      data: user,
    });
  } catch (error: any) {
    throw new Error(error.message);
  }
}
