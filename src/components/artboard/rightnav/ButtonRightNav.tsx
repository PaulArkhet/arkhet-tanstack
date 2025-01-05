import { useState } from "react";
import useArtboardStore from "@/store/ArtboardStore";
import ellipsis from "/iconellipsis.svg";
import linkIcon from "/iconlink.svg";
import iconx from "/iconx.svg";
import triangle from "/icontriangletop.svg";

export default function ButtonRightNav() {
    const [showButtonTypes, setShowButtonTypes] = useState(false);
    const [buttonType, setButtonType] = useState("Primary");
    const [showButtonSizes, setShowButtonSizes] = useState(false);
    const [buttonSize, setButtonSize] = useState("Large");
    const [iconMode, setIconMode] = useState("No Icons");
    const [showIcons, setShowIcons] = useState(false);
    const { shapes, selectedShapeId, handleUpdateShape } = useArtboardStore(
        (state) => state
    );

    function toggleShowButtonTypes() {
        setShowButtonTypes((prev) => !prev);
        if (setShowButtonSizes) setShowButtonSizes(false);
    }

    function toggleShowButtonSizes() {
        setShowButtonSizes((prev) => !prev);
        if (setShowButtonTypes) setShowButtonTypes(false);
    }

    function updateButtonType(subtype: string) {
        let buttonComponent = shapes.filter(
            (shape) => shape.id === selectedShapeId
        )![0];

        handleUpdateShape<"button">(buttonComponent.id, { subtype });
    }

    function toggleShowIcons() {
        setShowIcons(!showIcons);
        setShowButtonSizes(false);
        setShowButtonTypes(false);
    }

    return (
        <div>
            <div className="px-5 py-5 border-b border-b-[#303030]">
                <div className="flex justify-between pb-2">
                    <p className="">Button</p>
                    <img src={ellipsis} alt="" />
                </div>
                <div
                    className="flex py-2 hover:cursor-pointer"
                    onClick={toggleShowButtonTypes}
                >
                    <div className="bg-zinc-600 mt-2 mr-2 h-[5px] w-[18px]"></div>
                    <p>{buttonType} Button</p>
                </div>
                {showButtonTypes && (
                    <div className="fixed top-[90px] right-[260px] bg-zinc-700 py-5 px-5 rounded hover:cursor-pointer">
                        <div
                            className={`py-2 ${
                                buttonType == "Primary" ? "text-blue-500" : ""
                            } hover:cursor-pointer`}
                            onClick={() => {
                                setButtonType("Primary");
                                setShowButtonTypes(false);
                                updateButtonType("primary-button");
                            }}
                        >
                            Primary Button
                        </div>
                        <div
                            className={`py-2 ${
                                buttonType == "Secondary" ? "text-blue-500" : ""
                            } hover:cursor-pointer`}
                            onClick={() => {
                                setButtonType("Secondary");
                                setShowButtonTypes(false);
                                updateButtonType("secondary-button");
                            }}
                        >
                            Secondary Button
                        </div>
                        <div
                            className={`py-2 ${
                                buttonType == "Tertiary" ? "text-blue-500" : ""
                            } hover:cursor-pointer`}
                            onClick={() => {
                                setButtonType("Tertiary");
                                setShowButtonTypes(false);
                                updateButtonType("tertiary-button");
                            }}
                        >
                            Tertiary Button
                        </div>
                    </div>
                )}
                <div
                    className="flex py-2 hover:cursor-pointer"
                    onClick={toggleShowButtonSizes}
                >
                    <div className="bg-zinc-600 mt-2 mr-2 h-[5px] w-[18px] "></div>
                    <p>{buttonSize}</p>
                </div>
                {showButtonSizes && (
                    <div className="fixed top-[130px] right-[260px] bg-zinc-700 py-5 px-5 rounded hover:cursor-pointer">
                        <div
                            className={`py-2 ${
                                buttonSize == "Large" ? "text-blue-500" : ""
                            } hover:cursor-pointer`}
                            onClick={() => {
                                console.log("large");
                                setButtonSize("Large");
                                setShowButtonSizes(false);
                                // updateButtonSize("large")
                            }}
                        >
                            Large
                        </div>
                        <div
                            className={`py-2 ${
                                buttonSize == "Medium" ? "text-blue-500" : ""
                            } hover:cursor-pointer`}
                            onClick={() => {
                                console.log("medium");
                                setButtonSize("Medium");
                                setShowButtonSizes(false);
                                // updateButtonSize("medium")
                            }}
                        >
                            Medium
                        </div>
                        <div
                            className={`py-2 ${
                                buttonSize == "Small" ? "text-blue-500" : ""
                            } hover:cursor-pointer`}
                            onClick={() => {
                                console.log("small");
                                setButtonSize("Small");
                                setShowButtonSizes(false);
                                // updateButtonSize("small")
                            }}
                        >
                            Small
                        </div>
                    </div>
                )}
            </div>
            <div className="px-5 py-5">
                <div className="py-2 flex" onClick={toggleShowIcons}>
                    <img src={triangle} className="pr-2" />
                    <div>{iconMode}</div>
                </div>
                {showIcons && (
                    <div className="fixed top-[210px] right-[260px] bg-zinc-700 py-5 px-5 rounded hover:cursor-pointer">
                        <div
                            className={`py-2 ${
                                iconMode == "No Icons" ? "text-blue-500" : ""
                            } hover:cursor-pointer`}
                            onClick={() => {
                                setIconMode("No Icons");
                                setShowIcons(false);
                            }}
                        >
                            No Icons
                        </div>
                        <div
                            className={`py-2 ${
                                iconMode == "Leading Icons"
                                    ? "text-blue-500"
                                    : ""
                            } hover:cursor-pointer`}
                            onClick={() => {
                                setIconMode("Leading Icons");
                                setShowIcons(false);
                            }}
                        >
                            Leading Icons
                        </div>
                        <div
                            className={`py-2 ${
                                iconMode == "Trailing Icons"
                                    ? "text-blue-500"
                                    : ""
                            } hover:cursor-pointer`}
                            onClick={() => {
                                setIconMode("Trailing Icons");
                                setShowIcons(false);
                            }}
                        >
                            Trailing Icons
                        </div>
                    </div>
                )}
                <div className="py-2 text-[#666666]">Destructive Button</div>
                <div className="py-2 text-[#666666]">Disabled State</div>
            </div>
            <div className="px-2 py-2 ">
                <div className="flex justify-between py-2 px-2 rounded-md bg-[#404040]">
                    <div className="flex">
                        <img src={linkIcon} alt="" className="" />
                        <p className="px-2">Link</p>
                    </div>
                    <div className="flex">
                        <p className="px-2">Page 2</p>
                        <img src={iconx} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}
