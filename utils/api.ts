/**
 * 后端 API 服务
 * 默认不主动请求后端，只有显式配置 VITE_API_BASE 时才会访问，避免控制台出现连接被拒绝错误。
 */
const API_BASE = (import.meta.env.VITE_API_BASE || '').trim();
const API_ENABLED = API_BASE.length > 0;

const ensureApi = () => {
  if (!API_ENABLED) {
    throw new Error('后端地址未配置，请先设置 VITE_API_BASE');
  }
};

export interface TextureResult {
  texture: string;  // base64
  width: number;
  height: number;
}

export interface StereogramResult {
  stereogram: string;  // base64
  width: number;
  height: number;
}

export interface TexturePresets {
  presets: string[];
  styles: string[];
  colors: string[];
}

/**
 * 检查后端服务是否可用
 */
export async function checkBackendHealth(): Promise<boolean> {
  // 未配置后端时直接返回 false，避免浏览器报连接错误
  if (!API_ENABLED) return false;
  try {
    const response = await fetch(`${API_BASE}/health`);
    if (response.ok) {
      const data = await response.json();
      return data.status === 'healthy';
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * 获取纹理预设列表
 */
export async function getTexturePresets(): Promise<TexturePresets> {
  ensureApi();
  const response = await fetch(`${API_BASE}/api/texture/presets`);
  if (!response.ok) {
    throw new Error('Failed to get presets');
  }
  return response.json();
}

/**
 * 生成AI纹理
 */
export async function generateTexture(options: {
  style?: string;
  colors?: string;
  prompt?: string;
  seed?: number;
}): Promise<TextureResult> {
  ensureApi();
  const formData = new FormData();
  formData.append('style', options.style || 'glass');
  formData.append('colors', options.colors || 'colorful');
  if (options.prompt) {
    formData.append('prompt', options.prompt);
  }
  if (options.seed !== undefined) {
    formData.append('seed', String(options.seed));
  }
  formData.append('output_format', 'base64');

  const response = await fetch(`${API_BASE}/api/texture/generate`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to generate texture');
  }

  return response.json();
}

/**
 * 使用自定义纹理生成立体图（后端生成）
 */
export async function generateStereogramWithPattern(options: {
  depthImageBlob: Blob;
  patternImageBlob: Blob;
  repeatWidth: number;
  depthIntensity: number;
}): Promise<StereogramResult> {
  ensureApi();
  const formData = new FormData();
  formData.append('depth_image', options.deptob, 'depth.png');
  formData.append('pattern_image', options.patternImageBlob, 'pattern.png');
  formData.append('repeat_width', String(options.repeatWidth));
  formData.append('depth_intensity', String(options.depthIntensity));
  formData.append('output_format', 'base64');

  const response = await fetch(`${API_BASE}/api/stereogram/custom`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to generate stereogram');
  n response.json();
}

/**
 * 使用预设图案生成立体图（后端生成）
 */
export async function generateStereogramWithPreset(options: {
  depthImageBlob: Blob;
  patternType: string;
  color1: string;
  color2: string;
  repeatWidth: number;
  depthIntensity: number;
}): Promise<StereogramResult> {
  ensureApi();
  const formData = new FormData();
  formData.append('depth_image', options.depthImageBlob, 'depth.png');
  formData.append('pattern_type', options.patternType);
  formData.append('color1', options.color1);
  formData.append('color2', options.color2);
  formData.append('repeat_width', String(options.repeatWidth));
  formData.append('depth_intensity', String(options.depthIntensity));
  formData.append('output_format', 'base64');

  const response = await fetch(`${API_BASE}/api/stereogram`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || 'Failed to generate stereogram');
  }

  return response.json();
}

/**
 * Base64 转 Image URL
 export function base64ToImageUrl(base64: string): string {
  return `data:image/png;base64,${base64}`;
}
