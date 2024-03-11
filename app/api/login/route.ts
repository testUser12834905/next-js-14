import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export type UserType = {
  username: string;
  password: string;
};

const mockUserDatabase: UserType[] = [
  { username: "John", password: "123" },
  { username: "Jane", password: "456" },
  { username: "Bob", password: "123" },
];

export async function POST(req: NextRequest) {
  const body: UserType = await req.json();

  const user = mockUserDatabase.find(
    (user) =>
      user.username === body.username && user.password === body.password,
  );

  if (!user) {
    return new Response("Not Found", { status: 404 });
  }

  const cookieStore = cookies();
  cookieStore.set("isLoggedIn", "true", { maxAge: 5 * 60 });

  return new Response("OK", { status: 200 });
}

export async function GET(req: NextRequest) {
  return NextResponse.json({ something: "else" });
}
