import { FC, useEffect, useState } from "react";
import { RadioButton, RadioButtonItem } from "../custom-ui/RadioButton";
import { useButtonStore } from "@/store/useButtonStore";
import { cn } from "@/lib/utils";

const mapRadioButtonStyleToCSS = (styleObject: any, defaultStyles: any) => {
    if (!styleObject) return defaultStyles;

    const {
        height,
        width,
        borderColor,
        borderWidth,
        borderRadius,
        color,
        customIcon,
    } = styleObject;

    return {
        height: height || defaultStyles.height,
        width: width || defaultStyles.width,
        borderColor: borderColor || defaultStyles.borderColor,
        borderWidth: borderWidth || defaultStyles.borderWidth,
        borderRadius: borderRadius || defaultStyles.borderRadius,
        color: color || defaultStyles.color,
        customIcon: customIcon
            ? {
                  height: customIcon.height || defaultStyles.customIcon.height,
                  width: customIcon.width || defaultStyles.customIcon.width,
                  backgroundColor:
                      customIcon.backgroundColor ||
                      defaultStyles.customIcon.backgroundColor,
                  borderRadius:
                      customIcon.borderRadius ||
                      defaultStyles.customIcon.borderRadius,
              }
            : defaultStyles.customIcon,
    };
};

const RadioButtonSection: FC<{ radioButtonStyles: any }> = ({
    radioButtonStyles,
}) => {
    const getRadioButtonStyles = useButtonStore(
        //@ts-ignore
        (state) => state.getRadioButtonStyles
    );
    const setButtonType = useButtonStore((state) => state.setButtonType);
    const setRadioButtonStyles = useButtonStore(
        //@ts-ignore
        (state) => state.setRadioButtonStyles
    );

    const buttonStyles = getRadioButtonStyles();

    const [radioButtonCSS, setRadioButtonCSS] = useState(
        mapRadioButtonStyleToCSS(buttonStyles, buttonStyles)
    );

    useEffect(() => {
        const updatedStyles = getRadioButtonStyles();
        setRadioButtonCSS(
            mapRadioButtonStyleToCSS(updatedStyles, buttonStyles)
        );
    }, [getRadioButtonStyles, buttonStyles]);

    useEffect(() => {
        if (radioButtonStyles) {
            console.log("Received new radioButtonStyles:", radioButtonStyles);
            setRadioButtonCSS(radioButtonStyles.radioButton);
            setRadioButtonStyles(radioButtonStyles.radioButton);
        }
    }, [radioButtonStyles, setRadioButtonStyles]);

    const [isCheckedOptionOne, setIsCheckedOptionOne] = useState(true);

    return (
        <div className="w-fit mt-4">
            <div className="flex">
                <RadioButton
                    defaultValue="option-one"
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        gap: "40px",
                    }}
                    //@ts-ignore
                    onClick={() => setButtonType("radioButton")}
                >
                    {/* First Radio Button */}
                    <div className={cn("flex items-center gap-2")}>
                        <RadioButtonItem
                            value="option-one"
                            id="option-one"
                            style={{
                                height: radioButtonCSS.height,
                                width: radioButtonCSS.width,
                                borderColor: radioButtonCSS.borderColor,
                                borderWidth: radioButtonCSS.borderWidth,
                                borderRadius: radioButtonCSS.borderRadius,
                            }}
                            checked={isCheckedOptionOne}
                            customIcon={
                                radioButtonCSS.customIcon ? (
                                    <div
                                        style={{
                                            height: radioButtonCSS.customIcon
                                                .height,
                                            width: radioButtonCSS.customIcon
                                                .width,
                                            backgroundColor:
                                                radioButtonCSS.customIcon
                                                    .backgroundColor,
                                            borderRadius:
                                                radioButtonCSS.customIcon
                                                    .borderRadius,
                                        }}
                                    />
                                ) : null
                            }
                            onChange={() => setIsCheckedOptionOne(true)}
                        />
                    </div>

                    {/* Second Radio Button */}
                    <div className={cn("flex items-center gap-2")}>
                        <RadioButtonItem
                            value="option-two"
                            id="option-two"
                            style={{
                                height: radioButtonCSS.height,
                                width: radioButtonCSS.width,
                                borderColor: radioButtonCSS.borderColor,
                                borderWidth: radioButtonCSS.borderWidth,
                                borderRadius: radioButtonCSS.borderRadius,
                                color: radioButtonCSS.color,
                            }}
                            checked={!isCheckedOptionOne}
                            customIcon={
                                radioButtonCSS.customIcon ? (
                                    <div
                                        style={{
                                            height: radioButtonCSS.customIcon
                                                .height,
                                            width: radioButtonCSS.customIcon
                                                .width,
                                            backgroundColor:
                                                radioButtonCSS.customIcon
                                                    .backgroundColor,
                                            borderRadius:
                                                radioButtonCSS.customIcon
                                                    .borderRadius,
                                        }}
                                    />
                                ) : null
                            }
                            onChange={() => setIsCheckedOptionOne(false)}
                        />
                    </div>
                </RadioButton>
            </div>
        </div>
    );
};

export default RadioButtonSection;
