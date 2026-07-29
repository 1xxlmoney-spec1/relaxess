# Relaxess Production Build & Deployment Guide

**Project:** Relaxess Mobile App  
**Platform:** Expo React Native (iOS & Android)  
**Last Updated:** July 2026

---

## Quick Start

### Prerequisites
- Node.js 18+ or 20+
- pnpm 9.12.0 (or npm/yarn)
- Expo CLI (`npm install -g expo-cli`)
- EAS CLI (`npm install -g eas-cli`)
- Xcode (for iOS builds)
- Android Studio (for Android builds)

### Installation

```bash
# Extract the archive
unzip relaxess_production_export.zip
cd calmspace

# Install dependencies
pnpm install

# Verify TypeScript
pnpm check

# Verify linting
pnpm lint

# Start dev server (optional)
pnpm dev
```

---

## Building for Production

### Android Build (Google Play)

```bash
# Build APK for testing
eas build --platform android --profile preview

# Build AAB for Google Play submission
eas build --platform android --profile production

# Download the build
# Link will be provided in terminal
```

**Google Play Submission:**
1. Go to [Google Play Console](https://play.google.com/console)
2. Create new app or select Relaxess
3. Upload AAB file to Internal Testing → Staging → Production
4. Fill in store listing details
5. Submit for review

### iOS Build (App Store)

```bash
# Build for TestFlight
eas build --platform ios --profile preview

# Build for App Store submission
eas build --platform ios --profile production

# Download the build
# Link will be provided in terminal
```

**App Store Submission:**
1. Go to [App Store Connect](https://appstoreconnect.apple.com)
2. Create new app or select Relaxess
3. Upload build via Transporter or web interface
4. Fill in app details, screenshots, description
5. Submit for review

---

## Project Structure

```
calmspace/
├── app/                    # Expo Router screens
│   ├── (tabs)/            # Tab-based navigation
│   ├── breathing.tsx      # Breathing exercise
│   ├── body-scan.tsx      # Body scan meditation
│   ├── grounding.tsx      # Grounding technique
│   ├── safe-place-visualization.tsx
│   ├── session.tsx        # AI chat session
│   └── sleep.tsx          # Sleep guidance
├── components/            # Reusable components
├── hooks/                 # Custom React hooks
├── lib/                   # Utilities & services
├── server/                # Backend (tRPC, database)
├── assets/                # Images, icons, splash screens
├── public/audio/          # Audio files
├── drizzle/               # Database schema & migrations
├── tests/                 # Unit tests
├── app.config.ts          # Expo configuration
├── package.json           # Dependencies
├── pnpm-lock.yaml         # Lock file
├── tsconfig.json          # TypeScript config
├── babel.config.js        # Babel config
├── metro.config.js        # Metro bundler config
└── eas.json               # EAS build config
```

---

## Configuration Files

### app.config.ts
Contains app name, version, iOS bundle ID, Android package name, and build settings.

**Update before release:**
- `appName`: Display name in app stores
- `version`: Semantic version (e.g., "1.0.0")
- `ios.bundleIdentifier`: Must match Apple provisioning profile
- `android.package`: Must match Google Play app ID

### eas.json
Contains build profiles for different environments.

**Profiles:**
- `preview`: For TestFlight/internal testing
- `production`: For App Store/Google Play release

### drizzle.config.ts
Database configuration. Update database URL for production.

---

## Environment Variables

Create `.env.local` in project root:

```env
# Database
DATABASE_URL=your_production_database_url

# API Keys (if needed)
OPENAI_API_KEY=your_key
```

**Important:** Never commit `.env.local` to git. Use EAS secrets for production:

```bash
eas secret:create
```

---

## Testing Before Release

### Local Testing
```bash
# Start dev server
pnpm dev

# Run tests
pnpm test

# Check TypeScript
pnpm check

# Lint code
pnpm lint
```

### Internal Testing (TestFlight/Google Play Internal Testing)
```bash
# Build preview version
eas build --platform ios --profile preview
eas build --platform android --profile preview

# Share with testers via TestFlight or Google Play Console
```

---

## Release Checklist

- [ ] Version bumped in `app.config.ts`
- [ ] All tests passing (`pnpm test`)
- [ ] No TypeScript errors (`pnpm check`)
- [ ] No ESLint warnings (`pnpm lint`)
- [ ] App builds successfully locally
- [ ] Screenshots and descriptions ready for app stores
- [ ] Privacy policy and terms of service prepared
- [ ] App icons and splash screens verified
- [ ] All audio files included and tested
- [ ] Database migrations applied
- [ ] Environment variables configured in EAS
- [ ] Build profiles verified in `eas.json`

---

## Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild
rm -rf node_modules .expo dist
pnpm install
pnpm check
```

### Missing Assets
- Verify all files in `assets/` and `public/audio/`
- Check asset references in code
- Ensure paths are relative, not absolute

### Database Issues
```bash
# Run migrations
pnpm db:push

# Check database connection
# Update DATABASE_URL in .env.local
```

### iOS Build Issues
- Verify bundle ID in `app.config.ts` matches Apple provisioning profile
- Check Xcode version compatibility
- Update Xcode if needed: `sudo xcode-select --install`

### Android Build Issues
- Verify package name in `app.config.ts`
- Check Android SDK version compatibility
- Update Android Studio if needed

---

## Post-Release

### Monitor App
- Check crash reports in app store dashboards
- Monitor user reviews and ratings
- Track download/install metrics

### Updates
```bash
# For bug fixes (patch version)
# Update version in app.config.ts (e.g., 1.0.0 → 1.0.1)
eas build --platform ios --profile production
eas build --platform android --profile production

# Submit new builds to app stores
```

---

## Support & Maintenance

- **Bug Reports:** Check app store reviews and crash logs
- **Feature Requests:** Track in GitHub issues
- **Deployment:** Use EAS for automated builds
- **Database:** Monitor with your database provider

---

## Additional Resources

- [Expo Documentation](https://docs.expo.dev)
- [EAS Build Documentation](https://docs.expo.dev/eas-update/introduction/)
- [React Native Documentation](https://reactnative.dev)
- [App Store Connect Help](https://help.apple.com/app-store-connect)
- [Google Play Console Help](https://support.google.com/googleplay/android-developer)

---

**Questions?** Refer to the official Expo and React Native documentation or contact your development team.
