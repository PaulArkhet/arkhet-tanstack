import LeftNav from "@/components/artboard/LeftNav";
import RightNav from "@/components/artboard/RightNav";
import TopNav from "@/components/TopNav";
import useArtboardStore, { Wireframe } from "@/store/ArtboardStore";
import useProjectStore from "@/store/ProjectStore";
import { createFileRoute } from "@tanstack/react-router";
import { useContext, useRef, useState } from "react";
import { ViewContext } from "@/components/zoom/ViewContext";

export type Bounds = ReturnType<typeof getBoundsForShape>;
export type PageNavigation = "Interaction" | "Gen UI";
export function getBoundsForShape(shape: Wireframe) {
    return {
        leftBound: shape.xOffset,
        rightBound: shape.xOffset + shape.width,
        topBound: shape.yOffset,
        bottomBound: shape.yOffset + shape.height,
    };
}

export const Route = createFileRoute("/artboard/$projectId")({
    component: RouteComponent,
});

function RouteComponent() {
    const {
        shapes,
        selectedShapeId,
        setSelectedShapeId,
        handleDeleteShape,
        isHandToolActive,
        toggleHandTool,
        setIsHandToolActive,
        handleAddShape,
        handleTimeTravel,
        setShapes,
    } = useArtboardStore((state) => state);
    const { setProject } = useProjectStore((state) => state);

    // const [scale, setScale] = useState(1);

    const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(
        null
    );

    const [canvasPosition, setCanvasPosition] = useState({
        x: -1000,
        y: -1000,
    });
    const pageRefList = useRef<HTMLDivElement[]>([]);
    const allShapesRefList = useRef<HTMLDivElement[]>([]);
    const canvasRef = useRef<HTMLDivElement | null>(null);
    const view = useContext(ViewContext);

    //Changing the page content: Gen UI
    const [pageContent, setPageContent] =
        useState<PageNavigation>("Interaction");

    function handleMouseMove(event: React.MouseEvent) {
        if (isHandToolActive && dragStart) {
            const dx = event.clientX - dragStart.x;
            const dy = event.clientY - dragStart.y;
            setCanvasPosition((prevPosition) => ({
                x: prevPosition.x + dx / 2,
                y: prevPosition.y + dy / 2,
            }));
            setDragStart({ x: event.clientX, y: event.clientY });
        }
    }

    function handleMouseUp() {
        setDragStart(null);
    }

    const handleDrop = (event: React.DragEvent) => {
        event.preventDefault();

        const data = event.dataTransfer.getData("application/json");
        const parsedData = JSON.parse(data);

        const rect = canvasRef.current?.getBoundingClientRect();
        const x = (event.clientX - (rect?.left || 0)) / view!.scale;
        const y = (event.clientY - (rect?.top || 0)) / view!.scale;

        console.log("Dropped data:", parsedData);
        console.log("Drop position:", x, y);

        handleAddShape(parsedData.type, canvasRef, view!.scale, x, y);
    };

    const handleDragOver = (event: React.DragEvent) => {
        event.preventDefault();
    };

    return (
        <main
            className={`bg-[#2c2c2c] text-white h-screen w-screen overflow-hidden`}
            style={{ cursor: isHandToolActive ? "grab" : "move" }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <TopNav
                pageRefList={{ ref: null }} // not correct
                pageContent={null}
                setPageContent={null}
                canvasRef={null}
            />
            <LeftNav pageContent={null} canvasRef={null} />
            <RightNav pageContent={null} />
        </main>
    );
}
