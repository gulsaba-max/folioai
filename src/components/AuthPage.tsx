/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Mail, Lock, CheckCircle2, AlertCircle, Smartphone, ArrowLeft, Loader2 } from "lucide-react";
import { Logo } from "./Logo";
import { useToast } from "./Toast";

interface AuthPageProps {
  onSuccess: (user: any) => void;
}

interface GoogleUser {
  id: string;
  email: string;
  name: string;
  picture?: string;
  provider: string;
}

declare global {
  interface Window {
    google?: any;
  }
}

export default function AuthPage({ onSuccess }: AuthPageProps) {
  const { toast } = useToast();
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // MFA flags
  const [mfaRequired, setMfaRequired] = useState(false);
  const [mfaCode, setmfaCode] = useState("");
  const [pendingUserId, setPendingUserId] = useState("");
  
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  
  // Google OAuth states
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);
  const [googleSuccess, setGoogleSuccess] = useState<string | null>(null);
  const [googleSDKLoaded, setGoogleSDKLoaded] = useState(false);

  const resetFields = () => {
    setError(null);
    setSuccess(null);
    setGoogleError(null);
    setGoogleSuccess(null);
  };

  const loadGoogleSDK = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (googleSDKLoaded || (window as any).google?.accounts?.oauth2) {
        setGoogleSDKLoaded(true);
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.src = 'https://accounts.google.com/gsi/client';
      script.async = true;
      script.defer = true;
      script.onload = () => {
        setGoogleSDKLoaded(true);
        resolve();
      };
      script.onerror = () => reject(new Error("Failed to load Google SDK. Please check your internet connection and try again."));
      document.head.appendChild(script);
    });
  };

  const handleGoogleError = (message: string) => {
    setGoogleError(message);
    setGoogleLoading(false);
    setGoogleSuccess(null);
  };

  const handleGoogleSignIn = async () => {
    resetFields();
    setGoogleLoading(true);
    setGoogleError(null);
    
    try {
      await loadGoogleSDK();
      
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      if (!clientId || clientId === "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com") {
        throw new Error("Google OAuth is not configured. Please add VITE_GOOGLE_CLIENT_ID to your .env file.");
      }
      
      // Initialize Google token client
      const tokenClient = (window as any).google.accounts.oauth2.initTokenClient({
        client_id: clientId,
        scope: 'openid profile email',
        callback: async (response: any) => {
          if (response.error) {
            if (response.error === "popup_closed_by_user") {
              handleGoogleError("Sign in was cancelled. Please try again.");
            } else if (response.error === "access_denied") {
              handleGoogleError("Access was denied. Please grant permission to continue.");
            } else {
              handleGoogleError("Google authentication failed: " + (response.error_description || response.error));
            }
            return;
          }
          
          try {
            // Send access token to backend for verification
            const backendResponse = await fetch("/api/auth/google", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ accessToken: response.access_token })
            });
            
            const data = await backendResponse.json();
            if (!backendResponse.ok) {
              throw new Error(data.error || "Google authentication failed");
            }
            
            setGoogleLoading(false);
            setGoogleSuccess(data.message || "Welcome to FolioAI!");
            setTimeout(() => onSuccess(data.user), 600);
          } catch (err: any) {
            handleGoogleError(err.message || "Authentication failed. Please try again.");
          }
        },
      });
      
      // Request access token
      tokenClient.requestAccessToken();
    } catch (err: any) {
      handleGoogleError(err.message || "Failed to initialize Google sign-in. Please try again.");
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFields();
    if (!email || !password) {
      setError("Please fill in both email and password fields.");
      return;
    }

    setLoading(true);
    const endpoint = isRegistering ? "/api/auth/register" : "/api/auth/login";

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      if (data.mfaRequired) {
        setMfaRequired(true);
        setPendingUserId(data.userId);
        setSuccess("MFA authentication challenge triggered!");
        setLoading(false);
        return;
      }

      setSuccess(isRegistering ? "Registration successful! You may now sign in." : "Logged in successfully!");
      if (isRegistering) {
        setIsRegistering(false);
      } else {
        setTimeout(() => onSuccess(data.user), 600);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleMfaVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    resetFields();
    if (mfaCode.length !== 6) {
      setError("Authenticator verification code must be exactly 6 digits.");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("/api/auth/mfa-verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: pendingUserId, code: mfaCode })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "MFA validation failed");
      }

      setSuccess("Multi-factor authentication verified!");
      setTimeout(() => onSuccess(data.user), 800);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="auth-container" className="flex min-h-[calc(100vh-72px)] w-full font-sans bg-bg-base">
      
      {/* Left Pane - Clean Branding */}
      <div className="hidden lg:flex w-1/2 bg-gray-50 relative overflow-hidden flex-col items-center justify-center border-r border-border-subtle p-12 text-center">
         <div className="relative w-full max-w-md mb-8">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border border-border-subtle shadow-sm mx-auto mb-8">
                <Logo variant="minimal" className="w-12 h-12" />
              </div>
            <h1 className="text-4xl font-bold tracking-tight mb-4 text-text-main">Welcome to FolioAI</h1>
            <p className="text-text-muted text-lg max-w-sm mx-auto leading-relaxed">
              Transform your resume into a stunning portfolio. Join the platform designed for modern professionals.
            </p>
        </div>
      </div>

      {/* Right Pane - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative bg-white">
         <div className="w-full max-w-sm relative z-10">
          
          <div className="flex lg:hidden flex-col items-center mb-8">
            <Logo variant="minimal" className="w-12 h-12 mb-4" />
            <h1 className="text-2xl font-bold tracking-tight text-text-main">FolioAI</h1>
          </div>

          <div className="mb-8 hidden lg:block">
            <h2 className="text-2xl font-bold text-text-main mb-2">{isRegistering ? "Create your account" : "Sign in to your account"}</h2>
            <p className="text-text-muted text-sm">Enter your details to proceed.</p>
          </div>

          {error && (
             <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-red-50 rounded-xl border border-red-100 text-red-600 text-sm">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
             <div className="mb-5 flex items-start gap-2.5 p-3.5 bg-green-50 rounded-xl border border-green-100 text-green-700 text-sm">
              <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span>{success}</span>
            </div>
          )}

          {mfaRequired ? (
            <form onSubmit={handleMfaVerify} className="space-y-5">
               <div className="text-center bg-gray-50 rounded-xl p-6 border border-border-subtle mb-4">
                <Smartphone className="w-10 h-10 text-text-muted mx-auto mb-3" />
                <h2 className="text-lg font-semibold text-text-main">Security Verification Required</h2>
                <p className="text-sm text-text-muted mt-2">Enter the 6-digit pin generated in your Authenticator app.</p>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-text-muted uppercase tracking-widest">Verification Code</label>
                <input
                  type="text"
                  maxLength={6}
                  value={mfaCode}
                  onChange={(e) => setmfaCode(e.target.value.replace(/\D/g, ""))}
                  placeholder="000000"
                  className="input-field text-center tracking-[1em] text-2xl font-mono"
                  required
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full py-3.5">
                {loading ? "Verifying..." : "Validate Token"}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMfaRequired(false);
                  resetFields();
                }}
                className="w-full text-sm text-center text-text-muted hover:text-text-main transition-colors mt-2"
              >
                Back to Login
              </button>
            </form>
          ) : (
            <form onSubmit={handleAuth} className="space-y-5">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="input-field"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-muted uppercase tracking-wide">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="input-field"
                  required
                />
              </div>

              {!isRegistering && (
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-border-subtle bg-white text-primary focus:ring-primary focus:ring-offset-white" />
                    <span className="text-sm text-text-muted font-medium">Remember me</span>
                  </label>
                  <a href="#" onClick={(e) => { e.preventDefault(); toast('info', 'Coming Soon', 'Password reset is not available in this demo environment.'); }} className="text-sm text-primary hover:text-primary-hover transition-colors font-medium">Forgot password?</a>
                </div>
              )}

              <button type="submit" disabled={loading} className="btn-primary w-full py-3 text-base">
                {loading ? "Processing..." : isRegistering ? "Sign Up" : "Log In"}
              </button>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-border-subtle"></div>
                <span className="flex-shrink mx-4 text-xs text-text-muted uppercase tracking-wider">or</span>
                <div className="flex-grow border-t border-border-subtle"></div>
              </div>

              {googleError && (
                 <div className="mb-4 flex items-start gap-2.5 p-3.5 bg-red-50 rounded-xl border border-red-100 text-red-600 text-sm animate-fade-in">
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span>{googleError}</span>
                    <button 
                      type="button" 
                      onClick={handleGoogleSignIn}
                      className="text-xs font-semibold text-red-700 hover:text-red-800 underline mt-1 ml-0"
                    >
                      Retry
                    </button>
                  </div>
                </div>
              )}

              {googleSuccess && (
                 <div className="mb-4 flex items-start gap-2.5 p-3.5 bg-green-50 rounded-xl border border-green-100 text-green-700 text-sm animate-fade-in">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span>{googleSuccess}</span>
                </div>
              )}

              <button 
                type="button" 
                onClick={handleGoogleSignIn} 
                disabled={googleLoading || loading} 
                className="btn-secondary w-full py-3 text-base flex items-center justify-center gap-3 transition-all duration-200 hover:shadow-md active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {googleLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Connecting to Google...</span>
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
                    </svg>
                    <span>Continue with Google</span>
                  </>
                )}
              </button>
            </form>
          )}

          <div className="mt-8 text-center">
            <p className="text-sm text-text-muted">
              {isRegistering ? "Already have an account?" : "Don't have an account?"} {" "}
              <button
                type="button"
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  resetFields();
                }}
                className="text-primary font-semibold hover:text-primary-hover hover:underline transition-colors ml-1"
              >
                {isRegistering ? "Sign In" : "Sign Up"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
