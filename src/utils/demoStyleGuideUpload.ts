//@ts-nocheck

import { Dispatch, SetStateAction } from "react";

// Function to get existing styles from localStorage or initialize a new array if none exist
function getExistingStyles(key: string) {
    const existing = localStorage.getItem(key);
    return existing ? JSON.parse(existing) : [];
}

// Function to save new styles to an existing array in localStorage
function saveStylesToLocalStorage(key: string, newStyle: any) {
    const existingStyles = getExistingStyles(key);
    existingStyles.push(newStyle);
    localStorage.setItem(key, JSON.stringify(existingStyles));
}

function getStyleGuideUploadTitles() {
    const titlesJSON = localStorage.getItem("styleGuideUploadTitles");
    return titlesJSON ? JSON.parse(titlesJSON) : [];
}

// Interfaces for state and types
interface LoadingState {
    typography: boolean;
    color: boolean;
    button: boolean;
    radioButton: boolean;
    textField: boolean;
    toggle: boolean;
    checkBox: boolean;
    internalNavigation: boolean;
    segmentedButton: boolean;
    card: boolean;
    list: boolean;
    styleGuideName: boolean;
    cardHidden: boolean;
}

interface ColorPalette {
    primary: string;
    accents: string[];
    neutral: string[];
}
type ColorPaletteKey = keyof ColorPalette;

type SetLoadingType = Dispatch<SetStateAction<LoadingState>>;
type SetTypographyType = (value: string) => void;
type SetPaletteType = (
    palette: ColorPaletteKey,
    index: number,
    color: string
) => void;
type SetStyleType = Dispatch<SetStateAction<any>>;
type SetTitlesType = Dispatch<SetStateAction<string[]>>;

