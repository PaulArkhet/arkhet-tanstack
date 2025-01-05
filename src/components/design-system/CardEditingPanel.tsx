import { useCardStore } from "@/store/useCardStore";
import { removePx } from "@/utils/helpers";
import { useEffect, useState } from "react";
import { Slider } from "../ui/slider";

export default function CardEditingPanel() {
    const setCardBorderRadiusZ = useCardStore(
        //@ts-ignore
        (state) => state.setCardBorderRadius
    );
    //@ts-ignore
    const cardStyling = useCardStore((state) => state.cardStyling);
    //@ts-ignore
    const customizeCard = useCardStore((state) => state.customizeCard);
    //@ts-ignore
    const customizeList = useCardStore((state) => state.customizeList);
    //@ts-ignore
    const listStyling = useCardStore((state) => state.listStyling);
    const setListBorderRadiusZ = useCardStore(
        //@ts-ignore
        (state) => state.setListBorderRadius
    );

    const [cardBorderRadius, setCardBorderRadius] = useState(
        cardStyling.borderRadius
    );
    const [listBorderRadius, setListBorderRadius] = useState(
        listStyling.borderRadius
    );

    useEffect(() => {
        console.log("cardBorderRadius", cardBorderRadius);
        setCardBorderRadiusZ(cardBorderRadius);
    }, [cardBorderRadius]);

    useEffect(() => {
        console.log("listBorderRadius", listBorderRadius);
        setListBorderRadiusZ(listBorderRadius);
    }, [listBorderRadius]);

    return (
        <>
            {customizeCard && (
                <div className="customization-panel-styling">
                    <h1 className=" ">Card</h1>
                    <label>Border Radius: {cardBorderRadius}</label>
                    <Slider
                        value={[removePx(cardBorderRadius)]}
                        max={50}
                        step={1}
                        onValueChange={(value) => {
                            setCardBorderRadius(`${value[0]}px`);
                        }}
                    />
                </div>
            )}

            {customizeList && (
                <div className="customization-panel-styling">
                    <h1 className=" ">List</h1>
                    <label>Border Radius: {listBorderRadius}</label>
                    <Slider
                        value={[removePx(listBorderRadius)]}
                        max={50}
                        step={1}
                        onValueChange={(value) => {
                            setListBorderRadius(`${value[0]}px`);
                        }}
                    />
                </div>
            )}
        </>
    );
}
