import { useTypographyStore } from "@/store/useTypographyStore";
import CustomSelect from "@/components/custom-ui/Select";
import { useEffect, useState } from "react";
import { FontSizes } from "@/utils/fontLoader";
import {
    FontWeights,
    fontSizeRanges,
    getHeaderDisplayName,
} from "@/utils/headerUtils";
import { useButtonStore } from "@/store/useButtonStore";

const filterFontSizes = (activeHeader: string | null): string[] => {
    if (!activeHeader || !fontSizeRanges[activeHeader]) {
        return FontSizes;
    }

    const { min, max } = fontSizeRanges[activeHeader];
    return FontSizes.filter(
        (size) => parseInt(size) >= min && parseInt(size) <= max
    );
};

const getFontWeightKey = (value: string): string | undefined => {
    const weightEntries = Object.entries(FontWeights);
    for (const [key, val] of weightEntries) {
        if (val === value) {
            return key;
        }
    }
    return undefined;
};

export default function FontCustomization() {
    const { activeHeader, typographyElements, updateElementStyles } =
        useTypographyStore();

    const { setButtonType } = useButtonStore();
    const [weight, setWeight] = useState<string>("");
    const [size, setSize] = useState<string>("");

    useEffect(() => {
        if (activeHeader && typographyElements[activeHeader]) {
            const { weight: fontWeight, size: fontSize } =
                typographyElements[activeHeader];
            setWeight(getFontWeightKey(fontWeight) || "");
            setSize(fontSize);
        }
    }, [activeHeader, typographyElements]);

    return (
        <div
            className="p-3 text-sm"
            onClick={() => {
                setButtonType("");
            }}
        >
            <h1 className="font-semibold">
                {getHeaderDisplayName(activeHeader)}
            </h1>
            <div className="flex flex-row justify-evenly p-3">
                <CustomSelect
                    selectOptions={Object.keys(FontWeights)}
                    currentFontFamily={weight}
                    updateFunc={(value: string) => {
                        setWeight(value);
                        updateElementStyles(
                            activeHeader as keyof typeof typographyElements,
                            {
                                weight: FontWeights[
                                    value as keyof typeof FontWeights
                                ],
                            }
                        );
                    }}
                />

                <CustomSelect
                    selectOptions={filterFontSizes(activeHeader)}
                    currentFontFamily={size}
                    updateFunc={(value: string) => {
                        setSize(value);
                        updateElementStyles(
                            activeHeader as keyof typeof typographyElements,
                            {
                                size: value,
                            }
                        );
                    }}
                />
            </div>
        </div>
    );
}
