import { useState } from "react";
import caretDown from "/iconcaretdown.png";
import desktopIcon from "/icondesktop.png";
import iconsync from "/iconsync.svg";
import useArtboardStore from "@/store/ArtboardStore";

export default function PageRightNav() {
    const [showMenu, setShowMenu] = useState(false);
    const [currentMode, setCurrentMode] = useState("Desktop Canvas");
    const { shapes, selectedShapeId, handleUpdateShape } = useArtboardStore(
        (state) => state
    );

    function toggleShowMenu() {
        setShowMenu(!showMenu);
    }

    function updatePageType(subtype: string) {
        let pageComponent = shapes.filter(
            (shape) => shape.id === selectedShapeId
        )![0];
        let newWidth;
        let newHeight;

        if (subtype === "desktop") {
            newWidth = 800;
            newHeight = 448;
        } else {
            newWidth = 448;
            newHeight = 800;
        }

        handleUpdateShape<"page">(pageComponent.id, {
            subtype,
            width: newWidth,
            height: newHeight,
        });
        console.log(pageComponent.width);
        console.log(pageComponent.height);
    }

    return (
        <div>
            <div className="px-5 py-5 border-b border-b-[#303030]">
                <div
                    className="flex pb-2 cursor-pointer"
                    onClick={toggleShowMenu}
                >
                    <img src={desktopIcon} alt="" className="w-[10px] py-2" />
                    <p className="px-2">{currentMode}</p>

                    <img
                        src={caretDown}
                        alt=""
                        className={`mr-2 w-[10px] py-2 ${showMenu && "rota"}`}
                    />
                </div>
                {showMenu && (
                    <div>
                        <div
                            className={`${
                                currentMode === "Desktop Canvas"
                                    ? "flex pb-2 cursor-pointer text-blue-500"
                                    : "flex pb-2 cursor-pointer"
                            }`}
                            onClick={() => {
                                setCurrentMode("Desktop Canvas");
                                setShowMenu(false);
                                updatePageType("desktop");
                            }}
                        >
                            <img
                                src={desktopIcon}
                                alt=""
                                className="w-[10px] py-2"
                            />
                            <p className="px-2">Desktop Canvas</p>
                        </div>
                        <div
                            className={`${
                                currentMode === "Mobile Canvas"
                                    ? "flex pb-2 cursor-pointer text-blue-500"
                                    : "flex pb-2 cursor-pointer"
                            }`}
                            onClick={() => {
                                setCurrentMode("Mobile Canvas");
                                setShowMenu(false);
                                updatePageType("mobile");
                            }}
                        >
                            <img
                                src={desktopIcon}
                                alt=""
                                className="w-[10px] py-2"
                            />
                            <p className="px-2">Mobile Canvas</p>
                        </div>
                    </div>
                )}
                {!showMenu && (
                    <div className="flex">
                        {currentMode == "Desktop Canvas" && (
                            <div className="px-2">
                                W <span className="underline">1920</span>
                            </div>
                        )}
                        {currentMode == "Mobile Canvas" && (
                            <div className="px-2">
                                W <span className="underline">320</span>
                            </div>
                        )}
                        <img src={iconsync} />
                        <div className="px-2">
                            H <span className="underline">auto</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
