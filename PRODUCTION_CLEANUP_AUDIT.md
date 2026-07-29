# Production Cleanup Audit - Phase 1 (READ-ONLY)

**Status:** Complete - No files modified, only findings reported

---

## 1. CONSOLE STATEMENTS (75 total)

### Error Handling (Production-Safe)
These are legitimate error logs for debugging and should be kept:

| File | Line | Statement | Assessment |
|------|------|-----------|------------|
| `app/quiet.tsx` | 27 | `console.error('Track not found')` | ✅ Keep - Error handling |
| `app/session.tsx` | 73, 175, 196, 204, 249 | `console.error` (5 instances) | ✅ Keep - Error handling |
| `app/sleep.tsx` | 58, 150, 170, 178, 218 | `console.error` (5 instances) | ✅ Keep - Error handling |
| `constants/oauth.ts` | 117, 125 | `console.warn/error` | ✅ Keep - Error handling |
| `hooks/use-audio-player.ts` | 26, 43, 50, 57 | `console.error` (4 instances) | ✅ Keep - Error handling |
| `hooks/use-auth.ts` | 64, 76 | `console.error` (2 instances) | ✅ Keep - Error handling |
| `hooks/use-music-player.ts` | 59, 70, 79 | `console.error` (3 instances) | ✅ Keep - Error handling |
| `lib/app-context.tsx` | 132 | `console.error('Failed to load')` | ✅ Keep - Error handling |
| `lib/audio-context.tsx` | 217, 233, 245, 259 | `console.error` (4 instances) | ✅ Keep - Error handling |
| `lib/audio-controller.ts` | 58, 92 | `console.error` (2 instances) | ✅ Keep - Error handling |
| `lib/audio-transcription-service.ts` | 58, 128 | `console.error` (2 instances) | ✅ Keep - Error handling |
| `lib/openai-context.tsx` | 69, 107, 191, 226 | `console.error` (4 instances) | ✅ Keep - Error handling |
| `lib/openai-service.ts` | 250-282, 303-318 | `console.error` (11 instances) | ✅ Keep - Error handling |
| `lib/session-handlers.ts` | 160 | `console.error` | ✅ Keep - Error handling |
| `lib/simple-audio.ts` | 48, 94 | `console.error` (2 instances) | ✅ Keep - Error handling |
| `server/db.ts` | 14, 28, 75 | `console.warn/error` (3 instances) | ✅ Keep - Error handling |

### Debug Logging (Consider Removal)
These are development/debug logs that could be removed:

| File | Line | Statement | Assessment | Recommendation |
|------|------|-----------|------------|-----------------|
| `hooks/use-auth.ts` | 46, 111 | `console.log` (2 instances) | ⚠️ Debug only | Remove |
| `hooks/use-music-player.ts` | 28 | `console.log('[useMusicPlayer]')` | ⚠️ Debug only | Remove |
| `server/routers.ts` | 39, 61, 75 | `console.log` (3 instances) | ⚠️ Debug only | Remove |
| `server/storage-router.ts` | 26-45 | `console.log` (12 instances) | ⚠️ Debug only | Remove |

**Total Debug Logs to Remove: 18 statements**

---

## 2. TODO/FIXME COMMENTS (11 total)

| File | Line | Comment | Status | Safe to Remove? |
|------|------|---------|--------|-----------------|
| `app/relaxation-tools.tsx` | 82 | `// TODO: Show premium upgrade modal` | Not implemented | ✅ Yes - placeholder |
| `drizzle/schema.ts` | 28 | `// TODO: Add your tables here` | Template comment | ✅ Yes - template |
| `lib/session-handlers.ts` | 32 | `// TODO: Implement AI response generation` | Stub function | ✅ Yes - placeholder |
| `lib/session-handlers.ts` | 64, 71 | `// TODO: Implement speech-to-text` (2x) | Stub function | ✅ Yes - placeholder |
| `lib/session-handlers.ts` | 98 | `// TODO: Implement text-to-speech` | Stub function | ✅ Yes - placeholder |
| `lib/session-handlers.ts` | 117 | `// TODO: Implement session initialization` | Stub function | ✅ Yes - placeholder |
| `lib/session-handlers.ts` | 130 | `// TODO: Implement cleanup` | Stub function | ✅ Yes - placeholder |
| `server/db.ts` | 92 | `// TODO: add feature queries here` | Template comment | ✅ Yes - template |
| `server/routers.ts` | 88 | `// TODO: add feature routers here` | Template comment | ✅ Yes - template |
| `tests/auth.logout.test.ts` | 44 | `// TODO: Remove .skip once auth implemented` | Test skip reason | ✅ Yes - placeholder |

**Total TODO/FIXME to Remove: 11 comments**

---

## 3. UNUSED IMPORTS

### Duplicate Imports
| File | Line | Issue | Assessment |
|------|------|-------|------------|
| `app/(tabs)/_layout.tsx` | 3, 6 | `import { Platform } from "react-native"` (imported twice) | ⚠️ Duplicate |

**Note:** Line 3 imports `{ Text, View }` and line 6 imports `{ Platform }`. These are separate imports but from same module. Line 3 could consolidate.

### Potentially Unused Imports
| File | Import | Line | Used? | Assessment |
|------|--------|------|-------|------------|
| `app/(tabs)/settings.tsx` | `cn` from utils | 6 | ❌ No | ✅ Safe to remove |

---

## 4. UNUSED VARIABLES/CONSTANTS

| File | Variable | Line | Assessment |
|------|----------|------|------------|
| `app/(tabs)/settings.tsx` | `colors` | 21 | ⚠️ Declared but only used in `colors.muted` at line 255 for muted styling - could be optimized |

---

## 5. SUMMARY OF FINDINGS

| Category | Count | Safe to Remove | Keep |
|----------|-------|----------------|------|
| Console.error (error handling) | 57 | ❌ No | ✅ Keep |
| Console.log (debug only) | 18 | ✅ Yes | Remove |
| TODO/FIXME comments | 11 | ✅ Yes | Remove |
| Duplicate imports | 1 | ✅ Yes | Remove |
| Unused imports | 1 | ✅ Yes | Remove |
| Unused variables | 1 | ⚠️ Minor | Keep (not harmful) |

---

## 6. PROPOSED DELETIONS (Pending Approval)

### Phase 2 - Safe Removals:
1. **Debug console.log statements** (18 total)
   - `hooks/use-auth.ts` lines 46, 111
   - `hooks/use-music-player.ts` line 28
   - `server/routers.ts` lines 39, 61, 75
   - `server/storage-router.ts` lines 26-45

2. **TODO/FIXME comments** (11 total)
   - All 11 comments listed above

3. **Duplicate import**
   - `app/(tabs)/_layout.tsx` line 6 - consolidate Platform import

4. **Unused import**
   - `app/(tabs)/settings.tsx` line 6 - remove `cn` import

---

## 7. NOT REMOVING (Production-Safe)

✅ All `console.error` statements - these are legitimate error handling
✅ All business logic and functions
✅ All styling and UI code
✅ All navigation code
✅ All translations
✅ All theme colors and animations

---

**Next Step:** Await user approval before proceeding with Phase 2 deletions.
