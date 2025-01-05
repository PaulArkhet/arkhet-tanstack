/*
Author: Paul Kim, Vitor Akiyama, Selina Park
Date: September 16, 2024
Version: 0.0.1
Detail: Palette Editing Panel of Design System Page
*/

import { useColorPaletteStore } from "@/store/useColorPaletteStore";
import { ColorPaletteKey } from "@/types/color-types";
import { capitalizeText } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";

function PaletteEditingPanel() {
    const colorPalette = useColorPaletteStore(
        //@ts-ignore
        (state) => state.singleColorPalette
    );
    const setPalette = useColorPaletteStore((state) => state.setPalette);
    const [hex, setHex] = useState(colorPalette.hex);

    useEffect(() => {
        setHex(colorPalette.hex);
    }, [colorPalette.hex]);

    const changeHandler = (hex: string) => {
        const capitaizedHex = capitalizeText(hex, true);
        setHex(capitaizedHex);
        setPalette(
            colorPalette.color as ColorPaletteKey,
            colorPalette.index,
            capitaizedHex
        );
    };

    return (
        <div className="customization-panel-styling p-0">
            <div className="p-3">{capitalizeText(colorPalette.color)}</div>
            <div className="gap-5 flex flex-col justify-center items-center">
                <section className="small">
                    <HexColorPicker
                        color={colorPalette.hex}
                        onChange={changeHandler}
                    />
                </section>
            </div>
            <p className="p-3">{hex}</p>
        </div>
    );
}

export default PaletteEditingPanel;