// handleDemoUploadClick function that saves data to localStorage
export const handleDemoUploadClick = (
    setLoading: SetLoadingType,
    setTypography: SetTypographyType,
    setPalette: SetPaletteType,
    setStyleGuideUploadTitles: SetTitlesType,
    styleGuideUploadTitles: string[],
    setStyleGuideButtonStyling: SetStyleType,
    setStyleGuieRadioButtonStyling: SetStyleType,
    setStyleGuideTextFieldStyling: SetStyleType,
    setStyleGuideToggleStyling: SetStyleType,
    setStyleGuideCheckBoxStyling: SetStyleType,
    setStyleGuideSegmentedButtonStyling: SetStyleType,
    setStyleGuideInternalNavigationStyling: SetStyleType,
    demoUploadCount: number
) => {
    setLoading({
        typography: true,
        color: true,
        button: true,
        radioButton: true,
        textField: true,
        toggle: true,
        checkBox: true,
        internalNavigation: true,
        segmentedButton: true,
        card: true,
        list: true,
        styleGuideName: true,
        cardHidden: true,
    });

    const randomDelay = () => Math.floor(Math.random() * 5000) + 2000;

    const existingTitles = getStyleGuideUploadTitles();

    if (existingTitles.length > 0) {
        // Example for typography
        setTimeout(() => {
            setLoading((prevState) => ({ ...prevState, typography: false }));
            const typography = "Roboto";
            setTypography(typography);
            saveStylesToLocalStorage("typographyStyles", typography);
        }, randomDelay());

        // Color palette update and save to localStorage
        setTimeout(() => {
            setLoading((prevState) => ({ ...prevState, color: false }));
            const colorPalette = {
                primary: "#1370B0",
                accents: ["#123675", "#FFCC66"],
                neutral: ["#F5F5F5", "#CCCCCC", "#333333"],
            };
            setPalette("primary", 0, colorPalette.primary);
            setPalette("accents", 0, colorPalette.accents[0]);
            setPalette("accents", 1, colorPalette.accents[1]);
            setPalette("neutral", 0, colorPalette.neutral[0]);
            setPalette("neutral", 1, colorPalette.neutral[1]);
            setPalette("neutral", 2, colorPalette.neutral[2]);

            saveStylesToLocalStorage("colorPaletteStyles", colorPalette);
        }, randomDelay());

        // Style guide name update and save to localStorage
        setTimeout(() => {
            const existingCount = styleGuideUploadTitles.filter((title) =>
                title.startsWith("Donkees Guide")
            ).length;
            const newTitle = `Donkees Guide ${existingCount + 1}`;

            const newTitles = [...styleGuideUploadTitles, newTitle];
            setStyleGuideUploadTitles(newTitles);
            setLoading((prevState) => ({
                ...prevState,
                styleGuideName: false,
            }));
            localStorage.setItem(
                "styleGuideUploadTitles",
                JSON.stringify(newTitles)
            ); // Save to localStorage
        }, 2000);

        // Button styling update and save to localStorage
        setTimeout(() => {
            const buttonStyling = {
                primary: {
                    css: {
                        fontSize: "11px",
                        fontWeight: "800",
                        fontFamily: "Roboto",
                        borderRadius: "50px",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        borderColor: "none",
                        borderWidth: "0px",
                        textColor: "#412D00",
                        backgroundColor: "#ECC06C",
                        hoveredBackgroundColor: "#765C28",
                        hoveredTextColor: "#412D00",
                    },
                },
                secondary: {
                    css: {
                        fontSize: "11px",
                        fontWeight: "500",
                        fontFamily: "Roboto",
                        borderRadius: "50px",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        borderColor: "none",
                        borderWidth: "0px",
                        textColor: "#CCCCCC",
                        backgroundColor: "#083D60",
                        hoveredBackgroundColor: "#123675",
                        hoveredTextColor: "#FFFFFF",
                    },
                },
                outlined: {
                    css: {
                        fontSize: "11px",
                        fontWeight: "500",
                        fontFamily: "Roboto",
                        borderRadius: "50px",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        borderColor: "#ECC06C",
                        borderWidth: "2px",
                        textColor: "#ECC06C",
                        backgroundColor: "transparent",
                        hoveredBackgroundColor: "#333333",
                        hoveredTextColor: "#FFFFFF",
                    },
                },
                ghost: {
                    css: {
                        fontSize: "11px",
                        fontWeight: "500",
                        fontFamily: "Roboto",
                        borderRadius: "50px",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        borderColor: "transparent",
                        borderWidth: "1px",
                        textColor: "#1370B0",
                        backgroundColor: "transparent",
                        hoveredBackgroundColor: "#083D60",
                        hoveredTextColor: "#FFFFFF",
                    },
                },
            };
            setStyleGuideButtonStyling(buttonStyling);
            setLoading((prevState) => ({ ...prevState, button: false }));
            saveStylesToLocalStorage("buttonStylingStyles", buttonStyling);
        }, randomDelay());

        // Radio button styling update and save to localStorage
        setTimeout(() => {
            const radioButtonStyling = {
                radioButton: {
                    height: "22px",
                    width: "22px",
                    borderColor: "#B4C1D1",
                    borderWidth: "3px",
                    borderRadius: "50%",
                    borderColorChecked: "#2C98F0",
                    customIcon: {
                        height: "10px",
                        width: "10px",
                        backgroundColor: "#2C98F0",
                        borderRadius: "50%",
                    },
                },
            };
            setStyleGuieRadioButtonStyling(radioButtonStyling);
            setLoading((prevState) => ({ ...prevState, radioButton: false }));
            // localStorage.setItem(
            //     "radioButtonStyling",
            //     JSON.stringify(radioButtonStyling)
            // ); // Save to localStorage
            saveStylesToLocalStorage("radioButtonStyling", radioButtonStyling);
        }, randomDelay());

        // Text field styling update and save to localStorage
        setTimeout(() => {
            const textFieldStyling = {
                textFieldStyling: {
                    inputStyle: {
                        padding: "10px",
                        borderWidth: "1px",
                        borderColor: "#E2E8F0",
                        borderStyle: "solid",
                        borderRadius: "40px",
                        position: "relative",
                        backgroundColor: "#E2E8F0",
                        color: "#000000",
                        clearable: false,
                    },
                    labelStyle: {
                        position: "absolute",
                        backgroundColor: "transparent",
                        zIndex: 10,
                        marginTop: "-23px",
                        marginLeft: "10px",
                        padding: "2px 4px",
                        color: "transparent",
                    },
                    supportingTextStyle: {
                        fontSize: "11px",
                        color: "#666666",
                    },
                },
            };
            setStyleGuideTextFieldStyling(textFieldStyling);
            setLoading((prevState) => ({ ...prevState, textField: false }));
            // localStorage.setItem(
            //     "textFieldStyling",
            //     JSON.stringify(textFieldStyling)
            // ); // Save to localStorage
            saveStylesToLocalStorage("textFieldStyling", textFieldStyling);
        }, randomDelay());

        // Toggle styling update and save to localStorage
        setTimeout(() => {
            const toggleStyling = {
                toggle: {
                    isChecked: true,
                    checkedBackgroundColor: "#15BDFF",
                    uncheckedBackgroundColor: "#E9EAF0",
                    checkedButtonColor: "#FFFFFF",
                    uncheckedButtonColor: "#A9AFC8",
                    checkedBorderColor: "#15BDFF",
                    uncheckedBorderColor: "#A9AFC8",
                    checkedThumbSize: "16px",
                    uncheckedThumbSize: "12px",
                    style: { height: "24px", width: "40px" },
                    borderRadius: "20px",
                },
            };
            setStyleGuideToggleStyling(toggleStyling);
            setLoading((prevState) => ({ ...prevState, toggle: false }));
            // localStorage.setItem(
            //     "toggleStyling",
            //     JSON.stringify(toggleStyling)
            // ); // Save to localStorage
            saveStylesToLocalStorage("toggleStyling", toggleStyling);
        }, randomDelay());

        // Checkbox styling update and save to localStorage
        setTimeout(() => {
            const checkBoxStyling = {
                checkBox: {
                    checkboxBaseStyles: {
                        backgroundColor: "transparent",
                        border: "2px solid #15BDFF",
                        height: "1.25rem",
                        width: "1.25rem",
                        cursor: "pointer",
                        borderRadius: "0.125rem",
                    },
                    checkedStyles: {
                        border: "none",
                        color: "#FFFFFF",
                        backgroundColor: "#15BDFF",
                    },
                    checkedAlternateStyles: {
                        border: "none",
                        color: "#FFFFFF",
                        backgroundColor: "#15BDFF",
                    },
                },
            };
            setStyleGuideCheckBoxStyling(checkBoxStyling);
            setLoading((prevState) => ({ ...prevState, checkBox: false }));
            // localStorage.setItem(
            //     "checkBoxStyling",
            //     JSON.stringify(checkBoxStyling)
            // ); // Save to localStorage
            saveStylesToLocalStorage("checkBoxStyling", checkBoxStyling);
        }, randomDelay());

        // Segmented button styling update and save to localStorage
        setTimeout(() => {
            const segmentedButtonStyling = {
                buttonLabels: ["Label", "Label", "Label", "Label"],
                activeBgColor: "#1B2559",
                inactiveBgColor: "#E3F5FF",
                activeTextColor: "#FFFFFF",
                inactiveTextColor: "#1C1C1C",
                borderColor: "#1C1C1C",
                hoverBgColor: "#E6F0FF",
            };
            setStyleGuideSegmentedButtonStyling(segmentedButtonStyling);
            setLoading((prevState) => ({
                ...prevState,
                segmentedButton: false,
            }));
            // localStorage.setItem(
            //     "segmentedButtonStyling",
            //     JSON.stringify(segmentedButtonStyling)
            // ); // Save to localStorage
            saveStylesToLocalStorage(
                "segmentedButtonStyling",
                segmentedButtonStyling
            );
        }, randomDelay());

        // Internal navigation styling update and save to localStorage
        setTimeout(() => {
            const internalNavigationStyling = {
                internal: {
                    borderBottom: "0px solid #303637",
                    borderRadius: "0px",
                    paddingBottom: "4px",
                },
                active: {
                    color: "#0f163d",
                    textDecoration: "",
                    textDecorationThickness: "",
                    marginBottom: "-4px",
                    textDecorationOffset: "9px",
                    borderBottom: "4px solid #0f163d",
                },
            };
            setStyleGuideInternalNavigationStyling(internalNavigationStyling);
            setLoading((prevState) => ({
                ...prevState,
                internalNavigation: false,
            }));
            saveStylesToLocalStorage(
                "internalNavigationStyles",
                internalNavigationStyling
            );
        }, randomDelay());
    } else {
        setTimeout(() => {
            setLoading((prevState) => ({ ...prevState, typography: false }));
            const typography = "Open Sans";
            setTypography(typography);
            saveStylesToLocalStorage("typographyStyles", typography);
        }, randomDelay());

        // Color palette update and save to localStorage
        setTimeout(() => {
            setLoading((prevState) => ({ ...prevState, color: false }));
            const colorPalette = {
                primary: "#4B7C9D",
                accents: ["#5E79A8", "#E1D4BB"],
                neutral: ["#D6CEBB", "#ECD4D4", "#222320"],
            };
            setPalette("primary", 0, colorPalette.primary);
            setPalette("accents", 0, colorPalette.accents[0]);
            setPalette("accents", 1, colorPalette.accents[1]);
            setPalette("neutral", 0, colorPalette.neutral[0]);
            setPalette("neutral", 1, colorPalette.neutral[1]);
            setPalette("neutral", 2, colorPalette.neutral[2]);

            saveStylesToLocalStorage("colorPaletteStyles", colorPalette);
        }, randomDelay());

        // Style guide name update and save to localStorage
        setTimeout(() => {
            const existingCount = styleGuideUploadTitles.filter((title) =>
                title.startsWith("Donkees Guide")
            ).length;
            const newTitle = `Donkees Guide ${existingCount + 1}`;

            const newTitles = [...styleGuideUploadTitles, newTitle];
            setStyleGuideUploadTitles(newTitles);
            setLoading((prevState) => ({
                ...prevState,
                styleGuideName: false,
            }));
            localStorage.setItem(
                "styleGuideUploadTitles",
                JSON.stringify(newTitles)
            ); // Save to localStorage
        }, 2000);

        // Button styling update and save to localStorage
        setTimeout(() => {
            const buttonStyling = {
                primary: {
                    css: {
                        fontSize: "11px",
                        fontWeight: "800",
                        fontFamily: "Sans Open",
                        borderRadius: "50px",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        borderColor: "none",
                        borderWidth: "0px",
                        textColor: "#412D00",
                        backgroundColor: "#4B7C9D",
                        hoveredBackgroundColor: "#765C28",
                        hoveredTextColor: "#412D00",
                    },
                },
                secondary: {
                    css: {
                        fontSize: "11px",
                        fontWeight: "500",
                        fontFamily: "Sans Open",
                        borderRadius: "50px",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        borderColor: "none",
                        borderWidth: "0px",
                        textColor: "#CCCCCC",
                        backgroundColor: "#083D60",
                        hoveredBackgroundColor: "#123675",
                        hoveredTextColor: "#FFFFFF",
                    },
                },
                outlined: {
                    css: {
                        fontSize: "11px",
                        fontWeight: "500",
                        fontFamily: "Sans Open",
                        borderRadius: "50px",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        borderColor: "#ECC06C",
                        borderWidth: "2px",
                        textColor: "#ECC06C",
                        backgroundColor: "transparent",
                        hoveredBackgroundColor: "#333333",
                        hoveredTextColor: "#FFFFFF",
                    },
                },
                ghost: {
                    css: {
                        fontSize: "11px",
                        fontWeight: "500",
                        fontFamily: "Sans Open",
                        borderRadius: "50px",
                        paddingLeft: "25px",
                        paddingRight: "25px",
                        paddingTop: "20px",
                        paddingBottom: "20px",
                        borderColor: "transparent",
                        borderWidth: "1px",
                        textColor: "#1370B0",
                        backgroundColor: "transparent",
                        hoveredBackgroundColor: "#083D60",
                        hoveredTextColor: "#FFFFFF",
                    },
                },
            };
            setStyleGuideButtonStyling(buttonStyling);
            setLoading((prevState) => ({ ...prevState, button: false }));
            saveStylesToLocalStorage("buttonStylingStyles", buttonStyling);
        }, randomDelay());

        // Radio button styling update and save to localStorage
        setTimeout(() => {
            const radioButtonStyling = {
                radioButton: {
                    height: "22px",
                    width: "22px",
                    borderColor: "#B4C1D1",
                    borderWidth: "3px",
                    borderRadius: "50%",
                    borderColorChecked: "#2C98F0",
                    customIcon: {
                        height: "10px",
                        width: "10px",
                        backgroundColor: "#2C98F0",
                        borderRadius: "50%",
                    },
                },
            };
            setStyleGuieRadioButtonStyling(radioButtonStyling);
            setLoading((prevState) => ({ ...prevState, radioButton: false }));
            // localStorage.setItem(
            //     "radioButtonStyling",
            //     JSON.stringify(radioButtonStyling)
            // ); // Save to localStorage
            saveStylesToLocalStorage("radioButtonStyling", radioButtonStyling);
        }, randomDelay());

        // Text field styling update and save to localStorage
        setTimeout(() => {
            const textFieldStyling = {
                textFieldStyling: {
                    inputStyle: {
                        padding: "10px",
                        borderWidth: "1px",
                        borderColor: "#E2E8F0",
                        borderStyle: "solid",
                        borderRadius: "40px",
                        position: "relative",
                        backgroundColor: "#E2E8F0",
                        color: "#000000",
                        clearable: false,
                    },
                    labelStyle: {
                        position: "absolute",
                        backgroundColor: "transparent",
                        zIndex: 10,
                        marginTop: "-23px",
                        marginLeft: "10px",
                        padding: "2px 4px",
                        color: "transparent",
                    },
                    supportingTextStyle: {
                        fontSize: "11px",
                        color: "#666666",
                    },
                },
            };
            setStyleGuideTextFieldStyling(textFieldStyling);
            setLoading((prevState) => ({ ...prevState, textField: false }));
            // localStorage.setItem(
            //     "textFieldStyling",
            //     JSON.stringify(textFieldStyling)
            // ); // Save to localStorage
            saveStylesToLocalStorage("textFieldStyling", textFieldStyling);
        }, randomDelay());

        // Toggle styling update and save to localStorage
        setTimeout(() => {
            const toggleStyling = {
                toggle: {
                    isChecked: true,
                    checkedBackgroundColor: "#15BDFF",
                    uncheckedBackgroundColor: "#E9EAF0",
                    checkedButtonColor: "#FFFFFF",
                    uncheckedButtonColor: "#A9AFC8",
                    checkedBorderColor: "#15BDFF",
                    uncheckedBorderColor: "#A9AFC8",
                    checkedThumbSize: "16px",
                    uncheckedThumbSize: "12px",
                    style: { height: "24px", width: "40px" },
                    borderRadius: "20px",
                },
            };
            setStyleGuideToggleStyling(toggleStyling);
            setLoading((prevState) => ({ ...prevState, toggle: false }));
            // localStorage.setItem(
            //     "toggleStyling",
            //     JSON.stringify(toggleStyling)
            // ); // Save to localStorage
            saveStylesToLocalStorage("toggleStyling", toggleStyling);
        }, randomDelay());

        // Checkbox styling update and save to localStorage
        setTimeout(() => {
            const checkBoxStyling = {
                checkBox: {
                    checkboxBaseStyles: {
                        backgroundColor: "transparent",
                        border: "2px solid #15BDFF",
                        height: "1.25rem",
                        width: "1.25rem",
                        cursor: "pointer",
                        borderRadius: "0.125rem",
                    },
                    checkedStyles: {
                        border: "none",
                        color: "#FFFFFF",
                        backgroundColor: "#15BDFF",
                    },
                    checkedAlternateStyles: {
                        border: "none",
                        color: "#FFFFFF",
                        backgroundColor: "#15BDFF",
                    },
                },
            };
            setStyleGuideCheckBoxStyling(checkBoxStyling);
            setLoading((prevState) => ({ ...prevState, checkBox: false }));
            // localStorage.setItem(
            //     "checkBoxStyling",
            //     JSON.stringify(checkBoxStyling)
            // ); // Save to localStorage
            saveStylesToLocalStorage("checkBoxStyling", checkBoxStyling);
        }, randomDelay());

        // Segmented button styling update and save to localStorage
        setTimeout(() => {
            const segmentedButtonStyling = {
                buttonLabels: ["Label", "Label", "Label", "Label"],
                activeBgColor: "#1B2559",
                inactiveBgColor: "#E3F5FF",
                activeTextColor: "#FFFFFF",
                inactiveTextColor: "#1C1C1C",
                borderColor: "#1C1C1C",
                hoverBgColor: "#E6F0FF",
            };
            setStyleGuideSegmentedButtonStyling(segmentedButtonStyling);
            setLoading((prevState) => ({
                ...prevState,
                segmentedButton: false,
            }));
            // localStorage.setItem(
            //     "segmentedButtonStyling",
            //     JSON.stringify(segmentedButtonStyling)
            // ); // Save to localStorage
            saveStylesToLocalStorage(
                "segmentedButtonStyling",
                segmentedButtonStyling
            );
        }, randomDelay());

        // Internal navigation styling update and save to localStorage
        setTimeout(() => {
            const internalNavigationStyling = {
                internal: {
                    borderBottom: "0px solid #303637",
                    borderRadius: "0px",
                    paddingBottom: "4px",
                },
                active: {
                    color: "#0f163d",
                    textDecoration: "",
                    textDecorationThickness: "",
                    marginBottom: "-4px",
                    textDecorationOffset: "9px",
                    borderBottom: "4px solid #0f163d",
                },
            };
            setStyleGuideInternalNavigationStyling(internalNavigationStyling);
            setLoading((prevState) => ({
                ...prevState,
                internalNavigation: false,
            }));
            saveStylesToLocalStorage(
                "internalNavigationStyles",
                internalNavigationStyling
            );
        }, randomDelay());
    }
};

