import { useTextFieldStore } from "@/store/useTextFieldStore";
import { Input } from "../custom-ui/Input";
import { FC, useEffect, useState } from "react";

const mergeStyles = (overrides: any, baseStyles: any) => {
    return {
        ...baseStyles,
        ...(overrides || {}),
    };
};

const TextFieldSection: FC<{ customTextFieldStyles?: any }> = ({
    customTextFieldStyles,
}) => {
    const setIsCustomizingTextField = useTextFieldStore(
        //@ts-ignore
        (state) => state.setCustomizeTextField
    );
    const defaultTextFieldStyles = useTextFieldStore(
        (state) => state.textFieldStyling
    );
    const setTextFieldStyling = useTextFieldStore(
        (state) => state.setTextFieldStyling
    );

    const [inputStyles, setInputStyles] = useState(
        mergeStyles(null, defaultTextFieldStyles.inputStyle)
    );
    const [labelStyles, setLabelStyles] = useState(
        mergeStyles(null, defaultTextFieldStyles.labelStyle)
    );
    const [supportingTextStyles, setSupportingTextStyles] = useState(
        mergeStyles(null, defaultTextFieldStyles.supportingTextStyle)
    );

    useEffect(() => {
        if (customTextFieldStyles) {
            console.log(
                "Received new textFieldStyles from server:",
                customTextFieldStyles
            );

            const updatedInputStyles = mergeStyles(
                customTextFieldStyles.textFieldStyling?.inputStyle,
                defaultTextFieldStyles.inputStyle
            );
            const updatedLabelStyles = mergeStyles(
                customTextFieldStyles.textFieldStyling?.labelStyle,
                defaultTextFieldStyles.labelStyle
            );
            const updatedSupportingTextStyles = mergeStyles(
                customTextFieldStyles.textFieldStyling?.supportingTextStyle,
                defaultTextFieldStyles.supportingTextStyle
            );

            setInputStyles(updatedInputStyles);
            setLabelStyles(updatedLabelStyles);
            setSupportingTextStyles(updatedSupportingTextStyles);
        } else {
            console.log("No styles received, using default Zustand styles.");
            setInputStyles(defaultTextFieldStyles.inputStyle);
            setLabelStyles(defaultTextFieldStyles.labelStyle);
            setSupportingTextStyles(defaultTextFieldStyles.supportingTextStyle);
        }
    }, [customTextFieldStyles, defaultTextFieldStyles]);

    useEffect(() => {
        console.log("Applying updated TextField styles to Zustand.");
        setTextFieldStyling(customTextFieldStyles);
    }, [customTextFieldStyles]);

    return (
        <div
            className="flex flex-row gap-5"
            onClick={() => {
                setIsCustomizingTextField(true);
            }}
        >
            <Input
                label="Label"
                placeholder="Input"
                clearable={inputStyles.clearable}
                style={{ ...inputStyles }}
                labelClassName={{ ...labelStyles }}
            />
            <Input
                label="Label"
                supportingText="Supporting Text"
                placeholder="Input"
                clearable={inputStyles.clearable}
                style={{
                    ...inputStyles,
                    borderColor: inputStyles.borderColorChecked,
                }}
                labelClassName={{
                    ...labelStyles,
                    color:
                        labelStyles.color !== "transparent"
                            ? inputStyles.borderColorChecked
                            : labelStyles.color,
                }}
                supportingTextClassName={{ ...supportingTextStyles }}
            />
        </div>
    );
};

export default TextFieldSection;
