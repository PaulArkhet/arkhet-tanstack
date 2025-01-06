import { useContext, useEffect, useRef, useState } from "react";
import LeftNav from "@/components/artboard/LeftNav";
import RightNav from "@/components/artboard/RightNav";
import TopNav from "@/components/artboard/TopNav";
import useArtboardStore, { Wireframe } from "@/store/ArtboardStore";
import useProjectStore from "@/store/ProjectStore";
import { createFileRoute } from "@tanstack/react-router";
import { ViewContext } from "@/components/zoom/ViewContext";
import Canvas, { DragAndDropComponent } from "@/components/artboard/Canvas";
import ZoomableComponent from "@/components/zoom/ZoomableComponent";
import PrototypeCanvas from "@/components/artboard/PrototypeCanvas";
import { centeredScreenshots } from "@/utils/fakeDB";
import { twMerge } from "tailwind-merge";
import axios from "axios";
import DOMAIN from "@/services/endpoint";
import { updateWireframe } from "@/pages/Artboard";

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

function isInBoundsOfOuterShape(outerShape: Bounds, innerShape: Bounds) {
    const result =
        outerShape.topBound < innerShape.topBound &&
        outerShape.bottomBound > innerShape.bottomBound &&
        outerShape.leftBound < innerShape.leftBound &&
        outerShape.rightBound > innerShape.rightBound;
    return result;
}

function setupArtboardTree(shapes: Wireframe[]) {
    // react screenshot needs all components inside of each "frame" to be
    // children of each other to include them in the screenshot
    const roots = shapes.filter((shape) => shape.type === "page");
    const children = shapes.filter((shape) => shape.type !== "page");

    const newRoots = roots.map(
        (root: Wireframe & { children?: Wireframe[] }) => {
            const newRoot = { ...root };
            newRoot.children = [];
            const rootBounds = getBoundsForShape(root);
            const innerChildren = children.filter((child) => {
                const childBounds = getBoundsForShape(child);
                return isInBoundsOfOuterShape(rootBounds, childBounds);
            });
            innerChildren.forEach((child) => {
                const index = children.findIndex(
                    (selectedChild) => selectedChild.id === child.id
                );
                children.splice(index, 1);
                const newChild = { ...child };
                newChild.xOffset -= root.xOffset;
                newChild.yOffset -= root.yOffset;
                newRoot.children!.push(newChild);
            });
            return newRoot;
        }
    );
    const result = [
        ...newRoots,
        ...(children as (Wireframe & { children: undefined })[]),
    ];
    return result;
}