export const applySavedStyles = (
    setLoading: SetLoadingType,
    setTypography: (value: string) => void,
    setPalette: (palette: string, index: number, color: string) => void,
    setStyleGuideUploadTitles: Dispatch<SetStateAction<string[]>>,
    setStyleGuideButtonStyling: Dispatch<SetStateAction<any>>,
    setStyleGuieRadioButtonStyling: Dispatch<SetStateAction<any>>,
    setStyleGuideTextFieldStyling: Dispatch<SetStateAction<any>>,
    setStyleGuideToggleStyling: Dispatch<SetStateAction<any>>,
    setStyleGuideCheckBoxStyling: Dispatch<SetStateAction<any>>,
    setStyleGuideSegmentedButtonStyling: Dispatch<SetStateAction<any>>,
    setStyleGuideInternalNavigationStyling: Dispatch<SetStateAction<any>>,
    styleIndex?: number
) => {
    // Helper function to apply the last style in the stored array
    function applyLastStoredStyle(key, applyFunction) {
        const storedStyles = localStorage.getItem(key);
        if (storedStyles) {
            const stylesArray = JSON.parse(storedStyles);
            const lastStyle = stylesArray[stylesArray.length - 1]; // Get the last item from the array
            applyFunction(lastStyle);
        }
    }

    // Helper function to apply style by index from stored array
    function applyStyleByIndex(key, applyFunction, index) {
        const storedStyles = localStorage.getItem(key);
        if (storedStyles) {
            const stylesArray = JSON.parse(storedStyles);
            if (index < stylesArray.length) {
                const style = stylesArray[index];
                applyFunction(style);
            }
        }
    }

    // Conditionally apply styles based on the presence of an index
    if (typeof styleIndex === "number") {
        console.log("Applying styles by index");
        applyStyleByIndex("typographyStyles", setTypography, styleIndex);
        applyStyleByIndex(
            "colorPaletteStyles",
            (palette) => {
                if (palette) {
                    setPalette("primary", 0, palette.primary);
                    setPalette("accents", 0, palette.accents[0]);
                    setPalette("accents", 1, palette.accents[1]);
                    setPalette("neutral", 0, palette.neutral[0]);
                    setPalette("neutral", 1, palette.neutral[1]);
                    setPalette("neutral", 2, palette.neutral[2]);
                }
            },
            styleIndex
        );
        applyStyleByIndex(
            "styleGuideUploadTitlesStyles",
            setStyleGuideUploadTitles,
            styleIndex
        );
        applyStyleByIndex(
            "buttonStylingStyles",
            setStyleGuideButtonStyling,
            styleIndex
        );
        applyStyleByIndex(
            "radioButtonStyles",
            setStyleGuieRadioButtonStyling,
            styleIndex
        );
        applyStyleByIndex(
            "textFieldStylingStyles",
            setStyleGuideTextFieldStyling,
            styleIndex
        );
        applyStyleByIndex(
            "toggleStyling",
            setStyleGuideToggleStyling,
            styleIndex
        );
        applyStyleByIndex(
            "checkBoxStyling",
            setStyleGuideCheckBoxStyling,
            styleIndex
        );
        applyStyleByIndex(
            "segmentedButtonStyles",
            setStyleGuideSegmentedButtonStyling,
            styleIndex
        );
        applyStyleByIndex(
            "internalNavigationStyles",
            setStyleGuideInternalNavigationStyling,
            styleIndex
        );
    } else {
        // Apply typography style
        applyLastStoredStyle("typographyStyles", (style) => {
            setTypography(style);
            setLoading((prevState) => ({ ...prevState, typography: false }));
            setLoading((prevState) => ({ ...prevState, cardHidden: true }));
        });

        // Apply color palette style
        applyLastStoredStyle("colorPaletteStyles", (palette) => {
            if (palette) {
                setPalette("primary", 0, palette.primary);
                setPalette("accents", 0, palette.accents[0]);
                setPalette("accents", 1, palette.accents[1]);
                setPalette("neutral", 0, palette.neutral[0]);
                setPalette("neutral", 1, palette.neutral[1]);
                setPalette("neutral", 2, palette.neutral[2]);
                setLoading((prevState) => ({ ...prevState, color: false }));
            }
        });

        // Apply style guide upload titles
        applyLastStoredStyle("styleGuideUploadTitlesStyles", (titles) => {
            setStyleGuideUploadTitles(titles);
            setLoading((prevState) => ({
                ...prevState,
                styleGuideName: false,
            }));
        });

        // Apply button styling
        applyLastStoredStyle("buttonStylingStyles", (styling) => {
            setStyleGuideButtonStyling(styling);
            setLoading((prevState) => ({ ...prevState, button: false }));
        });

        // Apply radio button styling
        applyLastStoredStyle("radioButtonStyles", (styling) => {
            setStyleGuieRadioButtonStyling(styling);
            setLoading((prevState) => ({ ...prevState, radioButton: false }));
        });

        // Apply text field styling
        applyLastStoredStyle("textFieldStylingStyles", (styling) => {
            setStyleGuideTextFieldStyling(styling);
            setLoading((prevState) => ({ ...prevState, textField: false }));
        });

        // Apply toggle styling
        applyLastStoredStyle("toggleStyling", (styling) => {
            setStyleGuideToggleStyling(styling);
            setLoading((prevState) => ({ ...prevState, toggle: false }));
        });

        // Apply checkbox styling
        applyLastStoredStyle("checkBoxStyling", (styling) => {
            setStyleGuideCheckBoxStyling(styling);
            setLoading((prevState) => ({ ...prevState, checkBox: false }));
        });

        // Apply segmented button styling
        applyLastStoredStyle("segmentedButtonStyles", (styling) => {
            setStyleGuideSegmentedButtonStyling(styling);
            setLoading((prevState) => ({
                ...prevState,
                segmentedButton: false,
            }));
        });

        // Apply internal navigation styling
        applyLastStoredStyle("internalNavigationStyles", (styling) => {
            setStyleGuideInternalNavigationStyling(styling);
            setLoading((prevState) => ({
                ...prevState,
                internalNavigation: false,
            }));
        });
    }
};
