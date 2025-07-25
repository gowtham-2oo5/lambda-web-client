import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "Missing userId parameter" },
        { status: 400 }
      );
    }

    console.log("🔍 PROXY API - Fetching history for user:", userId);

    // Use query parameter instead of path parameter
    const encodedUserId = encodeURIComponent(userId);
    const apiUrl = `${config.api.baseUrl}/history?userId=${encodedUserId}`;

    console.log("🔍 PROXY API - Calling:", apiUrl);
    console.log("🔍 PROXY API - Original userId:", userId);
    console.log("🔍 PROXY API - Encoded userId:", encodedUserId);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ PROXY API - AWS API Error:", errorText);
      return NextResponse.json(
        { error: `AWS API Error: ${response.status}`, details: errorText },
        { status: response.status }
      );
    }

    const data = await response.json();
    console.log(
      "✅ PROXY API - Success, fetched data:",
      JSON.stringify(data, null, 2)
    );
    
    // Handle the correct API response structure
    const historyItems = data?.data?.records || [];
    console.log(
      "✅ PROXY API - Success, history items:",
      historyItems.length
    );

    // Return the data with proper CORS headers
    return NextResponse.json(data, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  } catch (error) {
    console.error("❌ PROXY API - Error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
