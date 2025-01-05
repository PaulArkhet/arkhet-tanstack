export interface ButtonStyleConfig {
    textColor: string;
    fontSize: string;
    borderRadius: string;
    paddingRight: string;
    paddingLeft: string;
    paddingTop: string;
    paddingBottom: string;
    borderColor: string;
    borderWidth: string;
    backgroundColor: string;
    hoveredBackgroundColor: string;
    hoveredTextColor: string;
    isHovered: boolean;
}

export interface RadioButtonStyleConfig {
    height: string;
    width: string;
    borderColor: string;
    borderWidth: string;
    borderRadius: string;
    borderColorChecked: string;
    color: string;
    customIcon: {
        height: string;
        width: string;
        backgroundColor: string;
        borderRadius: string;
    };
}

export type ButtonType = "primary" | "secondary" | "outlined" | "ghost" | "";

export type ButtonStyles = {
    primary: { css: any };
    secondary: { css: any };
    outlined: { css: any };
    ghost: { css: any };
};
