/**
 * Terms of Use Screen
 *
 * Displays the full Relaxess Terms of Use as a native mobile screen.
 * Content is identical to TERMS_OF_USE.md — do not shorten or rewrite.
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

export default function TermsOfUseScreen() {
  const { language } = useAppContext();
  void language;
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
              Terms of Use
            </Text>
          </View>

          {/* ── Title ── */}
          <Text style={{ fontSize: 22, fontWeight: "700", color: colors.foreground, marginBottom: 4, lineHeight: 30 }}>
            Terms of Use (End User License Agreement)
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "600", color: colors.foreground, marginBottom: 8 }}>Relaxess</Text>
          <Text style={{ fontSize: 13, color: colors.muted, marginBottom: 4 }}>
            <Text style={{ fontWeight: "600" }}>Effective Date:</Text> June 25, 2026
          </Text>
          <Text style={{ fontSize: 13, color: colors.muted, marginBottom: 16 }}>
            <Text style={{ fontWeight: "600" }}>Last Updated:</Text> June 25, 2026
          </Text>

          <Divider colors={colors} />

          {/* ── Section 1 ── */}
          <H2 colors={colors}>1. Acceptance of Terms</H2>
          <Body colors={colors}>
            By downloading, installing, accessing, or using the Relaxess mobile application (the “Application”), you agree to be bound by these Terms of Use (the “Agreement”). If you do not agree to these terms, do not download or use the Application.
          </Body>
          <Body colors={colors}>
            These Terms of Use apply to all users of the Application, including casual browsers, contributors of information, and vendors of information.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 2 ── */}
          <H2 colors={colors}>2. License Grant</H2>
          <Body colors={colors}>
            Mykola Kubryakov (“we,” “us,” “our,” or “Company”) grants you a limited, non-exclusive, non-transferable, revocable license to use the Application for personal, non-commercial purposes in accordance with these Terms of Use.
          </Body>

          <H3 colors={colors}>2.1 Permitted Use</H3>
          <Body colors={colors}>You may use the Application to:</Body>
          <BulletItem colors={colors}>Access guided relaxation exercises and meditation tools</BulletItem>
          <BulletItem colors={colors}>Engage in conversations with our AI assistant</BulletItem>
          <BulletItem colors={colors}>Stream ambient audio content</BulletItem>
          <BulletItem colors={colors}>Manage your personal wellness preferences</BulletItem>
          <BulletItem colors={colors}>Subscribe to premium features (if applicable)</BulletItem>

          <H3 colors={colors}>2.2 Prohibited Use</H3>
          <Body colors={colors}>You may NOT use the Application to:</Body>
          <BulletItem colors={colors}>Reverse engineer, decompile, or disassemble the Application</BulletItem>
          <BulletItem colors={colors}>Modify, adapt, or create derivative works based on the Application</BulletItem>
          <BulletItem colors={colors}>Remove or alter any proprietary notices, labels, or marks</BulletItem>
          <BulletItem colors={colors}>Use the Application for commercial purposes without authorization</BulletItem>
          <BulletItem colors={colors}>Attempt to gain unauthorized access to the Application or its systems</BulletItem>
          <BulletItem colors={colors}>Interfere with or disrupt the Application or its servers</BulletItem>
          <BulletItem colors={colors}>Transmit viruses, malware, or harmful code</BulletItem>
          <BulletItem colors={colors}>Harass, threaten, or abuse other users</BulletItem>
          <BulletItem colors={colors}>Violate any applicable laws or regulations</BulletItem>
          <BulletItem colors={colors}>Use the Application in any manner that violates these Terms</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 3 ── */}
          <H2 colors={colors}>3. Description of Services</H2>

          <H3 colors={colors}>3.1 AI Conversations</H3>
          <Body colors={colors}>The Application provides access to an AI-powered conversation feature that allows you to:</Body>
          <BulletItem colors={colors}>Send text messages to an AI assistant</BulletItem>
          <BulletItem colors={colors}>Receive responses generated by artificial intelligence</BulletItem>
          <BulletItem colors={colors}>Engage in ongoing conversations about wellness and relaxation</BulletItem>
          <Body colors={colors}>
            Important: The AI assistant is not a licensed therapist, counselor, or medical professional. The Application does not provide medical advice, diagnosis, or treatment.
          </Body>

          <H3 colors={colors}>3.2 Relaxation Exercises</H3>
          <Body colors={colors}>The Application includes the following guided relaxation exercises:</Body>
          <BulletItem colors={colors}>Breathing Exercise: Guided breathing patterns for stress relief</BulletItem>
          <BulletItem colors={colors}>Body Scan: Progressive relaxation through body awareness</BulletItem>
          <BulletItem colors={colors}>Grounding Exercise: 5-4-3-2-1 sensory technique for anxiety relief</BulletItem>
          <BulletItem colors={colors}>Safe Place Visualization: Guided mental imagery for creating a peaceful space</BulletItem>
          <BulletItem colors={colors}>Sleep Mode: Gentle guidance designed to support better sleep</BulletItem>
          <BulletItem colors={colors}>Quiet Relaxation: Ambient sounds (Music, Forest, Rain)</BulletItem>
          <Body colors={colors}>
            Important: These exercises are for relaxation and wellness purposes only. They are not medical treatments and should not replace professional medical care.
          </Body>

          <H3 colors={colors}>3.3 Ambient Audio Streaming</H3>
          <Body colors={colors}>The Application provides access to ambient audio content including:</Body>
          <BulletItem colors={colors}>Music</BulletItem>
          <BulletItem colors={colors}>Forest sounds</BulletItem>
          <BulletItem colors={colors}>Rain sounds</BulletItem>
          <Body colors={colors}>
            Audio content is streamed directly from cloud servers and may require an active internet connection (except for premium offline downloads).
          </Body>

          <H3 colors={colors}>3.4 Premium Subscription</H3>
          <Body colors={colors}>The Application offers optional premium subscription plans:</Body>
          <BulletItem colors={colors}>Monthly Plan: $2.99/month</BulletItem>
          <BulletItem colors={colors}>Annual Plan: $24.99/year</BulletItem>
          <Body colors={colors}>Premium subscribers receive:</Body>
          <BulletItem colors={colors}>Unlimited AI conversations</BulletItem>
          <BulletItem colors={colors}>Access to all relaxation exercises</BulletItem>
          <BulletItem colors={colors}>Unlimited audio streaming</BulletItem>
          <BulletItem colors={colors}>Offline audio downloads (where available)</BulletItem>
          <BulletItem colors={colors}>Ad-free experience</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 4 ── */}
          <H2 colors={colors}>4. Microphone Permission</H2>
          <Body colors={colors}>
            The Application may request permission to access your device’s microphone to enable voice input features. You can:
          </Body>
          <BulletItem colors={colors}>Grant or deny microphone permission when prompted</BulletItem>
          <BulletItem colors={colors}>Revoke microphone permission at any time through your device settings</BulletItem>
          <BulletItem colors={colors}>Use the Application without granting microphone permission (some features may be unavailable)</BulletItem>
          <Body colors={colors}>
            Voice data is processed for transcription purposes only and is not stored on our servers.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 5 ── */}
          <H2 colors={colors}>5. Subscription Terms</H2>

          <H3 colors={colors}>5.1 Subscription Pricing and Billing</H3>
          <BulletItem colors={colors}>Subscriptions are billed automatically on a recurring basis</BulletItem>
          <BulletItem colors={colors}>Pricing is in USD and may vary by region and currency</BulletItem>
          <BulletItem colors={colors}>Billing occurs through Apple App Store (iOS) or Google Play (Android)</BulletItem>
          <BulletItem colors={colors}>We do not process or store payment information</BulletItem>

          <H3 colors={colors}>5.2 Subscription Renewal</H3>
          <BulletItem colors={colors}>Subscriptions automatically renew unless canceled</BulletItem>
          <BulletItem colors={colors}>You will be notified before each renewal</BulletItem>
          <BulletItem colors={colors}>Cancellation must be completed through your device’s app store settings</BulletItem>

          <H3 colors={colors}>5.3 Cancellation</H3>
          <Body colors={colors}>You can cancel your subscription at any time through:</Body>
          <BulletItem colors={colors}>iOS: Settings → [Your Name] → Subscriptions → Relaxess → Cancel Subscription</BulletItem>
          <BulletItem colors={colors}>Android: Google Play → Account → Subscriptions → Relaxess → Cancel</BulletItem>
          <Body colors={colors}>
            Cancellation takes effect at the end of your current billing period. No refunds are provided for partial months or unused portions of a subscription.
          </Body>

          <H3 colors={colors}>5.4 Free Trial</H3>
          <Body colors={colors}>If a free trial is offered:</Body>
          <BulletItem colors={colors}>Free trial period is non-renewable</BulletItem>
          <BulletItem colors={colors}>Conversion to paid subscription occurs automatically at the end of the trial</BulletItem>
          <BulletItem colors={colors}>Cancellation must occur before the trial ends to avoid charges</BulletItem>
          <BulletItem colors={colors}>We do not offer refunds for accidental conversions</BulletItem>

          <H3 colors={colors}>5.5 Refunds</H3>
          <Body colors={colors}>Refunds for subscription charges must be requested through your device’s app store:</Body>
          <BulletItem colors={colors}>iOS: Contact Apple Support through App Store</BulletItem>
          <BulletItem colors={colors}>Android: Contact Google Play Support</BulletItem>
          <Body colors={colors}>
            We do not process refunds directly. All refund requests must go through the respective app store.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 6 ── */}
          <H2 colors={colors}>6. Third-Party Services</H2>

          <H3 colors={colors}>6.1 OpenAI API</H3>
          <Body colors={colors}>The Application uses OpenAI’s API to power AI conversations. By using the Application, you agree to:</Body>
          <View style={{ paddingLeft: 8, marginBottom: 4 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>OpenAI’s Terms of Use: </Text>
            <LinkText url="https://openai.com/terms/" label="https://openai.com/terms/" colors={colors} />
          </View>
          <View style={{ paddingLeft: 8, marginBottom: 4 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>OpenAI’s Privacy Policy: </Text>
            <LinkText url="https://openai.com/privacy/" label="https://openai.com/privacy/" colors={colors} />
          </View>
          <BulletItem colors={colors}>Your conversations may be processed by OpenAI servers</BulletItem>

          <H3 colors={colors}>6.2 AWS S3</H3>
          <Body colors={colors}>The Application streams audio content from Amazon Web Services (AWS) S3. By using the Application, you acknowledge:</Body>
          <View style={{ paddingLeft: 8, marginBottom: 4 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>AWS Privacy Policy: </Text>
            <LinkText url="https://aws.amazon.com/privacy/" label="https://aws.amazon.com/privacy/" colors={colors} />
          </View>
          <BulletItem colors={colors}>AWS may collect standard web server logs</BulletItem>
          <BulletItem colors={colors}>Your IP address may be logged during audio streaming</BulletItem>

          <H3 colors={colors}>6.3 Apple App Store and Google Play</H3>
          <Body colors={colors}>The Application is distributed through:</Body>
          <BulletItem colors={colors}>Apple App Store (iOS)</BulletItem>
          <BulletItem colors={colors}>Google Play Store (Android)</BulletItem>
          <Body colors={colors}>You agree to the respective app store’s terms of service:</Body>
          <View style={{ paddingLeft: 8, marginBottom: 4 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>Apple: </Text>
            <LinkText url="https://www.apple.com/legal/internet-services/itunes/" label="https://www.apple.com/legal/internet-services/itunes/" colors={colors} />
          </View>
          <View style={{ paddingLeft: 8, marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>Google: </Text>
            <LinkText url="https://play.google.com/about/play-terms/" label="https://play.google.com/about/play-terms/" colors={colors} />
          </View>

          <Divider colors={colors} />

          {/* ── Section 7 ── */}
          <H2 colors={colors}>7. User Content and Submissions</H2>

          <H3 colors={colors}>7.1 Your Conversations</H3>
          <Body colors={colors}>Any text or voice input you provide to the Application (“User Content”) is:</Body>
          <BulletItem colors={colors}>Sent to OpenAI for processing</BulletItem>
          <BulletItem colors={colors}>Used to generate responses</BulletItem>
          <BulletItem colors={colors}>Subject to OpenAI’s privacy policy</BulletItem>
          <BulletItem colors={colors}>Not stored on our servers after processing</BulletItem>

          <H3 colors={colors}>7.2 Ownership</H3>
          <Body colors={colors}>
            You retain ownership of any User Content you create. However, by using the Application, you grant us a license to:
          </Body>
          <BulletItem colors={colors}>Process your User Content</BulletItem>
          <BulletItem colors={colors}>Use it to improve the Application (only in anonymized form)</BulletItem>
          <BulletItem colors={colors}>Share it with third-party services as necessary for functionality</BulletItem>

          <H3 colors={colors}>7.3 Prohibited Content</H3>
          <Body colors={colors}>You agree not to submit:</Body>
          <BulletItem colors={colors}>Illegal content</BulletItem>
          <BulletItem colors={colors}>Hateful or discriminatory content</BulletItem>
          <BulletItem colors={colors}>Sexually explicit content</BulletItem>
          <BulletItem colors={colors}>Violent or threatening content</BulletItem>
          <BulletItem colors={colors}>Content that violates others’ rights</BulletItem>
          <BulletItem colors={colors}>Spam or misleading content</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 8 ── */}
          <H2 colors={colors}>8. Intellectual Property Rights</H2>

          <H3 colors={colors}>8.1 Application Ownership</H3>
          <Body colors={colors}>
            The Application, including all content, features, and functionality, is owned by Mykola Kubryakov and is protected by copyright, trademark, and other intellectual property laws.
          </Body>

          <H3 colors={colors}>8.2 Limited License</H3>
          <Body colors={colors}>
            We grant you a limited license to use the Application for personal, non-commercial purposes. All other rights are reserved.
          </Body>

          <H3 colors={colors}>8.3 Trademarks</H3>
          <Body colors={colors}>
            “Relaxess” and related logos are trademarks of Mykola Kubryakov. You may not use these trademarks without permission.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 9 ── */}
          <H2 colors={colors}>9. Disclaimers and Limitations of Liability</H2>

          <H3 colors={colors}>9.1 Medical Disclaimer</H3>
          <Body colors={colors}>
            IMPORTANT: The Application is not a medical service and does not provide medical advice, diagnosis, treatment, or cure for any disease or condition.
          </Body>
          <BulletItem colors={colors}>The Application is for informational and wellness purposes only</BulletItem>
          <BulletItem colors={colors}>The AI assistant is not a licensed therapist, counselor, or medical professional</BulletItem>
          <BulletItem colors={colors}>Relaxation exercises are not medical treatments</BulletItem>
          <BulletItem colors={colors}>If you have a medical condition, mental health concern, or are in crisis, please contact a healthcare professional immediately</BulletItem>

          <H3 colors={colors}>9.2 No Warranty</H3>
          <Body colors={colors}>
            The Application is provided “AS IS” without warranty of any kind, express or implied, including but not limited to:
          </Body>
          <BulletItem colors={colors}>Warranties of merchantability</BulletItem>
          <BulletItem colors={colors}>Warranties of fitness for a particular purpose</BulletItem>
          <BulletItem colors={colors}>Warranties of non-infringement</BulletItem>
          <BulletItem colors={colors}>Warranties of accuracy or reliability</BulletItem>

          <H3 colors={colors}>9.3 Limitation of Liability</H3>
          <Body colors={colors}>To the maximum extent permitted by law, Mykola Kubryakov shall not be liable for:</Body>
          <BulletItem colors={colors}>Any indirect, incidental, special, consequential, or punitive damages</BulletItem>
          <BulletItem colors={colors}>Loss of data, revenue, or profits</BulletItem>
          <BulletItem colors={colors}>Interruption of service</BulletItem>
          <BulletItem colors={colors}>Errors or omissions in the Application</BulletItem>
          <BulletItem colors={colors}>Third-party content or services</BulletItem>
          <BulletItem colors={colors}>Your use or inability to use the Application</BulletItem>

          <H3 colors={colors}>9.4 Service Interruptions</H3>
          <Body colors={colors}>We do not guarantee that the Application will be:</Body>
          <BulletItem colors={colors}>Uninterrupted or error-free</BulletItem>
          <BulletItem colors={colors}>Available at all times</BulletItem>
          <BulletItem colors={colors}>Free from viruses or harmful code</BulletItem>
          <BulletItem colors={colors}>Secure or protected from unauthorized access</BulletItem>

          <H3 colors={colors}>9.5 User Responsibility</H3>
          <Body colors={colors}>You are responsible for:</Body>
          <BulletItem colors={colors}>Maintaining the confidentiality of your account</BulletItem>
          <BulletItem colors={colors}>All activities that occur under your account</BulletItem>
          <BulletItem colors={colors}>Your use of the Application</BulletItem>
          <BulletItem colors={colors}>Backing up your personal data</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 10 ── */}
          <H2 colors={colors}>10. Privacy and Data Protection</H2>

          <H3 colors={colors}>10.1 Privacy Policy</H3>
          <Body colors={colors}>
            Your use of the Application is governed by our Privacy Policy, which is incorporated by reference into these Terms of Use. Please review the Privacy Policy at:
          </Body>
          <View style={{ paddingLeft: 8, marginBottom: 8 }}>
            <LinkText url="https://relaxess.app/privacy" label="https://relaxess.app/privacy" colors={colors} />
          </View>

          <H3 colors={colors}>10.2 Data Collection</H3>
          <Body colors={colors}>The Application collects and processes data as described in the Privacy Policy, including:</Body>
          <BulletItem colors={colors}>Chat messages (processed by OpenAI)</BulletItem>
          <BulletItem colors={colors}>Voice input (processed by OpenAI)</BulletItem>
          <BulletItem colors={colors}>Local preferences (stored on your device)</BulletItem>
          <BulletItem colors={colors}>Device information (for troubleshooting)</BulletItem>

          <H3 colors={colors}>10.3 GDPR and CCPA Compliance</H3>
          <Body colors={colors}>
            If you are located in the European Union or California, you have additional rights regarding your data. Please refer to the Privacy Policy for details on exercising these rights.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 11 ── */}
          <H2 colors={colors}>11. Termination</H2>

          <H3 colors={colors}>11.1 Termination by You</H3>
          <Body colors={colors}>You may terminate this Agreement at any time by:</Body>
          <BulletItem colors={colors}>Uninstalling the Application</BulletItem>
          <BulletItem colors={colors}>Discontinuing use of the Application</BulletItem>
          <BulletItem colors={colors}>Canceling your subscription (if applicable)</BulletItem>

          <H3 colors={colors}>11.2 Termination by Us</H3>
          <Body colors={colors}>We may terminate or suspend your access to the Application if you:</Body>
          <BulletItem colors={colors}>Violate these Terms of Use</BulletItem>
          <BulletItem colors={colors}>Engage in illegal activity</BulletItem>
          <BulletItem colors={colors}>Harass or abuse other users</BulletItem>
          <BulletItem colors={colors}>Attempt to compromise the Application’s security</BulletItem>
          <BulletItem colors={colors}>Violate any applicable laws</BulletItem>
          <Body colors={colors}>Termination may occur without notice in cases of serious violations.</Body>

          <H3 colors={colors}>11.3 Effect of Termination</H3>
          <Body colors={colors}>Upon termination:</Body>
          <BulletItem colors={colors}>Your license to use the Application is revoked</BulletItem>
          <BulletItem colors={colors}>You must stop using the Application immediately</BulletItem>
          <BulletItem colors={colors}>Provisions that survive termination remain in effect</BulletItem>
          <BulletItem colors={colors}>We may delete your account and data after a reasonable period</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 12 ── */}
          <H2 colors={colors}>12. Modifications to Terms</H2>
          <Body colors={colors}>
            We may modify these Terms of Use at any time. Changes will be effective immediately upon posting to the Application or our website.
          </Body>
          <Body colors={colors}>
            Your continued use of the Application after any changes constitutes your acceptance of the updated Terms of Use.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 13 ── */}
          <H2 colors={colors}>13. Modifications to Application</H2>
          <Body colors={colors}>We reserve the right to:</Body>
          <BulletItem colors={colors}>Modify or discontinue the Application or any feature</BulletItem>
          <BulletItem colors={colors}>Change pricing or subscription terms</BulletItem>
          <BulletItem colors={colors}>Remove or add features</BulletItem>
          <BulletItem colors={colors}>Restrict access to certain features</BulletItem>
          <Body colors={colors}>
            We will attempt to provide notice of significant changes, but are not obligated to do so.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 14 ── */}
          <H2 colors={colors}>14. Governing Law and Jurisdiction</H2>
          <Body colors={colors}>
            These Terms of Use are governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law principles.
          </Body>
          <Body colors={colors}>
            You agree to submit to the exclusive jurisdiction of the courts located in [Jurisdiction] for any disputes arising from these Terms of Use or the Application.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 15 ── */}
          <H2 colors={colors}>15. Dispute Resolution</H2>

          <H3 colors={colors}>15.1 Informal Resolution</H3>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>
              Before initiating any legal proceedings, you agree to attempt to resolve disputes informally by contacting us at{" "}
            </Text>
            <LinkText url="mailto:support@relaxess.com" label="support@relaxess.com" colors={colors} />
          </View>

          <H3 colors={colors}>15.2 Arbitration</H3>
          <Body colors={colors}>
            Any dispute that cannot be resolved informally shall be resolved through binding arbitration rather than in court, except as provided in Section 15.3.
          </Body>

          <H3 colors={colors}>15.3 Small Claims Exception</H3>
          <Body colors={colors}>
            You may bring claims in small claims court if the dispute qualifies for small claims jurisdiction.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 16 ── */}
          <H2 colors={colors}>16. Severability</H2>
          <Body colors={colors}>
            If any provision of these Terms of Use is found to be invalid or unenforceable, that provision shall be severed, and the remaining provisions shall continue in full force and effect.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 17 ── */}
          <H2 colors={colors}>17. Entire Agreement</H2>
          <Body colors={colors}>
            These Terms of Use, together with the Privacy Policy, constitute the entire agreement between you and Mykola Kubryakov regarding the Application and supersede all prior agreements and understandings.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 18 ── */}
          <H2 colors={colors}>18. Contact Information</H2>
          <Body colors={colors}>
            If you have questions about these Terms of Use or the Application, please contact us at:
          </Body>
          <View style={{ marginBottom: 4 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22, fontWeight: "600" }}>Email: </Text>
            <LinkText url="mailto:support@relaxess.com" label="support@relaxess.com" colors={colors} />
          </View>
          <Body colors={colors}><Text style={{ fontWeight: "600" }}>Mailing Address:</Text> [Company Address]</Body>
          <View style={{ marginBottom: 4 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22, fontWeight: "600" }}>Website: </Text>
            <LinkText url="https://relaxess.app" label="https://relaxess.app" colors={colors} />
          </View>
          <Body colors={colors}><Text style={{ fontWeight: "600" }}>Phone:</Text> [Phone Number] (optional)</Body>
          <Body colors={colors}>We will respond to your inquiry within 30 days.</Body>

          <Divider colors={colors} />

          {/* ── Section 19 ── */}
          <H2 colors={colors}>19. Children’s Privacy</H2>
          <Body colors={colors}>
            The Application is not intended for children under the age of 13. We do not knowingly collect personal information from children under 13.
          </Body>
          <Body colors={colors}>
            If we become aware that a child under 13 has provided information to the Application, we will delete such information immediately.
          </Body>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>
              Parents or guardians who believe their child has provided information should contact us immediately at{" "}
            </Text>
            <LinkText url="mailto:support@relaxess.com" label="support@relaxess.com" colors={colors} />
          </View>

          <Divider colors={colors} />

          {/* ── Section 20 ── */}
          <H2 colors={colors}>20. Compliance with Laws</H2>
          <Body colors={colors}>
            You agree to comply with all applicable laws, rules, and regulations when using the Application. You are responsible for ensuring your use of the Application complies with local, state, national, and international laws.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 21 ── */}
          <H2 colors={colors}>21. Accessibility</H2>
          <View style={{ marginBottom: 8 }}>
            <Text style={{ fontSize: 14, color: colors.muted, lineHeight: 22 }}>
              We are committed to making the Application accessible to all users. If you experience accessibility issues, please contact us at{" "}
            </Text>
            <LinkText url="mailto:support@relaxess.com" label="support@relaxess.com" colors={colors} />
          </View>

          <Divider colors={colors} />

          {/* ── Section 22 ── */}
          <H2 colors={colors}>22. Export Compliance</H2>
          <Body colors={colors}>
            The Application may be subject to export control laws, including the U.S. Export Administration Regulations (EAR) and the International Traffic in Arms Regulations (ITAR).
          </Body>
          <Body colors={colors}>
            You agree not to export or re-export the Application to any country or entity prohibited by U.S. law or to any person or entity on any U.S. government list of prohibited parties.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 23 ── */}
          <H2 colors={colors}>23. Feedback and Suggestions</H2>
          <Body colors={colors}>
            Any feedback, suggestions, or ideas you provide regarding the Application may be used by us without compensation or attribution. You grant us a perpetual, irrevocable, worldwide, royalty-free license to use such feedback.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 24 ── */}
          <H2 colors={colors}>24. Third-Party Links</H2>
          <Body colors={colors}>The Application may contain links to third-party websites and services. We are not responsible for:</Body>
          <BulletItem colors={colors}>The content of third-party sites</BulletItem>
          <BulletItem colors={colors}>The accuracy of third-party information</BulletItem>
          <BulletItem colors={colors}>Third-party privacy practices</BulletItem>
          <BulletItem colors={colors}>Third-party terms of service</BulletItem>
          <Body colors={colors}>Your use of third-party sites is governed by their terms and policies.</Body>

          <Divider colors={colors} />

          {/* ── Section 25 ── */}
          <H2 colors={colors}>25. Indemnification</H2>
          <Body colors={colors}>
            You agree to indemnify and hold harmless Mykola Kubryakov and its officers, directors, employees, and agents from any claims, damages, losses, or expenses (including legal fees) arising from:
          </Body>
          <BulletItem colors={colors}>Your use of the Application</BulletItem>
          <BulletItem colors={colors}>Your violation of these Terms of Use</BulletItem>
          <BulletItem colors={colors}>Your violation of any applicable laws</BulletItem>
          <BulletItem colors={colors}>Your infringement of any third-party rights</BulletItem>
          <BulletItem colors={colors}>Your User Content</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 26 ── */}
          <H2 colors={colors}>26. Waiver</H2>
          <Body colors={colors}>
            The failure of Mykola Kubryakov to enforce any provision of these Terms of Use does not constitute a waiver of that provision or any other provision.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 27 ── */}
          <H2 colors={colors}>27. Survival</H2>
          <Body colors={colors}>The following provisions survive termination of this Agreement:</Body>
          <BulletItem colors={colors}>Intellectual Property Rights (Section 8)</BulletItem>
          <BulletItem colors={colors}>Disclaimers and Limitations of Liability (Section 9)</BulletItem>
          <BulletItem colors={colors}>Privacy and Data Protection (Section 10)</BulletItem>
          <BulletItem colors={colors}>Governing Law and Jurisdiction (Section 14)</BulletItem>
          <BulletItem colors={colors}>Indemnification (Section 25)</BulletItem>

          <Divider colors={colors} />

          {/* ── Section 28 ── */}
          <H2 colors={colors}>28. Notices</H2>
          <Body colors={colors}>Any notices required by these Terms of Use shall be provided by:</Body>
          <BulletItem colors={colors}>Email to the address associated with your account</BulletItem>
          <BulletItem colors={colors}>Posting to the Application</BulletItem>
          <BulletItem colors={colors}>Posting to our website</BulletItem>
          <Body colors={colors}>Notices are effective upon receipt or posting.</Body>

          <Divider colors={colors} />

          {/* ── Section 29 ── */}
          <H2 colors={colors}>29. Assignment</H2>
          <Body colors={colors}>
            You may not assign or transfer your rights under this Agreement. We may assign our rights to a successor or affiliate.
          </Body>

          <Divider colors={colors} />

          {/* ── Section 30 ── */}
          <H2 colors={colors}>30. Severability and Waiver</H2>
          <Body colors={colors}>
            If any provision is found invalid, the remaining provisions continue in effect. The failure to enforce any right does not constitute a waiver of that right.
          </Body>

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
            End of Terms of Use
          </Text>
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}
