/*
Author: Paul Kim, Vitor Akiyama, Selina Park
Date: September 16, 2024
Version: 0.0.1
Detail: Color section of Design System Page
*/

import { useColorPaletteStore } from "@/store/useColorPaletteStore";
import CustomPaletteBox from "../custom-ui/PaletteBox";

const ColorSection = () => {
    const { primary, accents, neutral } = useColorPaletteStore(
        (state) => state.palette
    );

    const setColorPalette = useColorPaletteStore(
        //@ts-ignore
        (state) => state.setSingleColorPalette
    );

    return (
        <>
            <div className="flex items-start gap-5">
                <div className="category-styling">
                    <p className="font-semibold">Primary</p>
                    <div className="color-container-styling">
                        {primary.map((color, index) => (
                            <CustomPaletteBox
                                key={index}
                                color={color}
                                onClick={() =>
                                    setColorPalette(index, "primary", color)
                                }
                            />
                        ))}
                    </div>
                </div>
                <div className="category-styling w-60 mr-30">
                    <div className="flex items-center gap-3">
                        <p className="font-semibold">Accents</p>
                        <div className="white-line-styling w-28" />
                    </div>
                    <div className="color-container-styling">
                        {accents.map((color, index) => (
                            <CustomPaletteBox
                                key={index}
                                color={color}
                                onClick={() =>
                                    setColorPalette(index, "accents", color)
                                }
                            />
                        ))}
                    </div>
                </div>
                <div className="category-styling w-96">
                    <div className="flex items-center gap-3">
                        <p className="font-semibold">Neutral</p>
                        <div className="white-line-styling w-56" />
                    </div>
                    <div className="flex gap-7 flex-wrap hover:cursor-pointer">
                        {neutral.map((color, index) => (
                            <CustomPaletteBox
                                key={index}
                                color={color}
                                onClick={() =>
                                    setColorPalette(index, "neutral", color)
                                }
                            />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ColorSection;
