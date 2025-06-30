import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  let resolvedId: string | undefined;
  
  try {
    // Resolve params first and log immediately
    const resolvedParams = await params;
    resolvedId = resolvedParams.id;
    
    console.log("🔍 HISTORY ITEM API - Starting request");
    console.log("🔍 HISTORY ITEM API - Raw params:", resolvedParams);
    console.log("🔍 HISTORY ITEM API - Resolved ID:", resolvedId);
    console.log("🔍 HISTORY ITEM API - ID type:", typeof resolvedId);
    console.log("🔍 HISTORY ITEM API - ID length:", resolvedId?.length);

    if (!resolvedId || resolvedId.trim() === '') {
      console.error("❌ HISTORY ITEM API - Missing or empty ID parameter");
      return NextResponse.json(
        { 
          error: "Missing id parameter",
          received: resolvedId,
          type: typeof resolvedId
        },
        { status: 400 }
      );
    }

    // Clean and encode the ID
    const cleanId = resolvedId.trim();
    const encodedId = encodeURIComponent(cleanId);
    
    console.log("🔍 HISTORY ITEM API - Clean ID:", cleanId);
    console.log("🔍 HISTORY ITEM API - Encoded ID:", encodedId);

    const apiUrl = `https://ccki297o82.execute-api.us-east-1.amazonaws.com/prod/history-item/${encodedId}`;
    console.log("🔍 HISTORY ITEM API - Full API URL:", apiUrl);

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    console.log("🔍 HISTORY ITEM API - Response status:", response.status);
    console.log("🔍 HISTORY ITEM API - Response ok:", response.ok);
    console.log("🔍 HISTORY ITEM API - Response headers:", Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error("❌ HISTORY ITEM API - AWS API Error Details:");
      console.error("   Status:", response.status);
      console.error("   Status Text:", response.statusText);
      console.error("   Error Body:", errorText);
      
      return NextResponse.json(
        {
          error: `History item not found`,
          details: {
            id: cleanId,
            status: response.status,
            statusText: response.statusText,
            errorBody: errorText,
            apiUrl: apiUrl
          }
        },
        { status: response.status === 404 ? 404 : 500 }
      );
    }

    const data = await response.json();
    console.log("✅ HISTORY ITEM API - Raw response data:");
    console.log(JSON.stringify(data, null, 2));

    // Check if data is valid
    if (!data || (typeof data === 'object' && Object.keys(data).length === 0)) {
      console.error("❌ HISTORY ITEM API - Empty or invalid data received");
      return NextResponse.json(
        {
          error: "No data found for this history item",
          id: cleanId
        },
        { status: 404 }
      );
    }

    // Transform the data to match expected format with extensive logging
    console.log("🔄 HISTORY ITEM API - Transforming data...");
    
    const historyItem = {
      requestId: data.requestId || data.id || cleanId,
      repositoryName: data.repoName || data.repositoryName || data.repository_name,
      githubUrl: data.repoUrl || data.githubUrl || data.github_url || data.url,
      repositoryOwner: data.owner || data.repositoryOwner || data.repository_owner,
      generatedAt: data.createdAt || data.generatedAt || data.generated_at || data.timestamp,
      projectType: data.projectType || data.project_type,
      primaryLanguage: data.primaryLanguage || data.primary_language || data.language,
      frameworks: data.frameworks || data.framework || [],
      confidence: data.confidence || 0,
      processingTime: data.processingTime || data.processing_time || 0,
      readmeUrl: data.readmeS3Url || data.readmeUrl || data.readme_url || data.s3_url,
      status: data.status || "completed",
      content: data.readmeContent || data.content || data.readme_content,
      // Include raw data for debugging
      _rawData: data
    };

    console.log("✅ HISTORY ITEM API - Transformed data:");
    console.log(JSON.stringify(historyItem, null, 2));

    // Return the data with proper CORS headers
    return NextResponse.json(historyItem, {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
    
  } catch (error) {
    console.error("❌ HISTORY ITEM API - Unexpected error:");
    console.error("   Error type:", error?.constructor?.name);
    console.error("   Error message:", error instanceof Error ? error.message : String(error));
    console.error("   Error stack:", error instanceof Error ? error.stack : 'No stack trace');
    console.error("   Resolved ID:", resolvedId);
    
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : "Unknown error",
        id: resolvedId,
        errorType: error?.constructor?.name || 'Unknown'
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
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}
