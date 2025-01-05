import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card";
import useArtboardStore from "@/store/ArtboardStore";
import { useContext } from "react";
import { ViewContext } from "@/components/zoom/ViewContext";
import { ComponentProps, handleDragStart } from "./ButtonComponent";

export default function CircleComponent({ canvasRef }: ComponentProps) {
    const { handleAddShape } = useArtboardStore();
    const view = useContext(ViewContext);

    return (
        <div
            className="justify-center items-center flex hover:text-[#42A5F5] hover:bg-[#202020] rounded pt-5 transition-all ease-in-out duration-200"
            onClick={() => handleAddShape("circle", canvasRef, view!.scale)}
            draggable
            onDragStart={(e) => {
                handleDragStart(e, "circle");
            }}
        >
            <HoverCard openDelay={400} closeDelay={0}>
                <HoverCardTrigger>
                    <button>
                        <div className="h-[20px] w-[20px] bg-white rounded-full mx-auto" />
                        <p className="text-xs pt-5 pb-4">Circle</p>
                    </button>
                </HoverCardTrigger>
                <HoverCardContent
                    className="p-1 w-fit bg-zinc-950 transform border-none shadow-sm shadow-slate-800"
                    sideOffset={-40}
                >
                    <p className="text-xs">
                        Press <span className="text-sm font-bold">c</span> to
                        add a circle
                    </p>
                </HoverCardContent>
            </HoverCard>
        </div>
    );
}
