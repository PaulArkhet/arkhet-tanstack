import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import { useTypographyStore } from "@/store/useTypographyStore";
import { useColorPaletteStore } from "@/store/useColorPaletteStore";
import { useButtonStore } from "@/store/useButtonStore";
import { useTextFieldStore } from "@/store/useTextFieldStore";
import ColorSection from "@/components/design-system/sections/ColorSection";
import ButtonSection from "@/components/design-system/sections/ButtonSection";
import TypographySection from "@/components/design-system/sections/TypographySection";
import TextFieldSection from "@/components/design-system/sections/TextFieldSection";
import ToggleSection from "@/components/design-system/sections/ToggleSection";
import CheckBoxSection from "@/components/design-system/sections/CheckBoxSection";
import InternalNavigationSection from "@/components/design-system/sections/InternalNavigationSection";
import SegmentedButtonSection from "@/components/design-system/sections/SegmentedButtonSection";
import CardSection from "@/components/design-system/sections/CardSection";
import ListSection from "@/components/design-system/sections/ListSection";
import { toast } from "@/hooks/use-toast";
import SkeletonComponent from "@/components/design-system/components/Skeleton";
import { Input } from "@/components/ui/input";
import {
    capitalizeFontFamily,
    LoadingState,
    removeFileExtension,
    resetAllLoading,
} from "@/utils/helpers";
import RadioButtonSection from "@/components/design-system/sections/RadioButtonSection";
import { useDesignSystemScreenshotStore } from "@/store/useDesignSystemScreenshotStore";
import { domToPng } from "modern-screenshot";
import CustomizationSection from "@/components/design-system/sections/CustomizationSection";
import { useToggleStore } from "@/store/useToggleStore";
import { useInternalNavigationStore } from "@/store/useInternalNavigationStore";
import { useCardStore } from "@/store/useCardStore";
import { useRadioButtonStore } from "@/store/useRadioButtonStore";
import { useCheckBoxStore } from "@/store/useCheckBoxStore";
import { useSegmentedButtonStore } from "@/store/useSegmentedButtonStore";
import { getUserIdFromToken } from "@/services/jwt.service";
import { saveStyleGuide } from "@/services/styleGuideService";
import { loadSavedStyleGuide } from "@/utils/styleGuideUtils";
import useUpdateUIComponentStyles from "@/hooks/useUpdateUIComponentStyles";
import { useSectionSearch } from "@/hooks/useSectionSearch";
import { useUploadedStyleGuideStore } from "@/store/useUploadedStyleGuideStore";
import useAuthStore from "@/store/AuthStore";
import Divider from "@/components/design-system/components/Divider";
import uploadIcon from "/iconupload.svg";
import infoIcon from "/iconinfo.svg";
import backIcon from "/iconback.svg";

