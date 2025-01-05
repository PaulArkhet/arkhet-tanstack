import useArtboardStore from "@/store/ArtboardStore";
import { useContext } from "react";
import { ViewContext } from "@/components/zoom/ViewContext";
import { ComponentProps, handleDragStart } from "./ButtonComponent";

export default function ToggleComponent({ canvasRef }: ComponentProps) {
    const { handleAddShape } = useArtboardStore();
    const view = useContext(ViewContext);

    return (
        <button
            className="hover:text-[#42A5F5] hover:bg-[#202020] rounded pt-3 transition-all ease-in-out duration-200"
            onClick={() => handleAddShape("toggle", canvasRef, view!.scale)}
            draggable
            onDragStart={(e) => {
                handleDragStart(e, "toggle");
            }}
        >
            <div className="flex items-center justify-center">
                <svg
                    width="21"
                    height="15"
                    viewBox="0 0 21 15"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M7 0C3.13542 0 0 3.35938 0 7.5C0 11.6406 3.13542 15 7 15H14C17.8646 15 21 11.6406 21 7.5C21 3.35938 17.8646 0 14 0H7ZM14 3.75C14.9283 3.75 15.8185 4.14509 16.4749 4.84835C17.1313 5.55161 17.5 6.50544 17.5 7.5C17.5 8.49456 17.1313 9.44839 16.4749 10.1517C15.8185 10.8549 14.9283 11.25 14 11.25C13.0717 11.25 12.1815 10.8549 11.5251 10.1517C10.8687 9.44839 10.5 8.49456 10.5 7.5C10.5 6.50544 10.8687 5.55161 11.5251 4.84835C12.1815 4.14509 13.0717 3.75 14 3.75Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
            <p className="text-xs pt-5 pb-2">Toggle</p>
        </button>
    );
}
