// Dashboard types to match your updated DynamoDB structure

export interface ReadmeHistoryItem {
  // Primary identifiers
  userId: string;
  requestId: string;
  repoId: string;
  repoName: string;
  repoUrl: string;
  repoOwner: string;
  
  // Status and timing
  status: 'processing' | 'completed' | 'failed' | 'unknown';
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  processingTime?: number;
  
  // Project analysis
  projectType?: string;
  primaryLanguage?: string;
  frameworks?: string[];
  techStack?: string[];
  
  // Quality metrics
  confidence?: number;
  confidenceScore?: number;
  accuracyPercentage?: number;
  accuracyLevel?: string;
  qualityScore?: string;
  
  // README content
  readmeLength?: number;
  readmeS3Url?: string; // Keep for backward compatibility
  readmeUrl?: string; // New field name
  readmeContent?: string;
  readmePreview?: string;
  
  // Analysis details
  analysisMethod?: string;
  generationMethod?: string;
  filesAnalyzedCount?: number;
  sourceFilesAnalyzed?: string[];
  analysisComplete?: boolean;
  realContentAnalyzed?: boolean;
  hallucinationPrevented?: boolean;
  
  // System metadata
  version?: string;
  branchUsed?: string;
  pipelineVersion?: string;
  
  // Complex objects
  accuracyBreakdown?: any;
  performanceMetrics?: any;
  s3Location?: {
    bucket: string;
    key: string;
  };
  frameworkConfidence?: Record<string, number>;
  
  // Legacy and additional fields
  content?: string;
  error?: string;
  executionArn?: string;
  stage?: string;
  lastProgress?: string;
  generationTimestamp?: string;
  emailSent?: boolean;
  ttl?: number;
  lastAccessedAt?: string;
}

export interface DashboardStats {
  total: number;
  completed: number;
  processing: number;
  failed: number;
}

export interface HistoryHookReturn {
  history: ReadmeHistoryItem[];
  loading: boolean;
  error: string | null;
  stats: DashboardStats;
  createRecord: (repoUrl: string, executionArn?: string) => Promise<string>;
  updateRecord: (requestId: string, updates: Partial<ReadmeHistoryItem>) => Promise<ReadmeHistoryItem>;
  fetchHistory: () => Promise<ReadmeHistoryItem[]>;
  deleteRecord: (requestId: string) => Promise<boolean>;
  getStats: () => DashboardStats;
  isAuthenticated: () => boolean;
  getCurrentUserId: () => Promise<string>;
}
