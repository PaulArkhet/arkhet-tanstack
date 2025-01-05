/*
Author: Paul Kim, Selina Park
Date: October 1, 2024
Version: 0.0.1
Detail: RightNav for Artboard
*/

import useArtboardStore, { Wireframe } from "@/store/ArtboardStore";
import { useEffect, useState } from "react";
import { PageNavigation } from "@/pages/Artboard";
import usePrototypeStore from "@/store/usePrototypeStore";
import artboardIcon from "/iconartboard.svg";
import datasetIcon from "/icondataset.svg";
import iconx from "/iconx.svg";
import useDemoPrototypeStore from "@/store/DemoPrototypeStore";
import ButtonRightNav from "./rightnav/ButtonRightNav";
import PageRightNav from "./rightnav/PageRightNav";
import CheckboxRightNav from "./rightnav/CheckboxRightNav";
import RadioRightNav from "./rightnav/RadioRightNav";
import DropdownRightNav from "./rightnav/DropdownRightNav";
import InputRightNav from "./rightnav/InputRightNav";
import TextRightNav from "./rightnav/TextRightNav";
import ImageRightNav from "./rightnav/ImageRightNav";

export default function RightNav({
    pageContent,
}: {
    pageContent: PageNavigation;
}) {
    const { shapes, selectedShapeId } = useArtboardStore((state) => state);
    const [clickedShape, setClickedShape] = useState<Wireframe>();
    const [isDisabled, setIsDisabled] = useState(false);
    const [buttonColor, setButtonColor] = useState(
        "border-zinc-400 text-zinc-400"
    );
    const { currentPrototype } = useDemoPrototypeStore((state) => state);
    const isPrototypeReady = usePrototypeStore(
        (state) => state.isPrototypeReady
    );

    useEffect(() => {
        setIsDisabled(!(pageContent === "Gen UI" && isPrototypeReady));
        setButtonColor(
            isDisabled
                ? "border-zinc-400 text-zinc-400"
                : "border-[#42A5F5] text-[#42A5F5]"
        );
    }, [pageContent, isPrototypeReady, isDisabled]);

    useEffect(() => {
        const selectedShape = shapes.find(
            (shape) => shape.id === selectedShapeId
        );
        setClickedShape(selectedShape);
    }, [shapes, selectedShapeId]);

    // useEffect(() => {
    //     if (isPrototypeReady !== undefined) {
    //         localStorage.setItem(
    //             "isPrototypeReady",
    //             JSON.stringify(isPrototypeReady)
    //         );
    //     }
    // }, [isPrototypeReady]);

    let numberOfPages = shapes.filter((shape) => shape.type === "page").length;

    // function updateButtonSize(size:string){
    //     let buttonComponent = shapes.filter(
    //         (shape) => shape.id === selectedShapeId
    //     )![0];
    //     let width =100
    //     let height=50
    //     if (size == "small"){
    //         width=100
    //         height=50
    //     }
    //     else if(size == "medium"){
    //         width=150
    //         height=75
    //     }
    //     else{
    //         width=200
    //         height=100
    //     }
    //     handleUpdateShape(buttonComponent.id, { height: height, width:width });
    // }

    const renderShapeDetails = () => {
        if (!clickedShape) return null;

        switch (clickedShape.type) {
            case "page":
                return <PageRightNav />;

            case "button":
                return <ButtonRightNav />;

            case "checkbox":
                return <CheckboxRightNav />;

            case "radio":
                return <RadioRightNav />;

            case "dropdown":
                return <DropdownRightNav />;

            case "inputField":
                return <InputRightNav />;

            case "text":
                return <TextRightNav />;

            case "image":
                return <ImageRightNav />;

            default:
                return null;
        }
    };

    // function handleSecondaryButton(id: number) {}

    const openInNewWindow = (url: string) => {
        window.open(url, "_blank", "width=1800,height=800");
    };

    useEffect(() => {
        console.log(selectedShapeId);
    }, [selectedShapeId]);

    return (
        <div className="fixed top-0 right-0 h-screen border-l border-l-zinc-700 bg-[#262626] w-[250px]">
            <div className="border-b border-b-zinc-700 flex justify-end py-[2px]">
                <a
                    href={isDisabled ? undefined : "/prototype/1"}
                    target="_blank"
                    className={`w-[175px] flex items-center justify-center gap-3 p-2 mt-2 mb-[6px] mx-2 rounded border ${buttonColor}`}
                    onClick={(e) => {
                        if (isDisabled) {
                            e.preventDefault();
                        } else {
                            e.preventDefault();
                            if (currentPrototype == 1) {
                                openInNewWindow("/prototype/1");
                            } else {
                                openInNewWindow("/prototype/2");
                            }
                        }
                    }}
                    style={{
                        pointerEvents: isDisabled ? "none" : "auto",
                    }}
                >
                    <svg
                        width="12"
                        height="14"
                        viewBox="0 0 12 14"
                        fill={
                            pageContent === "Gen UI" && isPrototypeReady
                                ? "#42A5F5"
                                : "#999999"
                        }
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M2.28125 0.220513C1.81875 -0.0638115 1.2375 -0.0731849 0.765625 0.192393C0.29375 0.457971 0 0.957883 0 1.50154V12.4996C0 13.0432 0.29375 13.5432 0.765625 13.8087C1.2375 14.0743 1.81875 14.0618 2.28125 13.7806L11.2812 8.28159C11.7281 8.00976 12 7.52547 12 7.00056C12 6.47566 11.7281 5.99449 11.2812 5.71954L2.28125 0.220513Z"
                            fill="currentColor"
                        />
                    </svg>
                    <div
                        className="text-sm"
                        onClick={(e) => {
                            if (pageContent !== "Gen UI" || !isPrototypeReady) {
                                e.preventDefault();
                            } else {
                                e.preventDefault();
                                if (currentPrototype == 1) {
                                    openInNewWindow("/prototype/1");
                                } else {
                                    openInNewWindow("/prototype/2");
                                }
                            }
                        }}
                    >
                        View Prototype
                    </div>
                </a>
            </div>
            {pageContent === "Interaction" &&
                (selectedShapeId == null ? (
                    <div className="py-5 px-2">
                        <div className="py-5 px-2">
                            <div className="py-2">
                                {numberOfPages} Art boards
                            </div>
                            {shapes.map((shape) =>
                                shape.type === "page" ? (
                                    <div
                                        className="flex py-2"
                                        key={shape.type + shape.id + "rightnav"}
                                    >
                                        <img src={artboardIcon} alt="" />
                                        <p className="px-2">{shape.title}</p>
                                    </div>
                                ) : null
                            )}
                        </div>
                        <div className="flex justify-between py-2 px-2 rounded-md bg-[#404040]">
                            <div className="flex">
                                <img src={datasetIcon} alt="" />
                                <p className="px-2">Dataset</p>
                            </div>
                            <div className="flex">
                                <p className="px-2">Fan Data 2024</p>
                                <img src={iconx} alt="" />
                            </div>
                        </div>
                    </div>
                ) : (
                    renderShapeDetails()
                ))}

            {pageContent === "Gen UI" && (
                <div className="p-4 flex flex-col gap-3">
                    {/* <div className="flex flex-row gap-2">
                        <svg
                            width="15"
                            height="18"
                            viewBox="0 0 13 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M5.85385 3.02761C5.15572 2.32922 4.67787 1.10965 4.44073 0C4.20322 1.10988 3.72589 2.3297 3.0275 3.02809C2.32936 3.726 1.10942 4.20385 0 4.44147C1.10988 4.67861 2.32959 5.15617 3.02772 5.85459C3.72586 6.55272 4.2037 7.77255 4.44121 8.8822C4.67835 7.77232 5.15606 6.5525 5.85408 5.85411C6.55221 5.15597 7.77215 4.67835 8.88157 4.44073C7.77195 4.20359 6.55224 3.72577 5.85385 3.02761Z"
                                fill="white"
                            />
                            <path
                                d="M10.3886 8.6193C9.97191 8.20237 9.68597 7.47339 9.54431 6.81055C9.40238 7.47339 9.11741 8.20234 8.70023 8.61952C8.28305 9.03625 7.55421 9.32193 6.89148 9.46385C7.55444 9.60575 8.28305 9.89098 8.70023 10.3082C9.11741 10.7251 9.40289 11.4541 9.54479 12.1169C9.68642 11.4538 9.97191 10.7251 10.3888 10.3079C10.8058 9.89098 11.5347 9.60549 12.1974 9.46337C11.5348 9.32171 10.8058 9.03625 10.3886 8.6193Z"
                                fill="white"
                            />
                            <path
                                d="M2.99349 10.0459C2.87434 10.6024 2.63507 11.2145 2.2849 11.5647C1.93479 11.9146 1.32286 12.1544 0.766479 12.2735C1.32286 12.3929 1.93479 12.6319 2.2849 12.9823C2.63507 13.3324 2.87482 13.9441 2.99397 14.5009C3.113 13.9441 3.35238 13.3325 3.70267 12.9821C4.05255 12.632 4.66459 12.3924 5.22086 12.273C4.66462 12.1541 4.05255 11.9146 3.70244 11.5645C3.35238 11.2146 3.11252 10.6024 2.99349 10.0459Z"
                                fill="white"
                            />
                        </svg>
                        <p className="text-white text-xs">Change UI</p>
                    </div>

                    <div className="border border-[#D9D9D9] rounded-md resize-none w-full h-44 text-[#FFFFFF] p-2">
                        <textarea
                            className="bg-transparent resize-none w-full h-full text-xs text-[#FFFFFF] outline-none"
                            placeholder="Example: Change this layout from 2 columns to 3 columns"
                        />
                    </div>

                    <div className="flex justify-end">
                        <Button className="bg-[#42A5F5] rounded-3xl px-4 py-5 text-xs w-1/2 hover:bg-[#1b4363]">
                            Change
                        </Button>
                    </div> */}
                </div>
            )}
        </div>
    );
}
