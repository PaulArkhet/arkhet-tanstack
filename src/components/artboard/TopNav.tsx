/*
Author: Paul Kim, Selina Park
Date: October 1, 2024
Version: 0.0.1
Detail: TopNav for Artboard
*/

import useArtboardStore from "@/store/ArtboardStore";
import { MutableRefObject, useContext } from "react";
// import { domToPng } from "modern-screenshot";
// import { useDesignSystemScreenshotStore } from "@/store/useDesignSystemScreenshotStore";
import { PageNavigation } from "@/pages/Artboard";
import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "../ui/hover-card";
import { ViewContext } from "../zoom/ViewContext";

export default function TopNav(props: {
    pageRefList: {
        ref: MutableRefObject<HTMLDivElement[]>;
    };
    pageContent: PageNavigation;
    setPageContent: React.Dispatch<React.SetStateAction<PageNavigation>>;
    canvasRef: MutableRefObject<HTMLDivElement | null>;
}) {
    //@ts-ignore
    const { pageRefList, pageContent, setPageContent, canvasRef } = props;
    const view = useContext(ViewContext);

    const {
        handleAddShape,
        isHandToolActive,
        setIsHandToolActive,
        toggleHandTool,
    } = useArtboardStore();

    /*
    const setIsPrototypeReady = usePrototypeStore(
        (state) => state.setIsPrototypeReady
    );
    */

    // const base64Screenshot = useDesignSystemScreenshotStore(
    //     (state) => state.base64Screenshot
    // );

    // async function triggerGeneration() {
    //     //@ts-ignore
    //     const screenshotPromiseArray = pageRefList.ref.current.map((ref) =>
    //         domToPng(ref)
    //     );
    //     const imageList: string[] = await Promise.all(screenshotPromiseArray);
    //     const requestBody = {
    //         images: imageList.map((image, index) => ({
    //             image,
    //         })),
    //         pageStructure: props.pageRefList.ref.current.map(
    //             (ref) => `${ref.dataset.title?.toLowerCase()}`
    //         ),
    //         styleguideBase64: base64Screenshot,
    //     };

    //     fetch("http://127.0.0.1:3000/images", {
    //         method: "POST", // Specify the method as POST
    //         headers: {
    //             "Content-Type": "application/json", // Specify content type as JSON
    //         },
    //         body: JSON.stringify(requestBody),
    //     });
    // }

    return (
        <div className="fixed top-0 left-[250px] w-[25%] sm:w-[45%] md:w-[50%] lg:w-[calc(100%_-_500px)] bg-[#242424] border-b border-b-zinc-700 flex items-center justify-between">
            <div>
                <HoverCard openDelay={400} closeDelay={0}>
                    <HoverCardTrigger>
                        <button
                            className={`ml-5 py-2 px-2 pl-3 rounded ${
                                !isHandToolActive && "bg-zinc-600"
                            }`}
                            onClick={() => setIsHandToolActive(false)}
                        >
                            <svg
                                width="12"
                                height="16"
                                viewBox="0 0 12 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M0 0.8286V14.0719C0 14.5076 0.353584 14.8577 0.785741 14.8577C1.01075 14.8577 1.22861 14.7612 1.37862 14.5898L4.32872 11.2147L6.40379 15.3684C6.68594 15.9327 7.37168 16.1613 7.93599 15.8791C8.50029 15.597 8.72887 14.9112 8.44672 14.3469L6.42165 10.2861H10.6397C11.0754 10.2861 11.429 9.93248 11.429 9.49675C11.429 9.27175 11.3325 9.05745 11.1647 8.90745L1.37862 0.210722C1.22504 0.0750026 1.03218 0 0.8286 0C0.371441 0 0 0.371441 0 0.8286Z"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </HoverCardTrigger>
                    <HoverCardContent
                        className="p-1 w-[150px] absolute bg-zinc-950 transform border-none shadow-sm shadow-slate-800"
                        side="bottom"
                        sideOffset={10}
                    >
                        <p className="text-xs">
                            Press <span className="text-sm font-bold">v</span>{" "}
                            to activate arrow tool
                        </p>
                    </HoverCardContent>
                </HoverCard>
                <HoverCard openDelay={400} closeDelay={0}>
                    <HoverCardTrigger>
                        <button
                            onClick={() =>
                                handleAddShape("page", canvasRef, view!.scale)
                            }
                            className="py-5 px-2"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <rect
                                    x="2.18695"
                                    width="2.30216"
                                    height="16"
                                    rx="0.5"
                                    fill="white"
                                />
                                <rect
                                    x="16"
                                    y="2.30225"
                                    width="2.30216"
                                    height="16"
                                    rx="0.5"
                                    transform="rotate(90 16 2.30225)"
                                    fill="white"
                                />
                                <rect
                                    x="11.3958"
                                    width="2.30216"
                                    height="16"
                                    rx="0.5"
                                    fill="white"
                                />
                                <rect
                                    x="16"
                                    y="11.5107"
                                    width="2.30216"
                                    height="16"
                                    rx="0.5"
                                    transform="rotate(90 16 11.5107)"
                                    fill="white"
                                />
                            </svg>
                        </button>
                    </HoverCardTrigger>
                    <HoverCardContent
                        className="p-1 w-[150px] absolute bg-zinc-950 transform border-none shadow-sm shadow-slate-800"
                        side="bottom"
                        sideOffset={10}
                    >
                        <p className="text-xs">
                            Press <span className="text-sm font-bold">r</span>{" "}
                            to add a new page
                        </p>
                    </HoverCardContent>
                </HoverCard>

                <HoverCard openDelay={400} closeDelay={0}>
                    <HoverCardTrigger>
                        <button
                            className={`py-2 px-2 rounded ${
                                isHandToolActive ? "bg-zinc-600" : ""
                            }`}
                        >
                            <div onClick={toggleHandTool}>
                                <svg
                                    width="15"
                                    height="16"
                                    viewBox="0 0 15 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M9.00159 1C9.00159 0.446875 8.55471 0 8.00159 0C7.44846 0 7.00158 0.446875 7.00158 1V7.5C7.00158 7.775 6.77658 8 6.50158 8C6.22658 8 6.00158 7.775 6.00158 7.5V2C6.00158 1.44687 5.55471 1 5.00158 1C4.44846 1 4.00158 1.44687 4.00158 2V10.5C4.00158 10.5469 4.00158 10.5969 4.00471 10.6438L2.11408 8.84375C1.61408 8.36875 0.82346 8.3875 0.345335 8.8875C-0.13279 9.3875 -0.110915 10.1781 0.389085 10.6562L3.90158 14C5.24846 15.2844 7.03908 16 8.90158 16H9.50159C12.5391 16 15.0016 13.5375 15.0016 10.5V4C15.0016 3.44688 14.5547 3 14.0016 3C13.4485 3 13.0016 3.44688 13.0016 4V7.5C13.0016 7.775 12.7766 8 12.5016 8C12.2266 8 12.0016 7.775 12.0016 7.5V2C12.0016 1.44687 11.5547 1 11.0016 1C10.4485 1 10.0016 1.44687 10.0016 2V7.5C10.0016 7.775 9.77658 8 9.50159 8C9.22659 8 9.00159 7.775 9.00159 7.5V1Z"
                                        fill="white"
                                    />
                                </svg>
                            </div>
                        </button>
                    </HoverCardTrigger>
                    <HoverCardContent
                        className="p-1 w-[220px] bg-zinc-950 transform border-none shadow-sm shadow-slate-800 absolute"
                        side="bottom"
                        sideOffset={10}
                    >
                        <p className="text-xs">
                            Press{" "}
                            <span className="text-sm font-bold">SPACE</span> or{" "}
                            <span className="text-sm font-bold">h</span> to
                            activate hand tool
                        </p>
                    </HoverCardContent>
                </HoverCard>
            </div>
            <div className="ml-auto mr-auto relative flex flex-row gap-3 items-center justify-center mt-2">
                <div
                    className="flex flex-col gap-1 items-center justify-center"
                    onClick={() => {
                        setPageContent("Interaction");
                    }}
                >
                    <svg
                        width="18"
                        height="12"
                        viewBox="0 0 18 12"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <circle
                            cx="2.76923"
                            cy="2.76923"
                            r="2.76923"
                            fill={
                                pageContent === "Interaction"
                                    ? "#9253E4"
                                    : "white"
                            }
                        />
                        <circle
                            cx="14.7692"
                            cy="9.23066"
                            r="2.76923"
                            fill={
                                pageContent === "Interaction"
                                    ? "#9253E4"
                                    : "white"
                            }
                        />
                        <path
                            d="M2.76776 2.76904H7.54553C8.09782 2.76904 8.54554 3.21676 8.54554 3.76904V8.23058C8.54554 8.78287 8.99325 9.23058 9.54554 9.23058H14.7678"
                            stroke={
                                pageContent === "Interaction"
                                    ? "#9253E4"
                                    : "white"
                            }
                        />
                    </svg>
                    <p
                        className={`text-[10px] text-center ${
                            pageContent === "Interaction"
                                ? "text-[#9253E4]"
                                : "text-white"
                        }`}
                    >
                        Interaction
                    </p>
                </div>
                <div
                    className="flex flex-col items-center justify-center"
                    onClick={async () => {
                        setPageContent("Gen UI");
                        // triggerGeneration();
                    }}
                >
                    <div className="flex-10">
                        <svg
                            width="14"
                            height="16"
                            viewBox="0 0 14 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M6.45905 3.34062C5.68874 2.57003 5.16149 1.22437 4.89983 0C4.63777 1.22462 4.11108 2.57056 3.34049 3.34115C2.57018 4.11121 1.22412 4.63846 0 4.90065C1.22462 5.1623 2.57043 5.68924 3.34074 6.45986C4.11105 7.23017 4.6383 8.57611 4.90036 9.80048C5.16202 8.57586 5.68911 7.22992 6.4593 6.45933C7.22961 5.68902 8.57567 5.16202 9.79979 4.89983C8.57545 4.63818 7.22964 4.11096 6.45905 3.34062Z"
                                fill={
                                    pageContent === "Gen UI"
                                        ? "#9253E4"
                                        : "white"
                                }
                            />
                            <path
                                d="M11.4624 9.51088C11.0026 9.05085 10.6871 8.24651 10.5308 7.51514C10.3742 8.24651 10.0597 9.05082 9.59943 9.51113C9.13912 9.97094 8.33493 10.2862 7.60368 10.4428C8.33518 10.5993 9.13912 10.914 9.59943 11.3743C10.0597 11.8344 10.3747 12.6387 10.5313 13.3701C10.6876 12.6384 11.0026 11.8344 11.4626 11.3741C11.9227 10.914 12.727 10.599 13.4581 10.4422C12.727 10.2859 11.9227 9.97094 11.4624 9.51088Z"
                                fill={
                                    pageContent === "Gen UI"
                                        ? "#9253E4"
                                        : "white"
                                }
                            />
                            <path
                                d="M3.30313 11.0845C3.17166 11.6985 2.90766 12.3739 2.52129 12.7603C2.13498 13.1463 1.45979 13.4109 0.845886 13.5424C1.45979 13.6741 2.13498 13.9379 2.52129 14.3245C2.90766 14.7108 3.17219 15.3857 3.30366 16C3.43501 15.3857 3.69913 14.7108 4.08563 14.3242C4.47169 13.9379 5.147 13.6736 5.76078 13.5419C5.14703 13.4106 4.47169 13.1464 4.08538 12.76C3.69913 12.374 3.43447 11.6985 3.30313 11.0845Z"
                                fill={
                                    pageContent === "Gen UI"
                                        ? "#9253E4"
                                        : "white"
                                }
                            />
                        </svg>
                    </div>

                    <div
                        className={`text-[10px] text-center ${
                            pageContent === "Gen UI"
                                ? "text-[#9253E4]"
                                : "text-white"
                        }`}
                    >
                        Gen UI
                    </div>
                </div>
            </div>
        </div>
    );
}
