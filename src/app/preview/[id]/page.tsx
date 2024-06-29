"use client";

import React, { useState, useEffect, useCallback, Suspense } from "react";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import ReadmePreview from "@/components/ReadmePreview";

interface PreviewData {
  id: string;
  content: string;
  metadata: {
    repoName: string;
    repoUrl: string;
    repoOwner: string;
    userId: string;
    repoId: string;
    createdAt: string;
    updatedAt: string;
    lastAccessedAt: string;
    projectType: string;
    primaryLanguage: string;
    techStack: string[];
    accuracyLevel: string;
    confidenceScore: number;
    qualityScore: string;
    processingTime: number;
    filesAnalyzedCount: number;
    readmeLength: number;
    readmeUrl: string;
    status: string;
    version: string;
    analysisMethod: string;
    generationMethod: string;
    analysisComplete: boolean;
    hallucinationPrevented: boolean;
    realContentAnalyzed: boolean;
    performanceMetrics: any;
    sourceFilesAnalyzed: string[];
    requestId: string;
    ttl: number;
  };
  stats: {
    characters: number;
    words: number;
    lines: number;
    headings: number;
  };
}

const PreviewPageContent = () => {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [previewData, setPreviewData] = useState<PreviewData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Extract preview ID and source
  const previewId = params.id as string;
  const source = searchParams.get("source") || "history";
  const userEmail = searchParams.get("user") || "";
  const s3Key = searchParams.get("s3Key"); // Keep this for backward compatibility
  const repoUrl = searchParams.get("repo");
  const fetchPreviewData = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      console.log("🔍 Preview page params:", {
        previewId,
        searchParams: Object.fromEntries(searchParams.entries()),
      });

      // Get metadata from URL params (passed from HistoryItemCard)
      const metadata = {
        repoName: searchParams.get("repoName") || "Repository",
        repoUrl: searchParams.get("repoUrl") || "#",
        repoOwner: searchParams.get("repoOwner") || searchParams.get("owner") || "Owner",
        userId: searchParams.get("userId") || userEmail,
        repoId: searchParams.get("repoId") || previewId,
        createdAt: searchParams.get("createdAt") || new Date().toISOString(),
        updatedAt: searchParams.get("updatedAt") || new Date().toISOString(),
        lastAccessedAt: searchParams.get("lastAccessedAt") || new Date().toISOString(),
        projectType: searchParams.get("projectType") || "software_project",
        primaryLanguage: searchParams.get("primaryLanguage") || "JavaScript",
        techStack: searchParams.get("techStack")?.split(",").filter(Boolean) || [],
        accuracyLevel: searchParams.get("accuracyLevel") || "excellent",
        confidenceScore: parseFloat(searchParams.get("confidenceScore") || "95"),
        qualityScore: searchParams.get("qualityScore") || "premium",
        processingTime: parseFloat(searchParams.get("processingTime") || "30"),
        filesAnalyzedCount: parseInt(searchParams.get("filesAnalyzedCount") || "8"),
        readmeLength: parseInt(searchParams.get("readmeLength") || "5000"),
        readmeUrl: searchParams.get("readmeUrl") || "",
        status: searchParams.get("status") || "completed",
        version: searchParams.get("version") || "v2.1_fixed_decimal",
        analysisMethod: searchParams.get("analysisMethod") || "code_aware_generation",
        generationMethod: searchParams.get("generationMethod") || "correct_unified_complete",
        analysisComplete: searchParams.get("analysisComplete") !== "false",
        hallucinationPrevented: searchParams.get("hallucinationPrevented") !== "false",
        realContentAnalyzed: searchParams.get("realContentAnalyzed") !== "false",
        performanceMetrics: JSON.parse(searchParams.get("performanceMetrics") || "{}"),
        sourceFilesAnalyzed: JSON.parse(searchParams.get("sourceFilesAnalyzed") || "[]"),
        requestId: searchParams.get("requestId") || "",
        ttl: parseInt(searchParams.get("ttl") || "0"),
      };

      // Get readmeS3Url from params
      const readmeS3Url = searchParams.get("readmeS3Url");

      let content = "";

      if (readmeS3Url) {
        console.log("🔍 Fetching content from S3 URL:", readmeS3Url);

        try {
          // Fetch content via proxy API
          const proxyResponse = await fetch(
            `/api/proxy-s3?url=${encodeURIComponent(readmeS3Url)}`
          );
          if (proxyResponse.ok) {
            const proxyData = await proxyResponse.json();
            content = proxyData.content;
            console.log("✅ Successfully fetched README content via proxy");
          } else {
            throw new Error(`Proxy API failed: ${proxyResponse.status}`);
          }
        } catch (proxyError) {
          console.error("❌ Error fetching content via proxy:", proxyError);
          // Generate fallback content
          content = `# ${metadata.repoName}

> **Note**: Original README content is not currently available.

## 📋 Project Information

- **Repository**: [${metadata.repoName}](${metadata.repoUrl})
- **Owner**: ${metadata.repoOwner}
- **Project Type**: ${metadata.projectType}
- **Primary Language**: ${metadata.primaryLanguage}
- **Tech Stack**: ${metadata.techStack.join(", ") || "Not specified"}
- **Generated**: ${new Date(metadata.createdAt).toLocaleDateString()}

## 📊 Quality Metrics

- **Accuracy Level**: ${metadata.accuracyLevel}
- **Confidence Score**: ${metadata.confidenceScore}%
- **Quality Score**: ${metadata.qualityScore}
- **Processing Time**: ${metadata.processingTime}s
- **Files Analyzed**: ${metadata.filesAnalyzedCount}
- **README Length**: ${metadata.readmeLength} characters

## 🔍 Analysis Details

- **Analysis Method**: ${metadata.analysisMethod}
- **Generation Method**: ${metadata.generationMethod}
- **Analysis Complete**: ${metadata.analysisComplete ? "✅ Yes" : "❌ No"}
- **Hallucination Prevented**: ${metadata.hallucinationPrevented ? "✅ Yes" : "❌ No"}
- **Real Content Analyzed**: ${metadata.realContentAnalyzed ? "✅ Yes" : "❌ No"}
- **Version**: ${metadata.version}

## 🔄 Content Status

The README for this repository was generated, but the content is currently not available for preview.

### What you can do:
1. **Regenerate**: Create a new README for this repository
2. **Visit Repository**: Check the original repository
3. **Contact Support**: If this issue persists

---

*Generated by Smart ReadmeGen*`;
        }
      } else {
        // No S3 URL available
        content = `# ${metadata.repoName}

> **Note**: README content URL not available.

## 📋 Project Information

- **Repository**: [${metadata.repoName}](${metadata.repoUrl})
- **Project Type**: ${metadata.projectType}
- **Primary Language**: ${metadata.primaryLanguage}

---

*Generated by Smart ReadmeGen*`;
      }

      const data: PreviewData = {
        id: previewId,
        content,
        metadata,
        stats: {
          characters: content.length,
          words: content.split(/\s+/).length,
          lines: content.split("\n").length,
          headings: (content.match(/^#+/gm) || []).length,
        },
      };

      setPreviewData(data);
    } catch (err) {
      console.error("Error fetching preview data:", err);
      setError(
        err instanceof Error ? err.message : "Failed to load README preview"
      );
    } finally {
      setLoading(false);
    }
  }, [previewId, searchParams, source, userEmail, s3Key, repoUrl]);

  useEffect(() => {
    console.log("🔍 Preview page mounted with params:", {
      previewId,
      source,
      userEmail,
      s3Key,
      repoUrl,
      searchParams: Object.fromEntries(searchParams.entries()),
    });
    fetchPreviewData();
  }, [fetchPreviewData]);

  const fetchFromS3 = async (s3Key: string): Promise<PreviewData> => {
    // First try CloudFront
    const cloudFrontUrl = `https://d3in1w40kamst9.cloudfront.net/${s3Key}`;

    try {
      console.log("🔍 Attempting to fetch from CloudFront:", cloudFrontUrl);
      const response = await fetch(cloudFrontUrl, {
        method: "GET",
        headers: {
          Accept: "text/markdown,text/plain,*/*",
          "Cache-Control": "no-cache",
        },
      });

      if (response.ok) {
        const content = await response.text();
        console.log("✅ Successfully fetched from CloudFront");

        return {
          id: previewId,
          content,
          metadata: {
            repoName: searchParams.get("name") || "Unknown Repository",
            repoUrl: repoUrl || "",
            owner: searchParams.get("owner") || "Unknown",
            generatedAt: new Date().toISOString(),
            projectType: searchParams.get("type") || "Unknown",
            primaryLanguage: searchParams.get("lang") || "Unknown",
            frameworks: searchParams.get("frameworks")?.split(",") || [],
            confidence: parseFloat(searchParams.get("confidence") || "0"),
            processingTime: parseFloat(searchParams.get("time") || "0"),
          },
          stats: {
            characters: 0,
            words: 0,
            lines: 0,
            headings: 0,
          },
        };
      } else {
        console.warn(
          `⚠️ CloudFront fetch failed: ${response.status} - ${response.statusText}`
        );
      }
    } catch (error) {
      console.warn("⚠️ CloudFront fetch error:", error);
    }

    // Fallback to mock data for demo purposes
    console.log("🔄 Falling back to mock data for demo");
    const mockResponse = await fetch("/api/mock-readme");
    const mockData = await mockResponse.json();

    return {
      id: previewId,
      content: mockData.content,
      metadata: {
        ...mockData.metadata,
        repoName: searchParams.get("name") || mockData.metadata.repoName,
        repoUrl: repoUrl || mockData.metadata.repoUrl,
        owner: searchParams.get("owner") || mockData.metadata.owner,
        projectType: searchParams.get("type") || mockData.metadata.projectType,
        primaryLanguage:
          searchParams.get("lang") || mockData.metadata.primaryLanguage,
        frameworks:
          searchParams.get("frameworks")?.split(",") ||
          mockData.metadata.frameworks,
        confidence: parseFloat(
          searchParams.get("confidence") || String(mockData.metadata.confidence)
        ),
        processingTime: parseFloat(
          searchParams.get("time") || String(mockData.metadata.processingTime)
        ),
      },
      stats: {
        characters: 0,
        words: 0,
        lines: 0,
        headings: 0,
      },
    };
  };

  const fetchFromHistory = async (id: string): Promise<PreviewData> => {
    try {
      console.log("🔍 Attempting to fetch from history API:", id);

      // First try the individual history item endpoint
      let response = await fetch(`/api/history/${id}`);

      if (!response.ok) {
        console.warn(
          `⚠️ Individual history API failed: ${response.status}, trying content endpoint`
        );

        // Try the readme content endpoint
        response = await fetch(`/api/readme-content/${id}`);

        if (response.ok) {
          const contentData = await response.json();
          console.log("✅ Successfully fetched from content API");

          return {
            id,
            content: contentData.content,
            metadata: {
              repoName: searchParams.get("repoName") || "Unknown Repository",
              repoUrl: searchParams.get("repoUrl") || "#",
              owner: searchParams.get("owner") || "Unknown",
              generatedAt: new Date().toISOString(),
              projectType: searchParams.get("projectType") || "Unknown",
              primaryLanguage: searchParams.get("primaryLanguage") || "Unknown",
              frameworks: searchParams.get("frameworks")?.split(",") || [],
              confidence: parseFloat(searchParams.get("confidence") || "0"),
              processingTime: parseFloat(
                searchParams.get("processingTime") || "0"
              ),
            },
            stats: {
              characters: contentData.content?.length || 0,
              words: contentData.content?.split(/\s+/).length || 0,
              lines: contentData.content?.split("\n").length || 0,
              headings: (contentData.content?.match(/^#+/gm) || []).length,
            },
          };
        }

        console.warn(`⚠️ Content API also failed: ${response.status}`);
        throw new Error("Failed to fetch from both history and content APIs");
      }

      const historyItem = await response.json();
      console.log("✅ Successfully fetched history item");

      // Try to fetch the actual README content if we have a URL
      let readmeContent = historyItem.content || historyItem.readmeContent;

      if (!readmeContent && historyItem.readmeUrl) {
        try {
          const contentResponse = await fetch(historyItem.readmeUrl);
          if (contentResponse.ok) {
            readmeContent = await contentResponse.text();
            console.log("✅ Successfully fetched README content from URL");
          }
        } catch (contentError) {
          console.warn(
            "⚠️ Error fetching README content from URL:",
            contentError
          );
        }
      }

      // If still no content, try the S3 URL via proxy
      if (!readmeContent && historyItem.readmeS3Url) {
        try {
          // Fix CloudFront URL if needed
          let s3Url = historyItem.readmeS3Url;
          if (s3Url.includes("d3in1w40kamst9.cloudfront.net")) {
            s3Url = s3Url.replace(
              "d3in1w40kamst9.cloudfront.net",
              "d2j9jbqms8047w.cloudfront.net"
            );
          }

          console.log("🔍 Fetching content via proxy from:", s3Url);
          const proxyResponse = await fetch(
            `/api/proxy-s3?url=${encodeURIComponent(s3Url)}`
          );
          if (proxyResponse.ok) {
            const proxyData = await proxyResponse.json();
            readmeContent = proxyData.content;
            console.log("✅ Successfully fetched README content via proxy");
          }
        } catch (proxyError) {
          console.warn(
            "⚠️ Error fetching README content via proxy:",
            proxyError
          );
        }
      }

      // If we still don't have content, generate a fallback
      if (!readmeContent) {
        console.log("⚠️ No content found, generating fallback");
        readmeContent = `# ${
          historyItem.repositoryName || historyItem.repoName || "README"
        }

> **Note**: Original README content is not currently available.

## 📋 Project Information

- **Repository**: [${historyItem.repositoryName || historyItem.repoName}](${
          historyItem.githubUrl || historyItem.repoUrl
        })
- **Status**: ${historyItem.status || "completed"}
- **Generated**: ${new Date(
          historyItem.generatedAt || historyItem.createdAt
        ).toLocaleDateString()}

## 🔄 Content Status

The README for this repository was generated, but the content is currently not available for preview.

### What you can do:
1. **Regenerate**: Create a new README for this repository
2. **Visit Repository**: Check the original repository
3. **Contact Support**: If this issue persists

---

*Generated by Smart ReadmeGen*`;
      }

      return {
        id,
        content: readmeContent,
        metadata: {
          repoName:
            historyItem.repositoryName ||
            historyItem.repoName ||
            "Unknown Repository",
          repoUrl: historyItem.githubUrl || historyItem.repoUrl || "#",
          owner: historyItem.repositoryOwner || historyItem.owner || "Unknown",
          generatedAt:
            historyItem.generatedAt ||
            historyItem.createdAt ||
            new Date().toISOString(),
          projectType: historyItem.projectType || "Unknown",
          primaryLanguage: historyItem.primaryLanguage || "Unknown",
          frameworks: historyItem.frameworks || [],
          confidence: historyItem.confidence || 0,
          processingTime: historyItem.processingTime || 0,
        },
        stats: {
          characters: readmeContent.length,
          words: readmeContent.split(/\s+/).length,
          lines: readmeContent.split("\n").length,
          headings: (readmeContent.match(/^#+/gm) || []).length,
        },
      };
    } catch (error) {
      console.warn("⚠️ History fetch failed, using mock data:", error);

      // Complete fallback to mock data
      const mockResponse = await fetch("/api/mock-readme");
      const mockData = await mockResponse.json();

      return {
        id,
        content: mockData.content,
        metadata: {
          ...mockData.metadata,
          repoName: searchParams.get("repoName") || mockData.metadata.repoName,
          repoUrl: searchParams.get("repoUrl") || mockData.metadata.repoUrl,
          owner: searchParams.get("owner") || mockData.metadata.owner,
        },
        stats: {
          characters: mockData.content.length,
          words: mockData.content.split(/\s+/).length,
          lines: mockData.content.split("\n").length,
          headings: (mockData.content.match(/^#+/gm) || []).length,
        },
      };
    }
  };

  const fetchFromParams = async (): Promise<PreviewData> => {
    // For demo purposes, fetch mock data
    if (previewId.includes("demo") || previewId.includes("example")) {
      const response = await fetch("/api/mock-readme");
      const mockData = await response.json();

      return {
        id: previewId,
        content: mockData.content,
        metadata: mockData.metadata,
        stats: {
          characters: 0,
          words: 0,
          lines: 0,
          headings: 0,
        },
      };
    }

    throw new Error("Invalid preview URL - missing required parameters");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Loading README Preview
          </h2>
          <p className="text-gray-600">Fetching content from our servers...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-pink-100 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="h-12 w-12 text-red-500 mx-auto mb-4">❌</div>
          <h2 className="text-xl font-semibold text-red-700 mb-2">
            Failed to Load Preview
          </h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => router.back()}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  if (!previewData) {
    return null;
  }

  return (
    <ReadmePreview
      content={previewData.content}
      metadata={previewData.metadata}
    />
  );
};

const PreviewPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      }
    >
      <PreviewPageContent />
    </Suspense>
  );
};

export default PreviewPage;