function ZoomBadge() {
    const [show, setShow] = useState(false);
    const [prevScale, setPrevScale] = useState(0);

    const scale = useContext(ViewContext)?.scale;

    useEffect(() => {
        if (scale !== prevScale) {
            setShow(true);
            const timeout = setTimeout(() => {
                setShow(false);
                scale && setPrevScale(scale);
            }, 3000);
            return () => clearTimeout(timeout);
        }
    }, [scale, show, prevScale]);

    return (
        scale && (
            <div
                className={twMerge(
                    "absolute top-16 right-64 z-[999] bg-[#262626] rounded px-3 py-1 drop-shadow-lg transition-opacity ease-out",
                    show ? "opacity-100" : "opacity-0"
                )}
            >
                <p className="font-semibold">{(scale * 100).toFixed(0)}%</p>
            </div>
        )
    );
}

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

    const [data, setData] = useState(null);

    useEffect(() => {
        async function loadData() {
            try {
                const { projectId } = Route.useParams();
                const res = await axios.get(
                    `${DOMAIN}/api/v0/projects/${projectId}`
                );
                console.log("fetching");
                console.log(projectId);
                setData(res.data);
            } catch (err) {
                console.log(err);
            }
        }
        loadData();
    }, []);

    useEffect(() => {
        const debounceTimeout = setTimeout(() => {
            if (shapes.length === 0) return;
            updateWireframe(data, shapes);
        }, 2000);

        return () => clearTimeout(debounceTimeout);
    }, [shapes]);

    // useEffect(() => {
    //     setProject(data);
    //     //@ts-ignore
    //     setShapes(JSON.parse(data[0].wireframe));
    // }, [data, setProject, setShapes]);

    useEffect(() => {
        function handleKeyDown(event: KeyboardEvent) {
            const target = event.target as HTMLElement;
            if (
                target.tagName === "INPUT" ||
                target.tagName === "TEXTAREA" ||
                target.isContentEditable
            ) {
                return;
            }

            if (
                (event.key === "Delete" || event.key === "Backspace") &&
                selectedShapeId !== null
            ) {
                handleDeleteShape(selectedShapeId);
            }

            if (event.ctrlKey && event.key === "z") {
                handleTimeTravel("undo");
            }

            if (event.ctrlKey && event.key === "y") {
                handleTimeTravel("redo");
            }

            /*
            if (event.ctrlKey && event.key === "=") {
                event.preventDefault();
                setScale((prevScale) => Math.min(prevScale + 0.1, 3)); // Limit maximum zoom to 3
                console.log(scale);
            } else if (event.ctrlKey && event.key === "-") {
                event.preventDefault();
                setScale((prevScale) => Math.max(prevScale - 0.1, 0.1)); // Limit minimum zoom to 0.5
                console.log(scale);
            }
            */

            if (event.key === "h") {
                toggleHandTool();
            }
            if (event.key === "v") {
                setIsHandToolActive(false);
            }
            if (event.key === "r") {
                handleAddShape("page", canvasRef, view!.scale);
            }
            if (event.key === "t") {
                handleAddShape("text", canvasRef, view!.scale);
            }
            if (event.key === "b") {
                handleAddShape("button", canvasRef, view!.scale);
            }
            if (event.key === "c") {
                handleAddShape("circle", canvasRef, view!.scale);
            }
            if (event.key === "i") {
                handleAddShape("inputField", canvasRef, view!.scale);
            }
            if (event.key === " ") {
                event.preventDefault();
                setIsHandToolActive(true);
            }
        }

        function handleKeyUp(event: KeyboardEvent) {
            if (event.key === " ") {
                // Deactivate hand tool on spacebar release
                setIsHandToolActive(false);
            }
        }

        function handleWheel(event: WheelEvent) {
            if (event.ctrlKey) {
                event.preventDefault();
            }
        }

        function handleMouseDown(event: MouseEvent) {
            if (event.button === 1) {
                // Middle mouse button (scroll wheel click)
                event.preventDefault();
                setIsHandToolActive(true); // Activate hand tool on scroll wheel press
            }
        }

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);
        window.addEventListener("wheel", handleWheel, { passive: false });
        window.addEventListener("mousedown", handleMouseDown);
        // window.addEventListener("mouseup", handleMouseUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
            window.removeEventListener("wheel", handleWheel);
            window.removeEventListener("mousedown", handleMouseDown);
            // window.removeEventListener("mouseup", handleMouseUp);
        };
    }, [selectedShapeId, view]);

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

    function handleMouseDown(event: React.MouseEvent) {
        if (isHandToolActive || event.button === 1) {
            setDragStart({ x: event.clientX, y: event.clientY });
        }
    }

    function handleCanvasClick(event: React.MouseEvent) {
        const currentTarget = event.currentTarget as HTMLElement;
        console.log(event.target, event.currentTarget);

        // Deselect any selected shape when clicking on the canvas
        if (currentTarget.id === "canvas") {
            setSelectedShapeId(null);
        }
    }

    return (
        <main
            className={`bg-[#2c2c2c] text-white h-screen w-screen overflow-hidden`}
            style={{ cursor: isHandToolActive ? "grab" : "move" }}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
        >
            <ZoomBadge />
            <ZoomableComponent panning={isHandToolActive}>
                {pageContent === "Interaction" ? (
                    <Canvas
                        shapes={shapes}
                        pageRefList={pageRefList}
                        allShapesRefList={allShapesRefList}
                        canvasRef={canvasRef}
                        // scale={scale}
                        canvasPosition={canvasPosition}
                        isHandToolActive={isHandToolActive}
                        handleMouseDown={handleMouseDown}
                        handleMouseMove={handleMouseMove}
                        handleMouseUp={handleMouseUp}
                        handleCanvasClick={handleCanvasClick}
                    />
                ) : (
                    <PrototypeCanvas
                        prototypeScreenshots={centeredScreenshots}
                        canvasRef={canvasRef}
                        handleMouseDown={handleMouseDown}
                        handleMouseMove={handleMouseMove}
                        handleMouseUp={handleMouseUp}
                        handleCanvasClick={handleCanvasClick}
                        isHandToolActive={isHandToolActive}
                    />
                )}
            </ZoomableComponent>
            <div className="z-[-10] absolute overflow-hidden">
                {setupArtboardTree(shapes).map((shape) => (
                    <DragAndDropComponent
                        shape={shape}
                        pageRefList={pageRefList}
                        canvasRef={canvasRef}
                        allShapesRefList={allShapesRefList}
                        isHandToolActive={isHandToolActive}
                        handleMouseUp={() => null}
                        shapes={shapes}
                    />
                ))}
            </div>
            <TopNav
                pageRefList={{ ref: pageRefList }} // not correct
                pageContent={pageContent}
                setPageContent={setPageContent}
                canvasRef={canvasRef}
            />
            <LeftNav pageContent={pageContent} canvasRef={canvasRef} />
            <RightNav pageContent={pageContent} />
        </main>
    );
}
