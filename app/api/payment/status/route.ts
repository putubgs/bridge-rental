import { NextResponse } from "next/server";
import { verifyHyperPayResource } from "@/lib/hyperpay-verify";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const resourcePath = new URL(request.url).searchParams.get("resourcePath");
  const result = await verifyHyperPayResource(resourcePath ?? "");
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: result.status });
  }
  return NextResponse.json(result.payment);
}
