import { Checkbox } from "@/components/custom-ui/CheckBox";
import { FC, useEffect, useState } from "react";

const CheckBoxSection: FC<{ checkboxStyles?: any }> = ({ checkboxStyles }) => {
    const [checkboxCSS, setCheckboxCSS] = useState<{
        checkboxBaseStyles: {
            backgroundColor: string;
            border: string;
            height: string;
            width: string;
            cursor: string;
            borderRadius: string;
        };
        checkedStyles: {
            border: string;
            color: string;
            backgroundColor: string;
        };
        checkedAlternateStyles: {
            border: string;
            color: string;
            backgroundColor: string;
        };
    }>({
        checkboxBaseStyles: {
            backgroundColor: "transparent",
            border: "2px solid #DEE3E5",
            height: "1.25rem",
            width: "1.25rem",
            cursor: "pointer",
            borderRadius: "0.125rem",
        },
        checkedStyles: {
            border: "none",
            color: "#412D00", 
            backgroundColor: "#ECC06C", 
        },
        checkedAlternateStyles: {
            border: "none",
            color: "#412D00",
            backgroundColor: "#E7CD9A",
        },
    });

    useEffect(() => {
        if (checkboxStyles) {
            console.log(
                "Received new checkboxStyles from server:",
                checkboxStyles
            );
            setCheckboxCSS(checkboxStyles.checkBox);
        } else {
            console.log(
                "No styles received from server, using default styles."
            );
        }
    }, [checkboxStyles]);

    return (
        <div style={{ display: "flex", gap: "2.75rem" }}>
            {checkboxCSS && (
                <>
                    <Checkbox
                        style={{
                            ...checkboxCSS.checkboxBaseStyles,
                            ...checkboxCSS.checkedStyles,
                        }} 
                        checked
                    />
                    <Checkbox style={checkboxCSS.checkboxBaseStyles} />
                    <Checkbox
                        style={{
                            ...checkboxCSS.checkboxBaseStyles,
                            ...checkboxCSS.checkedAlternateStyles,
                        }} 
                        checked
                        customIcon={<StraightLineIcon />}
                    />
                    <Checkbox
                        style={{
                            ...checkboxCSS.checkboxBaseStyles,
                            ...checkboxCSS.checkedAlternateStyles,
                        }} 
                        customIcon={<StraightLineIcon />}
                    />
                </>
            )}
        </div>
    );
};

const StraightLineIcon = () => (
    <svg width="12" height="5" viewBox="0 0 16 2" fill="none">
        <rect width="16" height="2" fill="currentColor" />
    </svg>
);

export default CheckBoxSection;
