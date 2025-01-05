import useArtboardStore from "@/store/ArtboardStore";
import { useContext } from "react";
import { ViewContext } from "@/components/zoom/ViewContext";
import { ComponentProps, handleDragStart } from "./ButtonComponent";

export default function ImageComponent({ canvasRef }: ComponentProps) {
    const { handleAddShape } = useArtboardStore();
    const view = useContext(ViewContext);

    return (
        <button
            className="hover:text-[#42A5F5] hover:bg-[#202020] rounded pt-5 transition-all ease-in-out duration-200"
            onClick={() => handleAddShape("image", canvasRef, view!.scale)}
            draggable
            onDragStart={(e) => {
                handleDragStart(e, "image");
            }}
        >
            <div className="flex justify-center items-center">
                <svg
                    width="18"
                    height="17"
                    viewBox="0 0 18 17"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M18 15.1111V1.88889C18 0.85 17.1 0 16 0H2C0.9 0 0 0.85 0 1.88889V15.1111C0 16.15 0.9 17 2 17H16C17.1 17 18 16.15 18 15.1111ZM5.5 9.91667L8 12.7594L11.5 8.5L16 14.1667H2L5.5 9.91667Z"
                        fill="currentColor"
                    />
                </svg>
            </div>
            <p className="text-xs pt-5 pb-4">Image</p>
        </button>
    );
}
