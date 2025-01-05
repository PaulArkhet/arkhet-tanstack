import { useNavigationStore } from "@/store/useNavigationStore";
import { useState } from "react";
import { Slider } from "../ui/slider";
import { removePx } from "@/utils/helpers";

export default function NavigationEditingPanel() {
    //@ts-ignore
    const navigationType = useNavigationStore((state) => state.navigationType);
    const internalNavigationStyles = useNavigationStore(
        //@ts-ignore
        (state) => state.internalNavigationStyles
    );

    const [borderRadius, setBorderRadius] = useState(
        internalNavigationStyles.borderRadius
    );
    //@ts-ignore
    const [borderWidth, setBorderWidth] = useState(
        internalNavigationStyles.borderWidth
    );

    return (
        <div className="customization-panel-styling">
            <h1 className=" pb-3">Internal Navigation</h1>
            <div className="grid gap-3">
                <div className="grid gap-2">
                    <h2>Border Radius: {borderRadius}</h2>
                    <Slider
                        value={[removePx(borderRadius)]}
                        max={100}
                        step={1}
                        onValueChange={(value) => {
                            setBorderRadius(value[0]);
                        }}
                    />
                </div>
            </div>
        </div>
    );
}
