# Relaxess Deployment Checklist

## Pre-Deployment Verification

### Code Quality
- [x] TypeScript compilation: 0 errors
- [x] ESLint: All critical issues resolved
- [x] Unit tests: All passing
- [x] No console.log debug statements
- [x] No TODO placeholders in production code
- [x] All imports resolved
- [x] No broken asset references

### Assets & Resources
- [x] App icons present (icon.png, android-icon-*)
- [x] Splash screens present (splash-icon.png)
- [x] All audio files included (11 tracks in public/audio/)
- [x] All images referenced in code exist
- [x] No external storage references
- [x] All fonts included
- [x] All animations working

### Configuration
- [x] app.config.ts: App name updated
- [x] app.config.ts: Version set correctly
- [x] app.config.ts: iOS bundle ID configured
- [x] app.config.ts: Android package name configured
- [x] eas.json: Build profiles configured
- [x] drizzle.config.ts: Database URL set
- [x] Environment variables configured

### Functionality
- [x] Home screen: All mood cards working
- [x] Session screen: Chat interface functional
- [x] Relaxation tools: All exercises accessible
- [x] Music player: Audio playback working
- [x] Settings: Language selection working
- [x] Premium prompts: Displayed correctly
- [x] Navigation: All routes working
- [x] Database: Migrations applied

### Build Verification
- [x] `pnpm install` succeeds
- [x] `pnpm check` passes (TypeScript)
- [x] `pnpm lint` shows no critical errors
- [x] `pnpm dev` starts successfully
- [x] App renders without errors
- [x] Web preview loads correctly

---

## Google Play Submission

### Before Upload
- [ ] Version code incremented (app.config.ts)
- [ ] Version name updated (app.config.ts)
- [ ] Android package name verified
- [ ] Keystore configured for signing
- [ ] AAB file built successfully

### Store Listing
- [ ] App title: "Relaxess"
- [ ] Short description (80 chars max)
- [ ] Full description (4000 chars max)
- [ ] Screenshots (minimum 2, maximum 8)
- [ ] Feature graphic (1024x500px)
- [ ] Icon (512x512px)
- [ ] Privacy policy URL provided
- [ ] Content rating questionnaire completed
- [ ] Target audience selected

### Release
- [ ] Release notes prepared
- [ ] Staged rollout percentage set (start with 5-10%)
- [ ] Monitor crash reports after release

---

## App Store Submission

### Before Upload
- [ ] Version number incremented (app.config.ts)
- [ ] iOS bundle ID verified
- [ ] Provisioning profile valid
- [ ] Code signing certificate valid
- [ ] Build uploaded to App Store Connect

### App Information
- [ ] App name: "Relaxess"
- [ ] Subtitle (30 chars max)
- [ ] Keyword list (100 chars max)
- [ ] Description (4000 chars max)
- [ ] Support URL provided
- [ ] Marketing URL (optional)
- [ ] Privacy policy URL provided

### Screenshots & Media
- [ ] Screenshots for all required device sizes
- [ ] Preview video (optional but recommended)
- [ ] App icon (1024x1024px)
- [ ] App preview (30 seconds max)

### Review Information
- [ ] Sign-in credentials if needed
- [ ] Demo account details if applicable
- [ ] Notes for reviewer (if needed)
- [ ] Content rating questionnaire completed
- [ ] Age rating selected

### Release
- [ ] Automatic or manual release selected
- [ ] Monitor review status
- [ ] Prepare for rejection handling

---

## Post-Release Monitoring

### First 24 Hours
- [ ] Check app store dashboards for crashes
- [ ] Monitor user reviews
- [ ] Check download/install metrics
- [ ] Verify no critical bugs reported

### First Week
- [ ] Analyze crash reports
- [ ] Review user feedback
- [ ] Monitor ratings trend
- [ ] Check retention metrics

### Ongoing
- [ ] Weekly crash report review
- [ ] Monthly performance analysis
- [ ] Quarterly feature planning
- [ ] Regular security updates

---

## Rollback Plan

If critical issues discovered after release:

1. **Stop Staged Rollout** (Google Play)
   - Go to Google Play Console
   - Select app → Release → Manage staged rollout
   - Stop rollout

2. **Pause Release** (App Store)
   - Go to App Store Connect
   - Select app → TestFlight → External Testing
   - Remove from external testing if needed

3. **Build Hotfix**
   ```bash
   # Fix critical issue
   git commit -m "Hotfix: [issue description]"
   
   # Increment patch version
   # Update app.config.ts version
   
   # Build new version
   eas build --platform ios --profile production
   eas build --platform android --profile production
   ```

4. **Resubmit**
   - Upload new build to app stores
   - Explain issue and fix in release notes

---

## Success Criteria

✅ **Launch Successful When:**
- App available on both Google Play and App Store
- No critical crashes in first 48 hours
- User reviews averaging 4+ stars
- Download count increasing
- Retention rate above 30% after 7 days

---

## Contact & Support

- **Issues:** Check app store dashboards and crash reports
- **Updates:** Follow the deployment process for each release
- **Maintenance:** Regular security and dependency updates

**Last Updated:** July 2026
