/**
 * Privacy Policy Screen
 *
 * English + Spanish + German + French + Portuguese + Japanese user-facing Privacy Policy.
 * English remains the legal fallback.
 * No Markdown parser, no new dependencies, no routing/config changes.
 */

import React from "react";
import { ScrollView, View, Text, Pressable, Linking, Platform } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAppContext } from "@/lib/app-context";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

type Segment = {
  text: string;
  bold?: boolean;
  url?: string;
};

type Block =
  | { type: "h2" | "h3" | "body" | "bullet" | "note" | "end"; segments: Segment[] }
  | { type: "table"; headers: string[]; rows: string[][] };

type PolicyDocument = {
  title: string;
  effective: string;
  updated: string;
  blocks: Block[];
};

const EN_POLICY: PolicyDocument = {
  "title": "Privacy Policy for Relaxess",
  "effective": "June 25, 2026",
  "updated": "June 25, 2026",
  "blocks": [
    {
      "type": "h2",
      "segments": [
        {
          "text": "1. Introduction"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess (\"we,\" \"us,\" \"our,\" or \"Company\") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application, Relaxess (the \"Application\")."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Application."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "2. Information We Collect"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.1 Information You Provide Directly"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Chat Messages and Voice Input",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "When you use the Session or Sleep Mode features, you may provide text or voice input to communicate with our AI assistant."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Voice input is temporarily processed for transcription purposes."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Chat messages are sent to OpenAI's API for processing and response generation."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "We do not store your chat messages on our servers. Messages are processed in real-time and then discarded."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Microphone Permission",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "To use voice input features, we request access to your device's microphone."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Voice data is only used for transcription and is not stored after processing."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "You can revoke microphone permission at any time through your device settings."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Premium Subscription Information",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "When you purchase a Premium subscription, payment information is processed through Apple App Store (iOS) or Google Play (Android)."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "We do not store credit card or payment information."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Your subscription status is stored locally on your device."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.2 Information Automatically Collected"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Local Device Storage (AsyncStorage)",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "We store the following information locally on your device:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Your selected language preference"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Your selected theme (light/dark mode)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Your premium subscription status"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Premium subscription expiration date"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Audio playback preferences"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Device Information",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "We may collect information about your device type, operating system version, and app version for troubleshooting and analytics purposes."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Audio Streaming",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "When you stream audio from our AWS S3 bucket (Music, Forest, Rain sounds), your device connects directly to AWS S3."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "AWS may collect standard web server logs including IP address and access time."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "We do not store information about which audio tracks you listen to."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "3. How We Use Your Information"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.1 Primary Uses"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "AI Conversation Processing",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Your chat messages and voice input are sent to OpenAI's API to generate responses."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAI processes this data according to their privacy policy."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "We use this information solely to provide the AI-powered conversation feature."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Premium Subscription Management",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "We track your premium subscription status to enable premium features."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Subscription information is stored locally on your device."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Audio Streaming",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "We provide direct links to audio files stored on AWS S3."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Audio streaming is used to deliver Quiet Relaxation audio content."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Application Functionality",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "We use locally stored preferences to personalize your experience."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Language and theme preferences are used to display the app in your chosen language and theme."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.2 Secondary Uses"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Troubleshooting and Support",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "We may use device information to troubleshoot technical issues."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Error messages may be logged to help us improve the application."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Analytics and Improvement",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "We may collect anonymized usage data to understand how users interact with the application."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "This data helps us improve features and fix bugs."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "4. Third-Party Services"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.1 OpenAI API"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Purpose:",
          "bold": true
        },
        {
          "text": " Provides AI-powered conversation responses"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Data Shared:",
          "bold": true
        },
        {
          "text": " Your chat messages and voice transcriptions"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Privacy Policy:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://openai.com/privacy/",
          "url": "https://openai.com/privacy/"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Data Retention:",
          "bold": true
        },
        {
          "text": " OpenAI retains data according to their privacy policy. Please review OpenAI's privacy policy for details."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.2 AWS S3"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Purpose:",
          "bold": true
        },
        {
          "text": " Hosts audio files for Quiet Relaxation feature"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Data Shared:",
          "bold": true
        },
        {
          "text": " Your device's IP address and access logs"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Privacy Policy:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://aws.amazon.com/privacy/",
          "url": "https://aws.amazon.com/privacy/"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Data Retention:",
          "bold": true
        },
        {
          "text": " AWS retains standard web server logs according to their privacy policy."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.3 Apple App Store / Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Purpose:",
          "bold": true
        },
        {
          "text": " Processes premium subscription payments"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Data Shared:",
          "bold": true
        },
        {
          "text": " Your subscription status and payment information (processed by Apple/Google, not by us)"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Privacy Policy:",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Apple: "
        },
        {
          "text": "https://www.apple.com/privacy/",
          "url": "https://www.apple.com/privacy/"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Google: "
        },
        {
          "text": "https://policies.google.com/privacy",
          "url": "https://policies.google.com/privacy"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Data Retention:",
          "bold": true
        },
        {
          "text": " Apple and Google retain subscription information according to their policies."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "5. Data We Do NOT Collect"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "What We Do NOT Do:",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ We do NOT sell your personal data"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ We do NOT use advertising SDKs or ad networks"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ We do NOT use tracking SDKs (Google Analytics, Mixpanel, etc.)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ We do NOT use social media trackers"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ We do NOT share your data with third parties for marketing"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ We do NOT store your chat messages on our servers"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ We do NOT store your voice recordings"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ We do NOT track which audio tracks you listen to"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ We do NOT collect location data"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ We do NOT collect contact information"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ We do NOT collect health information beyond what you voluntarily share in chat"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "6. Data Security"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.1 Local Storage Security"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "All data stored locally on your device (preferences, subscription status, theme) is stored using AsyncStorage, which uses the device's native secure storage mechanisms:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "iOS:",
          "bold": true
        },
        {
          "text": " Keychain (encrypted)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Android:",
          "bold": true
        },
        {
          "text": " SharedPreferences (encrypted on Android 6.0+)"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.2 Data in Transit"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Chat messages sent to OpenAI are encrypted in transit using HTTPS/TLS."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Audio streams from AWS S3 are encrypted in transit using HTTPS/TLS."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "All API communications use industry-standard encryption."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.3 Server-Side Security"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "We do not store user data on servers."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "All processing happens in real-time and data is discarded after use."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAI and AWS maintain their own security practices. Please review their privacy policies."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "7. Data Retention"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.1 Chat Messages"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Chat messages are NOT stored on our servers."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Messages are processed in real-time by OpenAI and then discarded."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAI may retain messages according to their privacy policy (please review "
        },
        {
          "text": "https://openai.com/privacy/",
          "url": "https://openai.com/privacy/"
        },
        {
          "text": ")."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.2 Voice Recordings"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Voice recordings are NOT stored on our servers."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Recordings are transcribed in real-time and then discarded."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAI may retain transcriptions according to their privacy policy."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.3 Local Device Data"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Data stored locally on your device (preferences, subscription status) remains until:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "You delete the application"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "You clear the app's data through device settings"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "You manually reset preferences in the app"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.4 Audio Access Logs"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "AWS S3 may retain standard web server logs for up to 90 days."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "These logs are not associated with your identity."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "8. Your Privacy Rights"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.1 Access Your Data"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "You have the right to access the personal data we hold about you. Since we store data locally on your device, you can access this data by:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Reviewing your preferences in the Settings screen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Checking your device's app storage settings"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.2 Delete Your Data"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "You can delete all data we store by:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Uninstalling the application"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Clearing the app's data through your device settings"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Resetting preferences in the app's Settings screen"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.3 Opt-Out of Data Collection"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Since we do not use advertising or tracking SDKs, there is no opt-out mechanism needed. However, you can:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Disable microphone permission to prevent voice input"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Disable network access to prevent audio streaming"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Use Do Not Track settings on your device"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.4 Your Rights Under GDPR (EU Users)"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "If you are located in the European Union, you have additional rights under the General Data Protection Regulation (GDPR):"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Right to Access:",
          "bold": true
        },
        {
          "text": " Request a copy of your personal data"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Right to Rectification:",
          "bold": true
        },
        {
          "text": " Correct inaccurate data"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Right to Erasure:",
          "bold": true
        },
        {
          "text": " Request deletion of your data"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Right to Restrict Processing:",
          "bold": true
        },
        {
          "text": " Limit how we use your data"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Right to Data Portability:",
          "bold": true
        },
        {
          "text": " Receive your data in a portable format"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Right to Object:",
          "bold": true
        },
        {
          "text": " Object to processing of your data"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "To exercise these rights, contact us at: "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.5 Your Rights Under CCPA (California Users)"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Right to Know:",
          "bold": true
        },
        {
          "text": " Request what personal data we collect"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Right to Delete:",
          "bold": true
        },
        {
          "text": " Request deletion of your data"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Right to Opt-Out:",
          "bold": true
        },
        {
          "text": " Opt out of data sales (we do not sell data)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Right to Non-Discrimination:",
          "bold": true
        },
        {
          "text": " We do not discriminate based on privacy choices"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "To exercise these rights, contact us at: "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "9. Children's Privacy"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected information from a child under 13, we will delete such information immediately."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "If you are a parent or guardian and believe your child has provided information to Relaxess, please contact us immediately at: "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "10. International Data Transfers"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Your information may be transferred to, stored in, and processed in countries other than your country of residence, including the United States. These countries may have data protection laws that differ from your home country."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "By using Relaxess, you consent to the transfer of your information to countries outside your country of residence, which may have different data protection rules."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "11. Changes to This Privacy Policy"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "We may update this Privacy Policy from time to time. We will notify you of any changes by updating the \"Last Updated\" date at the top of this Privacy Policy."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Your continued use of Relaxess after any changes constitutes your acceptance of the updated Privacy Policy."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "12. Contact Us"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "If you have questions about this Privacy Policy or our privacy practices, please contact us at:"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Email:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Mailing Address:",
          "bold": true
        },
        {
          "text": " [Company Address]"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Website:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://relaxess.app",
          "url": "https://relaxess.app"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "We will respond to your inquiry within 30 days."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "13. App Store Compliance"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "13.1 Apple App Store Requirements"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "This Privacy Policy complies with Apple's App Store Review Guidelines:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Clearly describes data collection practices"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explains use of microphone permission"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Describes third-party services (OpenAI, AWS)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explains subscription information"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Provides contact information"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explains user rights and data deletion"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "13.2 Google Play Requirements"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "This Privacy Policy complies with Google Play's Developer Program Policies:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Clearly describes data collection practices"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explains use of microphone permission"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Describes third-party services"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explains subscription information"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Provides contact information"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explains user rights and data deletion"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "14. Summary of Data Practices"
        }
      ]
    },
    {
      "type": "table",
      "headers": [
        "Data Type",
        "Collected",
        "Stored",
        "Shared",
        "Deleted"
      ],
      "rows": [
        [
          "Chat Messages",
          "Yes",
          "No (OpenAI)",
          "OpenAI",
          "Real-time"
        ],
        [
          "Voice Recordings",
          "Yes",
          "No (OpenAI)",
          "OpenAI",
          "Real-time"
        ],
        [
          "Subscription Status",
          "Yes",
          "Local Device",
          "Apple/Google",
          "On uninstall"
        ],
        [
          "Language Preference",
          "Yes",
          "Local Device",
          "No",
          "On uninstall"
        ],
        [
          "Theme Preference",
          "Yes",
          "Local Device",
          "No",
          "On uninstall"
        ],
        [
          "Audio Preferences",
          "Yes",
          "Local Device",
          "No",
          "On uninstall"
        ],
        [
          "Device Information",
          "Limited",
          "No",
          "No",
          "N/A"
        ],
        [
          "IP Address",
          "Yes",
          "AWS Logs",
          "AWS",
          "90 days"
        ],
        [
          "Payment Information",
          "No",
          "No",
          "Apple/Google",
          "N/A"
        ],
        [
          "Location Data",
          "No",
          "No",
          "No",
          "N/A"
        ],
        [
          "Health Data",
          "No",
          "No",
          "No",
          "N/A"
        ]
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "15. Disclaimer"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "This Privacy Policy is provided as-is. Relaxess is not a medical service and does not provide medical advice. Any health-related information you share in the application is for personal wellness purposes only and should not be considered medical advice."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Please consult with a healthcare professional for medical concerns."
        }
      ]
    },
    {
      "type": "end",
      "segments": [
        {
          "text": "End of Privacy Policy"
        }
      ]
    }
  ]
};

const ES_POLICY: PolicyDocument = {
  "title": "Política de Privacidad para Relaxess",
  "effective": "25 de junio de 2026",
  "updated": "25 de junio de 2026",
  "blocks": [
    {
      "type": "note",
      "segments": [
        {
          "text": "Aviso sobre la traducción:",
          "bold": true
        },
        {
          "text": " Esta Política de Privacidad es una traducción de la versión original en inglés. En caso de cualquier discrepancia, conflicto o diferencia de interpretación, prevalecerá la versión en inglés."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "1. Introducción"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess (\"nosotros,\" \"nos,\" \"nuestro,\" o \"Empresa\") se compromete a proteger su privacidad. Esta Política de Privacidad explica cómo recopilamos, utilizamos, divulgamos y salvaguardamos su información cuando utiliza nuestra aplicación móvil, Relaxess (la \"Aplicación\")."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Por favor, lea esta Política de Privacidad cuidadosamente. Si no está de acuerdo con nuestras políticas y prácticas, por favor no utilice nuestra Aplicación."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "2. Información que Recopilamos"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.1 Información que Proporciona Directamente"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Mensajes de Chat e Entrada de Voz",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Cuando utiliza las funciones de Sesión o Modo de Sueño, puede proporcionar entrada de texto o voz para comunicarse con nuestro asistente de IA."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La entrada de voz se procesa temporalmente para propósitos de transcripción."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Los mensajes de chat se envían a la API de OpenAI para procesamiento y generación de respuestas."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "No almacenamos sus mensajes de chat en nuestros servidores. Los mensajes se procesan en tiempo real y luego se descartan."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Permiso de Micrófono",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Para utilizar funciones de entrada de voz, solicitamos acceso al micrófono de su dispositivo."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Los datos de voz solo se utilizan para transcripción y no se almacenan después del procesamiento."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Puede revocar el permiso del micrófono en cualquier momento a través de la configuración de su dispositivo."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Información de Suscripción Premium",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Cuando compra una suscripción Premium, la información de pago se procesa a través de Apple App Store (iOS) o Google Play (Android)."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "No almacenamos información de tarjeta de crédito o pago."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Su estado de suscripción se almacena localmente en su dispositivo."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.2 Información Recopilada Automáticamente"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Almacenamiento Local de Dispositivo (AsyncStorage)",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Almacenamos la siguiente información localmente en su dispositivo:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Su preferencia de idioma seleccionada"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Su tema seleccionado (modo claro/oscuro)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Su estado de suscripción premium"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Fecha de vencimiento de la suscripción premium"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Preferencias de reproducción de audio"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Información del Dispositivo",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Podemos recopilar información sobre el tipo de dispositivo, versión del sistema operativo y versión de la aplicación para propósitos de solución de problemas y análisis."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Transmisión de Audio",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Cuando transmite audio desde nuestro depósito de AWS S3 (Música, Sonidos de Bosque, Lluvia), su dispositivo se conecta directamente a AWS S3."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "AWS puede recopilar registros estándar del servidor web, incluida la dirección IP y la hora de acceso."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "No almacenamos información sobre qué pistas de audio escucha."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "3. Cómo Utilizamos Su Información"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.1 Usos Principales"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Procesamiento de Conversación de IA",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sus mensajes de chat e entrada de voz se envían a la API de OpenAI para generar respuestas."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAI procesa estos datos de acuerdo con su política de privacidad."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utilizamos esta información únicamente para proporcionar la función de conversación impulsada por IA."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Gestión de Suscripción Premium",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Rastreamos su estado de suscripción premium para habilitar funciones premium."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La información de suscripción se almacena localmente en su dispositivo."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Transmisión de Audio",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Proporcionamos enlaces directos a archivos de audio almacenados en AWS S3."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La transmisión de audio se utiliza para entregar contenido de Relajación Tranquila."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Funcionalidad de la Aplicación",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utilizamos preferencias almacenadas localmente para personalizar su experiencia."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Las preferencias de idioma y tema se utilizan para mostrar la aplicación en su idioma y tema elegidos."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.2 Usos Secundarios"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Solución de Problemas y Soporte",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Podemos utilizar información del dispositivo para solucionar problemas técnicos."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Los mensajes de error pueden registrarse para ayudarnos a mejorar la aplicación."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Análisis y Mejora",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Podemos recopilar datos de uso anonimizados para entender cómo los usuarios interactúan con la aplicación."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Estos datos nos ayudan a mejorar funciones y corregir errores."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "4. Servicios de Terceros"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.1 API de OpenAI"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Propósito:",
          "bold": true
        },
        {
          "text": " Proporciona respuestas de conversación impulsadas por IA"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Datos Compartidos:",
          "bold": true
        },
        {
          "text": " Sus mensajes de chat y transcripciones de voz"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Política de Privacidad:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://openai.com/privacy/",
          "url": "https://openai.com/privacy/"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Retención de Datos:",
          "bold": true
        },
        {
          "text": " OpenAI retiene datos de acuerdo con su política de privacidad. Por favor, revise la política de privacidad de OpenAI para más detalles."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.2 AWS S3"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Propósito:",
          "bold": true
        },
        {
          "text": " Aloja archivos de audio para la función de Relajación Tranquila"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Datos Compartidos:",
          "bold": true
        },
        {
          "text": " La dirección IP de su dispositivo y registros de acceso"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Política de Privacidad:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://aws.amazon.com/privacy/",
          "url": "https://aws.amazon.com/privacy/"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Retención de Datos:",
          "bold": true
        },
        {
          "text": " AWS retiene registros estándar del servidor web de acuerdo con su política de privacidad."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.3 Apple App Store / Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Propósito:",
          "bold": true
        },
        {
          "text": " Procesa pagos de suscripción premium"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Datos Compartidos:",
          "bold": true
        },
        {
          "text": " Su estado de suscripción e información de pago (procesada por Apple/Google, no por nosotros)"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Política de Privacidad:",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Apple: "
        },
        {
          "text": "https://www.apple.com/privacy/",
          "url": "https://www.apple.com/privacy/"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Google: "
        },
        {
          "text": "https://policies.google.com/privacy",
          "url": "https://policies.google.com/privacy"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Retención de Datos:",
          "bold": true
        },
        {
          "text": " Apple y Google retienen información de suscripción de acuerdo con sus políticas."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "5. Datos que NO Recopilamos"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Lo que NO Hacemos:",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NO vendemos sus datos personales"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NO utilizamos SDKs de publicidad o redes publicitarias"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NO utilizamos SDKs de seguimiento (Google Analytics, Mixpanel, etc.)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NO utilizamos rastreadores de redes sociales"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NO compartimos sus datos con terceros para marketing"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NO almacenamos sus mensajes de chat en nuestros servidores"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NO almacenamos sus grabaciones de voz"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NO rastreamos qué pistas de audio escucha"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NO recopilamos datos de ubicación"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NO recopilamos información de contacto"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NO recopilamos información de salud más allá de lo que comparte voluntariamente en el chat"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "6. Seguridad de Datos"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.1 Seguridad de Almacenamiento Local"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Todos los datos almacenados localmente en su dispositivo (preferencias, estado de suscripción, tema) se almacenan usando AsyncStorage, que utiliza mecanismos de almacenamiento seguro nativos del dispositivo:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "iOS:",
          "bold": true
        },
        {
          "text": " Keychain (encriptado)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Android:",
          "bold": true
        },
        {
          "text": " SharedPreferences (encriptado en Android 6.0+)"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.2 Datos en Tránsito"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Los mensajes de chat enviados a OpenAI se encriptan en tránsito usando HTTPS/TLS."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Las transmisiones de audio desde AWS S3 se encriptan en tránsito usando HTTPS/TLS."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Todas las comunicaciones de API utilizan encriptación estándar de la industria."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.3 Seguridad del Lado del Servidor"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "No almacenamos datos de usuario en servidores."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Todo el procesamiento ocurre en tiempo real y los datos se descartan después del uso."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAI y AWS mantienen sus propias prácticas de seguridad. Por favor, revise sus políticas de privacidad."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "7. Retención de Datos"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.1 Mensajes de Chat"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Los mensajes de chat NO se almacenan en nuestros servidores."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Los mensajes se procesan en tiempo real por OpenAI y luego se descartan."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAI puede retener mensajes de acuerdo con su política de privacidad (por favor revise "
        },
        {
          "text": "https://openai.com/privacy/",
          "url": "https://openai.com/privacy/"
        },
        {
          "text": ")."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.2 Grabaciones de Voz"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Las grabaciones de voz NO se almacenan en nuestros servidores."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Las grabaciones se transcriben en tiempo real y luego se descartan."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAI puede retener transcripciones de acuerdo con su política de privacidad."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.3 Datos del Dispositivo Local"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Los datos almacenados localmente en su dispositivo (preferencias, estado de suscripción) permanecen hasta:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Que elimine la aplicación"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Que borre los datos de la aplicación a través de la configuración de su dispositivo"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Que reinicie manualmente las preferencias en la aplicación"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.4 Registros de Acceso de Audio"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "AWS S3 puede retener registros estándar del servidor web hasta 90 días."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Estos registros no están asociados con su identidad."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "8. Sus Derechos de Privacidad"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.1 Acceder a Sus Datos"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Tiene derecho a acceder a los datos personales que tenemos sobre usted. Dado que almacenamos datos localmente en su dispositivo, puede acceder a estos datos por:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Revisando sus preferencias en la pantalla de Configuración"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Verificando la configuración de almacenamiento de la aplicación de su dispositivo"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.2 Eliminar Sus Datos"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Puede eliminar todos los datos que almacenamos por:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Desinstalando la aplicación"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Borrando los datos de la aplicación a través de la configuración de su dispositivo"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Reiniciando las preferencias en la pantalla de Configuración de la aplicación"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.3 Optar por No Participar en la Recopilación de Datos"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Dado que no utilizamos SDKs de publicidad o seguimiento, no hay un mecanismo de exclusión necesario. Sin embargo, puede:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Desactivar el permiso del micrófono para prevenir entrada de voz"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Desactivar el acceso a la red para prevenir transmisión de audio"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utilizar la configuración de No Rastrear en su dispositivo"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.4 Sus Derechos Bajo GDPR (Usuarios de la UE)"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si se encuentra en la Unión Europea, tiene derechos adicionales bajo el Reglamento General de Protección de Datos (GDPR):"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Derecho de Acceso:",
          "bold": true
        },
        {
          "text": " Solicitar una copia de sus datos personales"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Derecho de Rectificación:",
          "bold": true
        },
        {
          "text": " Corregir datos inexactos"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Derecho al Olvido:",
          "bold": true
        },
        {
          "text": " Solicitar la eliminación de sus datos"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Derecho a Restringir el Procesamiento:",
          "bold": true
        },
        {
          "text": " Limitar cómo utilizamos sus datos"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Derecho a la Portabilidad de Datos:",
          "bold": true
        },
        {
          "text": " Recibir sus datos en un formato portátil"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Derecho a Objetar:",
          "bold": true
        },
        {
          "text": " Objetar el procesamiento de sus datos"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Para ejercer estos derechos, contáctenos en: "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.5 Sus Derechos Bajo CCPA (Usuarios de California)"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si es residente de California, tiene derechos bajo la Ley de Privacidad del Consumidor de California (CCPA):"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Derecho a Saber:",
          "bold": true
        },
        {
          "text": " Solicitar qué datos personales recopilamos"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Derecho a Eliminar:",
          "bold": true
        },
        {
          "text": " Solicitar la eliminación de sus datos"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Derecho a Optar por No Participar:",
          "bold": true
        },
        {
          "text": " Optar por no participar en ventas de datos (no vendemos datos)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Derecho a la No Discriminación:",
          "bold": true
        },
        {
          "text": " No discriminamos basándonos en opciones de privacidad"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Para ejercer estos derechos, contáctenos en: "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "9. Privacidad de Menores"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess no está destinada a menores de 13 años. No recopilamos información personal de menores de 13 años de manera consciente. Si nos damos cuenta de que hemos recopilado información de un menor de 13 años, eliminaremos esa información inmediatamente."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si es padre o tutor y cree que su hijo ha proporcionado información a Relaxess, por favor contáctenos inmediatamente en: "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "10. Transferencias Internacionales de Datos"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Su información puede ser transferida, almacenada y procesada en países distintos a su país de residencia, incluidos los Estados Unidos. Estos países pueden tener leyes de protección de datos que difieren de su país de origen."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Al utilizar Relaxess, usted consiente la transferencia de su información a países fuera de su país de residencia, que pueden tener reglas de protección de datos diferentes."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "11. Cambios en Esta Política de Privacidad"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Podemos actualizar esta Política de Privacidad de vez en cuando. Le notificaremos de cualquier cambio actualizando la fecha de \"Última Actualización\" en la parte superior de esta Política de Privacidad."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Su uso continuado de Relaxess después de cualquier cambio constituye su aceptación de la Política de Privacidad actualizada."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "12. Contáctenos"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si tiene preguntas sobre esta Política de Privacidad o nuestras prácticas de privacidad, por favor contáctenos en:"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Correo Electrónico:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Dirección Postal:",
          "bold": true
        },
        {
          "text": " [Dirección de la Empresa]"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sitio Web:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://relaxess.app",
          "url": "https://relaxess.app"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Responderemos a su consulta dentro de 30 días."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "13. Cumplimiento de App Store"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "13.1 Requisitos de Apple App Store"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Esta Política de Privacidad cumple con las Directrices de Revisión de Apple App Store:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Describe claramente prácticas de recopilación de datos"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explica el uso del permiso de micrófono"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Describe servicios de terceros (OpenAI, AWS)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explica información de suscripción"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Proporciona información de contacto"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explica derechos de usuario y eliminación de datos"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "13.2 Requisitos de Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Esta Política de Privacidad cumple con las Políticas del Programa de Desarrolladores de Google Play:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Describe claramente prácticas de recopilación de datos"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explica el uso del permiso de micrófono"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Describe servicios de terceros"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explica información de suscripción"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Proporciona información de contacto"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explica derechos de usuario y eliminación de datos"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "14. Resumen de Prácticas de Datos"
        }
      ]
    },
    {
      "type": "table",
      "headers": [
        "Tipo de Dato",
        "Recopilado",
        "Almacenado",
        "Compartido",
        "Eliminado"
      ],
      "rows": [
        [
          "Mensajes de Chat",
          "Sí",
          "No (OpenAI)",
          "OpenAI",
          "Tiempo real"
        ],
        [
          "Grabaciones de Voz",
          "Sí",
          "No (OpenAI)",
          "OpenAI",
          "Tiempo real"
        ],
        [
          "Estado de Suscripción",
          "Sí",
          "Dispositivo Local",
          "Apple/Google",
          "Al desinstalar"
        ],
        [
          "Preferencia de Idioma",
          "Sí",
          "Dispositivo Local",
          "No",
          "Al desinstalar"
        ],
        [
          "Preferencia de Tema",
          "Sí",
          "Dispositivo Local",
          "No",
          "Al desinstalar"
        ],
        [
          "Preferencias de Audio",
          "Sí",
          "Dispositivo Local",
          "No",
          "Al desinstalar"
        ],
        [
          "Información del Dispositivo",
          "Limitada",
          "No",
          "No",
          "N/A"
        ],
        [
          "Dirección IP",
          "Sí",
          "Registros de AWS",
          "AWS",
          "90 días"
        ],
        [
          "Información de Pago",
          "No",
          "No",
          "Apple/Google",
          "N/A"
        ],
        [
          "Datos de Ubicación",
          "No",
          "No",
          "No",
          "N/A"
        ],
        [
          "Datos de Salud",
          "No",
          "No",
          "No",
          "N/A"
        ]
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "15. Descargo de Responsabilidad"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Esta Política de Privacidad se proporciona tal como está. Relaxess no es un servicio médico y no proporciona asesoramiento médico. Cualquier información relacionada con la salud que comparta en la aplicación es únicamente para propósitos de bienestar personal y no debe considerarse asesoramiento médico."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Por favor, consulte con un profesional de la salud para inquietudes médicas."
        }
      ]
    },
    {
      "type": "end",
      "segments": [
        {
          "text": "Fin de la Política de Privacidad"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "Nota sobre la traducción"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Esta traducción se proporciona únicamente para facilitar la lectura. La versión original en inglés constituye el documento legalmente vinculante. Debido a las posibles diferencias de interpretación jurídica derivadas de la traducción, en caso de cualquier discrepancia prevalecerá la versión en inglés."
        }
      ]
    }
  ]
};

const DE_POLICY: PolicyDocument = {
  "title": "Datenschutzrichtlinie für Relaxess",
  "effective": "25. Juni 2026",
  "updated": "25. Juni 2026",
  "blocks": [
    {
      "type": "note",
      "segments": [
        {
          "text": "Hinweis zur Übersetzung:",
          "bold": true
        },
        {
          "text": " Diese Datenschutzrichtlinie ist eine Übersetzung der englischen Originalfassung. Die englische Fassung ist das rechtlich maßgebliche Dokument. Im Falle von Abweichungen, Widersprüchen oder unterschiedlichen Auslegungen hat die englische Fassung Vorrang."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "1. Einleitung"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess („wir“, „uns“, „unser“ oder „Unternehmen“) verpflichtet sich zum Schutz Ihrer Privatsphäre. Diese Datenschutzrichtlinie erläutert, wie wir Ihre Informationen erfassen, verwenden, offenlegen und schützen, wenn Sie unsere mobile Anwendung Relaxess (die „Anwendung“) nutzen."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Bitte lesen Sie diese Datenschutzrichtlinie sorgfältig. Wenn Sie mit unseren Richtlinien und Praktiken nicht einverstanden sind, verwenden Sie unsere Anwendung bitte nicht."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "2. Informationen, die wir erfassen"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.1 Informationen, die Sie uns direkt zur Verfügung stellen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Chat-Nachrichten und Spracheingabe",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Wenn Sie die Funktionen „Session“ oder „Sleep Mode“ verwenden, können Sie Text- oder Spracheingaben bereitstellen, um mit unserem KI-Assistenten zu kommunizieren."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Spracheingaben werden vorübergehend zum Zweck der Transkription verarbeitet."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Chat-Nachrichten werden zur Verarbeitung und Generierung von Antworten an die API von OpenAI gesendet."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Wir speichern Ihre Chat-Nachrichten nicht auf unseren Servern. Nachrichten werden in Echtzeit verarbeitet und anschließend verworfen."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Mikrofonberechtigung",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Für die Nutzung der Spracheingabefunktionen bitten wir um Zugriff auf das Mikrofon Ihres Geräts."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sprachdaten werden nur zur Transkription verwendet und nach der Verarbeitung nicht gespeichert."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sie können die Mikrofonberechtigung jederzeit über die Einstellungen Ihres Geräts widerrufen."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Informationen zum Premium-Abonnement",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Wenn Sie ein Premium-Abonnement erwerben, werden Zahlungsinformationen über den Apple App Store (iOS) oder Google Play (Android) verarbeitet."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Wir speichern keine Kreditkarten- oder Zahlungsinformationen."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ihr Abonnementstatus wird lokal auf Ihrem Gerät gespeichert."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.2 Automatisch erfasste Informationen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Lokaler Gerätespeicher (AsyncStorage)",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Wir speichern die folgenden Informationen lokal auf Ihrem Gerät:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ihre ausgewählte Spracheinstellung"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ihr ausgewähltes Design (Hell-/Dunkelmodus)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ihren Premium-Abonnementstatus"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Das Ablaufdatum des Premium-Abonnements"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Einstellungen für die Audiowiedergabe"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Geräteinformationen",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Wir können Informationen über Ihren Gerätetyp, die Version des Betriebssystems und die App-Version zu Zwecken der Fehlerbehebung und Analyse erfassen."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Audio-Streaming",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Wenn Sie Audio aus unserem AWS-S3-Bucket streamen (Musik, Wald- und Regengeräusche), stellt Ihr Gerät eine direkte Verbindung zu AWS S3 her."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "AWS kann standardmäßige Webserver-Protokolle einschließlich IP-Adresse und Zugriffszeit erfassen."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Wir speichern keine Informationen darüber, welche Audiotitel Sie anhören."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "3. Wie wir Ihre Informationen verwenden"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.1 Hauptzwecke"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Verarbeitung von KI-Unterhaltungen",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ihre Chat-Nachrichten und Spracheingaben werden an die API von OpenAI gesendet, um Antworten zu generieren."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAI verarbeitet diese Daten gemäß seiner Datenschutzrichtlinie."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Wir verwenden diese Informationen ausschließlich zur Bereitstellung der KI-gestützten Unterhaltungsfunktion."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Verwaltung des Premium-Abonnements",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Wir erfassen Ihren Premium-Abonnementstatus, um Premium-Funktionen freizuschalten."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Abonnementinformationen werden lokal auf Ihrem Gerät gespeichert."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Audio-Streaming",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Wir stellen direkte Links zu Audiodateien bereit, die auf AWS S3 gespeichert sind."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Audio-Streaming wird verwendet, um Audioinhalte der Funktion „Quiet Relaxation“ bereitzustellen."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Funktionalität der Anwendung",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Wir verwenden lokal gespeicherte Einstellungen, um Ihre Nutzungserfahrung zu personalisieren."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sprach- und Designeinstellungen werden verwendet, um die App in der von Ihnen gewählten Sprache und dem von Ihnen gewählten Design anzuzeigen."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.2 Sekundäre Verwendungszwecke"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Fehlerbehebung und Support",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Wir können Geräteinformationen verwenden, um technische Probleme zu beheben."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Fehlermeldungen können protokolliert werden, um uns bei der Verbesserung der Anwendung zu helfen."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Analyse und Verbesserung",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Wir können anonymisierte Nutzungsdaten erfassen, um zu verstehen, wie Nutzer mit der Anwendung interagieren."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Diese Daten helfen uns, Funktionen zu verbessern und Fehler zu beheben."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "4. Dienste von Drittanbietern"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.1 OpenAI API"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Zweck:",
          "bold": true
        },
        {
          "text": " Bereitstellung KI-gestützter Gesprächsantworten"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Weitergegebene Daten:",
          "bold": true
        },
        {
          "text": " Ihre Chat-Nachrichten und Sprachtranskriptionen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Datenschutzrichtlinie:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://openai.com/privacy/",
          "url": "https://openai.com/privacy/"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Datenaufbewahrung:",
          "bold": true
        },
        {
          "text": " OpenAI bewahrt Daten gemäß seiner Datenschutzrichtlinie auf. Weitere Einzelheiten entnehmen Sie bitte der Datenschutzrichtlinie von OpenAI."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.2 AWS S3"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Zweck:",
          "bold": true
        },
        {
          "text": " Hosting von Audiodateien für die Funktion „Quiet Relaxation“"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Weitergegebene Daten:",
          "bold": true
        },
        {
          "text": " IP-Adresse Ihres Geräts und Zugriffsprotokolle"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Datenschutzrichtlinie:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://aws.amazon.com/privacy/",
          "url": "https://aws.amazon.com/privacy/"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Datenaufbewahrung:",
          "bold": true
        },
        {
          "text": " AWS bewahrt standardmäßige Webserver-Protokolle gemäß seiner Datenschutzrichtlinie auf."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.3 Apple App Store / Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Zweck:",
          "bold": true
        },
        {
          "text": " Verarbeitung von Zahlungen für Premium-Abonnements"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Weitergegebene Daten:",
          "bold": true
        },
        {
          "text": " Ihr Abonnementstatus und Zahlungsinformationen (verarbeitet von Apple/Google, nicht von uns)"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Datenschutzrichtlinie:",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Apple: "
        },
        {
          "text": "https://www.apple.com/privacy/",
          "url": "https://www.apple.com/privacy/"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Google: "
        },
        {
          "text": "https://policies.google.com/privacy",
          "url": "https://policies.google.com/privacy"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Datenaufbewahrung:",
          "bold": true
        },
        {
          "text": " Apple und Google bewahren Abonnementinformationen gemäß ihren jeweiligen Richtlinien auf."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "5. Daten, die wir NICHT erfassen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Was wir NICHT tun:",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Wir verkaufen Ihre personenbezogenen Daten NICHT"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Wir verwenden KEINE Werbe-SDKs oder Werbenetzwerke"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Wir verwenden KEINE Tracking-SDKs (Google Analytics, Mixpanel usw.)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Wir verwenden KEINE Social-Media-Tracker"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Wir geben Ihre Daten NICHT zu Marketingzwecken an Dritte weiter"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Wir speichern Ihre Chat-Nachrichten NICHT auf unseren Servern"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Wir speichern Ihre Sprachaufzeichnungen NICHT"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Wir verfolgen NICHT, welche Audiotitel Sie anhören"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Wir erfassen KEINE Standortdaten"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Wir erfassen KEINE Kontaktinformationen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Wir erfassen KEINE Gesundheitsinformationen über das hinaus, was Sie freiwillig im Chat mitteilen"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "6. Datensicherheit"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.1 Sicherheit der lokalen Speicherung"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Alle lokal auf Ihrem Gerät gespeicherten Daten (Einstellungen, Abonnementstatus, Design) werden mit AsyncStorage gespeichert, das die nativen sicheren Speichermechanismen des Geräts verwendet:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "iOS:",
          "bold": true
        },
        {
          "text": " Keychain (verschlüsselt)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Android:",
          "bold": true
        },
        {
          "text": " SharedPreferences (unter Android 6.0+ verschlüsselt)"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.2 Datenübertragung"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "An OpenAI gesendete Chat-Nachrichten werden während der Übertragung mit HTTPS/TLS verschlüsselt."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Audiostreams von AWS S3 werden während der Übertragung mit HTTPS/TLS verschlüsselt."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sämtliche API-Kommunikation verwendet branchenübliche Verschlüsselung."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.3 Serverseitige Sicherheit"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Wir speichern keine Nutzerdaten auf Servern."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Die gesamte Verarbeitung erfolgt in Echtzeit, und die Daten werden nach der Verwendung verworfen."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAI und AWS unterhalten eigene Sicherheitspraktiken. Bitte lesen Sie deren Datenschutzrichtlinien."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "7. Datenaufbewahrung"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.1 Chat-Nachrichten"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Chat-Nachrichten werden NICHT auf unseren Servern gespeichert."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Nachrichten werden von OpenAI in Echtzeit verarbeitet und anschließend verworfen."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAI kann Nachrichten gemäß seiner Datenschutzrichtlinie aufbewahren (siehe "
        },
        {
          "text": "https://openai.com/privacy/",
          "url": "https://openai.com/privacy/"
        },
        {
          "text": ")."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.2 Sprachaufzeichnungen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sprachaufzeichnungen werden NICHT auf unseren Servern gespeichert."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Aufzeichnungen werden in Echtzeit transkribiert und anschließend verworfen."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAI kann Transkriptionen gemäß seiner Datenschutzrichtlinie aufbewahren."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.3 Lokale Gerätedaten"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Lokal auf Ihrem Gerät gespeicherte Daten (Einstellungen, Abonnementstatus) bleiben gespeichert, bis:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sie die Anwendung löschen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sie die App-Daten über die Geräteeinstellungen löschen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sie die Einstellungen in der App manuell zurücksetzen"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.4 Audio-Zugriffsprotokolle"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "AWS S3 kann standardmäßige Webserver-Protokolle bis zu 90 Tage aufbewahren."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Diese Protokolle sind nicht mit Ihrer Identität verknüpft."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "8. Ihre Datenschutzrechte"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.1 Zugriff auf Ihre Daten"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sie haben das Recht, auf die personenbezogenen Daten zuzugreifen, die wir über Sie speichern. Da wir Daten lokal auf Ihrem Gerät speichern, können Sie auf diese Daten zugreifen, indem Sie:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ihre Einstellungen im Bildschirm „Settings“ überprüfen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "die App-Speichereinstellungen Ihres Geräts überprüfen"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.2 Löschung Ihrer Daten"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Sie können alle von uns gespeicherten Daten löschen, indem Sie:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "die Anwendung deinstallieren"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "die App-Daten über die Einstellungen Ihres Geräts löschen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "die Einstellungen im Bildschirm „Settings“ der App zurücksetzen"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.3 Widerspruch gegen Datenerfassung"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Da wir keine Werbe- oder Tracking-SDKs verwenden, ist kein Opt-out-Mechanismus erforderlich. Sie können jedoch:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "die Mikrofonberechtigung deaktivieren, um Spracheingaben zu verhindern"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "den Netzwerkzugriff deaktivieren, um Audio-Streaming zu verhindern"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "die „Do Not Track“-Einstellungen Ihres Geräts verwenden"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.4 Ihre Rechte nach der DSGVO (EU-Nutzer)"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wenn Sie sich in der Europäischen Union befinden, haben Sie zusätzliche Rechte nach der Datenschutz-Grundverordnung (DSGVO):"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Recht auf Auskunft:",
          "bold": true
        },
        {
          "text": " Eine Kopie Ihrer personenbezogenen Daten anfordern"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Recht auf Berichtigung:",
          "bold": true
        },
        {
          "text": " Unrichtige Daten berichtigen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Recht auf Löschung:",
          "bold": true
        },
        {
          "text": " Die Löschung Ihrer Daten verlangen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Recht auf Einschränkung der Verarbeitung:",
          "bold": true
        },
        {
          "text": " Einschränken, wie wir Ihre Daten verwenden"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Recht auf Datenübertragbarkeit:",
          "bold": true
        },
        {
          "text": " Ihre Daten in einem übertragbaren Format erhalten"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Widerspruchsrecht:",
          "bold": true
        },
        {
          "text": " Der Verarbeitung Ihrer Daten widersprechen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Um diese Rechte auszuüben, kontaktieren Sie uns unter: "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.5 Ihre Rechte nach dem CCPA (Nutzer in Kalifornien)"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wenn Sie in Kalifornien ansässig sind, haben Sie Rechte nach dem California Consumer Privacy Act (CCPA):"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Recht auf Auskunft:",
          "bold": true
        },
        {
          "text": " Auskunft darüber verlangen, welche personenbezogenen Daten wir erfassen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Recht auf Löschung:",
          "bold": true
        },
        {
          "text": " Die Löschung Ihrer Daten verlangen"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Recht auf Opt-out:",
          "bold": true
        },
        {
          "text": " Dem Verkauf von Daten widersprechen (wir verkaufen keine Daten)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Recht auf Nichtdiskriminierung:",
          "bold": true
        },
        {
          "text": " Wir diskriminieren nicht aufgrund von Datenschutzentscheidungen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Um diese Rechte auszuüben, kontaktieren Sie uns unter: "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "9. Datenschutz von Kindern"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess ist nicht für Kinder unter 13 Jahren bestimmt. Wir erfassen wissentlich keine personenbezogenen Daten von Kindern unter 13 Jahren. Wenn wir feststellen, dass wir Informationen von einem Kind unter 13 Jahren erfasst haben, werden wir diese Informationen unverzüglich löschen."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wenn Sie Elternteil oder Erziehungsberechtigter sind und glauben, dass Ihr Kind Relaxess Informationen bereitgestellt hat, kontaktieren Sie uns bitte unverzüglich unter: "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "10. Internationale Datenübertragungen"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Ihre Informationen können in andere Länder als Ihr Wohnsitzland übertragen, dort gespeichert und verarbeitet werden, einschließlich der Vereinigten Staaten. Diese Länder können Datenschutzgesetze haben, die von denen Ihres Heimatlandes abweichen."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Durch die Nutzung von Relaxess stimmen Sie der Übertragung Ihrer Informationen in Länder außerhalb Ihres Wohnsitzlandes zu, in denen möglicherweise andere Datenschutzbestimmungen gelten."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "11. Änderungen dieser Datenschutzrichtlinie"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wir können diese Datenschutzrichtlinie von Zeit zu Zeit aktualisieren. Wir informieren Sie über Änderungen, indem wir das Datum „Zuletzt aktualisiert“ am Anfang dieser Datenschutzrichtlinie aktualisieren."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Ihre fortgesetzte Nutzung von Relaxess nach Änderungen gilt als Zustimmung zu der aktualisierten Datenschutzrichtlinie."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "12. Kontakt"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wenn Sie Fragen zu dieser Datenschutzrichtlinie oder unseren Datenschutzpraktiken haben, kontaktieren Sie uns bitte unter:"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "E-Mail:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Postanschrift:",
          "bold": true
        },
        {
          "text": " [Unternehmensadresse]"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Website:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://relaxess.app",
          "url": "https://relaxess.app"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Wir werden Ihre Anfrage innerhalb von 30 Tagen beantworten."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "13. App-Store-Konformität"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "13.1 Anforderungen des Apple App Store"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Diese Datenschutzrichtlinie entspricht den App Store Review Guidelines von Apple:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Beschreibt die Praktiken zur Datenerfassung klar"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Erläutert die Verwendung der Mikrofonberechtigung"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Beschreibt Dienste von Drittanbietern (OpenAI, AWS)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Erläutert Informationen zum Abonnement"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Stellt Kontaktinformationen bereit"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Erläutert Nutzerrechte und Datenlöschung"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "13.2 Anforderungen von Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Diese Datenschutzrichtlinie entspricht den Developer Program Policies von Google Play:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Beschreibt die Praktiken zur Datenerfassung klar"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Erläutert die Verwendung der Mikrofonberechtigung"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Beschreibt Dienste von Drittanbietern"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Erläutert Informationen zum Abonnement"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Stellt Kontaktinformationen bereit"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Erläutert Nutzerrechte und Datenlöschung"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "14. Zusammenfassung der Datenpraktiken"
        }
      ]
    },
    {
      "type": "table",
      "headers": [
        "Datentyp",
        "Erfasst",
        "Gespeichert",
        "Weitergegeben",
        "Gelöscht"
      ],
      "rows": [
        [
          "Chat-Nachrichten",
          "Ja",
          "Nein (OpenAI)",
          "OpenAI",
          "In Echtzeit"
        ],
        [
          "Sprachaufzeichnungen",
          "Ja",
          "Nein (OpenAI)",
          "OpenAI",
          "In Echtzeit"
        ],
        [
          "Abonnementstatus",
          "Ja",
          "Lokales Gerät",
          "Apple/Google",
          "Bei Deinstallation"
        ],
        [
          "Spracheinstellung",
          "Ja",
          "Lokales Gerät",
          "Nein",
          "Bei Deinstallation"
        ],
        [
          "Design-Einstellung",
          "Ja",
          "Lokales Gerät",
          "Nein",
          "Bei Deinstallation"
        ],
        [
          "Audioeinstellungen",
          "Ja",
          "Lokales Gerät",
          "Nein",
          "Bei Deinstallation"
        ],
        [
          "Geräteinformationen",
          "Eingeschränkt",
          "Nein",
          "Nein",
          "N/A"
        ],
        [
          "IP-Adresse",
          "Ja",
          "AWS-Protokolle",
          "AWS",
          "90 Tage"
        ],
        [
          "Zahlungsinformationen",
          "Nein",
          "Nein",
          "Apple/Google",
          "N/A"
        ],
        [
          "Standortdaten",
          "Nein",
          "Nein",
          "Nein",
          "N/A"
        ],
        [
          "Gesundheitsdaten",
          "Nein",
          "Nein",
          "Nein",
          "N/A"
        ]
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "15. Haftungsausschluss"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Diese Datenschutzrichtlinie wird in der vorliegenden Form bereitgestellt. Relaxess ist kein medizinischer Dienst und bietet keine medizinische Beratung an. Alle gesundheitsbezogenen Informationen, die Sie in der Anwendung mitteilen, dienen ausschließlich Ihrem persönlichen Wohlbefinden und sollten nicht als medizinische Beratung angesehen werden."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Bitte wenden Sie sich bei medizinischen Anliegen an eine medizinische Fachkraft."
        }
      ]
    },
    {
      "type": "end",
      "segments": [
        {
          "text": "Ende der Datenschutzrichtlinie"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "Hinweis zur Übersetzung"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Diese Übersetzung wird ausschließlich zur leichteren Verständlichkeit bereitgestellt. Die englische Originalfassung ist die rechtlich maßgebliche Fassung dieser Datenschutzrichtlinie. Aufgrund möglicher sprachlicher oder rechtlicher Unterschiede bei Übersetzungen hat im Falle von Abweichungen, Widersprüchen oder unterschiedlichen Auslegungen die englische Fassung Vorrang."
        }
      ]
    }
  ]
};

const FR_POLICY: PolicyDocument = {
  "title": "Politique de confidentialité de Relaxess",
  "effective": "25 juin 2026",
  "updated": "25 juin 2026",
  "blocks": [
    {
      "type": "note",
      "segments": [
        {
          "text": "Avis concernant la traduction :",
          "bold": true
        },
        {
          "text": " La présente Politique de confidentialité est une traduction de la version originale anglaise. La version anglaise constitue le document juridiquement faisant foi. En cas de divergence, de contradiction, de différence d’interprétation ou d’inexactitude résultant de la traduction, la version anglaise prévaut, dans la mesure permise par la loi applicable."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "1. Introduction"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess (« nous », « notre », « nos » ou la « Société ») s’engage à protéger votre vie privée. La présente Politique de confidentialité explique comment nous collectons, utilisons, divulguons et protégeons vos informations lorsque vous utilisez notre application mobile Relaxess (l’« Application »)."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Veuillez lire attentivement cette Politique de confidentialité. Si vous n’acceptez pas nos politiques et pratiques, veuillez ne pas utiliser notre Application."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "2. Informations que nous collectons"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.1 Informations que vous nous fournissez directement"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Messages de chat et saisie vocale",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Lorsque vous utilisez les fonctionnalités « Session » ou « Sleep Mode », vous pouvez fournir du texte ou une saisie vocale afin de communiquer avec notre assistant basé sur l’intelligence artificielle."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les saisies vocales sont traitées temporairement à des fins de transcription."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les messages de chat sont envoyés à l’API d’OpenAI afin d’être traités et de générer des réponses."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Nous ne stockons pas vos messages de chat sur nos serveurs. Les messages sont traités en temps réel puis supprimés."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Autorisation d’accès au microphone",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Pour utiliser les fonctionnalités de saisie vocale, nous demandons l’accès au microphone de votre appareil."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les données vocales sont utilisées uniquement à des fins de transcription et ne sont pas conservées après leur traitement."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Vous pouvez révoquer l’autorisation d’accès au microphone à tout moment dans les paramètres de votre appareil."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Informations relatives à l’abonnement Premium",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Si vous souscrivez un abonnement Premium, les informations de paiement sont traitées par l’Apple App Store (iOS) ou Google Play (Android)."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Nous ne stockons aucune information relative à votre carte bancaire ou à votre paiement."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Le statut de votre abonnement est enregistré localement sur votre appareil."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.2 Informations collectées automatiquement"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Stockage local sur l’appareil (AsyncStorage)",
          "bold": true
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nous stockons localement sur votre appareil les informations suivantes :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Votre préférence de langue"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Le thème sélectionné (mode clair/sombre)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Le statut de votre abonnement Premium"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "La date d’expiration de votre abonnement Premium"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Vos préférences de lecture audio"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Informations relatives à l’appareil",
          "bold": true
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nous pouvons collecter des informations concernant le type d’appareil, la version du système d’exploitation et la version de l’Application à des fins de dépannage et d’analyse."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Streaming audio",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Lorsque vous écoutez des contenus audio provenant de notre stockage AWS S3 (musique, sons de forêt et de pluie), votre appareil se connecte directement à AWS S3."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "AWS peut collecter des données standard de journalisation de serveur Web, notamment l’adresse IP et l’heure d’accès."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Nous ne stockons aucune information concernant les pistes audio que vous écoutez."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "3. Comment nous utilisons vos informations"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.1 Utilisations principales"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Traitement des conversations par intelligence artificielle",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Vos messages de chat et vos saisies vocales sont envoyés à l’API d’OpenAI afin de générer des réponses."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAI traite ces données conformément à sa propre politique de confidentialité."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Nous utilisons ces informations uniquement afin de fournir la fonctionnalité de conversation assistée par intelligence artificielle."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Gestion de l’abonnement Premium",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Nous enregistrons le statut de votre abonnement Premium afin de débloquer les fonctionnalités Premium."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les informations relatives à l’abonnement sont stockées localement sur votre appareil."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Streaming audio",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Nous fournissons des liens directs vers des fichiers audio hébergés sur AWS S3."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Le streaming audio est utilisé afin de fournir le contenu audio de la fonctionnalité « Quiet Relaxation »."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Fonctionnalité de l’Application",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Nous utilisons les préférences stockées localement afin de personnaliser votre expérience."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les préférences de langue et de thème sont utilisées afin d’afficher l’Application dans la langue et avec le thème que vous avez sélectionnés."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.2 Utilisations secondaires"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Dépannage et assistance",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Nous pouvons utiliser les informations relatives à l’appareil afin de diagnostiquer et de résoudre des problèmes techniques."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les erreurs peuvent être enregistrées afin de nous aider à améliorer l’Application."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Analyse et amélioration",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Nous pouvons collecter des données d’utilisation anonymisées afin de comprendre comment les utilisateurs interagissent avec l’Application."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ces données nous aident à améliorer les fonctionnalités et à corriger les erreurs."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "4. Services tiers"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.1 API OpenAI"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Finalité :",
          "bold": true
        },
        {
          "text": " Fournir des réponses conversationnelles générées par intelligence artificielle"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Données partagées :",
          "bold": true
        },
        {
          "text": " Vos messages de chat et transcriptions vocales"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Politique de confidentialité :",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://openai.com/privacy/",
          "url": "https://openai.com/privacy/"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Conservation des données :",
          "bold": true
        },
        {
          "text": " OpenAI conserve les données conformément à sa propre politique de confidentialité. Veuillez consulter la politique de confidentialité d’OpenAI pour plus de détails."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.2 AWS S3"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Finalité :",
          "bold": true
        },
        {
          "text": " Héberger les fichiers audio utilisés par la fonctionnalité « Quiet Relaxation »"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Données partagées :",
          "bold": true
        },
        {
          "text": " Adresse IP de votre appareil et journaux d’accès"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Politique de confidentialité :",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://aws.amazon.com/privacy/",
          "url": "https://aws.amazon.com/privacy/"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Conservation des données :",
          "bold": true
        },
        {
          "text": " AWS conserve les journaux standard de serveur Web conformément à sa propre politique de confidentialité."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.3 Apple App Store / Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Finalité :",
          "bold": true
        },
        {
          "text": " Traiter les paiements des abonnements Premium"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Données partagées :",
          "bold": true
        },
        {
          "text": " Statut de votre abonnement et informations de paiement (traitées par Apple/Google, et non par nous)"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Politiques de confidentialité :",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Apple : "
        },
        {
          "text": "https://www.apple.com/privacy/",
          "url": "https://www.apple.com/privacy/"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Google : "
        },
        {
          "text": "https://policies.google.com/privacy",
          "url": "https://policies.google.com/privacy"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Conservation des données :",
          "bold": true
        },
        {
          "text": " Apple et Google conservent les informations relatives aux abonnements conformément à leurs politiques respectives."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "5. Données que nous NE collectons PAS"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Ce que nous NE faisons PAS :",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Nous NE vendons PAS vos données personnelles"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Nous N’utilisons PAS de SDK publicitaires ni de réseaux publicitaires"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Nous N’utilisons PAS de SDK de suivi (Google Analytics, Mixpanel, etc.)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Nous N’utilisons PAS de dispositifs de suivi des réseaux sociaux"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Nous NE partageons PAS vos données avec des tiers à des fins de marketing"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Nous NE stockons PAS vos messages de chat sur nos serveurs"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Nous NE stockons PAS vos enregistrements vocaux"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Nous NE suivons PAS les pistes audio que vous écoutez"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Nous NE collectons PAS de données de localisation"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Nous NE collectons PAS vos coordonnées"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ Nous NE collectons PAS d’informations relatives à votre santé au-delà de celles que vous choisissez volontairement de communiquer dans le chat"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "6. Sécurité des données"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.1 Sécurité du stockage local"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Toutes les données stockées localement sur votre appareil (préférences, statut de l’abonnement, thème) sont enregistrées à l’aide d’AsyncStorage, qui utilise les mécanismes de stockage natifs de l’appareil :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "iOS :",
          "bold": true
        },
        {
          "text": " Keychain (chiffré)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Android :",
          "bold": true
        },
        {
          "text": " SharedPreferences (chiffré sur Android 6.0 et versions ultérieures)"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.2 Transmission des données"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les messages de chat envoyés à OpenAI sont chiffrés pendant leur transmission à l’aide de HTTPS/TLS."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les flux audio provenant d’AWS S3 sont chiffrés pendant leur transmission à l’aide de HTTPS/TLS."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Toutes les communications avec les API utilisent un chiffrement conforme aux normes du secteur."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.3 Sécurité côté serveur"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Nous ne stockons pas les données des utilisateurs sur nos serveurs."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Tout le traitement est effectué en temps réel et les données sont supprimées après leur utilisation."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAI et AWS appliquent leurs propres pratiques de sécurité. Veuillez consulter leurs politiques de confidentialité respectives."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "7. Conservation des données"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.1 Messages de chat"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les messages de chat NE sont PAS stockés sur nos serveurs."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les messages sont traités par OpenAI en temps réel puis supprimés."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAI peut conserver les messages conformément à sa politique de confidentialité (voir "
        },
        {
          "text": "https://openai.com/privacy/",
          "url": "https://openai.com/privacy/"
        },
        {
          "text": ")."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.2 Enregistrements vocaux"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les enregistrements vocaux NE sont PAS stockés sur nos serveurs."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Les enregistrements sont transcrits en temps réel puis supprimés."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAI peut conserver les transcriptions conformément à sa politique de confidentialité."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.3 Données locales de l’appareil"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Les données stockées localement sur votre appareil (préférences, statut de l’abonnement) sont conservées jusqu’à ce que :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "vous supprimiez l’Application ;"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "vous supprimiez les données de l’Application dans les paramètres de votre appareil ;"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "vous réinitialisiez manuellement les préférences dans l’Application."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.4 Journaux d’accès audio"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "AWS S3 peut conserver les journaux standard de serveur Web pendant une durée maximale de 90 jours."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ces journaux ne sont pas associés à votre identité."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "8. Vos droits en matière de protection des données"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.1 Accès à vos données"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous avez le droit d’accéder aux données personnelles que nous conservons à votre sujet. Comme nous stockons certaines données localement sur votre appareil, vous pouvez y accéder en :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "consultant vos préférences dans l’écran « Settings » ;"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "consultant les paramètres de stockage de l’Application sur votre appareil."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.2 Suppression de vos données"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vous pouvez supprimer toutes les données que nous stockons en :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "désinstallant l’Application ;"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "supprimant les données de l’Application dans les paramètres de votre appareil ;"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "réinitialisant les préférences dans l’écran « Settings » de l’Application."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.3 Refus de la collecte de données"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Comme nous n’utilisons aucun SDK publicitaire ou de suivi, aucun mécanisme spécifique de désactivation n’est nécessaire. Vous pouvez toutefois :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "désactiver l’autorisation d’accès au microphone afin d’empêcher la saisie vocale ;"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "désactiver l’accès au réseau afin d’empêcher le streaming audio ;"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "utiliser les paramètres « Do Not Track » de votre appareil."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.4 Vos droits en vertu du RGPD (utilisateurs de l’UE)"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si vous vous trouvez dans l’Union européenne, vous disposez de droits supplémentaires en vertu du Règlement général sur la protection des données (RGPD) :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Droit d’accès :",
          "bold": true
        },
        {
          "text": " demander une copie de vos données personnelles"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Droit de rectification :",
          "bold": true
        },
        {
          "text": " faire corriger les données inexactes"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Droit à l’effacement :",
          "bold": true
        },
        {
          "text": " demander la suppression de vos données"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Droit à la limitation du traitement :",
          "bold": true
        },
        {
          "text": " limiter la manière dont nous utilisons vos données"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Droit à la portabilité des données :",
          "bold": true
        },
        {
          "text": " recevoir vos données dans un format portable"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Droit d’opposition :",
          "bold": true
        },
        {
          "text": " vous opposer au traitement de vos données"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Pour exercer ces droits, contactez-nous à l’adresse : "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.5 Vos droits en vertu du CCPA (utilisateurs de Californie)"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si vous résidez en Californie, vous disposez de droits en vertu du California Consumer Privacy Act (CCPA) :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Droit de savoir :",
          "bold": true
        },
        {
          "text": " demander quelles données personnelles nous collectons"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Droit à la suppression :",
          "bold": true
        },
        {
          "text": " demander la suppression de vos données"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Droit de refus :",
          "bold": true
        },
        {
          "text": " refuser la vente de vos données (nous ne vendons aucune donnée)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Droit à la non-discrimination :",
          "bold": true
        },
        {
          "text": " nous ne vous discriminerons pas en raison de l’exercice de vos droits en matière de confidentialité"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Pour exercer ces droits, contactez-nous à l’adresse : "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "9. Protection de la vie privée des enfants"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess n’est pas destiné aux enfants de moins de 13 ans. Nous ne collectons pas sciemment de données personnelles concernant des enfants de moins de 13 ans. Si nous apprenons que nous avons collecté des informations concernant un enfant de moins de 13 ans, nous supprimerons rapidement ces informations."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si vous êtes un parent ou un tuteur légal et que vous pensez que votre enfant a fourni des informations à Relaxess, veuillez nous contacter immédiatement à l’adresse : "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "10. Transferts internationaux de données"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Vos informations peuvent être transférées, stockées et traitées dans des pays autres que votre pays de résidence, y compris aux États-Unis. Ces pays peuvent appliquer des lois relatives à la protection des données différentes de celles de votre pays."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "En utilisant Relaxess, vous consentez au transfert de vos informations vers des pays situés en dehors de votre pays de résidence, où des règles différentes en matière de protection des données peuvent s’appliquer."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "11. Modifications de la présente Politique de confidentialité"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nous pouvons mettre à jour la présente Politique de confidentialité de temps à autre. Nous vous informerons de toute modification en mettant à jour la date « Dernière mise à jour » figurant au début de cette Politique de confidentialité."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "La poursuite de votre utilisation de Relaxess après l’entrée en vigueur de modifications constitue votre acceptation de la Politique de confidentialité mise à jour."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "12. Nous contacter"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Si vous avez des questions concernant cette Politique de confidentialité ou nos pratiques en matière de protection des données, veuillez nous contacter :"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "E-mail :",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Adresse postale :",
          "bold": true
        },
        {
          "text": " [Adresse de la société]"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Site Web :",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://relaxess.app",
          "url": "https://relaxess.app"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Nous répondrons à votre demande dans un délai de 30 jours."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "13. Conformité aux exigences des boutiques d’applications"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "13.1 Exigences de l’Apple App Store"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "La présente Politique de confidentialité répond aux exigences des App Store Review Guidelines d’Apple :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Décrit clairement les pratiques de collecte de données"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explique l’utilisation de l’autorisation d’accès au microphone"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Décrit les services tiers (OpenAI, AWS)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explique les informations relatives aux abonnements"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Fournit des coordonnées de contact"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explique les droits des utilisateurs et la suppression des données"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "13.2 Exigences de Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "La présente Politique de confidentialité répond aux exigences des Developer Program Policies de Google Play :"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Décrit clairement les pratiques de collecte de données"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explique l’utilisation de l’autorisation d’accès au microphone"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Décrit les services tiers"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explique les informations relatives aux abonnements"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Fournit des coordonnées de contact"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explique les droits des utilisateurs et la suppression des données"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "14. Résumé des pratiques relatives aux données"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "15. Clause de non-responsabilité"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "La présente Politique de confidentialité est fournie en l’état. Relaxess n’est pas un service médical et ne fournit aucun conseil médical. Toute information relative à la santé que vous partagez dans l’Application est destinée uniquement à votre bien-être personnel et ne doit pas être considérée comme un avis médical."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Veuillez consulter un professionnel de santé pour toute question ou préoccupation médicale."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "Version linguistique faisant foi"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "La présente traduction française est fournie afin de faciliter la compréhension de cette Politique de confidentialité."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "La "
        },
        {
          "text": "version anglaise originale de la Privacy Policy constitue la version juridiquement faisant foi",
          "bold": true
        },
        {
          "text": ". En raison des particularités linguistiques et juridiques propres à toute traduction, des différences ou des inexactitudes peuvent apparaître."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "En cas de divergence, de contradiction, de différence d’interprétation ou d’inexactitude entre la présente traduction et la version anglaise, "
        },
        {
          "text": "la version anglaise prévaut",
          "bold": true
        },
        {
          "text": ", dans la mesure permise par la loi applicable."
        }
      ]
    },
    {
      "type": "end",
      "segments": [
        {
          "text": "Fin de la Politique de confidentialité"
        }
      ]
    }
  ]
};

const PT_POLICY: PolicyDocument = {
  "title": "Política de Privacidade do Relaxess",
  "effective": "25 de junho de 2026",
  "updated": "25 de junho de 2026",
  "blocks": [
    {
      "type": "note",
      "segments": [
        {
          "text": "Aviso sobre a tradução:",
          "bold": true
        },
        {
          "text": " Esta Política de Privacidade é uma tradução da versão original em inglês. A versão em inglês constitui o documento juridicamente vinculativo. Em caso de qualquer discrepância, contradição, diferença de interpretação ou imprecisão decorrente da tradução, a versão em inglês prevalecerá, na medida permitida pela legislação aplicável."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "1. Introdução"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "A Relaxess (“nós”, “nos”, “nosso” ou a “Empresa”) está comprometida com a proteção da sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas informações quando você utiliza nosso aplicativo móvel Relaxess (o “Aplicativo”)."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Leia esta Política de Privacidade com atenção. Se você não concordar com nossas políticas e práticas, não utilize nosso Aplicativo."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "2. Informações que coletamos"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.1 Informações que você nos fornece diretamente"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Mensagens de chat e entrada de voz",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Ao utilizar os recursos “Session” ou “Sleep Mode”, você pode fornecer texto ou entrada de voz para se comunicar com nosso assistente de inteligência artificial."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "As entradas de voz são processadas temporariamente para fins de transcrição."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "As mensagens de chat são enviadas à API da OpenAI para processamento e geração de respostas."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Não armazenamos suas mensagens de chat em nossos servidores. As mensagens são processadas em tempo real e, em seguida, excluídas."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Permissão de acesso ao microfone",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Para utilizar os recursos de entrada de voz, solicitamos acesso ao microfone do seu dispositivo."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Os dados de voz são utilizados exclusivamente para transcrição e não são mantidos após o processamento."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Você pode revogar a permissão de acesso ao microfone a qualquer momento nas configurações do seu dispositivo."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Informações da assinatura Premium",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Se você adquirir uma assinatura Premium, as informações de pagamento serão processadas pela Apple App Store (iOS) ou pelo Google Play (Android)."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Não armazenamos informações do seu cartão de crédito ou de pagamento."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "O status da sua assinatura é armazenado localmente no seu dispositivo."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.2 Informações coletadas automaticamente"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Armazenamento local no dispositivo (AsyncStorage)",
          "bold": true
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Armazenamos localmente no seu dispositivo as seguintes informações:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Sua preferência de idioma"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "O tema selecionado (modo claro/escuro)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "O status da sua assinatura Premium"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "A data de expiração da sua assinatura Premium"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Suas preferências de reprodução de áudio"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Informações do dispositivo",
          "bold": true
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Podemos coletar informações sobre o tipo de dispositivo, a versão do sistema operacional e a versão do Aplicativo para fins de solução de problemas e análise."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Streaming de áudio",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Quando você reproduz conteúdo de áudio do nosso armazenamento AWS S3 (música, sons de floresta e chuva), seu dispositivo se conecta diretamente ao AWS S3."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "A AWS pode coletar dados padrão de logs de servidor Web, incluindo endereço IP e horário de acesso."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Não armazenamos informações sobre quais faixas de áudio você reproduz."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "3. Como usamos suas informações"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.1 Principais finalidades"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Processamento de conversas por inteligência artificial",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Suas mensagens de chat e entradas de voz são enviadas à API da OpenAI para gerar respostas."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "A OpenAI processa esses dados de acordo com sua própria Política de Privacidade."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utilizamos essas informações exclusivamente para fornecer o recurso de conversação com inteligência artificial."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Gerenciamento da assinatura Premium",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Registramos o status da sua assinatura Premium para desbloquear os recursos Premium."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "As informações da assinatura são armazenadas localmente no seu dispositivo."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Streaming de áudio",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Fornecemos links diretos para arquivos de áudio hospedados no AWS S3."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "O streaming de áudio é utilizado para fornecer o conteúdo de áudio do recurso “Quiet Relaxation”."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Funcionalidade do Aplicativo",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Utilizamos as preferências armazenadas localmente para personalizar sua experiência."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "As preferências de idioma e tema são utilizadas para exibir o Aplicativo no idioma e no tema selecionados por você."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.2 Usos secundários"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Solução de problemas e suporte",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Podemos utilizar informações do dispositivo para diagnosticar e solucionar problemas técnicos."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Erros podem ser registrados para nos ajudar a melhorar o Aplicativo."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Análise e melhoria",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Podemos coletar dados de uso anonimizados para entender como os usuários interagem com o Aplicativo."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Esses dados nos ajudam a melhorar os recursos e corrigir erros."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "4. Serviços de terceiros"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.1 API da OpenAI"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Finalidade:",
          "bold": true
        },
        {
          "text": " Fornecer respostas de conversação geradas por inteligência artificial"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Dados compartilhados:",
          "bold": true
        },
        {
          "text": " Suas mensagens de chat e transcrições de voz"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Política de Privacidade:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://openai.com/privacy/",
          "url": "https://openai.com/privacy/"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Retenção de dados:",
          "bold": true
        },
        {
          "text": " A OpenAI retém os dados de acordo com sua própria Política de Privacidade. Consulte a Política de Privacidade da OpenAI para obter mais detalhes."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.2 AWS S3"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Finalidade:",
          "bold": true
        },
        {
          "text": " Hospedar arquivos de áudio utilizados pelo recurso “Quiet Relaxation”"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Dados compartilhados:",
          "bold": true
        },
        {
          "text": " Endereço IP do seu dispositivo e logs de acesso"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Política de Privacidade:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://aws.amazon.com/privacy/",
          "url": "https://aws.amazon.com/privacy/"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Retenção de dados:",
          "bold": true
        },
        {
          "text": " A AWS retém logs padrão de servidor Web de acordo com sua própria Política de Privacidade."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.3 Apple App Store / Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Finalidade:",
          "bold": true
        },
        {
          "text": " Processar pagamentos de assinaturas Premium"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Dados compartilhados:",
          "bold": true
        },
        {
          "text": " Status da sua assinatura e informações de pagamento (processadas pela Apple/Google, e não por nós)"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Políticas de Privacidade:",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Apple: "
        },
        {
          "text": "https://www.apple.com/privacy/",
          "url": "https://www.apple.com/privacy/"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Google: "
        },
        {
          "text": "https://policies.google.com/privacy",
          "url": "https://policies.google.com/privacy"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Retenção de dados:",
          "bold": true
        },
        {
          "text": " A Apple e o Google retêm informações sobre assinaturas de acordo com suas respectivas políticas."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "5. Dados que NÃO coletamos"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O que NÃO fazemos:",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NÃO vendemos seus dados pessoais"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NÃO utilizamos SDKs de publicidade nem redes de publicidade"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NÃO utilizamos SDKs de rastreamento (Google Analytics, Mixpanel etc.)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NÃO utilizamos rastreadores de redes sociais"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NÃO compartilhamos seus dados com terceiros para fins de marketing"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NÃO armazenamos suas mensagens de chat em nossos servidores"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NÃO armazenamos suas gravações de voz"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NÃO rastreamos quais faixas de áudio você reproduz"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NÃO coletamos dados de localização"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NÃO coletamos suas informações de contato"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ NÃO coletamos informações de saúde além daquelas que você compartilha voluntariamente no chat"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "6. Segurança dos dados"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.1 Segurança do armazenamento local"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Todos os dados armazenados localmente no seu dispositivo (preferências, status da assinatura e tema) são armazenados utilizando o AsyncStorage, que utiliza os mecanismos nativos de armazenamento seguro do dispositivo:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "iOS:",
          "bold": true
        },
        {
          "text": " Keychain (criptografado)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Android:",
          "bold": true
        },
        {
          "text": " SharedPreferences (criptografado no Android 6.0 ou superior)"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.2 Transmissão de dados"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "As mensagens de chat enviadas à OpenAI são criptografadas durante a transmissão utilizando HTTPS/TLS."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Os streams de áudio provenientes do AWS S3 são criptografados durante a transmissão utilizando HTTPS/TLS."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Todas as comunicações com APIs utilizam criptografia de acordo com os padrões do setor."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.3 Segurança do lado do servidor"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Não armazenamos dados dos usuários em nossos servidores."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Todo o processamento ocorre em tempo real, e os dados são descartados após o uso."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "A OpenAI e a AWS mantêm suas próprias práticas de segurança. Consulte as respectivas Políticas de Privacidade."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "7. Retenção de dados"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.1 Mensagens de chat"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "As mensagens de chat NÃO são armazenadas em nossos servidores."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "As mensagens são processadas pela OpenAI em tempo real e, em seguida, descartadas."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "A OpenAI pode reter mensagens de acordo com sua Política de Privacidade (consulte "
        },
        {
          "text": "https://openai.com/privacy/",
          "url": "https://openai.com/privacy/"
        },
        {
          "text": ")."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.2 Gravações de voz"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "As gravações de voz NÃO são armazenadas em nossos servidores."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "As gravações são transcritas em tempo real e, em seguida, descartadas."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "A OpenAI pode reter as transcrições de acordo com sua Política de Privacidade."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.3 Dados locais do dispositivo"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Os dados armazenados localmente no seu dispositivo (preferências e status da assinatura) permanecem armazenados até que:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "você exclua o Aplicativo;"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "você exclua os dados do Aplicativo nas configurações do dispositivo;"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "você redefina manualmente as preferências no Aplicativo."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.4 Logs de acesso ao áudio"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "O AWS S3 pode reter logs padrão de servidor Web por até 90 dias."
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Esses logs não estão vinculados à sua identidade."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "8. Seus direitos de privacidade"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.1 Acesso aos seus dados"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você tem o direito de acessar os dados pessoais que mantemos sobre você. Como armazenamos determinados dados localmente no seu dispositivo, você pode acessá-los:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "verificando suas preferências na tela “Settings”;"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "verificando as configurações de armazenamento do Aplicativo no seu dispositivo."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.2 Exclusão dos seus dados"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Você pode excluir todos os dados que armazenamos:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "desinstalando o Aplicativo;"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "excluindo os dados do Aplicativo nas configurações do seu dispositivo;"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "redefinindo as preferências na tela “Settings” do Aplicativo."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.3 Recusa da coleta de dados"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Como não utilizamos SDKs de publicidade ou rastreamento, não é necessário um mecanismo específico de exclusão. No entanto, você pode:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "desativar a permissão do microfone para impedir a entrada de voz;"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "desativar o acesso à rede para impedir o streaming de áudio;"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "utilizar as configurações “Do Not Track” do seu dispositivo."
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.4 Seus direitos de acordo com o GDPR (usuários da UE)"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Se você estiver na União Europeia, terá direitos adicionais de acordo com o Regulamento Geral sobre a Proteção de Dados (GDPR):"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Direito de acesso:",
          "bold": true
        },
        {
          "text": " solicitar uma cópia dos seus dados pessoais"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Direito de retificação:",
          "bold": true
        },
        {
          "text": " corrigir dados incorretos"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Direito ao apagamento:",
          "bold": true
        },
        {
          "text": " solicitar a exclusão dos seus dados"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Direito à limitação do tratamento:",
          "bold": true
        },
        {
          "text": " limitar a forma como utilizamos seus dados"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Direito à portabilidade dos dados:",
          "bold": true
        },
        {
          "text": " receber seus dados em um formato portátil"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Direito de oposição:",
          "bold": true
        },
        {
          "text": " opor-se ao tratamento dos seus dados"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Para exercer esses direitos, entre em contato conosco pelo e-mail: "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.5 Seus direitos de acordo com o CCPA (usuários da Califórnia)"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Se você residir na Califórnia, terá direitos de acordo com o California Consumer Privacy Act (CCPA):"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Direito de saber:",
          "bold": true
        },
        {
          "text": " solicitar informações sobre quais dados pessoais coletamos"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Direito à exclusão:",
          "bold": true
        },
        {
          "text": " solicitar a exclusão dos seus dados"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Direito de recusa:",
          "bold": true
        },
        {
          "text": " recusar a venda dos seus dados (não vendemos dados)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Direito à não discriminação:",
          "bold": true
        },
        {
          "text": " não discriminaremos você pelo exercício dos seus direitos de privacidade"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Para exercer esses direitos, entre em contato conosco pelo e-mail: "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "9. Privacidade das crianças"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "O Relaxess não se destina a crianças menores de 13 anos. Não coletamos intencionalmente dados pessoais de crianças menores de 13 anos. Se tomarmos conhecimento de que coletamos informações de uma criança menor de 13 anos, excluiremos essas informações imediatamente."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Se você for pai, mãe ou responsável legal e acreditar que seu filho forneceu informações ao Relaxess, entre em contato conosco imediatamente pelo e-mail: "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "10. Transferências internacionais de dados"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Suas informações podem ser transferidas, armazenadas e processadas em países diferentes do seu país de residência, incluindo os Estados Unidos. Esses países podem ter leis de proteção de dados diferentes das leis do seu país."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Ao utilizar o Relaxess, você concorda com a transferência das suas informações para países fora do seu país de residência, onde podem ser aplicadas regras diferentes de proteção de dados."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "11. Alterações nesta Política de Privacidade"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Podemos atualizar esta Política de Privacidade periodicamente. Informaremos sobre quaisquer alterações atualizando a data de “Última atualização” no início desta Política de Privacidade."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "A continuidade do uso do Relaxess após a entrada em vigor das alterações constitui sua aceitação da Política de Privacidade atualizada."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "12. Entre em contato conosco"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Se você tiver dúvidas sobre esta Política de Privacidade ou sobre nossas práticas de privacidade, entre em contato conosco:"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "E-mail:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Endereço postal:",
          "bold": true
        },
        {
          "text": " [Endereço da empresa]"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Site:",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://relaxess.app",
          "url": "https://relaxess.app"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Responderemos à sua solicitação dentro de 30 dias."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "13. Conformidade com os requisitos das lojas de aplicativos"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "13.1 Requisitos da Apple App Store"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Esta Política de Privacidade atende aos requisitos das App Store Review Guidelines da Apple:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Descreve claramente as práticas de coleta de dados"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explica o uso da permissão de acesso ao microfone"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Descreve serviços de terceiros (OpenAI, AWS)"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explica as informações sobre assinaturas"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Fornece informações de contato"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explica os direitos dos usuários e a exclusão de dados"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "13.2 Requisitos do Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Esta Política de Privacidade atende aos requisitos das Developer Program Policies do Google Play:"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Descreve claramente as práticas de coleta de dados"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explica o uso da permissão de acesso ao microfone"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Descreve serviços de terceiros"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explica as informações sobre assinaturas"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Fornece informações de contato"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ Explica os direitos dos usuários e a exclusão de dados"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "14. Resumo das práticas de dados"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "15. Isenção de responsabilidade"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Esta Política de Privacidade é fornecida no estado em que se encontra. O Relaxess não é um serviço médico e não fornece aconselhamento médico. Qualquer informação relacionada à saúde que você compartilhar no Aplicativo destina-se exclusivamente ao seu bem-estar pessoal e não deve ser considerada aconselhamento médico."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Consulte um profissional de saúde em caso de dúvidas ou preocupações médicas."
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "Versão linguística juridicamente vinculativa"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Esta tradução para o português é fornecida para facilitar a compreensão desta Política de Privacidade."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "A "
        },
        {
          "text": "versão original em inglês da Privacy Policy constitui a versão juridicamente vinculativa",
          "bold": true
        },
        {
          "text": ". Devido às particularidades linguísticas e jurídicas inerentes a qualquer tradução, podem ocorrer diferenças ou imprecisões."
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Em caso de qualquer discrepância, contradição, diferença de interpretação ou imprecisão entre esta tradução e a versão em inglês, "
        },
        {
          "text": "a versão em inglês prevalecerá",
          "bold": true
        },
        {
          "text": ", na medida permitida pela legislação aplicável."
        }
      ]
    },
    {
      "type": "end",
      "segments": [
        {
          "text": "Fim da Política de Privacidade"
        }
      ]
    }
  ]
};

const JA_POLICY: PolicyDocument = {
  "title": "Relaxess プライバシーポリシー",
  "effective": "2026年6月25日",
  "updated": "2026年6月25日",
  "blocks": [
    {
      "type": "note",
      "segments": [
        {
          "text": "翻訳に関する注意事項：",
          "bold": true
        },
        {
          "text": " 本プライバシーポリシーは、英語の原文を日本語に翻訳したものです。法的に正式かつ基準となる文書は英語版です。翻訳に起因する相違、矛盾、解釈の違い、または不正確な点がある場合には、適用法で認められる範囲において英語版が優先されます。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "1. はじめに"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxess（以下「当社」、「私たち」または「Relaxess」といいます）は、お客様のプライバシー保護に努めています。本プライバシーポリシーは、お客様が当社のモバイルアプリケーション Relaxess（以下「本アプリ」といいます）を利用する際に、当社がお客様の情報をどのように収集、利用、開示および保護するかについて説明するものです。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本プライバシーポリシーをよくお読みください。当社の方針および取扱いに同意されない場合は、本アプリを使用しないでください。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "2. 当社が収集する情報"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.1 お客様から直接提供される情報"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "チャットメッセージおよび音声入力",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "「Session」または「Sleep Mode」機能を利用する際、お客様はAIアシスタントとやり取りするために、テキストまたは音声を入力することができます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "音声入力は、文字起こしを行う目的で一時的に処理されます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "チャットメッセージは、処理および応答生成のためにOpenAI APIへ送信されます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "当社は、お客様のチャットメッセージを当社のサーバーに保存しません。メッセージはリアルタイムで処理された後、破棄されます。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "マイクへのアクセス許可",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "音声入力機能を利用するために、お客様のデバイスのマイクへのアクセス許可を求めます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "音声データは文字起こしの目的にのみ使用され、処理後に当社が保存することはありません。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "マイクへのアクセス許可は、デバイスの設定からいつでも取り消すことができます。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Premiumサブスクリプション情報",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Premiumサブスクリプションを購入した場合、支払い情報はApple App Store（iOS）またはGoogle Play（Android）によって処理されます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "当社は、クレジットカード情報またはその他の支払い情報を保存しません。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "お客様のサブスクリプションステータスは、デバイス上にローカル保存されます。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "2.2 自動的に収集される情報"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "デバイス上のローカルストレージ（AsyncStorage）",
          "bold": true
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "当社は、以下の情報をお客様のデバイス上にローカル保存します。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "選択した言語設定"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "選択したテーマ（ライトモード／ダークモード）"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Premiumサブスクリプションのステータス"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Premiumサブスクリプションの有効期限"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "オーディオ再生に関する設定"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "デバイス情報",
          "bold": true
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "当社は、トラブルシューティングおよび分析の目的で、デバイスの種類、オペレーティングシステムのバージョン、本アプリのバージョンなどの情報を収集する場合があります。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "オーディオストリーミング",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "当社のAWS S3ストレージからオーディオコンテンツ（音楽、森林音、雨音など）をストリーミングする際、お客様のデバイスはAWS S3に直接接続します。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "AWSは、IPアドレスやアクセス時刻など、標準的なWebサーバーログ情報を収集する場合があります。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "当社は、お客様がどのオーディオトラックを聴いたかに関する情報を保存しません。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "3. お客様の情報の利用方法"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.1 主な利用目的"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "AIによる会話処理",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "お客様のチャットメッセージおよび音声入力は、応答を生成するためにOpenAI APIへ送信されます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAIは、同社のプライバシーポリシーに従ってこれらのデータを処理します。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "当社は、AI会話機能を提供する目的にのみこれらの情報を使用します。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Premiumサブスクリプションの管理",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Premium機能を利用可能にするため、お客様のPremiumサブスクリプションのステータスを記録します。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "サブスクリプション情報は、お客様のデバイス上にローカル保存されます。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "オーディオストリーミング",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "当社は、AWS S3に保存されているオーディオファイルへの直接リンクを提供します。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "オーディオストリーミングは、「Quiet Relaxation」機能のオーディオコンテンツを提供するために使用されます。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本アプリの機能",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "当社は、お客様の利用体験をカスタマイズするために、ローカルに保存された設定を使用します。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "言語およびテーマの設定は、お客様が選択した言語とテーマで本アプリを表示するために使用されます。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "3.2 その他の利用目的"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "トラブルシューティングおよびサポート",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "技術的な問題を診断および解決するために、デバイス情報を使用する場合があります。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリの改善に役立てるため、エラー情報が記録される場合があります。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "分析および改善",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "ユーザーが本アプリをどのように利用しているかを把握するため、匿名化された利用データを収集する場合があります。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "これらのデータは、機能の改善およびエラーの修正に役立てられます。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "4. 第三者サービス"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.1 OpenAI API"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "目的：",
          "bold": true
        },
        {
          "text": " AIによる会話応答の提供"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "共有されるデータ：",
          "bold": true
        },
        {
          "text": " お客様のチャットメッセージおよび音声の文字起こし"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "プライバシーポリシー：",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://openai.com/privacy/",
          "url": "https://openai.com/privacy/"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "データ保持：",
          "bold": true
        },
        {
          "text": " OpenAIは、同社のプライバシーポリシーに従ってデータを保持します。詳細については、OpenAIのプライバシーポリシーをご確認ください。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.2 AWS S3"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "目的：",
          "bold": true
        },
        {
          "text": " 「Quiet Relaxation」機能で使用するオーディオファイルのホスティング"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "共有されるデータ：",
          "bold": true
        },
        {
          "text": " お客様のデバイスのIPアドレスおよびアクセスログ"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "プライバシーポリシー：",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://aws.amazon.com/privacy/",
          "url": "https://aws.amazon.com/privacy/"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "データ保持：",
          "bold": true
        },
        {
          "text": " AWSは、同社のプライバシーポリシーに従って標準的なWebサーバーログを保持します。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "4.3 Apple App Store / Google Play"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "目的：",
          "bold": true
        },
        {
          "text": " Premiumサブスクリプションの支払い処理"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "共有されるデータ：",
          "bold": true
        },
        {
          "text": " サブスクリプションのステータスおよび支払い情報（当社ではなくAppleまたはGoogleが処理します）"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "プライバシーポリシー：",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Apple: "
        },
        {
          "text": "https://www.apple.com/privacy/",
          "url": "https://www.apple.com/privacy/"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Google: "
        },
        {
          "text": "https://policies.google.com/privacy",
          "url": "https://policies.google.com/privacy"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "データ保持：",
          "bold": true
        },
        {
          "text": " AppleおよびGoogleは、それぞれのポリシーに従ってサブスクリプションに関する情報を保持します。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "5. 当社が収集しないデータ"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "当社は以下のことを行いません：",
          "bold": true
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ お客様の個人データを販売しません"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ 広告SDKまたは広告ネットワークを使用しません"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ トラッキングSDK（Google Analytics、Mixpanelなど）を使用しません"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ ソーシャルメディアトラッカーを使用しません"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ マーケティング目的でお客様のデータを第三者と共有しません"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ お客様のチャットメッセージを当社のサーバーに保存しません"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ お客様の音声録音を保存しません"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ お客様がどのオーディオトラックを聴いたかを追跡しません"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ 位置情報を収集しません"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ 連絡先情報を収集しません"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "❌ お客様がチャットで自発的に共有する情報を超えて、健康に関する情報を収集しません"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "6. データセキュリティ"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.1 ローカルストレージのセキュリティ"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様のデバイス上にローカル保存されるすべてのデータ（設定、サブスクリプションステータス、テーマ）は、デバイスのネイティブストレージ機能を利用するAsyncStorageを使用して保存されます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "iOS：",
          "bold": true
        },
        {
          "text": " Keychain（暗号化）"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "Android：",
          "bold": true
        },
        {
          "text": " SharedPreferences（Android 6.0以降では暗号化）"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.2 データの送信"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAIへ送信されるチャットメッセージは、HTTPS/TLSを使用して送信中に暗号化されます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "AWS S3からストリーミングされるオーディオデータは、HTTPS/TLSを使用して送信中に暗号化されます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "APIとのすべての通信には、業界標準の暗号化が使用されます。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "6.3 サーバー側のセキュリティ"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "当社は、ユーザーデータを当社のサーバーに保存しません。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "すべての処理はリアルタイムで行われ、データは使用後に破棄されます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAIおよびAWSは、それぞれ独自のセキュリティ対策を実施しています。詳細については、それぞれのプライバシーポリシーをご確認ください。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "7. データの保持"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.1 チャットメッセージ"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "チャットメッセージは当社のサーバーには保存されません。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "メッセージはOpenAIによってリアルタイムで処理された後、破棄されます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAIは、同社のプライバシーポリシーに従ってメッセージを保持する場合があります（"
        },
        {
          "text": "https://openai.com/privacy/",
          "url": "https://openai.com/privacy/"
        },
        {
          "text": " をご確認ください）。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.2 音声録音"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "音声録音は当社のサーバーには保存されません。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "音声録音はリアルタイムで文字起こしされた後、破棄されます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "OpenAIは、同社のプライバシーポリシーに従って文字起こしデータを保持する場合があります。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.3 デバイス上のローカルデータ"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様のデバイス上にローカル保存されるデータ（設定、サブスクリプションステータス）は、以下のいずれかが行われるまで保持されます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリを削除する"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "デバイスの設定から本アプリのデータを削除する"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリ内で設定を手動でリセットする"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "7.4 オーディオアクセスログ"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "AWS S3は、標準的なWebサーバーログを最大90日間保持する場合があります。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "これらのログは、お客様の身元とは関連付けられません。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "8. お客様のプライバシーに関する権利"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.1 お客様のデータへのアクセス"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様には、当社がお客様について保持する個人データにアクセスする権利があります。当社が一部のデータをお客様のデバイス上にローカル保存しているため、以下の方法で確認できます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "「Settings」画面で設定を確認する"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "デバイス上の本アプリのストレージ設定を確認する"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.2 お客様のデータの削除"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "当社が保存するデータは、以下の方法で削除できます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリをアンインストールする"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "デバイスの設定から本アプリのデータを削除する"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "本アプリの「Settings」画面で設定をリセットする"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.3 データ収集の拒否"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "当社は広告SDKまたはトラッキングSDKを使用していないため、特別なオプトアウト手続きは必要ありません。ただし、お客様は以下を行うことができます。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "マイクへのアクセス許可を無効にして音声入力を停止する"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "ネットワークアクセスを無効にしてオーディオストリーミングを停止する"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "デバイスの「Do Not Track」設定を使用する"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.4 GDPRに基づく権利（EUのユーザー）"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "欧州連合（EU）にお住まいの場合、一般データ保護規則（GDPR）に基づき、以下の追加の権利があります。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "アクセス権：",
          "bold": true
        },
        {
          "text": " お客様の個人データのコピーを請求する権利"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "訂正権：",
          "bold": true
        },
        {
          "text": " 不正確なデータの訂正を求める権利"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "消去権：",
          "bold": true
        },
        {
          "text": " お客様のデータの削除を求める権利"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "処理制限権：",
          "bold": true
        },
        {
          "text": " 当社によるデータの利用方法を制限する権利"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "データポータビリティの権利：",
          "bold": true
        },
        {
          "text": " お客様のデータを移行可能な形式で受け取る権利"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "異議を申し立てる権利：",
          "bold": true
        },
        {
          "text": " お客様のデータの処理に異議を申し立てる権利"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "これらの権利を行使するには、"
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        },
        {
          "text": " までご連絡ください。"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "8.5 CCPAに基づく権利（カリフォルニア州のユーザー）"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "カリフォルニア州にお住まいの場合、California Consumer Privacy Act（CCPA）に基づき、以下の権利があります。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "知る権利：",
          "bold": true
        },
        {
          "text": " 当社が収集する個人データについて情報を請求する権利"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "削除する権利：",
          "bold": true
        },
        {
          "text": " お客様のデータの削除を求める権利"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "オプトアウトする権利：",
          "bold": true
        },
        {
          "text": " お客様のデータの販売を拒否する権利（当社はデータを販売しません）"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "差別されない権利：",
          "bold": true
        },
        {
          "text": " プライバシーに関する権利を行使したことを理由として、不利益な取扱いを受けない権利"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "これらの権利を行使するには、"
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        },
        {
          "text": " までご連絡ください。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "9. 子どものプライバシー"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxessは、13歳未満の子どもを対象としていません。当社は、13歳未満の子どもから個人データを意図的に収集することはありません。13歳未満の子どもから情報を収集したことが判明した場合、当社は速やかにその情報を削除します。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "保護者または法定代理人の方で、お子様がRelaxessに情報を提供したと思われる場合は、"
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        },
        {
          "text": " まで直ちにご連絡ください。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "10. 国際的なデータ移転"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "お客様の情報は、お客様の居住国以外の国（米国を含みます）に移転され、保存および処理される場合があります。これらの国では、お客様の居住国とは異なるデータ保護法が適用される場合があります。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Relaxessを利用することにより、お客様は、異なるデータ保護規則が適用される可能性のある居住国外の国へお客様の情報が移転されることに同意するものとします。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "11. 本プライバシーポリシーの変更"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "当社は、本プライバシーポリシーを随時更新する場合があります。変更があった場合は、本プライバシーポリシーの冒頭に記載されている「最終更新日」を更新することによりお知らせします。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "変更の発効後もRelaxessの利用を継続した場合、お客様は更新されたプライバシーポリシーに同意したものとみなされます。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "12. お問い合わせ"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本プライバシーポリシーまたは当社のプライバシーに関する取扱いについてご質問がある場合は、以下までお問い合わせください。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "メール：",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "support@relaxess.com",
          "url": "mailto:support@relaxess.com"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "郵送先：",
          "bold": true
        },
        {
          "text": " [会社住所]"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "ウェブサイト：",
          "bold": true
        },
        {
          "text": " "
        },
        {
          "text": "https://relaxess.app",
          "url": "https://relaxess.app"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "当社は、お問い合わせを受領してから30日以内に回答します。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "13. アプリストア要件への準拠"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "13.1 Apple App Storeの要件"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本プライバシーポリシーは、AppleのApp Store Review Guidelinesの要件に対応しています。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ データ収集の取扱いについて明確に説明しています"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ マイクへのアクセス許可の使用について説明しています"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ 第三者サービス（OpenAI、AWS）について説明しています"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ サブスクリプション情報について説明しています"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ 連絡先情報を提供しています"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ ユーザーの権利およびデータ削除について説明しています"
        }
      ]
    },
    {
      "type": "h3",
      "segments": [
        {
          "text": "13.2 Google Playの要件"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本プライバシーポリシーは、Google PlayのDeveloper Program Policiesの要件に対応しています。"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ データ収集の取扱いについて明確に説明しています"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ マイクへのアクセス許可の使用について説明しています"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ 第三者サービスについて説明しています"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ サブスクリプション情報について説明しています"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ 連絡先情報を提供しています"
        }
      ]
    },
    {
      "type": "bullet",
      "segments": [
        {
          "text": "✓ ユーザーの権利およびデータ削除について説明しています"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "14. データ取扱いの概要"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "15. 免責事項"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本プライバシーポリシーは、現状有姿で提供されます。Relaxessは医療サービスではなく、医学的助言を提供するものではありません。お客様が本アプリ内で共有する健康に関連する情報は、個人的なウェルネスの目的にのみ使用されるものであり、医学的助言として解釈されるべきではありません。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "医療上の懸念やご質問については、医療専門家にご相談ください。"
        }
      ]
    },
    {
      "type": "h2",
      "segments": [
        {
          "text": "法的に優先される言語版"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本日本語訳は、本プライバシーポリシーの内容を理解しやすくするために提供されています。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "Privacy Policyの英語原文が、法的に正式かつ基準となるバージョンです。",
          "bold": true
        },
        {
          "text": " 翻訳には言語上および法的なニュアンスの違いがあるため、内容に相違または不正確な点が生じる可能性があります。"
        }
      ]
    },
    {
      "type": "body",
      "segments": [
        {
          "text": "本日本語訳と英語版との間に相違、矛盾、解釈の違い、または不正確な点がある場合には、"
        },
        {
          "text": "適用法で認められる範囲において英語版が優先されます。",
          "bold": true
        }
      ]
    },
    {
      "type": "end",
      "segments": [
        {
          "text": "プライバシーポリシー終了"
        }
      ]
    }
  ]
};

function RichText({ segments, colors }: { segments: Segment[]; colors: ReturnType<typeof useColors> }) {
  return (
    <Text>
      {segments.map((segment, index) => (
        <Text
          key={index}
          onPress={segment.url ? () => Linking.openURL(segment.url!) : undefined}
          style={{
            fontWeight: segment.bold ? "700" : "400",
            color: segment.url ? colors.primary : undefined,
            textDecorationLine: segment.url ? "underline" : "none",
          }}
        >
          {segment.text}
        </Text>
      ))}
    </Text>
  );
}

function H1({ children, colors }: { children: string; colors: ReturnType<typeof useColors> }) {
  return (
    <Text
      style={{
        fontSize: 22,
        fontWeight: "700",
        color: colors.foreground,
        marginBottom: 4,
        lineHeight: 30,
      }}
    >
      {children}
    </Text>
  );
}

function H2({ segments, colors }: { segments: Segment[]; colors: ReturnType<typeof useColors> }) {
  return (
    <Text
      style={{
        fontSize: 17,
        fontWeight: "700",
        color: colors.foreground,
        marginTop: 20,
        marginBottom: 6,
        lineHeight: 24,
      }}
    >
      <RichText segments={segments} colors={colors} />
    </Text>
  );
}

function H3({ segments, colors }: { segments: Segment[]; colors: ReturnType<typeof useColors> }) {
  return (
    <Text
      style={{
        fontSize: 15,
        fontWeight: "600",
        color: colors.foreground,
        marginTop: 14,
        marginBottom: 4,
        lineHeight: 22,
      }}
    >
      <RichText segments={segments} colors={colors} />
    </Text>
  );
}

function Body({ segments, colors }: { segments: Segment[]; colors: ReturnType<typeof useColors> }) {
  return (
    <Text
      style={{
        fontSize: 14,
        color: colors.muted,
        lineHeight: 22,
        marginBottom: 8,
      }}
    >
      <RichText segments={segments} colors={colors} />
    </Text>
  );
}

function BulletItem({ segments, colors }: { segments: Segment[]; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={{ flexDirection: "row", marginBottom: 4, paddingLeft: 8 }}>
      <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22, marginRight: 6 }}>•</Text>
      <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22, flex: 1 }}>
        <RichText segments={segments} colors={colors} />
      </Text>
    </View>
  );
}

