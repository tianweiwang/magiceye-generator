export interface StereogramConfig {
  text: string;
  fontFamily: string;
  patternType: 'noise' | 'dots' | 'triangles';
  patternColor1: string;
  patternColor2: string;
  depthIntensity: number;
  width: number;
  height: number;
  repeatWidth: number;
}

export interface PatternOption {
  id: string;
  name: string;
  colors: [string, string];
}
