import { Slider } from "@/components/ui/slider";
import { useTextFieldStore } from "@/store/useTextFieldStore";
import { removePx } from "@/utils/helpers";
import { useEffect, useState } from "react";

export default function TextFieldEditingPanel() {
    const textFieldStyling = useTextFieldStore(
        (state) => state.textFieldStyling
    );
    const setTextFieldStyling = useTextFieldStore(
        (state) => state.setTextFieldStyling
    );
    const [borderRadius, setBorderRadius] = useState(
        textFieldStyling.inputStyle.borderRadius
    );
    const [borderWidth, setBorderWidth] = useState(
        textFieldStyling.inputStyle.borderWidth
    );

    useEffect(() => {
        const inputStyle = {
            ...textFieldStyling.inputStyle,
            borderRadius: borderRadius,
            borderWidth: borderWidth,
        };

        console.log("inputStyle", inputStyle);

        setTextFieldStyling({
            inputStyle: {
                ...textFieldStyling.inputStyle,
                borderRadius,
                borderWidth,
            },
        });
    }, [borderRadius, borderWidth]);

    return (
        <div className="customization-panel-styling">
            <h1 className="pb-3 ">Text Field</h1>
            <div className="grid gap-3">
                <div className="grid gap-2">
                    <h2>Border Radius: {borderRadius}</h2>
                    <Slider
                        value={[removePx(borderRadius)]}
                        max={50}
                        step={1}
                        onValueChange={(value) => {
                            setBorderRadius(`${value[0]}px`);
                        }}
                    />
                </div>
                <div className="grid gap-2">
                    <h2>Border Width: {borderWidth}</h2>
                    <Slider
                        value={[removePx(borderWidth)]}
                        max={20}
                        step={1}
                        onValueChange={(value) => {
                            setBorderWidth(`${value[0]}px`);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