function Note({ segments, colors }: { segments: Segment[]; colors: ReturnType<typeof useColors> }) {
  return (
    <View
      style={{
        borderLeftWidth: 3,
        borderLeftColor: colors.primary,
        paddingLeft: 12,
        marginBottom: 12,
        marginTop: 4,
      }}
    >
      <Text style={{ fontSize: 13, color: colors.muted, lineHeight: 20, fontStyle: "italic" }}>
        <RichText segments={segments} colors={colors} />
      </Text>
    </View>
  );
}

function Divider({ colors }: { colors: ReturnType<typeof useColors> }) {
  return (
    <View
      style={{
        height: 1,
        backgroundColor: colors.border,
        marginVertical: 16,
        opacity: 0.5,
      }}
    />
  );
}

function DataTable({ headers, rows, colors }: { headers: string[]; rows: string[][]; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={{ marginTop: 6, marginBottom: 8 }}>
      {rows.map((row, idx) => (
        <View
          key={idx}
          style={{
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 8,
            padding: 10,
            marginBottom: 6,
            backgroundColor: idx % 2 === 0 ? "transparent" : "rgba(128,128,128,0.05)",
          }}
        >
          <Text style={{ fontSize: 13, fontWeight: "700", color: colors.foreground, marginBottom: 4 }}>
            {row[0]}
          </Text>
          <Text style={{ fontSize: 12, color: colors.muted, lineHeight: 18 }}>
            {headers.slice(1).map((header, col) => `${header}: ${row[col + 1] ?? ""}`).join(" · ")}
          </Text>
        </View>
      ))}
    </View>
  );
}

