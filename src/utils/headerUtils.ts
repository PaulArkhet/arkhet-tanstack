// utils/headerUtils.ts

// Map headers to display-friendly names
export const headerDisplayNames: Record<string, string> = {
    H1: "Header 1",
    H2: "Header 2",
    H3: "Header 3",
    H4: "Header 4",
    H5: "Header 5",
    H6: "Header 6",
    Paragraph: "Paragraph",
    Link: "Link",
};

// Function to get display-friendly name or default to original key
export function getHeaderDisplayName(headerKey: string): string {
    return headerDisplayNames[headerKey] || headerKey;
}

export const FontWeights = {
    Light: "300",
    Regular: "400",
    Medium: "500",
    SemiBold: "600",
    Bold: "700",
};

export const fontSizeRanges: Record<string, { min: number; max: number }> = {
    H1: { min: 32, max: 48 },
    H2: { min: 24, max: 36 },
    H3: { min: 20, max: 30 },
    H4: { min: 18, max: 26 },
    H5: { min: 16, max: 22 },
    H6: { min: 14, max: 20 },
    Paragraph: { min: 14, max: 18 },
    Link: { min: 14, max: 18 },
};
