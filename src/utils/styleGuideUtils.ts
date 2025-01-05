import { loadStyleGuide } from "@/services/styleGuideService";

export interface FilenameResponse {
    id: string;
    title: string;
    created_at: string;
}

export interface SGFetchData {
    styleguide_id: string;
    filename: string;
    typography: string;
    colors: string;
    buttons: string;
    radiobuttons: string;
    textfields: string;
    toggle: string;
    checkboxes: string;
    internalnavigation: string;
    segmentedbutton: string;
    card: string;
    user_id: string;
}

export async function loadSavedStyleGuide(
    userId: string
): Promise<SGFetchData> {
    try {
        const response = await loadStyleGuide(userId, "latest");
        return response;
    } catch (error) {
        console.error("Error loading style guides:", error);
        throw error;
    }
}
