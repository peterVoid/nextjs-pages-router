import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import authMiddleware from "./middlewares/authMiddleware";

export function mainMiddleware(request: NextRequest) {
  const res = NextResponse.next();
  return res;
}

export default authMiddleware(mainMiddleware, ["/profile", "/admin"]);
