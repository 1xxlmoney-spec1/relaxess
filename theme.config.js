/** @type {const} */
const themeColors = {
  // Primary accent color (bright cyan - matching the glow in reference image)
  primary: { light: '#0a7ea4', dark: '#00D9FF' },
  
  // Background colors - Deep teal ocean (from reference image)
  background: { light: '#ffffff', dark: '#0A1F2E' },
  
  // Surface colors for cards, buttons, elevated elements
  surface: { light: '#f5f5f5', dark: 'rgba(255,255,255,0.10)' },
  
  // Text colors - bright white and cyan tones
  foreground: { light: '#11181C', dark: '#FFFFFF' },
  
  // Secondary text - muted cyan/white
  muted: { light: '#687076', dark: 'rgba(255,255,255,0.70)' },
  
  // Border colors - neutral borders
  border: { light: '#E5E7EB', dark: 'rgba(255,255,255,0.18)' },
  
  // Status colors
  success: { light: '#22C55E', dark: '#4ADE80' },
  warning: { light: '#F59E0B', dark: '#FBBF24' },
  error: { light: '#EF4444', dark: '#F87171' },
  
  // Dark mode gradient colors (Deep teal ocean)
  darkGradientStart: { light: '#ffffff', dark: '#051420' },
  darkGradientEnd: { light: '#f5f5f5', dark: '#0A1F2E' },
  darkGradientAccent: { light: '#e0e0e0', dark: '#0D2A3D' },
};

module.exports = { themeColors };
