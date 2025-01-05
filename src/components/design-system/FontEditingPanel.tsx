/*
Author: Paul Kim, Vitor Akiyama, Selina Park
Date: September 16, 2024
Version: 0.0.1
Detail: Font Editing Panel of Design System Page
*/

import { useTypographyStore } from "@/store/useTypographyStore";
import CustomSelect from "../custom-ui/Select";
import { useEffect, useState } from "react";
import { FontSizes } from "@/utils/fontLoader";

const FontWeights = {
    Thin: "100",
    ExtraLight: "200",
    Light: "300",
    Regular: "400",
    Medium: "500",
    SemiBold: "600",
    Bold: "700",
    ExtraBold: "800",
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

export default function FontEditingPanel() {
    //@ts-ignore
    const header = useTypographyStore((state) => state.header);
    //@ts-ignore
    const elements = useTypographyStore((state) => state.elements);
    const setElementStyles = useTypographyStore(
        //@ts-ignore
        (state) => state.setElementStyles
    );

    const [weight, setWeight] = useState<string>("");
    const [size, setSize] = useState<string>("");

    useEffect(() => {
        if (header && elements[header]) {
            const { weight: fontWeight, size: fontSize } = elements[header];
            setWeight(getFontWeightKey(fontWeight) || "");
            setSize(fontSize);
        }
    }, [header, elements]);

    return (
        <div className="customization-panel-styling">
            <div>{header}</div>
            <div className="flex flex-row justify-evenly p-3">
                <CustomSelect
                    selectOptions={Object.keys(FontWeights)}
                    currentFontFamily={weight}
                    updateFunc={(value: string) => {
                        setWeight(value);
                        setElementStyles(header as keyof typeof elements, {
                            weight: FontWeights[
                                value as keyof typeof FontWeights
                            ],
                        });
                    }}
                />

                <CustomSelect
                    selectOptions={FontSizes}
                    currentFontFamily={size}
                    updateFunc={(value: string) => {
                        setSize(value);
                        setElementStyles(header as keyof typeof elements, {
                            size: value,
                        });
                    }}
                />
            </div>
        </div>
    );
}
