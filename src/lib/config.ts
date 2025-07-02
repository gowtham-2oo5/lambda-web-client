// SECURE: Centralized configuration using environment variables

export const config = {
  // AWS Configuration
  aws: {
    region: process.env.NEXT_PUBLIC_AWS_REGION || process.env.NEXT_PUBLIC_COGNITO_REGION || process.env.AWS_REGION || process.env.COGNITO_REGION || "us-east-1",
  },

  // Cognito Configuration
  cognito: {
    region: process.env.NEXT_PUBLIC_COGNITO_REGION || process.env.NEXT_PUBLIC_AWS_REGION || process.env.COGNITO_REGION || process.env.AWS_REGION || "us-east-1",
    userPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID || process.env.COGNITO_USER_POOL_ID!,
    clientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID || process.env.COGNITO_CLIENT_ID!,
    userPoolName: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_NAME || process.env.COGNITO_USER_POOL_NAME || "readme-generator-users",
    clientName: process.env.NEXT_PUBLIC_COGNITO_CLIENT_NAME || process.env.COGNITO_CLIENT_NAME || "readme-generator-web-client",
  },

  // API Configuration
  api: {
    baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL || process.env.API_BASE_URL || "https://ccki297o82.execute-api.us-east-1.amazonaws.com/prod",
  },

  // CloudFront Configuration
  cloudfront: {
    url: process.env.NEXT_PUBLIC_CLOUDFRONT_URL || process.env.CLOUDFRONT_URL || "https://d3in1w40kamst9.cloudfront.net",
  },

  // Application Configuration
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME || process.env.APP_NAME || "SmartReadmeGen",
    version: process.env.NEXT_PUBLIC_APP_VERSION || process.env.APP_VERSION || "v2.1_fixed_decimal",
    pipelineVersion: process.env.NEXT_PUBLIC_PIPELINE_VERSION || process.env.PIPELINE_VERSION || "ultimate_enterprise_v1.0",
  },

  // Demo/Fallback Configuration
  demo: {
    email: process.env.NEXT_PUBLIC_DEMO_EMAIL || process.env.DEMO_EMAIL || "demo@smartreadmegen.com",
  },

  // Environment
  env: {
    isDevelopment: process.env.NODE_ENV === "development",
    isProduction: process.env.NODE_ENV === "production",
  },
};

// Validation function to ensure required environment variables are set
export function validateConfig() {
  // Skip validation during build time
  if (typeof window === 'undefined') {
    return;
  }

  const requiredVars = [
    { key: "COGNITO_USER_POOL_ID", value: config.cognito.userPoolId },
    { key: "COGNITO_CLIENT_ID", value: config.cognito.clientId },
  ];

  const missingVars = requiredVars.filter(({ value }) => !value);

  if (missingVars.length > 0) {
    const missingKeys = missingVars.map(({ key }) => key).join(", ");
    throw new Error(
      `Missing required environment variables: ${missingKeys}. Please check your .env.local file.`
    );
  }
}

// Helper function to get CloudFront URL for S3 keys
export function getCloudFrontUrl(s3Key: string): string {
  if (!s3Key) return "";
  return `${config.cloudfront.url}/${s3Key}`;
}

// Helper function to fix incorrect CloudFront URLs
export function fixCloudFrontUrl(url: string): string {
  if (!url) return "";
  
  // Replace any incorrect CloudFront URLs with the correct one
  const incorrectUrls = [
    "d2j9jbqms8047w.cloudfront.net",
    // Add other incorrect URLs here if needed
  ];

  let fixedUrl = url;
  incorrectUrls.forEach(incorrectUrl => {
    if (fixedUrl.includes(incorrectUrl)) {
      fixedUrl = fixedUrl.replace(
        incorrectUrl,
        config.cloudfront.url.replace("https://", "")
      );
    }
  });

  return fixedUrl;
}

export default config;
