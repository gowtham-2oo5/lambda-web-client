# 📚 SmartReadmeGen - Web Client

> Professional Next.js frontend for intelligent README generation

## 🚀 **What This Is**

A modern Next.js web application that provides an intuitive interface for **SmartReadmeGen** - an AI-powered README generation platform with enterprise-grade accuracy and reliability.

## ⚡ **Quick Start**

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Visit the application
open http://localhost:3000
```

## 🎯 **Key Features**

- **🤖 Advanced AI Analysis** - Enterprise-grade README generation
- **🔐 Cognito Authentication** - Secure user management
- **💾 DynamoDB Tracking** - Complete pipeline monitoring
- **📧 Email Notifications** - Professional HTML emails via SES
- **☁️ CloudFront CDN** - Fast, global README delivery
- **🎨 Advanced UI** - Beautiful, responsive design with Tailwind CSS

## 📱 **Available Pages**

- **`/`** - Landing page with project overview
- **`/generate`** - AI-powered README generation interface
- **`/dashboard`** - User dashboard with generation history
- **`/auth/login`** - User authentication
- **`/auth/signup`** - User registration

## 🏗️ **Architecture**

```
Next.js Frontend
    ↓
Cognito Authentication
    ↓
AWS SDK (Step Functions)
    ↓
SmartReadmeGen AI Platform
    ↓
DynamoDB + S3 + SES
    ↓
CloudFront CDN
```

## 🔧 **Environment Setup**

```bash
# Copy environment template
cp .env.example .env.local

# Configure AWS credentials
NEXT_PUBLIC_AWS_ACCESS_KEY_ID=your_access_key
NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY=your_secret_key
NEXT_PUBLIC_AWS_REGION=us-east-1

# Configure Cognito
COGNITO_USER_POOL_ID=us-east-1_AAAsvcGJ0
COGNITO_CLIENT_ID=37knpbcken8qob8acd8vg16l6g
```

## 📦 **Tech Stack**

- **Framework:** Next.js 15 with App Router
- **Styling:** Tailwind CSS + Radix UI
- **Authentication:** AWS Cognito
- **State Management:** React Hooks
- **Notifications:** Sonner Toast
- **AWS Integration:** AWS SDK v3
- **Icons:** Lucide React

## 🎨 **Components**

- **`READMEGeneratorComplete`** - Main README generation interface
- **`READMEHistoryDashboard`** - User generation history
- **`TechnicalArchitectureDiagram`** - System architecture visualization
- **`ServicesFlowDiagram`** - Service flow visualization

## 🔗 **API Integration**

The frontend integrates with:
- **AWS Step Functions** - Pipeline orchestration
- **AWS Lambda** - AI analysis and README generation
- **Amazon S3** - File storage
- **Amazon SES** - Email notifications
- **DynamoDB** - Pipeline tracking

## 🚀 **Deployment**

```bash
# Build for production
npm run build

# Deploy to Vercel
vercel --prod

# Or deploy to AWS Amplify
amplify publish
```

## 🚀 **Professional SaaS Platform**

This frontend provides access to an advanced README generation system:

- **High accuracy** in project analysis
- **Intelligent learning** capabilities
- **Multi-model AI consensus**
- **Enterprise-grade reliability**
- **Complete pipeline tracking**
- **Professional email notifications**

---

**Built with ❤️ for professional README generation**
