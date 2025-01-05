import { useEffect, useState } from "react";
import CustomSelect from "../custom-ui/Select";
import { Font, FontsApiResponse } from "@/types/typography-types";
import { loadFonts } from "@/utils/fontLoader";
import { useTypographyStore } from "@/store/useTypographyStore";

const GOOGLE_FONTS_API_URL = `https://www.googleapis.com/webfonts/v1/webfonts?key=${
    import.meta.env.VITE_GOOGLE_FONTS_API_KEY
}&sort=popularity`;

const TypographySection = () => {
    //@ts-ignore
    const typography = useTypographyStore((state) => state.typography);
    //@ts-ignore
    const setHeader = useTypographyStore((state) => state.setHeader);
    //@ts-ignore
    const elements = useTypographyStore((state) => state.elements);
    //@ts-ignore
    const setTypography = useTypographyStore((state) => state.setTypography);
    const [fontOptions, setFontOptions] = useState<Font[]>([]);

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
        loadFonts([typography]);
    }, [typography]);

    const handleClick = (key: string) => {
        if (key in elements) {
            setHeader(key as keyof typeof elements);
        }
    };

    return (
        <>
            <div className="flex gap-2 items-center pb-5">
                <p>Font Family:</p>
                <CustomSelect
                    selectOptions={fontOptions.map((font) => font.family)}
                    currentFontFamily={typography}
                    updateFunc={setTypography}
                />
            </div>
            {Object.entries(elements).map(([key, value]) => (
                <div
                    key={key}
                    className="flex hover:cursor-pointer"
                    style={{ fontFamily: typography }}
                    onClick={() => handleClick(key)}
                >
                    {key === "Link" ? (
                        <>
                            <a
                                href="#"
                                className="relative inline-block text-[#F1B000] underline w-52"
                                style={{
                                    //@ts-ignore
                                    fontSize: value.size,
                                    //@ts-ignore
                                    fontWeight: value.weight,
                                }}
                            >
                                {key}
                            </a>
                            <p
                                className="grow"
                                style={{
                                    //@ts-ignore
                                    fontSize: value.size,
                                    //@ts-ignore
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
                                    //@ts-ignore
                                    fontSize: value.size,
                                    //@ts-ignore
                                    fontWeight: value.weight,
                                }}
                            >
                                {key}
                            </p>
                            <p
                                className="grow"
                                style={{
                                    //@ts-ignore
                                    fontSize: value.size,
                                    //@ts-ignore
                                    fontWeight: value.weight,
                                }}
                            >
                                The quick brown fox jumps over the lazy dog
                            </p>
                        </>
                    )}
                </div>
            ))}
        </>
    );
};

export default TypographySection;
