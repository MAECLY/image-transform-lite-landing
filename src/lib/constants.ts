export const PRODUCT = {
  name: "Image Transform Lite",
  fallbackVersion: "1.6.0",
  bundleId: "com.maecly.imagetransformlite",
  minMacos: "11.0",
  arch: "Apple Silicon (arm64)",
  homepage: "https://image-lite.maecly.com",
  author: {
    name: "MigelAngelEC",
    fullName: "Miguel Angel Esparza Calero",
    url: "https://maecly.com",
  },
  github: {
    owner: "MAECLY",
    repo: "image-transform-lite",
    url: "https://github.com/MAECLY/image-transform-lite",
    releases: "https://github.com/MAECLY/image-transform-lite/releases",
    issues: "https://github.com/MAECLY/image-transform-lite/issues",
    license: "https://github.com/MAECLY/image-transform-lite/blob/main/LICENSE",
    api: "https://api.github.com/repos/MAECLY/image-transform-lite",
  },
} as const;

export const NAV_LINKS = [
  { id: "features", href: "#features" },
  { id: "transformations", href: "#transformations" },
  { id: "howItWorks", href: "#how-it-works" },
  { id: "download", href: "#download" },
] as const;

export type NavLinkId = (typeof NAV_LINKS)[number]["id"];

export type FeatureIcon =
  | "Eye"
  | "GripVertical"
  | "Bookmark"
  | "Layers"
  | "FileImage"
  | "RefreshCw"
  | "PanelLeft"
  | "Github";

export const FEATURES: ReadonlyArray<{
  id: string;
  icon: FeatureIcon;
}> = [
  { id: "live-preview", icon: "Eye" },
  { id: "drag-and-drop", icon: "GripVertical" },
  { id: "presets", icon: "Bookmark" },
  { id: "batch", icon: "Layers" },
  { id: "multi-format", icon: "FileImage" },
  { id: "auto-update", icon: "RefreshCw" },
  { id: "sidebar", icon: "PanelLeft" },
  { id: "open-source", icon: "Github" },
];

export type TransformationId =
  | "flip"
  | "rotate"
  | "crop"
  | "resize"
  | "brightness"
  | "contrast"
  | "sharpness"
  | "watermark";

export type TransformationIcon =
  | "FlipHorizontal"
  | "RotateCw"
  | "Crop"
  | "Maximize"
  | "Sun"
  | "Contrast"
  | "Aperture"
  | "Stamp";

export const TRANSFORMATIONS: ReadonlyArray<{
  id: TransformationId;
  icon: TransformationIcon;
}> = [
  { id: "flip", icon: "FlipHorizontal" },
  { id: "rotate", icon: "RotateCw" },
  { id: "crop", icon: "Crop" },
  { id: "resize", icon: "Maximize" },
  { id: "brightness", icon: "Sun" },
  { id: "contrast", icon: "Contrast" },
  { id: "sharpness", icon: "Aperture" },
  { id: "watermark", icon: "Stamp" },
];

export type StepIcon = "FolderOpen" | "Sliders" | "Eye" | "Download";

export const STEPS: ReadonlyArray<{
  id: "import" | "configure" | "preview" | "export";
  number: string;
  icon: StepIcon;
}> = [
  { id: "import", number: "01", icon: "FolderOpen" },
  { id: "configure", number: "02", icon: "Sliders" },
  { id: "preview", number: "03", icon: "Eye" },
  { id: "export", number: "04", icon: "Download" },
];

export const STATS: ReadonlyArray<{
  id: "transformations" | "inputFormats" | "outputFormats" | "version";
  value: number;
  suffix?: string;
  decimals?: number;
}> = [
  { id: "transformations", value: 8 },
  { id: "inputFormats", value: 5 },
  { id: "outputFormats", value: 4 },
  { id: "version", value: 1.6, decimals: 1 },
];

export const INPUT_FORMATS = ["JPG", "PNG", "WebP", "BMP", "TIFF"] as const;
export const OUTPUT_FORMATS = ["WebP", "JPEG", "PNG", "TIFF"] as const;

export type DownloadOptionId = "pkg" | "zip";

export const DOWNLOAD_OPTIONS: ReadonlyArray<{
  id: DownloadOptionId;
  icon: "Package" | "FileArchive";
  recommended: boolean;
}> = [
  { id: "pkg", icon: "Package", recommended: true },
  { id: "zip", icon: "FileArchive", recommended: false },
];

export interface DownloadUrls {
  pkg: string;
  zip: string;
}

export function getDownloadUrls(version: string): DownloadUrls {
  const base = `${PRODUCT.github.releases}/download/v${version}`;
  return {
    pkg: `${base}/Image-Transform-Lite-${version}-arm64.pkg`,
    zip: `${base}/Image-Transform-Lite-${version}-arm64.zip`,
  };
}

const UNSPLASH_PARAMS = "?w=900&q=80&auto=format&fit=crop";

export const SHOWCASE_IMAGES: Record<TransformationId, string> = {
  flip: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4${UNSPLASH_PARAMS}`,
  rotate: `https://images.unsplash.com/photo-1518791841217-8f162f1e1131${UNSPLASH_PARAMS}`,
  crop: `https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07${UNSPLASH_PARAMS}`,
  resize: `https://images.unsplash.com/photo-1492321936769-b49830bc1d1e${UNSPLASH_PARAMS}`,
  brightness: `https://images.unsplash.com/photo-1518837695005-2083093ee35b${UNSPLASH_PARAMS}`,
  contrast: `https://images.unsplash.com/photo-1517637382994-f02da38c6728${UNSPLASH_PARAMS}`,
  sharpness: `https://images.unsplash.com/photo-1500382017468-9049fed747ef${UNSPLASH_PARAMS}`,
  watermark: `https://images.unsplash.com/photo-1506905925346-21bda4d32df4${UNSPLASH_PARAMS}`,
};
