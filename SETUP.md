# 🛠️ SmartReadmeGen - Setup Guide

This guide will help you set up the SmartReadmeGen web client for development or deployment.

## 📋 **Prerequisites**

- **Node.js** 18+ and npm
- **AWS Account** with appropriate permissions
- **AWS CLI** configured with your credentials

## 🚀 **Quick Setup**

### 1. **Clone and Install**

```bash
git clone <repository-url>
cd web-client
npm install
```

### 2. **Environment Configuration**

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit with your AWS credentials
nano .env.local  # or use your preferred editor
```

### 3. **Required AWS Resources**

Ensure you have the following AWS resources set up:

- **Cognito User Pool** for authentication
- **Step Functions** workflow for README generation
- **Lambda Functions** for processing
- **S3 Bucket** for storage
- **CloudFront Distribution** for CDN
- **DynamoDB Table** for history

### 4. **Environment Variables**

Update `.env.local` with your actual values:

```bash
# Core AWS Configuration
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_actual_access_key
AWS_SECRET_ACCESS_KEY=your_actual_secret_key

# Step Functions
PHASE3_WORKFLOW_ARN=arn:aws:states:us-east-1:YOUR_ACCOUNT:stateMachine:complete-readme-generator-workflow

# Cognito
COGNITO_USER_POOL_ID=us-east-1_YourActualPoolId
COGNITO_CLIENT_ID=your_actual_client_id

# S3 & CloudFront
PHASE3_S3_BUCKET=your-s3-bucket-name
NEXT_PUBLIC_CLOUDFRONT_URL=https://your-cloudfront-domain.cloudfront.net
```

### 5. **Start Development**

```bash
# Start the development server
npm run dev

# Open in browser
open http://localhost:3000
```

## 🔧 **Development Commands**

```bash
# Development
npm run dev          # Start dev server with hot reload
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Testing
npm run build        # Test production build
```

## 🚀 **Deployment Options**

### **Option 1: Vercel (Recommended)**

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

### **Option 2: AWS Amplify**

1. Connect your GitHub repository to AWS Amplify
2. Set build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Add environment variables in Amplify console

### **Option 3: Docker**

```bash
# Build Docker image
docker build -t smartreadmegen-web .

# Run container
docker run -p 3000:3000 --env-file .env.local smartreadmegen-web
```

## 🔐 **Security Checklist**

- [ ] Never commit `.env.local` to version control
- [ ] Use IAM roles with minimal required permissions
- [ ] Enable CORS only for your domain in production
- [ ] Use HTTPS in production
- [ ] Regularly rotate AWS access keys

## 🐛 **Troubleshooting**

### **Common Issues**

1. **Build fails with AWS SDK errors**
   - Ensure all environment variables are set
   - Check AWS credentials are valid

2. **Authentication not working**
   - Verify Cognito User Pool ID and Client ID
   - Check Cognito configuration in AWS console

3. **README generation fails**
   - Verify Step Functions ARN is correct
   - Check Lambda function permissions

### **Debug Mode**

Enable debug mode in `.env.local`:

```bash
DEBUG=true
VERBOSE_LOGGING=true
```

## 📞 **Support**

If you encounter issues:

1. Check the [README.md](./README.md) for detailed documentation
2. Review AWS CloudWatch logs for backend issues
3. Check browser console for frontend errors
4. Ensure all AWS resources are properly configured

## 🎯 **Next Steps**

After setup:

1. Test the authentication flow
2. Try generating a README with a sample repository
3. Check the dashboard and history functionality
4. Review monitoring and logs in AWS console

---

**Happy coding! 🚀**
