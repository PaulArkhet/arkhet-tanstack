/*
Author: Paul Kim, Selina Park
Date: October 1, 2024
Version: 0.0.1
Detail: LeftNav for Artboard
*/

import { NavLink, useLoaderData } from "react-router-dom";
import logo from "/Arkhet-logo_white 1.png";
import caretDown from "/iconcaretdown.png";
import caretRight from "/iconcaretright.png";
import { MutableRefObject, useState } from "react";
import useArtboardStore from "@/store/ArtboardStore";
import { PageNavigation, updateWireframe } from "@/pages/Artboard";
import { Button } from "../ui/button";
import usePrototypeStore from "@/store/usePrototypeStore";
import useProjectStore from "@/store/ProjectStore";
import ButtonComponent from "./leftnav/ButtonComponent";
import TextComponent from "./leftnav/TextComponent";
import CheckboxComponent from "./leftnav/CheckboxComponent";
import RadiobuttonComponent from "./leftnav/RadiobuttonComponent";
import ToggleComponent from "./leftnav/ToggleComponent";
import DividerComponentt from "./leftnav/DividerComponent";
import CardComponent from "./leftnav/CardComponent";
import CircleComponent from "./leftnav/CircleComponent";
import ImageComponent from "./leftnav/ImageComponent";
import InputFieldComponent from "./leftnav/InputFieldComponent";
import DropdownComponent from "./leftnav/DropdownComponent";
import ChatbotComponent from "./leftnav/ChatbotComponent";
import NavigationComponent from "./leftnav/NavigationComponent";
import trashIcon from "/icontrash.png";

