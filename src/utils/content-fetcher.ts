/**
 * Content Fetcher Utility for README History Items
 * Handles fetching README content from various sources
 */

export interface ContentFetchResult {
  content: string;
  success: boolean;
  error?: string;
  source: "direct" | "s3" | "api" | "fallback";
}

/**
 * Fetch README content from history item
 */
export async function fetchReadmeContent(
  historyItem: any
): Promise<ContentFetchResult> {
  console.log(
    "🔍 CONTENT FETCHER - Attempting to fetch content for:",
    historyItem.requestId
  );

  // Method 1: Check if content is directly available in the history item
  if (historyItem.readmeContent || historyItem.content) {
    console.log("✅ CONTENT FETCHER - Found direct content");
    return {
      content: historyItem.readmeContent || historyItem.content,
      success: true,
      source: "direct",
    };
  }

  // Method 2: Try to fetch from S3 URL if available
  if (historyItem.readmeS3Url && historyItem.status === "completed") {
    console.log(
      "🔍 CONTENT FETCHER - Attempting S3 fetch from:",
      historyItem.readmeS3Url
    );

    try {
      const response = await fetch(historyItem.readmeS3Url, {
        method: "GET",
        headers: {
          Accept: "text/markdown,text/plain,*/*",
          "Cache-Control": "no-cache",
        },
        // Add timeout
        signal: AbortSignal.timeout(20000), // 10 second timeout
      });

      if (response.ok) {
        const content = await response.text();
        if (content && content.trim().length > 0) {
          console.log("✅ CONTENT FETCHER - Successfully fetched from S3");
          return {
            content,
            success: true,
            source: "s3",
          };
        }
      }

      console.warn(
        "⚠️ CONTENT FETCHER - S3 response not OK or empty:",
        response.status
      );
    } catch (error) {
      console.error("❌ CONTENT FETCHER - S3 fetch failed:", error);
    }
  }

  // Method 3: Try to fetch via API proxy (if you have one)
  try {
    console.log(
      "🔍 CONTENT FETCHER - Attempting API fetch for:",
      historyItem.requestId
    );

    const response = await fetch(
      `/api/readme-content/${historyItem.requestId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      if (data.content) {
        console.log("✅ CONTENT FETCHER - Successfully fetched via API");
        return {
          content: data.content,
          success: true,
          source: "api",
        };
      }
    }
  } catch (error) {
    console.error("❌ CONTENT FETCHER - API fetch failed:", error);
  }

  // Method 4: Generate fallback content
  console.log("⚠️ CONTENT FETCHER - Using fallback content");
  const fallbackContent = generateFallbackContent(historyItem);

  return {
    content: fallbackContent,
    success: false,
    error: "README content not available - using fallback",
    source: "fallback",
  };
}

/**
 * Generate fallback README content when original is not available
 */
function generateFallbackContent(historyItem: any): string {
  const repoName = historyItem.repoName || "Unknown Repository";
  const repoUrl = historyItem.repoUrl || "#";
  const projectType = historyItem.projectType || "Unknown";
  const primaryLanguage = historyItem.primaryLanguage || "Unknown";
  const frameworks = historyItem.frameworks || [];

  return `# ${repoName}

> **Note**: This is a fallback README as the original generated content is not currently available.

## 📋 Project Information

- **Repository**: [${repoName}](${repoUrl})
- **Project Type**: ${projectType}
- **Primary Language**: ${primaryLanguage}
${frameworks.length > 0 ? `- **Frameworks**: ${frameworks.join(", ")}` : ""}
- **Generation Date**: ${new Date(historyItem.createdAt).toLocaleDateString()}
- **Status**: ${historyItem.status}

## 🔄 README Generation Status

The README for this repository was generated on ${new Date(
    historyItem.createdAt
  ).toLocaleDateString()}, but the content is currently not available for preview.

### Possible Reasons:
- The generated file may have been moved or deleted
- There might be temporary access issues
- The generation process may have encountered an error

### What You Can Do:
1. **Regenerate**: Create a new README for this repository
2. **Contact Support**: If this issue persists
3. **Check Repository**: Visit the original repository for manual README creation

---

*Generated by Smart ReadmeGen - Professional README Generation Platform*
`;
}

/**
 * Fetch content with retry logic
 */
export async function fetchReadmeContentWithRetry(
  historyItem: any,
  maxRetries: number = 3,
  retryDelay: number = 1000
): Promise<ContentFetchResult> {
  let lastError: string | undefined;

  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    console.log(`🔄 CONTENT FETCHER - Attempt ${attempt}/${maxRetries}`);

    const result = await fetchReadmeContent(historyItem);

    if (result.success) {
      return result;
    }

    lastError = result.error;

    if (attempt < maxRetries) {
      console.log(`⏳ CONTENT FETCHER - Retrying in ${retryDelay}ms...`);
      await new Promise((resolve) => setTimeout(resolve, retryDelay));
      retryDelay *= 2; // Exponential backoff
    }
  }

  // All retries failed, return fallback
  console.error("❌ CONTENT FETCHER - All retries failed");
  return {
    content: generateFallbackContent(historyItem),
    success: false,
    error: lastError || "Failed to fetch content after multiple attempts",
    source: "fallback",
  };
}

/**
 * Batch fetch content for multiple history items
 */
export async function batchFetchContent(
  historyItems: any[]
): Promise<Map<string, ContentFetchResult>> {
  const results = new Map<string, ContentFetchResult>();

  // Process in batches to avoid overwhelming the server
  const batchSize = 5;
  for (let i = 0; i < historyItems.length; i += batchSize) {
    const batch = historyItems.slice(i, i + batchSize);

    const batchPromises = batch.map(async (item) => {
      const result = await fetchReadmeContent(item);
      results.set(item.requestId, result);
      return result;
    });

    await Promise.all(batchPromises);

    // Small delay between batches
    if (i + batchSize < historyItems.length) {
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
  }

  return results;
}
