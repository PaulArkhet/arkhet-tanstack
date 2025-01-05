import { useColorPaletteStore } from "@/store/useColorPaletteStore";
import { useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { useTypographyStore } from "@/store/useTypographyStore";
import { useButtonStore } from "@/store/useButtonStore";

export default function ColorCustomization() {
    const { updateActiveHeader } = useTypographyStore();
    const { palette, setPalette, activePalette } = useColorPaletteStore();
    const { setButtonType } = useButtonStore();

    if (!activePalette) return null;

    const flattenToString = (value: any): string => {
        while (Array.isArray(value)) {
            value = value[0];
        }
        return typeof value === "string" ? value : "";
    };

    const initialHex = flattenToString(
        palette[activePalette.name][activePalette.index]
    );
    const [hex, setHex] = useState<string>(initialHex);

    useEffect(() => {
        const currentColor = palette[activePalette.name][activePalette.index];
        const newHex = flattenToString(currentColor);

        if (newHex !== hex) {
            setHex(newHex);
        }
    }, [activePalette, palette, hex]);

    const changeHandler = (newHex: string) => {
        if (newHex !== hex) {
            setHex(newHex);
            setPalette(activePalette.name, activePalette.index, newHex);
        }
    };

    return (
        <div
            className="customization-panel-styling flex flex-col space-y-1"
            onClick={() => {
                updateActiveHeader("");
                setButtonType("");
            }}
        >
            <p className="text-sm font-semibold w-full text-left">
                <span className="font-normal">Color Palette: </span>
                {activePalette.name}
            </p>
            <Popover>
                <PopoverTrigger className="bg-zinc-950 px-2 py-1 w-56 space-x-2 rounded-md flex items-center">
                    <div
                        className="w-4 h-4 rounded-sm"
                        style={{ backgroundColor: hex }}
                    />
                    <span className="text-white font-mono">{hex}</span>
                </PopoverTrigger>
                <PopoverContent className="bg-zinc-950 w-fit h-fit">
                    <HexColorPicker color={hex} onChange={changeHandler} />
                </PopoverContent>
            </Popover>
        </div>
    );
}