// Fake data for prototype history
const prototypeHistory = [
    { iteration: 4, changes: 32 },
    { iteration: 3, changes: 105 },
    { iteration: 2, changes: 18 },
    { iteration: 1, changes: 57 },
];
export default function LeftNav({
    pageContent,
    canvasRef,
}: {
    pageContent: PageNavigation;
    canvasRef: MutableRefObject<HTMLDivElement | null>;
}) {
    const data = useLoaderData();

    const { shapes, selectedShapeId, setSelectedShapeId, moveLayer } =
        useArtboardStore((state) => state);

    const { prototypeCurrentHistory, setPrototypeCurrentHistory } =
        usePrototypeStore((state) => state);

    const [showComponents, setShowComponents] = useState(true);
    const [showCustomComponents, setShowCustomComponents] = useState(true);
    const [showLayers, setShowLayers] = useState(true);
    //@ts-ignore
    const [searchContent, setSearchContent] = useState("");

    function toggleShowLayers() {
        setShowLayers(!showLayers);
    }

    const { project } = useProjectStore((state) => state);

    return (
        <div className="fixed top-0 left-0 h-screen w-[250px] bg-zinc-900 overflow-y-auto">
            <div
                className="border-b-zinc-700 border-b-[1px] p-2  pr-10 pl-4"
                onClick={() => {
                    updateWireframe(data, shapes);
                }}
            >
                <NavLink to="/dashboard" className="flex">
                    <img
                        src={logo}
                        alt="Arkhet Logo"
                        className="pr-2 scale-75"
                    />
                    <p className="font pt-2 text-lg font-bold">
                        {(project && project[0]?.title) || "Undefined"}
                    </p>
                </NavLink>
            </div>

            {pageContent === "Interaction" && (
                <>
                    <div className="flex my-2 py-2 pl-4 text-sm border-b-[1px] border-b-zinc-700">
                        <div className="flex justify-center items-center">
                            <svg
                                width="13"
                                height="13"
                                viewBox="0 0 8 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g clipPath="url(#clip0_2642_26774)">
                                    <path
                                        d="M6.5 3.25C6.5 3.96719 6.26719 4.62969 5.875 5.16719L7.85312 7.14687C8.04844 7.34219 8.04844 7.65937 7.85312 7.85469C7.65781 8.05 7.34062 8.05 7.14531 7.85469L5.16719 5.875C4.62969 6.26875 3.96719 6.5 3.25 6.5C1.45469 6.5 0 5.04531 0 3.25C0 1.45469 1.45469 0 3.25 0C5.04531 0 6.5 1.45469 6.5 3.25ZM3.25 5.5C3.54547 5.5 3.83805 5.4418 4.11104 5.32873C4.38402 5.21566 4.63206 5.04992 4.84099 4.84099C5.04992 4.63206 5.21566 4.38402 5.32873 4.11104C5.4418 3.83805 5.5 3.54547 5.5 3.25C5.5 2.95453 5.4418 2.66194 5.32873 2.38896C5.21566 2.11598 5.04992 1.86794 4.84099 1.65901C4.63206 1.45008 4.38402 1.28434 4.11104 1.17127C3.83805 1.0582 3.54547 1 3.25 1C2.95453 1 2.66194 1.0582 2.38896 1.17127C2.11598 1.28434 1.86794 1.45008 1.65901 1.65901C1.45008 1.86794 1.28434 2.11598 1.17127 2.38896C1.0582 2.66194 1 2.95453 1 3.25C1 3.54547 1.0582 3.83805 1.17127 4.11104C1.28434 4.38402 1.45008 4.63206 1.65901 4.84099C1.86794 5.04992 2.11598 5.21566 2.38896 5.32873C2.66194 5.4418 2.95453 5.5 3.25 5.5Z"
                                        fill="currentColor"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_2642_26774">
                                        <rect
                                            width="8"
                                            height="8"
                                            fill="currentColor"
                                        />
                                    </clipPath>
                                </defs>
                            </svg>
                            <input
                                type="text"
                                className="mt-1 font pl-3 bg-transparent outline-none"
                                placeholder="Search..."
                                onChange={(e) =>
                                    setSearchContent(e.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div>
                        <div className="pl-4 pb-2 border-b border-b-[#303030]">
                            {!showComponents && (
                                <div
                                    className="flex w-[200px] py-2 cursor-pointer"
                                    onClick={() => setShowComponents(true)}
                                >
                                    <img
                                        src={caretRight}
                                        alt=""
                                        className="mr-2 h-[15px] w-[7px] pt-2"
                                    />
                                    <p>Basic Components</p>
                                </div>
                            )}
                            {showComponents && (
                                <div
                                    className="flex w-[200px] py-2 cursor-pointer"
                                    onClick={() => setShowComponents(false)}
                                >
                                    <img
                                        src={caretDown}
                                        alt=""
                                        className="mr-2 w-[10px] py-2"
                                    />
                                    <p>Basic Components</p>
                                </div>
                            )}
                            {showComponents && (
                                <div className="grid grid-cols-3 gap-2 pr-4 pb-2">
                                    <ButtonComponent canvasRef={canvasRef} />
                                    <TextComponent canvasRef={canvasRef} />
                                    <CheckboxComponent canvasRef={canvasRef} />
                                    <RadiobuttonComponent
                                        canvasRef={canvasRef}
                                    />
                                    <ToggleComponent canvasRef={canvasRef} />
                                    <DividerComponentt canvasRef={canvasRef} />
                                    <CircleComponent canvasRef={canvasRef} />
                                    <ImageComponent canvasRef={canvasRef} />
                                    <InputFieldComponent
                                        canvasRef={canvasRef}
                                    />
                                    <DropdownComponent canvasRef={canvasRef} />
                                    <ChatbotComponent canvasRef={canvasRef} />
                                    <NavigationComponent
                                        canvasRef={canvasRef}
                                    />
                                </div>
                            )}
                            {!showCustomComponents && (
                                <div
                                    className="flex w-[200px] py-2 cursor-pointer"
                                    onClick={() =>
                                        setShowCustomComponents(true)
                                    }
                                >
                                    <img
                                        src={caretRight}
                                        alt=""
                                        className="mr-2 h-[15px] w-[7px] pt-2"
                                    />
                                    <p>Custom Components</p>
                                </div>
                            )}
                            {showCustomComponents && (
                                <div
                                    className="flex w-[200px] py-2 cursor-pointer"
                                    onClick={() =>
                                        setShowCustomComponents(false)
                                    }
                                >
                                    <img
                                        src={caretDown}
                                        alt=""
                                        className="mr-2 w-[10px] py-2"
                                    />
                                    <p>Custom Components</p>
                                </div>
                            )}
                            {showCustomComponents && (
                                <div className="">
                                    <CardComponent canvasRef={canvasRef} />
                                </div>
                            )}
                            {showCustomComponents &&
                                shapes
                                    .filter((shape) => shape.type == "card")
                                    .map((shape) => (
                                        <div
                                            className={`flex justify-between py-2 px-2 mr-5 mb-2 cursor-pointer
                                            hover:text-[#42A5F5] hover:bg-[#202020] rounded transition-all ease-in-out duration-200`}
                                            onClick={() =>
                                                setSelectedShapeId(shape.id)
                                            }
                                            key={
                                                shape.type +
                                                shape.id +
                                                "leftnav"
                                            }
                                        >
                                            <p>
                                                {shape.title} {shape.id}
                                            </p>
                                            <div className="flex">
                                                <img
                                                    src={trashIcon}
                                                    className="h-[20px] w-[12px] pt-1"
                                                />
                                            </div>
                                        </div>
                                    ))}
                            {/* {!showDataInput && (
                                <div
                                    className="flex w-[200px] py-2 cursor-pointer"
                                    onClick={() => setShowDataInput(true)}
                                >
                                    <img
                                        src={caretRight}
                                        alt=""
                                        className="mr-2 h-[15px] w-[7px] pt-2"
                                    />
                                    <p>Data Input</p>
                                </div>
                            )}
                            {showDataInput && (
                                <div
                                    className="flex w-[200px] py-2 cursor-pointer"
                                    onClick={() => setShowDataInput(false)}
                                >
                                    <img
                                        src={caretDown}
                                        alt=""
                                        className="mr-2 w-[10px] py-2"
                                    />
                                    <p>Data Input</p>
                                </div>
                            )}
                            <div className="flex w-[200px] py-2 cursor-pointer">
                                <img
                                    src={caretRight}
                                    alt=""
                                    className="mr-2 h-[15px] w-[7px] pt-2"
                                />
                                <p>Navigation</p>
                            </div>
                            <div className="flex w-[200px] py-2 cursor-pointer">
                                <img
                                    src={caretRight}
                                    alt=""
                                    className="mr-2 h-[15px] w-[7px] pt-2"
                                />
                                <p>Special Components</p>
                            </div>
                        </div>
                        <div className="pl-4 pt-2">
                            <div className="flex w-[200px] py-2 cursor-pointer">
                                <img
                                    src={caretRight}
                                    alt=""
                                    className="mr-2 h-[15px] w-[7px] pt-2"
                                />
                                <p>User Flow</p>
                            </div>
                            <div className="flex w-[200px] py-2 cursor-pointer">
                                <img
                                    src={caretRight}
                                    alt=""
                                    className="mr-2 h-[15px] w-[7px] pt-2"
                                />
                                <p>Logic</p>
                            </div>
                            <div className="flex w-[200px] py-2 cursor-pointer">
                                <img
                                    src={caretRight}
                                    alt=""
                                    className="mr-2 h-[15px] w-[7px] pt-2"
                                />
                                <p>Transitions & Effects</p>
                            </div> */}
                            <div className="border-t border-t-[#303030]">
                                <div
                                    className="flex w-[200px] py-2 cursor-pointer"
                                    onClick={toggleShowLayers}
                                >
                                    <img
                                        src={
                                            showLayers ? caretDown : caretRight
                                        }
                                        alt=""
                                        className={`${
                                            showLayers
                                                ? "mr-2 w-[10px] py-2"
                                                : "mr-2 h-[15px] w-[7px] pt-2"
                                        }`}
                                    />
                                    <p>Layers</p>
                                </div>
                                {showLayers &&
                                    shapes.map((shape) => (
                                        <div
                                            className={`flex justify-between py-2 px-2 mr-5 cursor-pointer ${
                                                selectedShapeId === shape.id
                                                    ? "bg-blue-500"
                                                    : ""
                                            }`}
                                            onClick={() =>
                                                setSelectedShapeId(shape.id)
                                            }
                                            key={
                                                shape.type +
                                                shape.id +
                                                "leftnav"
                                            }
                                        >
                                            <p>
                                                {shape.type} {shape.id}
                                            </p>
                                            <div className="flex">
                                                <div
                                                    onClick={() =>
                                                        moveLayer(
                                                            shape.id,
                                                            "up"
                                                        )
                                                    }
                                                    className="mr-2"
                                                >
                                                    up
                                                </div>
                                                <div
                                                    onClick={() =>
                                                        moveLayer(
                                                            shape.id,
                                                            "down"
                                                        )
                                                    }
                                                >
                                                    down
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {pageContent === "Gen UI" && (
                <div className="px-3 py-6">
                    <h3 className="text-md text-[#E5E5E5] font-semibold">
                        Prototype History
                    </h3>
                    <ul className="mt-2 space-y-2 text-sm text-[#E5E5E5]">
                        {prototypeHistory.map((item, index) => (
                            <li
                                key={index}
                                className={`flex justify-between ${
                                    prototypeCurrentHistory === index
                                        ? "bg-[#303030]"
                                        : ""
                                } p-2 cursor-pointer`}
                                onClick={() => {
                                    setPrototypeCurrentHistory(index);
                                }}
                            >
                                <span>Iteration {item.iteration}</span>
                                <span>{item.changes} changes</span>
                            </li>
                        ))}
                    </ul>
                    <div className="flex justify-end mt-4">
                        <Button className="gap-1 bg-transparent text-[#42A5F5] text-md p-0 hover:bg-transparent">
                            <svg
                                width="8"
                                height="8"
                                viewBox="0 0 8 8"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M3.38462 3.88462H3.88462V3.38462V0.615385C3.88462 0.551142 3.93576 0.5 4 0.5C4.06424 0.5 4.11538 0.551142 4.11538 0.615385V3.38462V3.88462H4.61538H7.38462C7.44886 3.88462 7.5 3.93576 7.5 4C7.5 4.06424 7.44886 4.11538 7.38462 4.11538H4.61538H4.11538V4.61538V7.38462C4.11538 7.44886 4.06424 7.5 4 7.5C3.93576 7.5 3.88462 7.44886 3.88462 7.38462V4.61538V4.11538H3.38462H0.615385C0.551142 4.11538 0.5 4.06424 0.5 4C0.5 3.93576 0.551142 3.88462 0.615385 3.88462H3.38462Z"
                                    fill="currentColor"
                                    stroke="#42A5F5"
                                />
                            </svg>
                            Save Iteration
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
