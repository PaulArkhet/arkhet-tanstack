import { FC, useEffect, useState } from "react";
import SegmentedButton from "../custom-ui/SegmentedButton";

const SegmentedButtonSection: FC<{ segmentedButtonStyles?: any }> = ({
    segmentedButtonStyles,
}) => {
    const [buttonStyles, setButtonStyles] = useState({
        buttonLabels: ["Label", "Label", "Label", "Label"],
        activeBgColor: "#004d61",
        inactiveBgColor: "#242424",
        activeTextColor: "#b8eaff",
        inactiveTextColor: "#dee3e5",
        borderColor: "#8c9388",
        hoverBgColor: "#343335",
    });

    useEffect(() => {
        if (segmentedButtonStyles) {
            console.log("Updating segmented button styles based on props.");
            setButtonStyles(segmentedButtonStyles);
        } else {
            console.log("No styles received, using default styles.");
        }
    }, [segmentedButtonStyles]);

    return (
        <SegmentedButton
            //@ts-ignore
            buttonLabels={buttonStyles.buttonLabels}
            activeBgColor={buttonStyles.activeBgColor}
            inactiveBgColor={buttonStyles.inactiveBgColor}
            activeTextColor={buttonStyles.activeTextColor}
            inactiveTextColor={buttonStyles.inactiveTextColor}
            borderColor={buttonStyles.borderColor}
            hoverBgColor={buttonStyles.hoverBgColor}
        />
    );
};

export default SegmentedButtonSection;