function PolicyContent({ policy, colors }: { policy: PolicyDocument; colors: ReturnType<typeof useColors> }) {
  let seenFirstSection = false;

  return (
    <>
      <H1 colors={colors}>{policy.title}</H1>

      <Text style={{ fontSize: 13, color: colors.muted, marginBottom: 4 }}>
        <Text style={{ fontWeight: "600" }}>
          {policy === ES_POLICY ? "Fecha de Vigencia:" : policy === DE_POLICY ? "Gültig ab:" : policy === FR_POLICY ? "Date d’entrée en vigueur :" : policy === PT_POLICY ? "Data de vigência:" : policy === JA_POLICY ? "発効日：" : "Effective Date:"}
        </Text> 
        {policy.effective}
      </Text>

      <Text style={{ fontSize: 13, color: colors.muted, marginBottom: 16 }}>
        <Text style={{ fontWeight: "600" }}>
          {policy === ES_POLICY ? "Última Actualización:" : policy === DE_POLICY ? "Zuletzt aktualisiert:" : policy === FR_POLICY ? "Dernière mise à jour :" : policy === PT_POLICY ? "Última atualização:" : policy === JA_POLICY ? "最終更新日：" : "Last Updated:"}
        </Text> 
        {policy.updated}
      </Text>

      <Divider colors={colors} />

      {policy.blocks.map((block, index) => {
        if (block.type === "h2") {
          const divider = seenFirstSection ? <Divider colors={colors} /> : null;
          seenFirstSection = true;
          return (
            <React.Fragment key={index}>
              {divider}
              <H2 segments={block.segments} colors={colors} />
            </React.Fragment>
          );
        }

        if (block.type === "h3") {
          return <H3 key={index} segments={block.segments} colors={colors} />;
        }

        if (block.type === "bullet") {
          return <BulletItem key={index} segments={block.segments} colors={colors} />;
        }

        if (block.type === "note") {
          return <Note key={index} segments={block.segments} colors={colors} />;
        }

        if (block.type === "table") {
          return <DataTable key={index} headers={block.headers} rows={block.rows} colors={colors} />;
        }

        if (block.type === "end") {
          return (
            <React.Fragment key={index}>
              <Divider colors={colors} />
              <Text
                style={{
                  fontSize: 13,
                  color: colors.muted,
                  textAlign: "center",
                  fontStyle: "italic",
                  marginBottom: 8,
                }}
              >
                <RichText segments={block.segments} colors={colors} />
              </Text>
            </React.Fragment>
          );
        }

        return <Body key={index} segments={block.segments} colors={colors} />;
      })}
    </>
  );
}

