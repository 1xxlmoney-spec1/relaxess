/**
 * Privacy Policy Screen
 *
 * Displays the full Relaxess Privacy Policy as a native mobile screen.
 * Content is identical to PRIVACY_POLICY.md — do not shorten or rewrite.
 * Supports Dark Mode, Light Mode, safe area, and full vertical scroll.
 */

import React from "react";
import { ScrollView, View, Text, Pressable, Linking, Platform } from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { useAppContext } from "@/lib/app-context";
import { useRouter } from "expo-router";
import { useColors } from "@/hooks/use-colors";
import * as Haptics from "expo-haptics";

// ─── Typography helpers ───────────────────────────────────────────────────────

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

function H2({ children, colors }: { children: string; colors: ReturnType<typeof useColors> }) {
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
      {children}
    </Text>
  );
}

function H3({ children, colors }: { children: string; colors: ReturnType<typeof useColors> }) {
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
      {children}
    </Text>
  );
}

function Body({ children, colors }: { children: React.ReactNode; colors: ReturnType<typeof useColors> }) {
  return (
    <Text
      style={{
        fontSize: 14,
        color: colors.muted,
        lineHeight: 22,
        marginBottom: 8,
      }}
    >
      {children}
    </Text>
  );
}

function BulletItem({ children, colors }: { children: string; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={{ flexDirection: "row", marginBottom: 4, paddingLeft: 8 }}>
      <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22, marginRight: 6 }}>•</Text>
      <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22, flex: 1 }}>{children}</Text>
    </View>
  );
}