export default function DesignSystemPage() {
    const { user } = useAuthStore((state) => state);
    const [loading, setLoading] = useState<LoadingState>({
        styleGuideName: false,
        typography: false,
        color: false,
        button: false,
        radioButton: false,
        textField: false,
        toggle: false,
        checkBox: false,
        internalNavigation: false,
        segmentedButton: false,
        card: false,
        list: false,
    });
    const [search, setSearch] = useState("");
    const [isDesignSystemActive, setIsDesignSystemActive] = useState(false);
    const setBase64Screenshot = useDesignSystemScreenshotStore(
        (state) => state.setBase64Screenshot
    );
    const { setCustomizationFont } = useTypographyStore();
    const { setButtonType } = useButtonStore();
    const { setCustomizationTextField } = useTextFieldStore();
    const { setCustomizationToggle } = useToggleStore();
    const { setCustomizationInternalNavigation } = useInternalNavigationStore();
    const { setCustomizationEnabledCard } = useCardStore();
    const {
        currentlyDisplayingStyleGuide,
        updateCurrentlyDisplayingStyleGuide,
    } = useUploadedStyleGuideStore();

    const sections = {
        typography: useRef<HTMLDivElement>(null),
        color: useRef<HTMLDivElement>(null),
        buttons: useRef<HTMLDivElement>(null),
        radioButton: useRef<HTMLDivElement>(null),
        textField: useRef<HTMLDivElement>(null),
        toggle: useRef<HTMLDivElement>(null),
        checkBox: useRef<HTMLDivElement>(null),
        internalNavigation: useRef<HTMLDivElement>(null),
        segmentedButton: useRef<HTMLDivElement>(null),
        card: useRef<HTMLDivElement>(null),
        list: useRef<HTMLDivElement>(null),
    };

    useSectionSearch(search, sections);
    useUpdateUIComponentStyles(currentlyDisplayingStyleGuide);

    const socketRef = useRef<any>(null);

    useEffect(() => {
        if (sections.color?.current) {
            domToPng(sections.color.current).then(setBase64Screenshot);
        }
    }, [sections.color.current]);

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await loadSavedStyleGuide(user!.user_id);
                if (result) {
                    console.log("Fetching the loading Data", result);
                    updateCurrentlyDisplayingStyleGuide(result);
                } else {
                    console.log("Nothing to load style guides.");
                }
            } catch (error) {
                console.error("Failed to load style guides:", error);
            }
        }

        fetchData();
    }, [user!.user_id]);

    useEffect(() => {
        return () => {
            if (socketRef.current) {
                socketRef.current.disconnect();
                console.log("Socket.IO connection closed on page reload.");
            }
        };
    }, []);

    const handleUploadClick = async (
        e: React.ChangeEvent<HTMLInputElement>
    ) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];

            try {
                await initializeSocket(file);
                await saveToDatabase(file.name);
            } catch (error) {
                console.error(
                    "Error during socket communication or data processing:",
                    error
                );
                handleFailure(
                    "Socket.IO connection error or data processing failed."
                );
            }
        }
    };

    const initializeSocket = (file: File): Promise<void> => {
        return new Promise((resolve, reject) => {
            socketRef.current = io("http://127.0.0.1:3000");

            const updatePromises: Promise<void>[] = [];

            socketRef.current.on("connect", () => {
                console.log("Socket.IO connected, starting upload...");
                handleFileUpload(file);
            });

            socketRef.current.on("styledComponent", (data: any) => {
                console.log("Received styled component:", data);
                const updatePromise = processStyledComponentData(data);
                updatePromises.push(updatePromise);
            });

            socketRef.current.on("done", () => {
                Promise.all(updatePromises)
                    .then(() => {
                        console.log(
                            "All components styled, preparing to disconnect."
                        );
                        socketRef.current.disconnect();
                        sections.color?.current &&
                            domToPng(sections.color.current).then(
                                setBase64Screenshot
                            );
                        resolve();
                    })
                    .catch((error) => {
                        console.error(
                            "Error processing styled components:",
                            error
                        );
                        reject(new Error("Error during component styling"));
                    });
            });

            socketRef.current.on("disconnect", () => {
                console.log("Socket.IO connection closed.");
                if (!updatePromises) {
                    reject(
                        new Error("Disconnected before all data was processed")
                    );
                }
            });

            socketRef.current.on("connect_error", (error: any) => {
                console.error("Socket.IO connection error:", error);
                handleFailure("Socket.IO connection error.");
            });
        });
    };

    const handleFileUpload = async (file: File) => {
        if (!file) return;

        setLoading(resetAllLoading(loading, true));

        const formData = new FormData();
        formData.append("uploadedFiles", file);

        try {
            const response = await fetch("http://127.0.0.1:3000/styleguide", {
                method: "POST",
                body: formData,
            });

            if (!response.ok) {
                throw new Error(
                    `Server responded with status: ${response.status}`
                );
            }
        } catch (error) {
            console.error("Error uploading file:", error);
        }
    };

    const processStyledComponentData = (data: any): Promise<void> => {
        return new Promise<void>((resolve) => {
            const promises: Promise<void>[] = [];

            const updateState = (updateFn: () => void) => {
                const promise = new Promise<void>((res) => {
                    updateFn();
                    res();
                });
                promises.push(promise);
            };

            if (
                data.fileName === "typography" &&
                data.styledComponent.typography.fontFamily
            ) {
                updateState(() => {
                    const fontFamily = capitalizeFontFamily(
                        data.styledComponent.typography.fontFamily
                    );
                    useTypographyStore.setState((state) => ({
                        ...state,
                        selectedFont: fontFamily,
                    }));
                    setLoading((prevState) => ({
                        ...prevState,
                        typography: false,
                    }));
                });
            } else {
                setLoading((prevState) => ({
                    ...prevState,
                    typography: false,
                }));
            }

            if (data.fileName === "color" && data.styledComponent.color) {
                updateState(() => {
                    const { primary, accent, neutral } =
                        data.styledComponent.color;
                    if (primary && primary[0]) {
                        useColorPaletteStore
                            .getState()
                            .setPalette("primary", 0, primary);
                    }
                    accent.forEach((color: string, index: number) => {
                        if (index < 2) {
                            useColorPaletteStore
                                .getState()
                                .setPalette("accents", index, color);
                        }
                    });
                    neutral.forEach((color: string, index: number) => {
                        if (index < 3) {
                            useColorPaletteStore
                                .getState()
                                .setPalette("neutral", index, color);
                        }
                    });
                    setLoading((prevState) => ({
                        ...prevState,
                        color: false,
                    }));
                });
            }

            if (data.fileName === "button" && data.styledComponent.button) {
                updateState(() => {
                    const buttonData = JSON.parse(data.styledComponent.button);
                    useButtonStore.setState((state) => ({
                        ...state,
                        buttonStyles: {
                            primary: {
                                ...state.buttonStyles.primary,
                                ...buttonData.primary.css,
                            },
                            secondary: {
                                ...state.buttonStyles.secondary,
                                ...buttonData.secondary.css,
                            },
                            outlined: {
                                ...state.buttonStyles.outlined,
                                ...buttonData.outlined.css,
                            },
                            ghost: {
                                ...state.buttonStyles.ghost,
                                ...buttonData.ghost.css,
                            },
                        },
                    }));
                    setLoading((prevState) => ({
                        ...prevState,
                        button: false,
                    }));
                });
            }

            if (
                data.fileName === "radiobutton" &&
                data.styledComponent.radiobutton
            ) {
                updateState(() => {
                    const radioButtonData = JSON.parse(
                        data.styledComponent.radiobutton
                    );
                    useRadioButtonStore.setState((state) => ({
                        ...state,
                        radioButtonStyles: {
                            ...state.radioButtonStyles,
                            ...radioButtonData.radioButton,
                        },
                    }));
                    setLoading((prevState) => ({
                        ...prevState,
                        radioButton: false,
                    }));
                });
            }

            if (data.fileName === "input" && data.styledComponent.input) {
                updateState(() => {
                    const textFieldData = JSON.parse(
                        data.styledComponent.input
                    );
                    useTextFieldStore.setState((state) => ({
                        ...state,
                        textFieldStyling: {
                            ...state.textFieldStyling,
                            ...textFieldData.textFieldStyling,
                        },
                    }));
                    setLoading((prevState) => ({
                        ...prevState,
                        textField: false,
                    }));
                });
            }

            if (data.fileName === "toggle" && data.styledComponent.toggle) {
                updateState(() => {
                    const toggleData = JSON.parse(data.styledComponent.toggle);
                    useToggleStore.setState((state) => ({
                        ...state,
                        toggleStyling: {
                            ...state.toggleStyling,
                            ...toggleData.toggle,
                        },
                    }));
                    setLoading((prevState) => ({
                        ...prevState,
                        toggle: false,
                    }));
                });
            }

            if (data.fileName === "checkbox" && data.styledComponent.checkbox) {
                updateState(() => {
                    const checkboxData = JSON.parse(
                        data.styledComponent.checkbox
                    );
                    useCheckBoxStore.setState((state) => ({
                        ...state,
                        checkBoxStyling: {
                            ...state.checkBoxStyling,
                            ...checkboxData.checkBox,
                        },
                    }));
                    setLoading((prevState) => ({
                        ...prevState,
                        checkBox: false,
                    }));
                });
            }

            if (
                data.fileName === "segmentedbutton" &&
                data.styledComponent.segmentedbutton
            ) {
                updateState(() => {
                    const segmentedButtonData = JSON.parse(
                        data.styledComponent.segmentedbutton
                    );
                    useSegmentedButtonStore.setState((state) => ({
                        ...state,
                        SegmentedButtonStyles: {
                            ...state.SegmentedButtonStyles,
                            ...segmentedButtonData,
                        },
                    }));
                    setLoading((prevState) => ({
                        ...prevState,
                        segmentedButton: false,
                    }));
                });
            }

            if (data.fileName === "tabs" && data.styledComponent.tabs) {
                updateState(() => {
                    const internalNavigationData = JSON.parse(
                        data.styledComponent.tabs
                    );
                    useInternalNavigationStore.setState((state) => ({
                        ...state,
                        InternalNavigationStyles: {
                            ...state.InternalNavigationStyles,
                            ...internalNavigationData,
                        },
                    }));
                    setLoading((prevState) => ({
                        ...prevState,
                        internalNavigation: false,
                    }));
                });
            }

            if (data.fileName === "card" && data.styledComponent.card) {
                updateState(() => {
                    const cardData = JSON.parse(data.styledComponent.card);
                    useCardStore.setState((state) => ({
                        ...state,
                        cardStyles: { ...state.cardStyles, ...cardData },
                    }));
                    setLoading((prevState) => ({
                        ...prevState,
                        card: false,
                        list: false,
                    }));
                });
            }

            Promise.all(promises).then(() => {
                resolve();
            });
        });
    };

    const saveToDatabase = async (filename: string) => {
        const styleGuideData = {
            filename: removeFileExtension(filename),
            typography: useTypographyStore.getState().selectedFont,
            colors: useColorPaletteStore.getState().palette,
            buttons: useButtonStore.getState().buttonStyles,
            radiobuttons: useRadioButtonStore.getState().radioButtonStyles,
            textfields: useTextFieldStore.getState().textFieldStyling,
            toggle: useToggleStore.getState().toggleStyling,
            checkboxes: useCheckBoxStore.getState().checkBoxStyling,
            internalnavigation:
                useInternalNavigationStore.getState().InternalNavigationStyles,
            segmentedbutton:
                useSegmentedButtonStore.getState().SegmentedButtonStyles,
            card: useCardStore.getState().cardStyles,
            user_id: getUserIdFromToken(),
        };

        await saveStyleGuide(styleGuideData, setLoading);
        toast({
            title: "Success",
            description: "Style guide saved successfully.",
            variant: "default",
            duration: 5000,
        });
    };

    const handleFailure = (message: string) => {
        setLoading(resetAllLoading(loading, false));
        toast({
            title: "Error",
            description: message,
            variant: "destructive",
            duration: 5000,
        });
    };

    return (
        <div className="w-full">
            {!isDesignSystemActive && (
                <div className="p-10 pt-5">
                    <div className="flex justify-between">
                        <div className="flex w-[300px]">
                            <h2 className="font text-xl py-3 pr-2">
                                Style guides
                            </h2>
                            <img src={infoIcon} alt="" className="py-3" />
                        </div>
                        <div className="flex rounded bg-[#9253E4] px-6 py-2 text-white cursor-pointer">
                            <img src={uploadIcon} className="cursor-pointer" />
                            <label
                                htmlFor="fileUpload"
                                className="pl-3 py-2 text-sm tracking-widest cursor-pointer"
                            >
                                UPLOAD
                            </label>
                            <input
                                id="fileUpload"
                                type="file"
                                accept=".csv"
                                className="hidden"
                            />
                        </div>
                    </div>
                    <h3>
                        Upload or build your style guide to apply to your
                        prototype
                    </h3>
                </div>
            )}
            {!isDesignSystemActive && (
                <div className="md:grid grid-cols-5 gap-3 pl-10 cursor-pointer">
                    <div
                        className="px-10 pb-5 border border-[#404040] flex flex-col"
                        onClick={() => setIsDesignSystemActive(true)}
                    >
                        <div className="text-8xl mx-auto">+</div>
                        <div className="text-center">
                            Create new style guide
                        </div>
                    </div>
                    <div
                        className="px-10 pb-5 pt-7 border border-[#404040] flex flex-col"
                        onClick={() => setIsDesignSystemActive(true)}
                    >
                        <img
                            src={uploadIcon}
                            alt=""
                            className="w-[60px] h-[60px] mx-auto"
                        />
                        <div className="text-center py-3">
                            Upload new style guide
                        </div>
                    </div>
                </div>
            )}
            {isDesignSystemActive && (
                <main className="flex">
                    <div className="flex flex-col flex-wrap basis-4/5">
                        <div
                            className="pl-5 flex w-[200px] cursor-pointer"
                            onClick={() => setIsDesignSystemActive(false)}
                        >
                            <img src={backIcon} alt="" className="" />
                            <div className="pl-2 text-sm">
                                Back to style guides
                            </div>
                        </div>
                        <div className="px-10 ml-10 mt-10 flex justify-between items-center">
                            <div className="flex w-full max-w-sm items-center space-x-2">
                                <Input
                                    className="border-none tracking-[.25em]"
                                    type="text"
                                    placeholder="SEARCH COMPONENTS..."
                                    onChange={(e) => {
                                        setSearch(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="px-4 py-1 text-sm rounded-3xl border border-purple-500 text-purple-500 text-center justify-center hover:cursor-pointer flex flex-row gap-1">
                                <div>
                                    <svg
                                        width="16"
                                        height="19"
                                        viewBox="0 0 16 19"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M3.42857 0C1.53571 0 0 1.53571 0 3.42857V14.8571C0 16.75 1.53571 18.2857 3.42857 18.2857H13.7143H14.8571C15.4893 18.2857 16 17.775 16 17.1429C16 16.5107 15.4893 16 14.8571 16V13.7143C15.4893 13.7143 16 13.2036 16 12.5714V1.14286C16 0.510714 15.4893 0 14.8571 0H13.7143H3.42857ZM3.42857 13.7143H12.5714V16H3.42857C2.79643 16 2.28571 15.4893 2.28571 14.8571C2.28571 14.225 2.79643 13.7143 3.42857 13.7143ZM4.57143 5.14286C4.57143 4.82857 4.82857 4.57143 5.14286 4.57143H12C12.3143 4.57143 12.5714 4.82857 12.5714 5.14286C12.5714 5.45714 12.3143 5.71429 12 5.71429H5.14286C4.82857 5.71429 4.57143 5.45714 4.57143 5.14286ZM5.14286 6.85714H12C12.3143 6.85714 12.5714 7.11429 12.5714 7.42857C12.5714 7.74286 12.3143 8 12 8H5.14286C4.82857 8 4.57143 7.74286 4.57143 7.42857C4.57143 7.11429 4.82857 6.85714 5.14286 6.85714Z"
                                            fill="#9253E4"
                                        />
                                    </svg>
                                </div>

                                <label
                                    htmlFor="fileUpload"
                                    className="cursor-pointer"
                                >
                                    Upload Design System
                                </label>
                                <input
                                    id="fileUpload"
                                    type="file"
                                    accept="image/png, image/jpg, image/jpeg"
                                    onChange={handleUploadClick}
                                    className="hidden"
                                />
                            </div>
                        </div>
                        <Divider hrOption="border-zinc-700" divOption="py-1" />
                        <div className="px-10 ml-14 mt-10">
                            <div
                                className="section-styling"
                                ref={sections.color}
                            >
                                <div className="w-40">
                                    <h1 className="text-white text-sm tracking-[.20em] font-semibold">
                                        COLORS
                                    </h1>
                                </div>

                                {loading.color ? (
                                    <SkeletonComponent type="color" />
                                ) : (
                                    <ColorSection />
                                )}
                            </div>
                            <div
                                className="section-styling"
                                ref={sections.typography}
                                onClick={() => {
                                    setCustomizationFont(true);
                                }}
                            >
                                <div className="w-40">
                                    <h1 className="text-white text-sm tracking-[.20em] font-semibold">
                                        TYPOGRAPHY
                                    </h1>
                                </div>

                                {loading.typography ? (
                                    <SkeletonComponent type="typography" />
                                ) : (
                                    <TypographySection />
                                )}
                            </div>
                            <div
                                ref={sections.buttons}
                                className="section-styling"
                            >
                                <div className="w-40">
                                    <h1 className="text-white text-sm tracking-[.20em] font-semibold               ">
                                        BUTTON
                                    </h1>
                                </div>
                                {loading.button ? (
                                    <SkeletonComponent type="button" />
                                ) : (
                                    <ButtonSection />
                                )}
                            </div>
                            <div
                                ref={sections.buttons}
                                className="section-styling"
                            >
                                <div className="w-40">
                                    <h1 className="text-white text-sm tracking-[.20em] font-semibold               ">
                                        RADIO BUTTON
                                    </h1>
                                </div>
                                {loading.radioButton ? (
                                    <SkeletonComponent type="radioButton" />
                                ) : (
                                    <RadioButtonSection />
                                )}
                            </div>
                            <div
                                ref={sections.checkBox}
                                onClick={() => {
                                    setCustomizationToggle(true);
                                    setCustomizationTextField(false);
                                    setCustomizationInternalNavigation(false);
                                    setButtonType("");
                                }}
                                className="section-styling"
                            >
                                <div className="w-40">
                                    <h1 className="text-white text-sm tracking-[.20em] font-semibold               ">
                                        CHECK BOX
                                    </h1>
                                </div>
                                {loading.checkBox ? (
                                    <SkeletonComponent type="checkbox" />
                                ) : (
                                    <CheckBoxSection />
                                )}
                            </div>
                            <div
                                ref={sections.toggle}
                                onClick={() => {
                                    setCustomizationToggle(true);
                                    setCustomizationTextField(false);
                                    setCustomizationInternalNavigation(false);
                                }}
                                className="section-styling"
                            >
                                <div className="w-40">
                                    <h1 className="text-white text-sm tracking-[.20em] font-semibold               ">
                                        TOGGLE
                                    </h1>
                                </div>
                                {loading.toggle ? (
                                    <SkeletonComponent type="toggle" />
                                ) : (
                                    <ToggleSection />
                                )}
                            </div>
                            <div
                                ref={sections.textField}
                                onClick={() => {
                                    setCustomizationTextField(true);
                                    setCustomizationToggle(false);
                                    setCustomizationInternalNavigation(false);
                                    setButtonType("");
                                }}
                                className="section-styling"
                            >
                                <div className="w-40">
                                    <h1 className="text-white text-sm tracking-[.20em] font-semibold               ">
                                        INPUT FIELD
                                    </h1>
                                </div>
                                {loading.textField ? (
                                    <SkeletonComponent type="textField" />
                                ) : (
                                    <TextFieldSection />
                                )}
                            </div>
                            <div
                                onClick={() => {
                                    setCustomizationInternalNavigation(true);
                                    setCustomizationTextField(false);
                                    setCustomizationToggle(false);
                                    setButtonType("");
                                }}
                                className="section-styling"
                                ref={sections.internalNavigation}
                            >
                                <div className="w-40">
                                    <h1 className="text-white text-sm tracking-[.20em] font-semibold               ">
                                        NAVIGATION
                                    </h1>
                                </div>

                                <div>
                                    <h1 className="text-white text-sm tracking-[.20em] font-semibold                mb-5">
                                        INTERNAL NAVIGATION
                                    </h1>
                                    {loading.internalNavigation ? (
                                        <SkeletonComponent type="internalNavigation" />
                                    ) : (
                                        <InternalNavigationSection />
                                    )}
                                </div>
                                <div ref={sections.segmentedButton}>
                                    <h1 className="text-white text-sm tracking-[.20em] font-semibold                mb-5">
                                        SEGMENTED BUTTON
                                    </h1>
                                    {loading.segmentedButton ? (
                                        <SkeletonComponent type="segmentedButton" />
                                    ) : (
                                        <SegmentedButtonSection />
                                    )}
                                </div>
                            </div>

                            <div
                                ref={sections.card}
                                className="section-styling"
                                onClick={() => {
                                    setCustomizationEnabledCard(true);
                                    setCustomizationInternalNavigation(false);
                                    setCustomizationTextField(false);
                                    setCustomizationToggle(false);
                                    setButtonType("");
                                }}
                            >
                                <div className="w-40">
                                    <h1 className="text-white text-sm tracking-[.20em] font-semibold">
                                        LIST
                                    </h1>
                                </div>

                                {loading.card ? (
                                    <SkeletonComponent type="card" />
                                ) : (
                                    <>
                                        <CardSection /> <ListSection />
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <CustomizationSection />
                </main>
            )}
        </div>
    );
}
