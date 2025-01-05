import { PrototypeScreenshot } from "@/store/ArtboardStore";

export function positionScreenshotsInCenter(
    screenshots: PrototypeScreenshot[],
    gap: number = 20,
    offsetFromCenter: number = 150
) {
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    let currentXOffset =
        (windowWidth - screenshots[0].width) / 2 - offsetFromCenter;
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

const prototypeScreenshots: PrototypeScreenshot[] = [
    {
        id: 1,
        xOffset: 0,
        yOffset: 0,
        width: 409,
        height: 240,

        title: "Prototype Example 1",
        description: "",
        src: "/demo/prototypeScreenshot1.png",
    },
    {
        id: 2,
        xOffset: 0,
        yOffset: 0,
        width: 409,
        height: 240,

        title: "Prototype Example 2",
        description: "",
        src: "/demo/prototypeScreenshot2.png",
    },
];

export const centeredScreenshots = positionScreenshotsInCenter(
    prototypeScreenshots,
    20,
    200
);
