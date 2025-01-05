import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import useArtboardStore from "@/store/ArtboardStore";
import React, { MutableRefObject, useContext } from "react";
import { ViewContext } from "@/components/zoom/ViewContext";

export type ComponentProps = {
    canvasRef: MutableRefObject<HTMLDivElement | null>;
};

export const handleDragStart = (event: React.DragEvent, type: string) => {
    event.dataTransfer.setData("application/json", JSON.stringify({ type }));
};

export default function ButtonComponent({ canvasRef }: ComponentProps) {
    const { handleAddShape } = useArtboardStore();
    const view = useContext(ViewContext);

    return (
        <div
            className="justify-center items-center flex hover:text-[#42A5F5] hover:bg-[#202020] rounded pt-5 transition-all ease-in-out duration-200 cursor-pointer"
            draggable
            onDragStart={(e) => {
                handleDragStart(e, "button");
            }}
            onClick={() => {
                handleAddShape("button", canvasRef, view!.scale);
            }}
        >
            <HoverCard openDelay={400} closeDelay={0}>
                <HoverCardTrigger>
                    <button>
                        <svg
                            width="46"
                            height="17"
                            viewBox="0 0 46 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <rect
                                width="46"
                                height="17"
                                rx="3"
                                fill="currentColor"
                            />
                        </svg>
                        <p className="text-xs pt-5 pb-2">Button</p>
                    </button>
                </HoverCardTrigger>
                <HoverCardContent
                    className="p-1 w-fit bg-zinc-950 transform border-none shadow-sm shadow-slate-800"
                    sideOffset={-40}
                >
                    <p className="text-xs">
                        Press <span className="text-sm font-bold">b</span> to
                        add a button
                    </p>
                </HoverCardContent>
            </HoverCard>
        </div>
    );
}
