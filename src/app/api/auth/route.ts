import { getUsersFromServer, ID } from "@/lib/appwrite/server-config";
import { User } from "@/stores/userSlice";
import { NextRequest, NextResponse } from "next/server";
import { AppwriteException } from "node-appwrite";
//create account

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { email, name, password } = data;

  if (!email || !name || !password) {
    return NextResponse.json({
      error: "Enter valid data(Failed to give data).",
      status: 400,
    });
  }
  try {
    const userServer = getUsersFromServer();
    const user = await userServer.create(
      ID.unique(),
      email,
      undefined,
      password,
      name
    );
    return NextResponse.json(
      {
        message: "User created successfully",
        user: user as User,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    const appwriteError = error as AppwriteException;

    return NextResponse.json(
      {
        error: appwriteError.message,
      },
      { status: appwriteError.code }
    );
    // You could also check specific error codes
    if (appwriteError.code === 401) {
      // Handle unauthorized access
    } else if (appwriteError.code === 404) {
      // Handle resource not found
    }

    // Optionally pass the error to your app's state management
    // setError(error.message);
  }
}
