"use client";

// Force dynamic rendering to avoid build-time AWS SDK issues
export const dynamic = "force-dynamic";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LogOut,
  User,
  RefreshCw,
  FileText,
  History,
  Monitor,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useHistory } from "@/hooks/useHistory";
import { useReadmeGenerator } from "@/hooks/useReadmeGenerator";
import { cognitoAuth, CognitoUser } from "@/lib/cognito";

// Import our modular components
import GeneratorForm from "@/components/dashboard/GeneratorForm";
import StatsCards from "@/components/dashboard/StatsCards";
import HistoryItemCard from "@/components/dashboard/HistoryItemCard";
// import DashboardDebug from "@/components/dashboard/DashboardDebug";

// Remove the duplicate interface definition since it's now in types/dashboard.ts

export default function DashboardPage() {
  const [user, setUser] = useState<CognitoUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const wasGeneratorLoading = useRef(false); // Move useRef to component level

  // Get user email for history hook - FIXED
  const userEmail = user?.email || "";

  // Get generator progress for active processing items
  const { progress: generatorProgress, loading: generatorLoading } =
    useReadmeGenerator();

  const {
    historyItems: history,
    loading: historyLoading,
    error: historyError,
    refetch: fetchHistory,
    deleteHistoryItem,
    copyToClipboard,
  } = useHistory(userEmail, generatorLoading); // Pass generatorLoading to control polling

  // Debug logging for history data
  useEffect(() => {
    console.log("🔍 DASHBOARD DEBUG - User email:", userEmail);
    console.log("🔍 DASHBOARD DEBUG - History loading:", historyLoading);
    console.log("🔍 DASHBOARD DEBUG - History error:", historyError);
    console.log("🔍 DASHBOARD DEBUG - History items:", history);
    console.log(
      "🔍 DASHBOARD DEBUG - History items length:",
      history?.length || 0
    );
  }, [userEmail, historyLoading, historyError, history]);

  // Check authentication and load user data
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!cognitoAuth.isAuthenticated()) {
          router.push("/auth/login");
          return;
        }

        const storedUser = cognitoAuth.getStoredUser();
        if (storedUser) {
          setUser(storedUser);
        } else {
          // Try to get fresh user data
          const userResult = await cognitoAuth.getCurrentUser();
          if (userResult.success && userResult.user) {
            setUser(userResult.user);
          } else {
            router.push("/auth/login");
            return;
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
        router.push("/auth/login");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  // Refresh history when generation completes
  useEffect(() => {
    if (generatorLoading) {
      wasGeneratorLoading.current = true;
    } else if (wasGeneratorLoading.current && !generatorLoading) {
      // Generation just completed
      console.log("🎉 DASHBOARD - Generation completed, refreshing history");
      setTimeout(() => {
        fetchHistory();
        toast.success("History updated with new README");
      }, 2000); // Wait 2 seconds for backend to process
      wasGeneratorLoading.current = false;
    }
  }, [generatorLoading, fetchHistory]);

  const handleSignOut = async () => {
    try {
      await cognitoAuth.signOut();
      toast.success("Signed out successfully");
      router.push("/auth/login");
    } catch (error) {
      console.error("Sign out error:", error);
      toast.error("Failed to sign out");
    }
  };

  const handleRefresh = () => {
    fetchHistory();
    toast.success("History refreshed");
  };

  // Debug function to test API directly
  const handleTestAPI = async () => {
    console.log("🧪 DASHBOARD - Testing API directly");
    try {
      const apiUrl = `/api/history?userId=${encodeURIComponent(userEmail)}`;
      console.log("🧪 DASHBOARD - API URL:", apiUrl);

      const response = await fetch(apiUrl);
      console.log("🧪 DASHBOARD - Response status:", response.status);

      if (response.ok) {
        const data = await response.json();
        console.log("🧪 DASHBOARD - Raw API response:", data);
        toast.success(
          `API test successful! Found ${data?.data?.history?.length || 0} items`
        );
      } else {
        const errorText = await response.text();
        console.error("🧪 DASHBOARD - API error:", errorText);
        toast.error("API test failed");
      }
    } catch (error) {
      console.error("🧪 DASHBOARD - Test error:", error);
      toast.error("API test error");
    }
  };

  // Use the hook functions directly - FIXED
  const handleCopy = copyToClipboard;
  const handleDelete = async (requestId: string) => {
    try {
      await deleteHistoryItem(requestId);
      toast.success("History item deleted");
    } catch {
      toast.error("Failed to delete history item");
    }
  };

  const handleGenerationComplete = () => {
    // Refresh history after generation
    setTimeout(() => fetchHistory(), 2000);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Smart ReadmeGen Dashboard
            </h1>
            <p className="text-gray-600 mt-2">
              Welcome back, {user?.name || user?.email || "User"}! Generate
              professional READMEs with AI.
            </p>
          </div>

          <div className="flex items-center space-x-4">
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <User className="w-3 h-3 mr-1" />
              {user?.email}
            </Badge>

            <Button
              variant="outline"
              onClick={handleRefresh}
              disabled={historyLoading}
              className="flex items-center space-x-2"
            >
              <RefreshCw
                className={`w-4 h-4 ${historyLoading ? "animate-spin" : ""}`}
              />
              <span>Refresh</span>
            </Button>

            <Button
              variant="outline"
              onClick={handleTestAPI}
              className="flex items-center space-x-2 bg-yellow-50 border-yellow-200 text-yellow-800 hover:bg-yellow-100"
            >
              <Monitor className="w-4 h-4" />
              <span>Test API</span>
            </Button>

            <Button
              variant="outline"
              onClick={handleSignOut}
              className="flex items-center space-x-2 text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>

        {/* Debug Info - TEMPORARY */}
        {/* {userEmail && <DashboardDebug userEmail={userEmail} />} */}

        {/* Stats Cards */}
        <StatsCards
          history={(history || []).map((item) => ({
            ...item,
            userId: item.userId ?? "",
            confidence:
              typeof item.confidence === "number"
                ? { projectType: item.confidence, language: item.confidence }
                : item.confidence,
          }))}
        />

        {/* Generator Form */}
        <div className="mb-8">
          <GeneratorForm onGenerationComplete={handleGenerationComplete} />
        </div>

        {/* History Section */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center space-x-2">
                  <History className="w-5 h-5" />
                  <span>Generation History</span>
                </CardTitle>
                <CardDescription>
                  Your recent README generations and their status
                </CardDescription>
              </div>

              <Badge variant="outline">
                {(history || []).length}{" "}
                {(history || []).length === 1 ? "item" : "items"}
              </Badge>
            </div>
          </CardHeader>

          <CardContent>
            {historyLoading && (!history || history.length === 0) ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                <p className="text-gray-600">
                  Loading your generation history...
                </p>
              </div>
            ) : historyError ? (
              <div className="text-center py-12">
                <div className="text-red-600 mb-4">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="font-medium">Failed to load history</p>
                  <p className="text-sm">{historyError}</p>
                </div>
                <Button onClick={handleRefresh} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : !history || history.length === 0 ? (
              <div className="text-center py-12">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No READMEs Generated Yet
                </h3>
                <p className="text-gray-600 mb-4">
                  Start by entering a GitHub repository URL above to generate
                  your first professional README.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {(history || []).map((item) => (
                  <HistoryItemCard
                    key={item.requestId}
                    item={item}
                    onCopy={handleCopy}
                    onDelete={handleDelete}
                    progress={
                      item.status === "processing" && generatorLoading
                        ? generatorProgress
                        : null
                    }
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
