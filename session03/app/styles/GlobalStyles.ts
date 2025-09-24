// styles/GlobalStyles.ts
import { ViewStyle } from 'react-native';

export const COLORS = {
  primary: '#3B82F6',
  secondary: '#8B5CF6',
  text: '#222',
  background: '#fff',
  error: '#EF4444',
  border: '#ccc',
  inputBg: '#f9f9f9',
};

export const FONT_SIZES = {
  small: 13,
  medium: 16,
  large: 18,
  title: 22,
};

export const SPACING = {
  sm: 8,
  md: 16,
  lg: 32,
};

export const CONTAINER_STYLES: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: COLORS.background,
  padding: SPACING.md,
};
