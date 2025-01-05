/*
Author: Paul Kim, Vitor Akiyama, Selina Park
Date: September 16, 2024
Version: 0.0.1
Detail: Artboard Store for Arkhet
*/

import { create } from "zustand";
import buttonIcon from "/iconbutton.png";
import textIcon from "/icontext.png";
import checkboxIcon from "/iconcheckbox.png";
import radioButtonIcon from "/iconradiobutton.png";
import toggleIcon from "/icontoggle.png";
import cardIcon from "/iconcard.png";
import imageIcon from "/iconimage.png";
import dropdownIcon from "/icondropdown.png";

import usePrototypeStore from "@/store/usePrototypeStore";
import { match } from "ts-pattern";
import { getCurrentViewCenter } from "@/utils/helpers";
import { MutableRefObject } from "react";
// import { string } from "effect/FastCheck";

export type ComponentTypes = ShapeVariations["type"];

export type BaseShape = {
    id: number;
    xOffset: number;
    yOffset: number;
    width: number;
    height: number;
    minWidth: number;
    minHeight: number;
};

type ShapeVariations =
    | { type: "page"; subtype: string; title: string; description: string }
    | { type: "button"; title: string; subtype: string; iconSrc: string } // subtype may be stricter than a string here...
    | { type: "inputField"; title: string }
    | {
          type: "text";
          fontSize: string;
          fontColor: string;
          content: string;
          iconSrc: string;
      }
    | {
          type: "checkbox";
          subtype: string;
          iconSrc: string;
          label: string;
          description: string;
          option1: string;
          option2: string;
      }
    | {
          type: "radio";
          subtype: string;
          iconSrc: string;
          label: string;
          description: string;
          option1: string;
          option2: string;
          option3: string;
      }
    | { type: "toggle"; iconSrc: string }
    | {
          type: "card";
          iconSrc: string;
          title: string;
          description: string;
      }
    | { type: "image"; iconSrc: string }
    | { type: "dropdown"; iconSrc: string }
    | { type: "circle" }
    | { type: "chatbot" }
    | { type: "divider" }
    | {
          type: "navigation";
          description: string;
          content: string;
          fontColor: string;
          fontSize: string;
      };

export type Wireframe = ShapeVariations & BaseShape;

type ShapeProps<T extends ShapeVariations["type"]> = Omit<
    Extract<ShapeVariations, { type: T }>,
    "type"
>;

function createShape<T extends ShapeVariations["type"]>(
    type: T,
    baseShape: BaseShape,
    canvasRef: MutableRefObject<HTMLDivElement | null>,
    scale: number,
    x?: number,
    y?: number,
    ...[props]: keyof ShapeProps<T> extends never ? [] : [props: ShapeProps<T>]
): Extract<ShapeVariations, { type: T }> & BaseShape {
    const viewCenter = getCurrentViewCenter(canvasRef);

    console.log(type);
    console.log(x, y);
    // console.log(scale);
    // console.log(viewCenter);

    const positionedShape = {
        ...baseShape,
        xOffset: x != null ? x : viewCenter.x / scale - baseShape.width / 2,
        yOffset: y != null ? y : viewCenter.y / scale - baseShape.height / 2,
    };

    return (
        props
            ? { ...positionedShape, type, ...props }
            : { ...positionedShape, type }
    ) as Extract<ShapeVariations, { type: T }> & BaseShape;
}

/*
export type Wireframe = {
    id: number;
    xOffset: number;
    yOffset: number;
    width: number;
    height: number;
    type: ComponentTypes;
    subtype?: string;
    title?: string; // we're refactoring each component to have it's own properties later
    description?: string;
    fontSize?: string;
    fontColor?: string;
    iconSrc: any;
    content?: string;
};
*/

export type PrototypeScreenshot = {
    id: number;
    xOffset: number;
    yOffset: number;
    width: number;
    height: number;
    title?: string;
    description?: string;
    src: string;
};

type ArtboardState = {
    shapeHistory: {
        undoStack: Wireframe[][];
        redoStack: Wireframe[][];
    };
    shapes: Wireframe[];
    selectedShapeId: number | null;
    isHandToolActive: boolean;
    setShapes: (args: Wireframe[]) => void;
    setSelectedShapeId: (args: number | null) => void;
    moveLayer: (id: number, direction: "up" | "down") => void;
    handleAddShape: (
        type: ComponentTypes,
        canvasRef: MutableRefObject<HTMLDivElement | null>,
        scale: number,
        x?: number,
        y?: number
    ) => void;
    handleDeleteShape: (id: number) => void;
    setIsHandToolActive: (args: boolean) => void;
    toggleHandTool: () => void;
    handleUpdateShape<
        T extends ShapeVariations["type"] | undefined = undefined
    >(
        id: number,
        newProps: T extends undefined
            ? Partial<BaseShape>
            : T extends ShapeVariations["type"]
            ? Partial<
                  keyof ShapeProps<T> extends never
                      ? BaseShape
                      : ShapeProps<T> & BaseShape
              >
            : never
    ): void;
    handleTimeTravel: (direction: "redo" | "undo") => void;
    addUndoState: (shapes: Wireframe[]) => void;
};

