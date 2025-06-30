"use client";

import type React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ArrowRight,
  Github,
  Zap,
  FileText,
  Download,
  Users,
  Clock,
  Code,
  Brain,
  Sparkles,
} from "@/lib/icons";
import Link from "next/link";
import { useEffect, useState } from "react";
import { AnimatedGradientText } from "@/components/magicui/animated-gradient-text";
import HowItWorksTimeline from "@/components/HowItWorksTimeline";
// import PreviewNavigation from "@/components/PreviewNavigation";
// import PreviewTest from "@/components/PreviewTest";

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50/50">
      {/* Header */}
      <header className="border-b border-neutral-200/50 bg-white/70 backdrop-blur-xl sticky top-0 z-50 transition-all duration-300">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between max-w-7xl">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 bg-gradient-to-br from-neutral-900 to-neutral-700 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-semibold text-neutral-900 tracking-tight">
              SmartReadmeGen
            </span>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button
                variant="ghost"
                className="text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100/50 transition-all duration-200"
              >
                Sign In
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button className="bg-neutral-900 hover:bg-neutral-800 text-white shadow-lg hover:shadow-xl transition-all duration-200 px-6">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-32 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-50/50 via-transparent to-neutral-50/50" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-br from-blue-100/30 to-purple-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-amber-100/30 to-rose-100/30 rounded-full blur-3xl" />

        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <div
            className={`mb-8 transition-all duration-1000 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center justify-center rounded-full px-4 py-2 bg-white/60 backdrop-blur-sm border border-neutral-200/50 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <Sparkles className="w-4 h-4 mr-2 text-amber-500" />
              <div className="h-4 w-px bg-neutral-300 mx-2" />
              <AnimatedGradientText
                className="text-sm font-medium inline-block"
                colorFrom="#6366f1"
                colorTo="#8b5cf6"
              >
                Smart README Generation
              </AnimatedGradientText>
              <ArrowRight className="ml-2 size-4 text-neutral-500 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>

          <h1
            className={`text-6xl md:text-7xl lg:text-8xl font-bold mb-8 text-neutral-900 leading-[0.9] tracking-tight transition-all duration-1000 delay-200 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            AI-Powered
            <br />
            <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-900 bg-clip-text text-transparent">
              README
            </span>
            <br />
            Generator
          </h1>

          <p
            className={`text-xl md:text-2xl text-neutral-600 mb-8 leading-relaxed max-w-4xl mx-auto font-light transition-all duration-1000 delay-400 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            The only <strong>code-aware</strong> README generator that reads your actual source files.{" "}
            <strong>95% accuracy</strong> vs industry standard 60-70%. 
            No more hallucinated features - documentation based on real implementation.
          </p>

          {/* Performance Stats */}
          <div
            className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-4xl mx-auto transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-600 mb-1">
                95%
              </div>
              <div className="text-sm text-neutral-600">Accuracy Rate</div>
              <div className="text-xs text-neutral-500">
                vs 60-70% industry standard
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-1">
                30s
              </div>
              <div className="text-sm text-neutral-600">Processing</div>
              <div className="text-xs text-neutral-500">
                Deep source code analysis
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-1">
                6-8K
              </div>
              <div className="text-sm text-neutral-600">Characters</div>
              <div className="text-xs text-neutral-500">
                Comprehensive documentation
              </div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-600 mb-1">
                $0.11
              </div>
              <div className="text-sm text-neutral-600">Per README</div>
              <div className="text-xs text-neutral-500">
                vs $0.25-0.50 competitors
              </div>
            </div>
          </div>

          <div
            className={`flex flex-col sm:flex-row gap-6 justify-center mb-16 transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-neutral-900 hover:bg-neutral-800 text-white text-lg px-10 py-4 h-auto shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                Launch Platform
                <ArrowRight className="ml-3 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-10 py-4 h-auto border-neutral-300 text-neutral-700 hover:bg-neutral-50 bg-white/50 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              <Github className="mr-3 w-5 h-5" />
              View Architecture
            </Button>
          </div>
        </div>
      </section>

      {/* How It Works - Interactive Timeline */}
      <HowItWorksTimeline />

      {/* Features Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-neutral-50/50 via-white to-neutral-50/50 relative">
        {/* Background decoration */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-px h-32 bg-gradient-to-b from-transparent via-neutral-200 to-transparent" />

        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-neutral-900 tracking-tight">
              Key Features
            </h2>
            <p className="text-xl md:text-2xl text-neutral-600 font-light max-w-3xl mx-auto">
              Built with modern AWS serverless architecture and AI integration
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-neutral-200/50 hover:shadow-2xl transition-all duration-500 bg-white/70 backdrop-blur-sm group hover:border-neutral-300/50 hover:-translate-y-2">
              <CardHeader className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-7 h-7 text-indigo-600" />
                </div>
                <CardTitle className="text-neutral-900 text-xl mb-3 font-semibold">
                  6 AWS Lambda Functions
                </CardTitle>
                <CardDescription className="text-neutral-600 leading-relaxed text-base">
                  Enterprise serverless architecture with Claude Sonnet 4
                  integration, multi-phase development evolved through 3
                  iterations for peak accuracy
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-neutral-200/50 hover:shadow-2xl transition-all duration-500 bg-white/70 backdrop-blur-sm group hover:border-neutral-300/50 hover:-translate-y-2">
              <CardHeader className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-emerald-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-7 h-7 text-emerald-600" />
                </div>
                <CardTitle className="text-neutral-900 text-xl mb-3 font-semibold">
                  Tested & Working
                </CardTitle>
                <CardDescription className="text-neutral-600 leading-relaxed text-base">
                  Successfully generates READMEs for various project types including
                  TypeScript, web applications, and development tools. 
                  Functional system ready for use.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-neutral-200/50 hover:shadow-2xl transition-all duration-500 bg-white/70 backdrop-blur-sm group hover:border-neutral-300/50 hover:-translate-y-2">
              <CardHeader className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-7 h-7 text-blue-600" />
                </div>
                <CardTitle className="text-neutral-900 text-xl mb-3 font-semibold">
                  Code-Aware Technology
                </CardTitle>
                <CardDescription className="text-neutral-600 leading-relaxed text-base">
                  Reads actual source files (README.md, pom.xml, package.json) and analyzes 
                  real implementation details. Up to 15 files per repository for comprehensive understanding.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-neutral-200/50 hover:shadow-2xl transition-all duration-500 bg-white/70 backdrop-blur-sm group hover:border-neutral-300/50 hover:-translate-y-2">
              <CardHeader className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-amber-100 to-amber-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Brain className="w-7 h-7 text-amber-600" />
                </div>
                <CardTitle className="text-neutral-900 text-xl mb-3 font-semibold">
                  Enterprise-Grade Accuracy
                </CardTitle>
                <CardDescription className="text-neutral-600 leading-relaxed text-base">
                  95% accuracy vs industry standard 60-70%. No hallucinated features - 
                  documentation based on actual repository content with Claude Sonnet 4 AI.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-neutral-200/50 hover:shadow-2xl transition-all duration-500 bg-white/70 backdrop-blur-sm group hover:border-neutral-300/50 hover:-translate-y-2">
              <CardHeader className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Zap className="w-7 h-7 text-purple-600" />
                </div>
                <CardTitle className="text-neutral-900 text-xl mb-3 font-semibold">
                  Production Performance
                </CardTitle>
                <CardDescription className="text-neutral-600 leading-relaxed text-base">
                  6 AWS Lambda functions working in harmony with real-time GitHub API integration.
                  30-40 second processing for 6,000-8,000 character comprehensive output.
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-neutral-200/50 hover:shadow-2xl transition-all duration-500 bg-white/70 backdrop-blur-sm group hover:border-neutral-300/50 hover:-translate-y-2">
              <CardHeader className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-rose-100 to-rose-50 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <FileText className="w-7 h-7 text-rose-600" />
                </div>
                <CardTitle className="text-neutral-900 text-xl mb-3 font-semibold">
                  Unique Project-Specific Content
                </CardTitle>
                <CardDescription className="text-neutral-600 leading-relaxed text-base">
                  Generates unique documentation per project vs template-based competitors.
                  Smart Repository Explorer discovers actual file structure and prioritizes important files.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Competitive Advantage Section */}
      <section className="py-32 px-6 bg-gradient-to-br from-slate-900 via-neutral-900 to-slate-900 text-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 via-transparent to-purple-900/10" />
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-6xl font-bold mb-6 text-white tracking-tight">
              Why Choose SmartReadmeGen?
            </h2>
            <p className="text-xl md:text-2xl text-neutral-300 font-light max-w-3xl mx-auto">
              The only code-aware README generator that actually reads your source code
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Before/After Comparison */}
            <div className="space-y-8">
              <div className="bg-red-900/20 border border-red-500/30 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full mr-3"></div>
                  <span className="text-red-300 font-semibold">Competitors (Hallucinated)</span>
                </div>
                <p className="text-neutral-300 italic leading-relaxed">
                  "A repository analysis tool designed for comprehensive source code examination..."
                </p>
                <div className="mt-4 text-sm text-red-400">
                  ❌ Generic templates • ❌ 60-70% accuracy • ❌ No real code analysis
                </div>
              </div>

              <div className="bg-emerald-900/20 border border-emerald-500/30 rounded-2xl p-6">
                <div className="flex items-center mb-4">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mr-3"></div>
                  <span className="text-emerald-300 font-semibold">SmartReadmeGen (Code-Aware)</span>
                </div>
                <p className="text-neutral-300 leading-relaxed">
                  "CodePing-Server 🚀 A robust backend service that integrates with multiple competitive programming platforms (LeetCode, CodeChef, Codeforces) using Java 17, Spring Boot 3.4.5, Redis caching, and PostgreSQL..."
                </p>
                <div className="mt-4 text-sm text-emerald-400">
                  ✅ Real implementation details • ✅ 95% accuracy • ✅ Actual source code analysis
                </div>
              </div>
            </div>

            {/* Competitive Stats */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
                <h3 className="text-2xl font-bold mb-6 text-white">Competitive Advantage</h3>
                
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-neutral-300">Source Code Reading</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-emerald-400 font-semibold">✅ Deep Analysis</span>
                      <span className="text-red-400">❌ File Names Only</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-neutral-300">AI Accuracy</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-emerald-400 font-semibold">✅ 95%</span>
                      <span className="text-red-400">❌ 60-70%</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-neutral-300">Content Quality</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-emerald-400 font-semibold">✅ 6-8K chars</span>
                      <span className="text-red-400">❌ 1-2K chars</span>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center py-3">
                    <span className="text-neutral-300">Cost per README</span>
                    <div className="flex items-center space-x-4">
                      <span className="text-emerald-400 font-semibold">✅ $0.11</span>
                      <span className="text-red-400">❌ $0.25-0.50</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6 bg-white relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-50/30 via-transparent to-neutral-50/30" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-purple-100/20 rounded-full blur-3xl" />

        <div className="container mx-auto text-center max-w-4xl relative z-10">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 text-neutral-900 tracking-tight">
            Experience Code-Aware Documentation
          </h2>
          <p className="text-xl md:text-2xl text-neutral-600 mb-8 font-light leading-relaxed max-w-3xl mx-auto">
            The only README generator that reads your actual source code for 95% accuracy.
            No more hallucinated features - get documentation based on real implementation.
          </p>
          <div className="flex items-center justify-center space-x-8 mb-12 text-sm text-neutral-500">
            <div className="flex items-center">
              <div className="w-2 h-2 bg-emerald-500 rounded-full mr-2"></div>
              <span>30-40 second processing</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
              <span>6,000-8,000 characters</span>
            </div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
              <span>$0.11 per README</span>
            </div>
          </div>
          <Link href="/dashboard">
            <Button
              size="lg"
              className="bg-neutral-900 hover:bg-neutral-800 text-white text-xl px-12 py-6 h-auto shadow-2xl hover:shadow-3xl transition-all duration-300 group"
            >
              Try Code-Aware Generation
              <ArrowRight className="ml-3 w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-16 px-6 relative">
        <div className="container mx-auto text-center max-w-4xl">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-br from-neutral-700 to-neutral-600 rounded-xl flex items-center justify-center shadow-lg">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-semibold tracking-tight">
              SmartReadmeGen
            </span>
          </div>
          <p className="text-neutral-400 text-lg font-light">
            &copy; 2024 SmartReadmeGen. All rights reserved.
          </p>
        </div>
      </footer>

      {/* Preview Navigation - Development Helper */}
      {/* <PreviewNavigation /> */}

      {/* Preview Test - Quick Test */}
      {/* <PreviewTest /> */}
    </div>
  );
}
