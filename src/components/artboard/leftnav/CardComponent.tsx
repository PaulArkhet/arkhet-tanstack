import useArtboardStore from "@/store/ArtboardStore";
import { useContext } from "react";
import { ViewContext } from "@/components/zoom/ViewContext";
import { ComponentProps, handleDragStart } from "./ButtonComponent";
export default function CardComponent({ canvasRef }: ComponentProps) {
    const { handleAddShape } = useArtboardStore();
    const view = useContext(ViewContext);

    return (
        <button
            className="hover:text-[#42A5F5] hover:bg-[#202020] rounded transition-all ease-in-out duration-200"
            onClick={() => handleAddShape("card", canvasRef, view!.scale)}
            draggable
            onDragStart={(e) => {
                handleDragStart(e, "card");
            }}
        >
            <p className="p-3 ">+ Create New</p>
        </button>
    );
}

CardComponent;