export default function PrivacyPolicyScreen() {
  const { language } = useAppContext();
  const router = useRouter();
  const colors = useColors();

  const languageCode = String(language).toLowerCase();
  const isSpanish = languageCode.startsWith("es");
  const isGerman = languageCode.startsWith("de");
  const isFrench = languageCode.startsWith("fr");
  const isPortuguese = languageCode.startsWith("pt");
  const isJapanese = languageCode.startsWith("ja");
  const policy =
    isSpanish ? ES_POLICY :
    isGerman ? DE_POLICY :
    isFrench ? FR_POLICY :
    isPortuguese ? PT_POLICY :
    isJapanese ? JA_POLICY :
    EN_POLICY;

  const handleBack = () => {
    if (Platform.OS !== "web") {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
    router.back();
  };

  return (
    <ScreenContainer className="pt-14">
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={{ paddingHorizontal: 20, paddingBottom: 60 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 24,
              paddingTop: 8,
            }}
          >
            <Pressable
              onPress={handleBack}
              style={({ pressed }) => ({ opacity: pressed ? 0.6 : 1, paddingRight: 16 })}
            >
              <Text style={{ fontSize: 16, color: colors.primary, fontWeight: "600" }}>
                {isSpanish ? "← Atrás" : isGerman ? "← Zurück" : isFrench ? "← Retour" : isPortuguese ? "← Voltar" : isJapanese ? "← 戻る" : "← Back"}
              </Text>
            </Pressable>

            <Text
              style={{
                fontSize: 18,
                fontWeight: "700",
                color: colors.foreground,
                flex: 1,
              }}
            >
              {isSpanish ? "Política de Privacidad" : isGerman ? "Datenschutzrichtlinie" : isFrench ? "Politique de confidentialité" : isPortuguese ? "Política de Privacidade" : isJapanese ? "プライバシーポリシー" : "Privacy Policy"}
            </Text>
          </View>

          <PolicyContent policy={policy} colors={colors} />
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
