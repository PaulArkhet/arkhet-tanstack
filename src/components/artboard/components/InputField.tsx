import useArtboardStore from "@/store/ArtboardStore";
import { useState, useRef, useEffect } from "react";

interface InputFieldProps {
    shape: any;
}

export default function InputField({ shape }: InputFieldProps) {
    const [isEditable, setIsEditable] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);
    const { handleUpdateShape } = useArtboardStore();

    useEffect(() => {
        if (isEditable && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditable]);

    return (
        <div
            className="relative h-full"
            onDoubleClick={() => setIsEditable(true)}
        >
            {isEditable ? (
                <input
                    ref={inputRef}
                    type="text"
                    value={shape.title}
                    onChange={(e) =>
                        handleUpdateShape<"inputField">(shape.id, {
                            title: e.target.value,
                        })
                    }
                    onBlur={() => {
                        setIsEditable(false);
                    }}
                    className="bg-transparent border border-gray-300 rounded focus:outline-none text-xs h-full w-full"
                />
            ) : (
                <span
                    className="w-full h-full p-1 focus:outline-none bg-transparent rounded-sm border text-xs"
                    style={{
                        display: "inline-block",
                        minWidth: shape.minWidth,
                    }}
                >
                    {shape.title}
                </span>
            )}
        </div>
    );
}
