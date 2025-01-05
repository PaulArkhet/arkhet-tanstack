import React, { useContext, useEffect, useRef, useState } from "react";
import { ViewContext } from "./ViewContext";

const ZoomableComponent = (props: {
    children: JSX.Element;
    panning: boolean;
}) => {
    const view = useContext(ViewContext);
    if (!view) {
        throw new Error("ZoomableComponent must be used within a ViewProvider");
    }

    const { transform, pan, scaleAt } = view;
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isPanning, setIsPanning] = useState(false);
    const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (!event.ctrlKey) return;
            if (event.key === "-" || event.key === "=") {
                event.preventDefault();
                const rect = wrapperRef.current?.getBoundingClientRect();
                if (!rect) return;

                const viewportCenterX = window.scrollX + window.innerWidth / 2;
                const viewportCenterY = window.scrollY + window.innerHeight / 2;

                const x = viewportCenterX - rect.left + window.scrollX;
                const y = viewportCenterY - rect.top + window.scrollY;

                const scaleFactor = event.key === "=" ? 1.05 : 1 / 1.05;
                scaleAt({ x, y }, scaleFactor);
                event.preventDefault();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    const handleMouseDown = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!props.panning) return;
        setIsPanning(true);
        mouse.current.x = event.clientX;
        mouse.current.y = event.clientY;
        event.preventDefault();
    };

    const handleMouseUp = () => {
        setIsPanning(false);
    };

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (isPanning) {
            const deltaX = event.clientX - mouse.current.x;
            const deltaY = event.clientY - mouse.current.y;
            pan({ x: deltaX, y: deltaY });
            mouse.current.x = event.clientX;
            mouse.current.y = event.clientY;
            event.preventDefault();
        }
    };

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        if (event.ctrlKey) {
            const rect = wrapperRef.current?.getBoundingClientRect();
            if (!rect) return;
            const x = event.clientX - rect.left;
            const y = event.clientY - rect.top;
            const scaleFactor = event.deltaY < 0 ? 1.05 : 1 / 1.05;
            scaleAt({ x, y }, scaleFactor);
            event.preventDefault();
        }
    };

    return (
        <div
            ref={wrapperRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onWheel={handleWheel}
            className="touch-none w-fit h-fit"
        >
            <div id="zoomable-canvas" style={{ transform }}>
                {props.children}
            </div>
        </div>
    );
};

export default ZoomableComponent;
