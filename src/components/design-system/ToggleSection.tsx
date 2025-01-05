import { Toggle } from "../custom-ui/Toggle";
import { FC, useEffect, useState } from "react";

const ToggleSection: FC<{ toggleStyles?: any }> = ({ toggleStyles }) => {
    const [toggleCSS, setToggleCSS] = useState({
        isChecked: false,
        checkedBackgroundColor: "#ECC06C",
        uncheckedBackgroundColor: "rgba(48, 54, 55, 0.5)",
        checkedButtonColor: "#412D00",
        uncheckedButtonColor: "#8C9388",
        checkedBorderColor: "#ECC06C",
        uncheckedBorderColor: "#8C9388",
        checkedThumbSize: "16px",
        uncheckedThumbSize: "12px",
        style: { height: "24px", width: "40px" },
        borderRadius: "45%",
    });

    useEffect(() => {
        if (toggleStyles) {
            console.log("Received new toggleStyles from server:", toggleStyles);
            setToggleCSS(toggleStyles.toggle);
        } else {
            console.log(
                "No styles received from server, using default styles."
            );
        }
    }, [toggleStyles]);

    return (
        <div className="flex flex-row gap-5 pr-3">
            <Toggle
                isChecked={toggleCSS.isChecked}
                checkedBackgroundColor={toggleCSS.checkedBackgroundColor}
                uncheckedBackgroundColor={toggleCSS.uncheckedBackgroundColor}
                checkedButtonColor={toggleCSS.checkedButtonColor}
                uncheckedButtonColor={toggleCSS.uncheckedButtonColor}
                checkedBorderColor={toggleCSS.checkedBorderColor}
                uncheckedBorderColor={toggleCSS.uncheckedBorderColor}
                checkedThumbSize={toggleCSS.checkedThumbSize}
                uncheckedThumbSize={toggleCSS.uncheckedThumbSize}
                style={toggleCSS.style}
                borderRadius={toggleCSS.borderRadius}
            />
            <Toggle
                isChecked={!toggleCSS.isChecked}
                checkedBackgroundColor={toggleCSS.checkedBackgroundColor}
                uncheckedBackgroundColor={toggleCSS.uncheckedBackgroundColor}
                checkedButtonColor={toggleCSS.checkedButtonColor}
                uncheckedButtonColor={toggleCSS.uncheckedButtonColor}
                checkedBorderColor={toggleCSS.checkedBorderColor}
                uncheckedBorderColor={toggleCSS.uncheckedBorderColor}
                checkedThumbSize={toggleCSS.checkedThumbSize}
                uncheckedThumbSize={toggleCSS.uncheckedThumbSize}
                style={toggleCSS.style}
                borderRadius={toggleCSS.borderRadius}
            />
        </div>
    );
};

export default ToggleSection;
