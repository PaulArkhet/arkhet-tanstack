import { useEffect, useState } from "react";
import CustomSelect from "../../custom-ui/Select";
import { Font, FontsApiResponse } from "@/types/typography-types";
import { loadFonts } from "@/utils/fontLoader";
import { useTypographyStore } from "@/store/useTypographyStore";
import { getHeaderDisplayName } from "@/utils/headerUtils";
import { getUserIdFromToken } from "@/services/jwt.service";

const userId = getUserIdFromToken();

const GOOGLE_FONTS_API_URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${
    import.meta.env.VITE_GOOGLE_FONTS_API_KEY
}&sort=popularity`;

const TypographySection = () => {
    const {
        selectedFont,
        updateActiveHeader,
        typographyElements,
        updateSelectedFont,
    } = useTypographyStore((state) => state);

    const [fontOptions, setFontOptions] = useState<Font[]>([]);
    const [selectedOption, setSelectedOption] = useState("");

    useEffect(() => {
        const fetchFonts = async (): Promise<void> => {
            try {
                const response = await fetch(GOOGLE_FONTS_API_URL);
                const data: FontsApiResponse = await response.json();
                setFontOptions(data.items.slice(0, 50));
            } catch (error) {
                console.error("Error fetching fonts:", error);
            }
        };

        fetchFonts();
    }, []);

    useEffect(() => {
        loadFonts([selectedFont]);
    }, [selectedFont]);

    useEffect(() => {
        if (selectedOption) {
            updateSelectedFont(selectedOption, userId);
        }
    }, [selectedOption]);

    const handleClick = (key: string) => {
        if (key in typographyElements) {
            updateActiveHeader(key as keyof typeof typographyElements);
        }
    };

    return (
        <div className="flex flex-col">
            <div className="flex gap-2 items-center pb-5">
                <p>Font Family:</p>
                <CustomSelect
                    selectOptions={fontOptions.map((font) => font.family)}
                    currentFontFamily={selectedFont}
                    updateFunc={setSelectedOption}
                />
            </div>
            {Object.entries(typographyElements).map(([key, value]) => (
                <div
                    key={key}
                    className="flex hover:cursor-pointer"
                    style={{ fontFamily: selectedFont }}
                    onClick={() => handleClick(key)}
                >
                    {key === "Link" ? (
                        <>
                            <a
                                href="#"
                                className="relative inline-block text-[#F1B000] underline w-52"
                                style={{
                                    fontSize: value.size,
                                    fontWeight: value.weight,
                                }}
                            >
                                {key}
                            </a>
                            <p
                                className="grow"
                                style={{
                                    fontSize: value.size,
                                    fontWeight: value.weight,
                                }}
                            >
                                The quick brown fox jumps over the{" "}
                                <a
                                    href="#"
                                    className="relative inline-block text-[#F1B000] underline"
                                >
                                    lazy dog
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <p
                                className="font-bold w-52 pb-6"
                                style={{
                                    fontSize: value.size,
                                    fontWeight: value.weight,
                                }}
                            >
                                {getHeaderDisplayName(key)}
                            </p>
                            <p
                                className="grow"
                                style={{
                                    fontSize: value.size,
                                    fontWeight: value.weight,
                                }}
                            >
                                The quick brown fox jumps over the lazy dog
                            </p>
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default TypographySection;
