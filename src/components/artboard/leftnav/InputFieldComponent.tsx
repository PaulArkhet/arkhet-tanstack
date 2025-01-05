import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import useArtboardStore from "@/store/ArtboardStore";
import { useContext } from "react";
import { ViewContext } from "@/components/zoom/ViewContext";
import { ComponentProps, handleDragStart } from "./ButtonComponent";

export default function InputFieldComponent({ canvasRef }: ComponentProps) {
    const { handleAddShape } = useArtboardStore();
    const view = useContext(ViewContext);

    return (
        <div
            className="justify-center items-center flex hover:text-[#42A5F5] hover:bg-[#202020] rounded pt-3 transition-all ease-in-out duration-200 cursor-pointer"
            draggable
            onDragStart={(e) => {
                handleDragStart(e, "inputField");
            }}
            onClick={() => handleAddShape("inputField", canvasRef, view!.scale)}
        >
            <HoverCard openDelay={400} closeDelay={0}>
                <HoverCardTrigger>
                    <button className="flex flex-col items-center justify-center">
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
                        <p className="text-xs pt-5 pb-2">Input Field</p>
                    </button>
                </HoverCardTrigger>
                <HoverCardContent
                    className="p-1 w-fit bg-zinc-950 transform border-none shadow-sm shadow-slate-800"
                    sideOffset={-40}
                >
                    <p className="text-xs">
                        Press <span className="text-sm font-bold">i</span> to
                        add a input field
                    </p>
                </HoverCardContent>
            </HoverCard>
        </div>
    );
}
