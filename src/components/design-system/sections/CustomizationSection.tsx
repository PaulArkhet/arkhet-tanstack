import FontCustomization from "@/components/design-system/customization/FontCustomization";
import ColorCustomization from "@/components/design-system/customization/ColorCustomization";
import ButtonCustomization from "@/components/design-system/customization/ButtonCustomization";

import { useTypographyStore } from "@/store/useTypographyStore";
import { useColorPaletteStore } from "@/store/useColorPaletteStore";
import { useButtonStore } from "@/store/useButtonStore";
import { useTextFieldStore } from "@/store/useTextFieldStore";
import TextFieldCustomization from "../customization/TextFieldCustomization";
import ToggleCheckBoxCustomization from "../customization/ToggleCheckBoxCustomization";
import { useToggleStore } from "@/store/useToggleStore";
import NavigationCustomization from "../customization/NavigationCustomization";
import { useInternalNavigationStore } from "@/store/useInternalNavigationStore";
import { useCardStore } from "@/store/useCardStore";
import CardCustomization from "../customization/CardCustomization";

export default function CustomizationSection() {
    const { activeHeader } = useTypographyStore();
    const { activePalette } = useColorPaletteStore();
    const { buttonType } = useButtonStore();
    const { customizationEnabledTextField } = useTextFieldStore();
    const { customizationEnabledToggle } = useToggleStore();
    const { customizationEnabledInternalNavigation } =
        useInternalNavigationStore();
    const { customizationEnabledCard } = useCardStore();

    return (
        <div className="border-l border-l-zinc-700 flex flex-col p-1 w-96 basis-1/5">
            <div className="h-[400px]">
                {activePalette && <ColorCustomization />}
            </div>
            <div className="h-[400px]">
                {activeHeader && <FontCustomization />}
            </div>
            <div className="h-fit">
                {buttonType != "" && <ButtonCustomization />}
                {customizationEnabledToggle && <ToggleCheckBoxCustomization />}
                {customizationEnabledTextField && <TextFieldCustomization />}
                {customizationEnabledInternalNavigation && (
                    <NavigationCustomization />
                )}
                {customizationEnabledCard && <CardCustomization />}
            </div>
        </div>
    );
}
