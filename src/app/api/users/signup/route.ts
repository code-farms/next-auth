import connect from "@/dbConfig/db";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helpers/mailer";

connect();

export async function POST(request: NextRequest) {
  try {
    // Get data from request body
    const reqBody = await request.json();
    const { username, email, password } = reqBody;
    console.log(reqBody);

    // Check if user exists
    const user = await User.findOne({ email });

    // If user exists return error
    if (user) {
      return NextResponse.json(
        { error: "User already exists." },
        { status: 400 }
      );
    }

    // Create salt to hash password
    const salt = await bcryptjs.genSalt(10);

    // Hashed password
    const hashedPassword = await bcryptjs.hash(password, salt);

    // Create new user with requested data
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save new user to database
    const savedUser = await newUser.save();

    console.log(savedUser);

    // Verify user
    await sendEmail({ email, emailType: "VERIFY", userId: savedUser._id });

    // Return response with success message and saved user data
    return NextResponse.json({
      success: true,
      message: "User created successfully.",
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
