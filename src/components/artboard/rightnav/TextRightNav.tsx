import { useState } from "react";
import ellipsis from "/iconellipsis.svg";
import useArtboardStore from "@/store/ArtboardStore";

export default function TextRightNav() {
    const [showFontColors, setShowFontColors] = useState(false);
    const [fontColor, setFontColor] = useState("White");
    const [showFontSizes, setShowFontSizes] = useState(false);
    const [fontSize, setFontSize] = useState("Medium");
    //@ts-ignore
    const [showIcons, setShowIcons] = useState(false);
    const { shapes, selectedShapeId, handleUpdateShape } = useArtboardStore(
        (state) => state
    );

    function toggleShowFontColors() {
        setShowFontColors(!showFontColors);
        setShowFontSizes(false);
        setShowIcons(false);
    }

    function toggleShowFontSizes() {
        setShowFontSizes(!showFontSizes);
        setShowFontColors(false);
        setShowIcons(false);
    }

    function updateTextColor(color: string) {
        let textComponent = shapes.filter(
            (shape) => shape.id === selectedShapeId
        )![0];

        handleUpdateShape<"text">(textComponent.id, { fontColor: color });
    }

    function updateTextSize(size: string) {
        let textComponent = shapes.filter(
            (shape) => shape.id === selectedShapeId
        )![0];

        handleUpdateShape<"text">(textComponent.id, { fontSize: size });
    }

    return (
        <div>
            <div className="px-5 py-5 border-b border-b-[#303030]">
                <div className="flex justify-between pb-2">
                    <p className="">Text</p>
                    <img src={ellipsis} alt="" />
                </div>
                <div
                    className="flex py-2 hover:cursor-pointer"
                    onClick={toggleShowFontSizes}
                >
                    <div className="bg-zinc-600 mt-2 mr-2 h-[5px] w-[18px]"></div>
                    <p>{fontSize} Font</p>
                </div>
                <div
                    className="flex py-2 hover:cursor-pointer"
                    onClick={toggleShowFontColors}
                >
                    <div className="bg-zinc-600 mt-2 mr-2 h-[5px] w-[18px]"></div>
                    <p>{fontColor} Color</p>
                </div>
            </div>
            {showFontColors && (
                <div className="fixed top-[130px] right-[260px] bg-zinc-700 py-5 px-5 rounded hover:cursor-pointer">
                    <div
                        className={`py-2 ${
                            fontColor == "White" ? "text-blue-500" : ""
                        } hover:cursor-pointer`}
                        onClick={() => {
                            setFontColor("White");
                            setShowFontColors(false);
                            updateTextColor("text-white");
                        }}
                    >
                        White
                    </div>
                    <div
                        className={`py-2 ${
                            fontColor == "Black" ? "text-blue-500" : ""
                        } hover:cursor-pointer`}
                        onClick={() => {
                            setFontColor("Black");
                            setShowFontColors(false);
                            updateTextColor("text-black");
                        }}
                    >
                        Black
                    </div>
                </div>
            )}
            {showFontSizes && (
                <div className="fixed top-[90px] right-[260px] bg-zinc-700 py-5 px-5 rounded hover:cursor-pointer">
                    <div
                        className={`py-2 ${
                            fontSize == "Large" ? "text-blue-500" : ""
                        } hover:cursor-pointer`}
                        onClick={() => {
                            setFontSize("Large");
                            setShowFontSizes(false);
                            updateTextSize("text-xl");
                        }}
                    >
                        Large
                    </div>
                    <div
                        className={`py-2 ${
                            fontSize == "Medium" ? "text-blue-500" : ""
                        } hover:cursor-pointer`}
                        onClick={() => {
                            setFontSize("Medium");
                            setShowFontSizes(false);
                            updateTextSize("text-sm");
                        }}
                    >
                        Medium
                    </div>
                    <div
                        className={`py-2 ${
                            fontSize == "Small" ? "text-blue-500" : ""
                        } hover:cursor-pointer`}
                        onClick={() => {
                            setFontSize("Small");
                            setShowFontSizes(false);
                            updateTextSize("text-xs");
                        }}
                    >
                        Small
                    </div>
                </div>
            )}
        </div>
    );
}
