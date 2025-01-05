import { MutableRefObject, useEffect, useState } from "react";
import { PrototypeScreenshot } from "@/store/ArtboardStore";
import PrototypeSkeleton from "./PrototypeSkeleton";
import usePrototypeStore from "@/store/usePrototypeStore";
import { Rnd } from "react-rnd";

function positionScreenshotsInCenter(
    screenshots: PrototypeScreenshot[],
    gap: number = 20
) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let currentXOffset = (windowWidth - screenshots[0].width) / 2;
    const yOffset = (windowHeight - screenshots[0].height) / 2;

    return screenshots.map((screenshot) => {
        const updatedScreenshot = {
            ...screenshot,
            xOffset: currentXOffset,
            yOffset: yOffset,
        };

        currentXOffset += screenshot.width + gap;

        return updatedScreenshot;
    });
}

function PrototypeCanvas({
    prototypeScreenshots,
    canvasRef,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleCanvasClick,
    isHandToolActive,
}: {
    prototypeScreenshots: PrototypeScreenshot[];
    canvasRef: MutableRefObject<HTMLDivElement | null>;
    handleMouseDown: (event: React.MouseEvent) => void;
    handleMouseMove: (event: React.MouseEvent) => void;
    handleMouseUp: () => void;
    handleCanvasClick: (event: React.MouseEvent) => void;
    isHandToolActive: boolean;
}) {
    const isPrototypeReady = usePrototypeStore(
        (state) => state.isPrototypeReady
    );
    const [showSkeleton, setShowSkeleton] = useState(() => {
        const storedValue = isPrototypeReady;
        return storedValue === true ? false : true;
    });
    const [centeredScreenshots, setCenteredScreenshots] = useState<
        PrototypeScreenshot[]
    >([]);
    const setIsPrototypeReady = usePrototypeStore(
        (state) => state.setIsPrototypeReady
    );
    const prototypeCurrentHistory = usePrototypeStore(
        (state) => state.prototypeCurrentHistory
    );
    const [screenshotProperties, setScreenshotProperties] = useState<
        {
            xOffset: number;
            yOffset: number;
            width: number;
            height: number;
        }[]
    >([]);

    const iterationImages = [
        "/demo/demoIteration2.png",
        "/demo/demoIteration1.png",
    ];

    useEffect(() => {
        const positionedScreenshots =
            positionScreenshotsInCenter(prototypeScreenshots);
        setCenteredScreenshots(positionedScreenshots);

        const properties = positionedScreenshots.map((screenshot) => ({
            xOffset: screenshot.xOffset,
            yOffset: screenshot.yOffset,
            width: screenshot.width,
            height: screenshot.height,
        }));
        setScreenshotProperties(properties);

        if (!isPrototypeReady) {
            const timer = setTimeout(() => {
                setShowSkeleton(false);
                setIsPrototypeReady(true);
            }, 5000);

            return () => clearTimeout(timer);
        } else {
            setIsPrototypeReady(true);
        }
    }, [prototypeScreenshots, setIsPrototypeReady]);

    if (prototypeCurrentHistory !== 0) {
        return (
            <div
                id="canvas"
                className="w-[4000px] h-[4000px] absolute bg-[#2c2c2c] border rounded top-[0px] left-[0px]"
                style={{
                    backgroundColor: "#2c2c2c",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onClick={() => {
                    handleCanvasClick;
                }}
                ref={canvasRef}
            >
                {iterationImages.map((screenshot, index) => (
                    <Rnd key={screenshot} disableDragging={isHandToolActive}>
                        <div
                            style={{
                                position: "absolute",
                                left: `${screenshotProperties[index]?.xOffset}px`,
                                top: `${screenshotProperties[index]?.yOffset}px`,
                                width: `${screenshotProperties[index]?.width}px`,
                                height: `${screenshotProperties[index]?.height}px`,
                            }}
                        >
                            <img
                                src={screenshot}
                                alt={screenshot}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    display: "block",
                                    userSelect: "none",
                                    pointerEvents: "none",
                                }}
                            />
                        </div>
                    </Rnd>
                ))}
            </div>
        );
    } else {
        return (
            <div
                id="canvas"
                className="w-[4000px] h-[4000px] absolute bg-[#2c2c2c] border rounded top-[0px] left-[0px]"
                style={{
                    backgroundColor: "#2c2c2c",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                ref={canvasRef}
                onClick={() => {
                    handleCanvasClick;
                }}
            >
                {showSkeleton
                    ? centeredScreenshots.map((screenshot) => (
                          <PrototypeSkeleton
                              key={screenshot.id}
                              id={screenshot.id}
                              width={screenshot.width}
                              height={screenshot.height}
                              xOffset={screenshot.xOffset}
                              yOffset={screenshot.yOffset}
                          />
                      ))
                    : centeredScreenshots.map((screenshot) => (
                          <Rnd
                              key={screenshot.id}
                              disableDragging={isHandToolActive}
                          >
                              <div
                                  style={{  
                                      position: "absolute",
                                      left: `${screenshot.xOffset}px`,
                                      top: `${screenshot.yOffset}px`,
                                      width: `${screenshot.width}px`,
                                      height: `${screenshot.height}px`,
                                  }}
                              >
                                  <img
                                      src={screenshot.src}
                                      alt={screenshot.title}
                                      style={{
                                          width: "100%",
                                          height: "100%",
                                          display: "block",
                                          userSelect: "none",
                                          pointerEvents: "none",
                                      }}
                                  />
                              </div>
                          </Rnd>
                      ))}
            </div>
        );
    }
}

export default PrototypeCanvas;
