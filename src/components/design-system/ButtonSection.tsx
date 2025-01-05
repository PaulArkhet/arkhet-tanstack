import { FC, useEffect, useState } from "react";
import { Button } from "../custom-ui/Button";
import { useButtonStore } from "@/store/useButtonStore";
import { ButtonStyleConfig } from "@/types/button-types";

const mapStyleToCSS = (styleObject: ButtonStyleConfig, isHovered = false) => {
    if (!styleObject) return {};

    const {
        paddingTop,
        paddingRight,
        paddingLeft,
        paddingBottom,
        textColor,
        hoveredTextColor,
        borderColor,
        borderRadius,
        fontSize,
        backgroundColor,
        hoveredBackgroundColor,
        ...rest
    } = styleObject;

    return {
        ...rest,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingBottom,
        color: isHovered && hoveredTextColor ? hoveredTextColor : textColor,
        borderColor,
        borderRadius,
        fontSize,
        backgroundColor: isHovered && hoveredBackgroundColor ? hoveredBackgroundColor : backgroundColor, 
    };
};

const ButtonSection: FC<{ propButtonStyling: any }> = ({ propButtonStyling }) => {
    const buttonStyles = useButtonStore((state) => state.buttonStyles);
    const setButtonType = useButtonStore((state) => state.setButtonType);
    const setButtonStyles = useButtonStore((state) => state.setButtonStyles);

    const [primaryCSS, setPrimaryCSS] = useState(
        mapStyleToCSS(buttonStyles.primary)
    );
    const [secondaryCSS, setSecondaryCSS] = useState(
        mapStyleToCSS(buttonStyles.secondary)
    );
    const [outlinedCSS, setOutlinedCSS] = useState(
        mapStyleToCSS(buttonStyles.outlined)
    );
    const [ghostCSS, setGhostCSS] = useState(mapStyleToCSS(buttonStyles.ghost));

    const [isPrimaryHovered, setIsPrimaryHovered] = useState(false);
    const [isSecondaryHovered, setIsSecondaryHovered] = useState(false);
    const [isOutlinedHovered, setIsOutlinedHovered] = useState(false);
    const [isGhostHovered, setIsGhostHovered] = useState(false);

    useEffect(() => {
        setPrimaryCSS(mapStyleToCSS(buttonStyles.primary, isPrimaryHovered));
        setSecondaryCSS(mapStyleToCSS(buttonStyles.secondary, isSecondaryHovered));
        setOutlinedCSS(mapStyleToCSS(buttonStyles.outlined, isOutlinedHovered));
        setGhostCSS(mapStyleToCSS(buttonStyles.ghost, isGhostHovered));
    }, [buttonStyles, isPrimaryHovered, isSecondaryHovered, isOutlinedHovered, isGhostHovered]);

    useEffect(() => {
        if (propButtonStyling) {
            setButtonStyles("primary", propButtonStyling.primary.css);
            setButtonStyles("secondary", propButtonStyling.secondary.css);
            setButtonStyles("outlined", propButtonStyling.outlined.css);
            setButtonStyles("ghost", propButtonStyling.ghost.css);

            setPrimaryCSS(mapStyleToCSS(propButtonStyling.primary.css));
            setSecondaryCSS(mapStyleToCSS(propButtonStyling.secondary.css));
            setOutlinedCSS(mapStyleToCSS(propButtonStyling.outlined.css));
            setGhostCSS(mapStyleToCSS(propButtonStyling.ghost.css));
        }
    }, [propButtonStyling, setButtonStyles]);

    return (
        <div className="flex flex-wrap gap-14 mt-3">
            <div className="w-fit justify-self-start">
                <div className="flex items-start gap-5 flex-wrap">
                    {/* Primary Button */}
                    <Button
                        variant="default"
                        style={{ ...primaryCSS }}
                        onMouseEnter={() => setIsPrimaryHovered(true)}
                        onMouseLeave={() => setIsPrimaryHovered(false)}
                        onClick={() => {
                            console.log("Primary Button Clicked");
                            setButtonType("primary");
                        }}
                    >
                        Primary Button
                    </Button>

                    {/* Secondary Button */}
                    <Button
                        variant="secondary"
                        style={{ ...secondaryCSS }}
                        onMouseEnter={() => setIsSecondaryHovered(true)}
                        onMouseLeave={() => setIsSecondaryHovered(false)}
                        onClick={() => {
                            console.log("Secondary Button Clicked");
                            setButtonType("secondary");
                        }}
                    >
                        Secondary Button
                    </Button>

                    {/* Outlined Button */}
                    <Button
                        style={{ ...outlinedCSS }}
                        onMouseEnter={() => setIsOutlinedHovered(true)}
                        onMouseLeave={() => setIsOutlinedHovered(false)}
                        onClick={() => {
                            console.log("Outlined Button Clicked");
                            setButtonType("outlined");
                        }}
                    >
                        Outlined Button
                    </Button>

                    {/* Ghost Button */}
                    <Button
                        style={{ ...ghostCSS }}
                        onMouseEnter={() => setIsGhostHovered(true)}
                        onMouseLeave={() => setIsGhostHovered(false)}
                        onClick={() => {
                            console.log("Ghost Button Clicked");
                            setButtonType("ghost");
                        }}
                    >
                        Ghost Button
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default ButtonSection;
