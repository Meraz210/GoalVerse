import { NextRequest, NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    path?: string[];
  }>;
};

const allowedMethods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;

export async function GET(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function POST(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function PUT(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function PATCH(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

export async function DELETE(request: NextRequest, context: RouteContext) {
  return proxyRequest(request, context);
}

async function proxyRequest(request: NextRequest, context: RouteContext) {
  const serverUrl = process.env.SERVER_URL;

  if (!serverUrl) {
    return NextResponse.json(
      {
        error: "SERVER_URL is not configured",
        message:
          "Set SERVER_URL in .env.local to enable the GoalVerse server-side proxy.",
      },
      { status: 503 },
    );
  }

  if (!allowedMethods.includes(request.method as (typeof allowedMethods)[number])) {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const { path = [] } = await context.params;
  const upstreamUrl = new URL(path.join("/"), ensureTrailingSlash(serverUrl));
  upstreamUrl.search = request.nextUrl.search;

  const response = await fetch(upstreamUrl, {
    method: request.method,
    headers: buildProxyHeaders(request),
    body: request.method === "GET" ? undefined : await request.text(),
    cache: "no-store",
  });

  const contentType = response.headers.get("content-type") ?? "application/json";
  const body = await response.text();

  return new NextResponse(body, {
    status: response.status,
    headers: {
      "content-type": contentType,
    },
  });
}

function buildProxyHeaders(request: NextRequest) {
  const headers = new Headers();
  const contentType = request.headers.get("content-type");
  const authorization = request.headers.get("authorization");

  if (contentType) {
    headers.set("content-type", contentType);
  }

  if (authorization) {
    headers.set("authorization", authorization);
  }

  return headers;
}

function ensureTrailingSlash(url: string) {
  return url.endsWith("/") ? url : `${url}/`;
}