export type ArtboardView = {
    scale: number;
    x: number;
    y: number;
};
const useArtboardStore = create<ArtboardState>((set, get) => ({
    shapeHistory: {
        undoStack: [],
        redoStack: [],
    },
    handleTimeTravel: (direction) => {
        const { shapeHistory, shapes } = get();
        if (direction === "undo" && shapeHistory.undoStack.length > 0) {
            // pop from undo stack into state, add state to redostack
            const newState = shapeHistory.undoStack.pop();
            shapeHistory.redoStack.push(shapes);
            set({ shapeHistory, shapes: newState });
        } else if (direction === "redo" && shapeHistory.redoStack.length > 0) {
            const newState = shapeHistory.redoStack.pop();
            shapeHistory.undoStack.push(shapes);
            set({ shapeHistory, shapes: newState });
        }
    },
    addUndoState: (shapes: Wireframe[]) => {
        const { shapeHistory } = get();
        shapeHistory.redoStack = [];
        shapeHistory.undoStack.push(shapes);
        set({ shapeHistory });
    },
    shapes: [],
    selectedShapeId: null,
    isHandToolActive: false,
    setShapes: (args: any) => set({ shapes: args }),
    setSelectedShapeId: (args: any) => set({ selectedShapeId: args }),
    moveLayer: (id: number, direction: "up" | "down") => {
        const prevShapes = get().shapes;
        const shapeIndex = prevShapes.findIndex(
            (shape: any) => shape.id === id
        );
        if (shapeIndex === -1) return;
        const newShapes = [...prevShapes];
        if (direction === "up" && shapeIndex > 0) {
            [newShapes[shapeIndex], newShapes[shapeIndex - 1]] = [
                newShapes[shapeIndex - 1],
                newShapes[shapeIndex],
            ];
        } else if (direction === "down" && shapeIndex < newShapes.length - 1) {
            [newShapes[shapeIndex], newShapes[shapeIndex + 1]] = [
                newShapes[shapeIndex + 1],
                newShapes[shapeIndex],
            ];
        }
        set({ shapes: newShapes });
    },
    handleAddShape: (
        type: ComponentTypes,
        canvasRef: MutableRefObject<HTMLDivElement | null>,
        scale: number,
        x?: number,
        y?: number
    ) => {
        console.log("handleAddShape called with:", { type, x, y });

        const { shapes, addUndoState } = get();
        const prevShapes = [...shapes];
        const id = shapes.length === 0 ? 0 : shapes[shapes.length - 1].id + 1;
        // console.log(scale, "handleADd");

        const viewCenter = getCurrentViewCenter(canvasRef);

        const baseShape: BaseShape = {
            id,
            xOffset: viewCenter.x,
            yOffset: viewCenter.y,
            width: 100,
            height: 100,
            minWidth: 10,
            minHeight: 10,
        };

        const newShape = match(type)
            .with("page", (type) =>
                createShape(
                    type,
                    {
                        ...baseShape,
                        xOffset: window.innerWidth / 2 + 600,
                        yOffset: window.innerHeight / 2 + 750,
                        width: 800,
                        height: 448,
                    },
                    canvasRef,
                    scale,
                    undefined,
                    undefined,
                    {
                        subtype: "desktop",
                        title: "New Page",
                        description:
                            "Description & documentation - Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    }
                )
            )
            .with("button", (type) =>
                createShape(
                    type,
                    {
                        ...baseShape,
                        xOffset: window.innerWidth / 2 + 940,
                        yOffset: window.innerHeight / 2 + 1000,
                        width: 49,
                        height: 20,
                        minWidth: 49,
                        minHeight: 20,
                    },
                    canvasRef,
                    scale,
                    x,
                    y,
                    {
                        title: "Confirm",
                        subtype: "primary-button",
                        iconSrc: buttonIcon,
                    }
                )
            )
            .with("inputField", (type) =>
                createShape(
                    type,
                    {
                        ...baseShape,
                        width: 105,
                        height: 30,
                        minWidth: 105,
                        minHeight: 30,
                    },
                    canvasRef,
                    scale,
                    x,
                    y,
                    {
                        title: "Input Field",
                    }
                )
            )
            .with("text", (type) =>
                createShape(
                    type,
                    {
                        ...baseShape,
                        width: 150,
                        height: 20,
                        minWidth: 49,
                        minHeight: 20,
                    },
                    canvasRef,
                    scale,
                    x,
                    y,
                    {
                        fontSize: "text-sm",
                        fontColor: "text-white",
                        content: "",
                        iconSrc: textIcon,
                    }
                )
            )
            .with("checkbox", (type) =>
                createShape(
                    type,
                    {
                        ...baseShape,
                        width: 105,
                        height: 40,
                        minWidth: 105,
                        minHeight: 40,
                    },
                    canvasRef,
                    scale,
                    x,
                    y,
                    {
                        subtype: "column",
                        iconSrc: checkboxIcon,
                        label: "",
                        description: "",
                        option1: "I Accept",
                        option2: "I Understand",
                    }
                )
            )
            .with("radio", (type) =>
                createShape(
                    type,
                    {
                        ...baseShape,
                        width: 70,
                        height: 50,
                        minWidth: 70,
                        minHeight: 50,
                    },
                    canvasRef,
                    scale,
                    x,
                    y,
                    {
                        subtype: "column",
                        iconSrc: radioButtonIcon,
                        label: "",
                        description: "",
                        option1: "Item 1",
                        option2: "Item 2",
                        option3: "Item 3",
                    }
                )
            )
            .with("toggle", (type) =>
                createShape(
                    type,
                    {
                        ...baseShape,
                        width: 30,
                        height: 30,
                        minWidth: 30,
                        minHeight: 30,
                    },
                    canvasRef,
                    scale,
                    x,
                    y,
                    { iconSrc: toggleIcon }
                )
            )
            .with("card", (type) =>
                createShape(
                    type,
                    {
                        ...baseShape,
                        width: 100,
                        height: 100,
                        minWidth: 30,
                        minHeight: 30,
                    },
                    canvasRef,
                    scale,
                    x,
                    y,
                    {
                        iconSrc: cardIcon,
                        title: "New Component",
                        description:
                            "Description - Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                    }
                )
            )
            .with("image", (type) =>
                createShape(
                    type,
                    {
                        ...baseShape,
                        width: 50,
                        height: 50,
                        minWidth: 30,
                        minHeight: 30,
                    },
                    canvasRef,
                    scale,
                    x,
                    y,
                    { iconSrc: imageIcon }
                )
            )
            .with("dropdown", (type) =>
                createShape(
                    type,
                    {
                        ...baseShape,
                        width: 70,
                        height: 25,
                        minWidth: 70,
                        minHeight: 25,
                    },
                    canvasRef,
                    scale,
                    x,
                    y,
                    { iconSrc: dropdownIcon }
                )
            )
            .with("circle", (type) =>
                createShape(
                    type,
                    {
                        ...baseShape,
                        width: 50,
                        height: 50,
                        minWidth: 30,
                        minHeight: 30,
                    },
                    canvasRef,
                    scale,
                    x,
                    y
                )
            )
            .with("divider", (type) =>
                createShape(
                    type,
                    {
                        ...baseShape,
                        width: 100,
                        height: 25,
                        minWidth: 50,
                        minHeight: 25,
                    },
                    canvasRef,
                    scale,
                    x,
                    y
                )
            )
            .with("chatbot", (type) =>
                createShape(
                    type,
                    {
                        ...baseShape,
                        width: 250,
                        height: 150,
                        minWidth: 100,
                        minHeight: 150,
                    },
                    canvasRef,
                    scale,
                    x,
                    y
                )
            )
            .with("navigation", (type) =>
                createShape(
                    type,
                    {
                        ...baseShape,
                        width: 70,
                        height: 30,
                        minWidth: 70,
                        minHeight: 25,
                    },
                    canvasRef,
                    scale,
                    x,
                    y,
                    {
                        description: "",
                        content: "",
                        fontSize: "text-md",
                        fontColor: "text-white",
                    }
                )
            )
            .exhaustive();

        addUndoState(shapes);
        set({ shapes: [...prevShapes, newShape] });
        set({ selectedShapeId: id }); // Reset the selected shape

        usePrototypeStore.getState().setIsPrototypeReady(false);
    },
    handleDeleteShape: (id: number) => {
        const { shapes, addUndoState } = get();
        addUndoState(shapes);
        const filteredShapes = shapes.filter((shape) => shape.id !== id);
        set({ shapes: filteredShapes });
        set({ selectedShapeId: null }); // Reset the selected shape

        usePrototypeStore.getState().setIsPrototypeReady(false);
    },
    setIsHandToolActive: (args: boolean) => set({ isHandToolActive: args }),
    toggleHandTool: () => {
        const handToolState = get().isHandToolActive;
        set({ isHandToolActive: !handToolState });
    },
    handleUpdateShape<
        T extends ShapeVariations["type"] | undefined = undefined
    >(
        id: number,
        newProps: T extends undefined
            ? Partial<BaseShape>
            : T extends ShapeVariations["type"]
            ? Partial<
                  keyof ShapeProps<T> extends never
                      ? BaseShape
                      : ShapeProps<T> & BaseShape
              >
            : never
    ) {
        // debugger;
        const shapes = [...get().shapes];
        const shapeIndex = shapes.findIndex((shape) => shape.id === id);
        const newShape = { ...shapes[shapeIndex], ...newProps };
        shapes[shapeIndex] = newShape;
        set({ shapes });

        usePrototypeStore.getState().setIsPrototypeReady(false);
    },
}));

export default useArtboardStore;