function LinkText({ url, label, colors }: { url: string; label: string; colors: ReturnType<typeof useColors> }) {
  return (
    <Text
      onPress={() => Linking.openURL(url)}
      style={{ fontSize: 14, color: colors.primary, lineHeight: 22, textDecorationLine: "underline" }}
    >
      {label}
    </Text>
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

// ─── Screen ───────────────────────────────────────────────────────────────────

export default function PrivacyPolicyScreen() {
  const { language } = useAppContext();
  void language; // used implicitly via useAppContext
  const router = useRouter();
  const colors = useColors();

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
          {/* Navigation Header */}
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
                ← Back
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
              Privacy Policy
            </Text>
          </View>

          {/* ── Title ── */}
          <H1 colors={colors}>Privacy Policy for Relaxess</H1>
          <Text style={{ fontSize: 13, color: colors.muted, marginBottom: 4 }}>
            <Text style={{ fontWeight: "600" }}>Effective Date:</Text> June 25, 2026
          </Text>
          <Text style={{ fontSize: 13, color: colors.muted, marginBottom: 16 }}>
            <Text style={{ fontWeight: "600" }}>Last Updated:</Text> June 25, 2026
          </Text>

          <Divider colors={colors} />

          {/* ── Section 1 ── */}
          <H2 colors={colors}>1. Introduction</H2>
          <Body colors={colors}>
            Relaxess (“we,” “us,” “our,” or “Company”) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mobile application, Relaxess (the “Application”).
          </Body>
          <Body colors={colors}>
            Please read this Privacy Policy carefully. If you do not agree with our policies and practices, please do not use our Application.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 2 ── */}
          <H2 colors={colors}>2. Information We Collect</H2>

          <H3 colors={colors}>2.1 Information You Provide Directly</H3>

          <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4, marginTop: 8 }}>
            Chat Messages and Voice Input
          </Text>
          <BulletItem colors={colors}>When you use the Session or Sleep Mode features, you may provide text or voice input to communicate with our AI assistant.</BulletItem>
          <BulletItem colors={colors}>Voice input is temporarily processed for transcription purposes.</BulletItem>
          <BulletItem colors={colors}>Chat messages are sent to OpenAI’s API for processing and response generation.</BulletItem>
          <BulletItem colors={colors}>We do not store your chat messages on our servers. Messages are processed in real-time and then discarded.</BulletItem>

          <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4, marginTop: 12 }}>
            Microphone Permission
          </Text>
          <BulletItem colors={colors}>To use voice input features, we request access to your device’s microphone.</BulletItem>
          <BulletItem colors={colors}>Voice data is only used for transcription and is not stored after processing.</BulletItem>
          <BulletItem colors={colors}>You can revoke microphone permission at any time through your device settings.</BulletItem>

          <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4, marginTop: 12 }}>
            Premium Subscription Information
          </Text>
          <BulletItem colors={colors}>When you purchase a Premium subscription, payment information is processed through Apple App Store (iOS) or Google Play (Android).</BulletItem>
          <BulletItem colors={colors}>We do not store credit card or payment information.</BulletItem>
          <BulletItem colors={colors}>Your subscription status is stored locally on your device.</BulletItem>

          <H3 colors={colors}>2.2 Information Automatically Collected</H3>

          <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4, marginTop: 8 }}>
            Local Device Storage (AsyncStorage)
          </Text>
          <Body colors={colors}>We store the following information locally on your device:</Body>
          <BulletItem colors={colors}>Your selected language preference</BulletItem>
          <BulletItem colors={colors}>Your selected theme (light/dark mode)</BulletItem>
          <BulletItem colors={colors}>Your premium subscription status</BulletItem>
          <BulletItem colors={colors}>Premium subscription expiration date</BulletItem>
          <BulletItem colors={colors}>Audio playback preferences</BulletItem>

          <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4, marginTop: 12 }}>
            Device Information
          </Text>
          <Body colors={colors}>
            We may collect information about your device type, operating system version, and app version for troubleshooting and analytics purposes.
          </Body>

          <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4, marginTop: 12 }}>
            Audio Streaming
          </Text>
          <BulletItem colors={colors}>When you stream audio from our AWS S3 bucket (Music, Forest, Rain sounds), your device connects directly to AWS S3.</BulletItem>
          <BulletItem colors={colors}>AWS may collect standard web server logs including IP address and access time.</BulletItem>
          <BulletItem colors={colors}>We do not store information about which audio tracks you listen to.</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 3 ── */}
          <H2 colors={colors}>3. How We Use Your Information</H2>

          <H3 colors={colors}>3.1 Primary Uses</H3>

          <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4, marginTop: 8 }}>
            AI Conversation Processing
          </Text>
          <BulletItem colors={colors}>Your chat messages and voice input are sent to OpenAI’s API to generate responses.</BulletItem>
          <BulletItem colors={colors}>OpenAI processes this data according to their privacy policy.</BulletItem>
          <BulletItem colors={colors}>We use this information solely to provide the AI-powered conversation feature.</BulletItem>

          <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4, marginTop: 12 }}>
            Premium Subscription Management
          </Text>
          <BulletItem colors={colors}>We track your premium subscription status to enable premium features.</BulletItem>
          <BulletItem colors={colors}>Subscription information is stored locally on your device.</BulletItem>

          <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4, marginTop: 12 }}>
            Audio Streaming
          </Text>
          <BulletItem colors={colors}>We provide direct links to audio files stored on AWS S3.</BulletItem>
          <BulletItem colors={colors}>Audio streaming is used to deliver Quiet Relaxation audio content.</BulletItem>

          <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4, marginTop: 12 }}>
            Application Functionality
          </Text>
          <BulletItem colors={colors}>We use locally stored preferences to personalize your experience.</BulletItem>
          <BulletItem colors={colors}>Language and theme preferences are used to display the app in your chosen language and theme.</BulletItem>

          <H3 colors={colors}>3.2 Secondary Uses</H3>

          <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4, marginTop: 8 }}>
            Troubleshooting and Support
          </Text>
          <BulletItem colors={colors}>We may use device information to troubleshoot technical issues.</BulletItem>
          <BulletItem colors={colors}>Error messages may be logged to help us improve the application.</BulletItem>

          <Text style={{ fontSize: 14, fontWeight: "600", color: colors.foreground, marginBottom: 4, marginTop: 12 }}>
            Analytics and Improvement
          </Text>
          <BulletItem colors={colors}>We may collect anonymized usage data to understand how users interact with the application.</BulletItem>
          <BulletItem colors={colors}>This data helps us improve features and fix bugs.</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 4 ── */}
          <H2 colors={colors}>4. Third-Party Services</H2>

          <H3 colors={colors}>4.1 OpenAI API</H3>
          <Body colors={colors}><Text style={{ fontWeight: "600" }}>Purpose:</Text> Provides AI-powered conversation responses</Body>
          <Body colors={colors}><Text style={{ fontWeight: "600" }}>Data Shared:</Text> Your chat messages and voice transcriptions</Body>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>
              <Text style={{ fontWeight: "600" }}>Privacy Policy: </Text>
            </Text>
            <LinkText url="https://openai.com/privacy/" label="https://openai.com/privacy/" colors={colors} />
          </View>
          <Body colors={colors}><Text style={{ fontWeight: "600" }}>Data Retention:</Text> OpenAI retains data according to their privacy policy. Please review OpenAI’s privacy policy for details.</Body>

          <H3 colors={colors}>4.2 AWS S3</H3>
          <Body colors={colors}><Text style={{ fontWeight: "600" }}>Purpose:</Text> Hosts audio files for Quiet Relaxation feature</Body>
          <Body colors={colors}><Text style={{ fontWeight: "600" }}>Data Shared:</Text> Your device’s IP address and access logs</Body>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>
              <Text style={{ fontWeight: "600" }}>Privacy Policy: </Text>
            </Text>
            <LinkText url="https://aws.amazon.com/privacy/" label="https://aws.amazon.com/privacy/" colors={colors} />
          </View>
          <Body colors={colors}><Text style={{ fontWeight: "600" }}>Data Retention:</Text> AWS retains standard web server logs according to their privacy policy.</Body>

          <H3 colors={colors}>4.3 Apple App Store / Google Play</H3>
          <Body colors={colors}><Text style={{ fontWeight: "600" }}>Purpose:</Text> Processes premium subscription payments</Body>
          <Body colors={colors}><Text style={{ fontWeight: "600" }}>Data Shared:</Text> Your subscription status and payment information (processed by Apple/Google, not by us)</Body>
          <View style={{ marginBottom: 4 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22, fontWeight: "600" }}>Privacy Policy:</Text>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 2 }}>
              <Text style={{ fontSize: 14, color: colors.muted }}>Apple: </Text>
              <LinkText url="https://www.apple.com/privacy/" label="https://www.apple.com/privacy/" colors={colors} />
            </View>
            <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 4, marginTop: 2 }}>
              <Text style={{ fontSize: 14, color: colors.muted }}>Google: </Text>
              <LinkText url="https://policies.google.com/privacy" label="https://policies.google.com/privacy" colors={colors} />
            </View>
          </View>
          <Body colors={colors}><Text style={{ fontWeight: "600" }}>Data Retention:</Text> Apple and Google retain subscription information according to their policies.</Body>

          <Divider colors={colors} />

          {/* ── Section 5 ── */}
          <H2 colors={colors}>5. Data We Do NOT Collect</H2>
          <H3 colors={colors}>What We Do NOT Do:</H3>
          <BulletItem colors={colors}>❌ We do NOT sell your personal data</BulletItem>
          <BulletItem colors={colors}>❌ We do NOT use advertising SDKs or ad networks</BulletItem>
          <BulletItem colors={colors}>❌ We do NOT use tracking SDKs (Google Analytics, Mixpanel, etc.)</BulletItem>
          <BulletItem colors={colors}>❌ We do NOT use social media trackers</BulletItem>
          <BulletItem colors={colors}>❌ We do NOT share your data with third parties for marketing</BulletItem>
          <BulletItem colors={colors}>❌ We do NOT store your chat messages on our servers</BulletItem>
          <BulletItem colors={colors}>❌ We do NOT store your voice recordings</BulletItem>
          <BulletItem colors={colors}>❌ We do NOT track which audio tracks you listen to</BulletItem>
          <BulletItem colors={colors}>❌ We do NOT collect location data</BulletItem>
          <BulletItem colors={colors}>❌ We do NOT collect contact information</BulletItem>
          <BulletItem colors={colors}>❌ We do NOT collect health information beyond what you voluntarily share in chat</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 6 ── */}
          <H2 colors={colors}>6. Data Security</H2>

          <H3 colors={colors}>6.1 Local Storage Security</H3>
          <Body colors={colors}>
            All data stored locally on your device (preferences, subscription status, theme) is stored using AsyncStorage, which uses the device’s native secure storage mechanisms:
          </Body>
          <BulletItem colors={colors}>iOS: Keychain (encrypted)</BulletItem>
          <BulletItem colors={colors}>Android: SharedPreferences (encrypted on Android 6.0+)</BulletItem>

          <H3 colors={colors}>6.2 Data in Transit</H3>
          <BulletItem colors={colors}>Chat messages sent to OpenAI are encrypted in transit using HTTPS/TLS.</BulletItem>
          <BulletItem colors={colors}>Audio streams from AWS S3 are encrypted in transit using HTTPS/TLS.</BulletItem>
          <BulletItem colors={colors}>All API communications use industry-standard encryption.</BulletItem>

          <H3 colors={colors}>6.3 Server-Side Security</H3>
          <BulletItem colors={colors}>We do not store user data on servers.</BulletItem>
          <BulletItem colors={colors}>All processing happens in real-time and data is discarded after use.</BulletItem>
          <BulletItem colors={colors}>OpenAI and AWS maintain their own security practices. Please review their privacy policies.</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 7 ── */}
          <H2 colors={colors}>7. Data Retention</H2>

          <H3 colors={colors}>7.1 Chat Messages</H3>
          <BulletItem colors={colors}>Chat messages are NOT stored on our servers.</BulletItem>
          <BulletItem colors={colors}>Messages are processed in real-time by OpenAI and then discarded.</BulletItem>
          <View style={{ paddingLeft: 8, marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>OpenAI may retain messages according to their privacy policy (please review </Text>
            <LinkText url="https://openai.com/privacy/" label="https://openai.com/privacy/" colors={colors} />
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>).</Text>
          </View>

          <H3 colors={colors}>7.2 Voice Recordings</H3>
          <BulletItem colors={colors}>Voice recordings are NOT stored on our servers.</BulletItem>
          <BulletItem colors={colors}>Recordings are transcribed in real-time and then discarded.</BulletItem>
          <BulletItem colors={colors}>OpenAI may retain transcriptions according to their privacy policy.</BulletItem>

          <H3 colors={colors}>7.3 Local Device Data</H3>
          <Body colors={colors}>Data stored locally on your device (preferences, subscription status) remains until:</Body>
          <BulletItem colors={colors}>You delete the application</BulletItem>
          <BulletItem colors={colors}>You clear the app’s data through device settings</BulletItem>
          <BulletItem colors={colors}>You manually reset preferences in the app</BulletItem>

          <H3 colors={colors}>7.4 Audio Access Logs</H3>
          <BulletItem colors={colors}>AWS S3 may retain standard web server logs for up to 90 days.</BulletItem>
          <BulletItem colors={colors}>These logs are not associated with your identity.</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 8 ── */}
          <H2 colors={colors}>8. Your Privacy Rights</H2>

          <H3 colors={colors}>8.1 Access Your Data</H3>
          <Body colors={colors}>
            You have the right to access the personal data we hold about you. Since we store data locally on your device, you can access this data by:
          </Body>
          <BulletItem colors={colors}>Reviewing your preferences in the Settings screen</BulletItem>
          <BulletItem colors={colors}>Checking your device’s app storage settings</BulletItem>

          <H3 colors={colors}>8.2 Delete Your Data</H3>
          <Body colors={colors}>You can delete all data we store by:</Body>
          <BulletItem colors={colors}>Uninstalling the application</BulletItem>
          <BulletItem colors={colors}>Clearing the app’s data through your device settings</BulletItem>
          <BulletItem colors={colors}>Resetting preferences in the app’s Settings screen</BulletItem>

          <H3 colors={colors}>8.3 Opt-Out of Data Collection</H3>
          <Body colors={colors}>
            Since we do not use advertising or tracking SDKs, there is no opt-out mechanism needed. However, you can:
          </Body>
          <BulletItem colors={colors}>Disable microphone permission to prevent voice input</BulletItem>
          <BulletItem colors={colors}>Disable network access to prevent audio streaming</BulletItem>
          <BulletItem colors={colors}>Use Do Not Track settings on your device</BulletItem>

          <H3 colors={colors}>8.4 Your Rights Under GDPR (EU Users)</H3>
          <Body colors={colors}>
            If you are located in the European Union, you have additional rights under the General Data Protection Regulation (GDPR):
          </Body>
          <BulletItem colors={colors}>Right to Access: Request a copy of your personal data</BulletItem>
          <BulletItem colors={colors}>Right to Rectification: Correct inaccurate data</BulletItem>
          <BulletItem colors={colors}>Right to Erasure: Request deletion of your data</BulletItem>
          <BulletItem colors={colors}>Right to Restrict Processing: Limit how we use your data</BulletItem>
          <BulletItem colors={colors}>Right to Data Portability: Receive your data in a portable format</BulletItem>
          <BulletItem colors={colors}>Right to Object: Object to processing of your data</BulletItem>
          <View style={{ paddingLeft: 8, marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>To exercise these rights, contact us at: </Text>
            <LinkText url="mailto:support@relaxess.com" label="support@relaxess.com" colors={colors} />
          </View>

          <H3 colors={colors}>8.5 Your Rights Under CCPA (California Users)</H3>
          <Body colors={colors}>
            If you are a California resident, you have rights under the California Consumer Privacy Act (CCPA):
          </Body>
          <BulletItem colors={colors}>Right to Know: Request what personal data we collect</BulletItem>
          <BulletItem colors={colors}>Right to Delete: Request deletion of your data</BulletItem>
          <BulletItem colors={colors}>Right to Opt-Out: Opt out of data sales (we do not sell data)</BulletItem>
          <BulletItem colors={colors}>Right to Non-Discrimination: We do not discriminate based on privacy choices</BulletItem>
          <View style={{ paddingLeft: 8, marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>To exercise these rights, contact us at: </Text>
            <LinkText url="mailto:support@relaxess.com" label="support@relaxess.com" colors={colors} />
          </View>

          <Divider colors={colors} />

          {/* ── Section 9 ── */}
          <H2 colors={colors}>9. Children’s Privacy</H2>
          <Body colors={colors}>
            Relaxess is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected information from a child under 13, we will delete such information immediately.
          </Body>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>
              If you are a parent or guardian and believe your child has provided information to Relaxess, please contact us immediately at:{" "}
            </Text>
            <LinkText url="mailto:support@relaxess.com" label="support@relaxess.com" colors={colors} />
          </View>

          <Divider colors={colors} />

          {/* ── Section 10 ── */}
          <H2 colors={colors}>10. International Data Transfers</H2>
          <Body colors={colors}>
            Your information may be transferred to, stored in, and processed in countries other than your country of residence, including the United States. These countries may have data protection laws that differ from your home country.
          </Body>
          <Body colors={colors}>
            By using Relaxess, you consent to the transfer of your information to countries outside your country of residence, which may have different data protection rules.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 11 ── */}
          <H2 colors={colors}>11. Changes to This Privacy Policy</H2>
          <Body colors={colors}>
            We may update this Privacy Policy from time to time. We will notify you of any changes by updating the “Last Updated” date at the top of this Privacy Policy.
          </Body>
          <Body colors={colors}>
            Your continued use of Relaxess after any changes constitutes your acceptance of the updated Privacy Policy.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 12 ── */}
          <H2 colors={colors}>12. Contact Us</H2>
          <Body colors={colors}>
            If you have questions about this Privacy Policy or our privacy practices, please contact us at:
          </Body>
          <View style={{ marginBottom: 4 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22, fontWeight: "600" }}>Email: </Text>
            <LinkText url="mailto:support@relaxess.com" label="support@relaxess.com" colors={colors} />
          </View>
          <Body colors={colors}><Text style={{ fontWeight: "600" }}>Mailing Address:</Text> [Company Address]</Body>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22, fontWeight: "600" }}>Website: </Text>
            <LinkText url="https://relaxess.app" label="https://relaxess.app" colors={colors} />
          </View>
          <Body colors={colors}>We will respond to your inquiry within 30 days.</Body>

          <Divider colors={colors} />

          {/* ── Section 13 ── */}
          <H2 colors={colors}>13. App Store Compliance</H2>

          <H3 colors={colors}>13.1 Apple App Store Requirements</H3>
          <Body colors={colors}>This Privacy Policy complies with Apple’s App Store Review Guidelines:</Body>
          <BulletItem colors={colors}>✓ Clearly describes data collection practices</BulletItem>
          <BulletItem colors={colors}>✓ Explains use of microphone permission</BulletItem>
          <BulletItem colors={colors}>✓ Describes third-party services (OpenAI, AWS)</BulletItem>
          <BulletItem colors={colors}>✓ Explains subscription information</BulletItem>
          <BulletItem colors={colors}>✓ Provides contact information</BulletItem>
          <BulletItem colors={colors}>✓ Explains user rights and data deletion</BulletItem>

          <H3 colors={colors}>13.2 Google Play Requirements</H3>
          <Body colors={colors}>This Privacy Policy complies with Google Play’s Developer Program Policies:</Body>
          <BulletItem colors={colors}>✓ Clearly describes data collection practices</BulletItem>
          <BulletItem colors={colors}>✓ Explains use of microphone permission</BulletItem>
          <BulletItem colors={colors}>✓ Describes third-party services</BulletItem>
          <BulletItem colors={colors}>✓ Explains subscription information</BulletItem>
          <BulletItem colors={colors}>✓ Provides contact information</BulletItem>
          <BulletItem colors={colors}>✓ Explains user rights and data deletion</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 14 ── */}
          <H2 colors={colors}>14. Summary of Data Practices</H2>

          {/* Table rendered as rows */}
          {[
            ["Chat Messages", "Yes", "No (OpenAI)", "OpenAI", "Real-time"],
            ["Voice Recordings", "Yes", "No (OpenAI)", "OpenAI", "Real-time"],
            ["Subscription Status", "Yes", "Local Device", "Apple/Google", "On uninstall"],
            ["Language Preference", "Yes", "Local Device", "No", "On uninstall"],
            ["Theme Preference", "Yes", "Local Device", "No", "On uninstall"],
            ["Audio Preferences", "Yes", "Local Device", "No", "On uninstall"],
            ["Device Information", "Limited", "No", "No", "N/A"],
            ["IP Address", "Yes", "AWS Logs", "AWS", "90 days"],
            ["Payment Information", "No", "No", "Apple/Google", "N/A"],
            ["Location Data", "No", "No", "No", "N/A"],
            ["Health Data", "No", "No", "No", "N/A"],
          ].map(([type, collected, stored, shared, deleted], idx) => (
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
              <Text style={{ fontSize: 13, fontWeight: "700", color: colors.foreground, marginBottom: 4 }}>{type}</Text>
              <Text style={{ fontSize: 12, color: colors.muted }}>
                Collected: {collected} · Stored: {stored} · Shared: {shared} · Deleted: {deleted}
              </Text>
            </View>
          ))}

          <Divider colors={colors} />

          {/* ── Section 15 ── */}
          <H2 colors={colors}>15. Disclaimer</H2>
          <Body colors={colors}>
            This Privacy Policy is provided as-is. Relaxess is not a medical service and does not provide medical advice. Any health-related information you share in the application is for personal wellness purposes only and should not be considered medical advice.
          </Body>
          <Body colors={colors}>Please consult with a healthcare professional for medical concerns.</Body>

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
            End of Privacy Policy
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
