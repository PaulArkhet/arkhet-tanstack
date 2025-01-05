import { useColorPaletteStore } from "@/store/useColorPaletteStore";
import CustomPaletteBox from "../../custom-ui/PaletteBox";

const ColorSection = () => {
    const { palette, setPalette, setActivePalette } = useColorPaletteStore();

    return (
        <div className="flex items-start gap-16">
            <div className="category-styling">
                <p className="text-white text-[12px] tracking-[.20em] font-semibold">
                    PRIMARY
                </p>
                {palette.primary.map((color, index) => (
                    <CustomPaletteBox
                        key={index}
                        color={color}
                        onClick={() => {
                            setActivePalette("primary", index);
                            setPalette("primary", index, color);
                        }}
                    />
                ))}
            </div>
            <div className="category-styling">
                <p className="text-white text-[12px] tracking-[.20em] font-semibold">
                    SECONDARY
                </p>
                <div className="color-container-styling">
                    {palette.accents.map((color, index) => (
                        <CustomPaletteBox
                            key={index}
                            color={color}
                            onClick={() => {
                                setActivePalette("accents", index);
                                setPalette("accents", index, color);
                            }}
                        />
                    ))}
                </div>
            </div>
            <div className="category-styling">
                <p className="text-white text-[12px] tracking-[.20em] font-semibold">
                    NEUTRAL
                </p>

                <div className="color-container-styling">
                    {palette.neutral.map((color, index) => (
                        <CustomPaletteBox
                            key={index}
                            color={color}
                            onClick={() => {
                                setActivePalette("neutral", index);
                                setPalette("neutral", index, color);
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ColorSection;
