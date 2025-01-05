//@ts-nocheck
import { useButtonStore } from "@/store/useButtonStore";
import { capitalizeText, removePx } from "@/utils/helpers";
import { Slider } from "@/components/ui/slider";
import { useEffect, useReducer } from "react";
import { FontSizes } from "@/utils/fontLoader";
import { buttonReducer } from "@/reducers/buttonReducer";
import { radioButtonReducer } from "@/reducers/radioButtonReducer";

export default function ButtonEditingPanel() {
    const buttonType = useButtonStore((state) => state.buttonType);
    const getButtonStyles = useButtonStore((state) => state.getButtonStyles);
    const getRadioButtonStyles = useButtonStore(
        (state) => state.getRadioButtonStyles
    );
    const setButtonStyles = useButtonStore((state) => state.setButtonStyles);
    const setRadioButtonStyles = useButtonStore(
        (state) => state.setRadioButtonStyles
    );
    const styles =
        buttonType === "radioButton"
            ? getRadioButtonStyles()
            : getButtonStyles(buttonType);

    const [state, dispatch] = useReducer(
        buttonType === "radioButton" ? radioButtonReducer : buttonReducer,
        styles
    );

    useEffect(() => {
        if (buttonType === "radioButton") {
            const styles = getRadioButtonStyles();
            console.log("In Reset Reducer State: ", styles);
            dispatch({ type: "SET_HEIGHT", payload: removePx(styles.height) });
            dispatch({ type: "SET_WIDTH", payload: removePx(styles.width) });
            dispatch({
                type: "SET_BORDER_WIDTH",
                payload: removePx(styles.borderWidth),
            });
        } else {
            const styles = getButtonStyles(buttonType);
            console.log("In Reset Reducer State: ", styles);
            dispatch({
                type: "SET_FONT_SIZE",
                payload: removePx(styles.fontSize),
            });
            dispatch({
                type: "SET_BORDER_RADIUS",
                payload: removePx(styles.borderRadius),
            });
            dispatch({
                type: "SET_PADDING_X",
                payload: removePx(styles.paddingRight),
            });
            dispatch({
                type: "SET_PADDING_Y",
                payload: removePx(styles.paddingTop),
            });
        }
    }, [buttonType, getButtonStyles, getRadioButtonStyles]);

    useEffect(() => {
        if (buttonType && buttonType !== "radioButton") {
            console.log("Setting Button Styles: ", state);

            setButtonStyles(buttonType, {
                fontSize: `${state.fontSize}`,
                borderRadius: `${state.borderRadius}`,
                paddingTop: `${state.paddingTop}`,
                paddingBottom: `${state.paddingBottom}`,
                paddingRight: `${state.paddingRight}`,
                paddingLeft: `${state.paddingLeft}`,
            });
        } else if (buttonType === "radioButton") {
            console.log("Setting RadioButton Styles: ", state);
            setRadioButtonStyles({
                height: `${state.height}`,
                width: `${state.width}`,
                borderWidth: `${state.borderWidth}`,
            });
        }
    }, [
        buttonType,
        state,
        setButtonStyles,
        setRadioButtonStyles,
        getButtonStyles,
    ]);

    if (!buttonType) return null;

    return (
        <div className="customization-panel-styling">
            <h1 className="pb-3">
                {buttonType === "radioButton"
                    ? "Radio Button"
                    : capitalizeText(buttonType)}
            </h1>

            {buttonType === "radioButton" ? (
                <div className="grid gap-3">
                    <div className="grid gap-2">
                        <h2>Height: {state.height}</h2>
                        <Slider
                            value={[removePx(state.height)]}
                            max={100}
                            step={1}
                            onValueChange={(value) =>
                                dispatch({
                                    type: "SET_HEIGHT",
                                    payload: value[0],
                                })
                            }
                        />
                    </div>

                    <div className="grid gap-2">
                        <h2>Width: {state.width}</h2>
                        <Slider
                            value={[removePx(state.width)]}
                            max={50}
                            step={1}
                            onValueChange={(value) =>
                                dispatch({
                                    type: "SET_WIDTH",
                                    payload: value[0],
                                })
                            }
                        />
                    </div>

                    <div className="grid gap-2">
                        <h2>Border Width: {state.borderWidth}</h2>
                        <Slider
                            value={[removePx(state.borderWidth)]}
                            max={100}
                            step={1}
                            onValueChange={(value) =>
                                dispatch({
                                    type: "SET_BORDER_WIDTH",
                                    payload: value[0],
                                })
                            }
                        />
                    </div>
                </div>
            ) : (
                <div className="grid gap-3">
                    <div className="grid gap-2">
                        <h2>Font Size: {state.fontSize}</h2>
                        <Slider
                            value={[removePx(state.fontSize)]}
                            max={removePx(FontSizes[FontSizes.length - 1])}
                            step={1}
                            onValueChange={(value) => {
                                dispatch({
                                    type: "SET_FONT_SIZE",
                                    payload: value[0],
                                });
                            }}
                        />
                    </div>

                    <div className="grid gap-2">
                        <h2>Border Radius: {state.borderRadius}</h2>
                        <Slider
                            value={[removePx(state.borderRadius)]}
                            max={50}
                            step={1}
                            onValueChange={(value) =>
                                dispatch({
                                    type: "SET_BORDER_RADIUS",
                                    payload: value[0],
                                })
                            }
                        />
                    </div>

                    <div className="grid gap-2">
                        <h2>Padding X: {state.paddingRight}</h2>
                        <Slider
                            value={[removePx(state.paddingRight)]}
                            max={100}
                            step={1}
                            onValueChange={(value) =>
                                dispatch({
                                    type: "SET_PADDING_X",
                                    payload: value[0],
                                })
                            }
                        />
                    </div>

                    <div className="grid gap-2">
                        <h2>Padding Y: {state.paddingTop}</h2>
                        <Slider
                            value={[removePx(state.paddingTop)]}
                            max={100}
                            step={1}
                            onValueChange={(value) =>
                                dispatch({
                                    type: "SET_PADDING_Y",
                                    payload: value[0],
                                })
                            }
                        />
                    </div>
                </div>
            )}
        </div>
    );
}
