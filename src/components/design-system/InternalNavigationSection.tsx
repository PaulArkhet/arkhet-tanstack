import { FC, useEffect, useState } from "react";
import { useNavigationStore } from "@/store/useNavigationStore";
import { Tabs, TabsList, TabsTrigger } from "../custom-ui/Tabs";

const InternalNavigationSection: FC<{
    customStyles: any;
}> = ({ customStyles }) => {
    const { styles, setNavigationType } = useNavigationStore();
    const setStyles = useNavigationStore((state) => state.setStyles);

    const [activeTab, setActiveTab] = useState("Tab One");

    useEffect(() => {
        if (customStyles) {
            setNavigationType("internalNavigation");
            setStyles(customStyles.internal, customStyles.active);
        }
    }, [customStyles, setNavigationType]);

    const selectTab = (tabName: string) => {
        setActiveTab(tabName);
        setNavigationType("internalNavigation"); 
    };

    return (
        <Tabs defaultValue={activeTab}>
            <TabsList
                style={{
                    backgroundColor: "transparent",
                    justifyContent: "space-evenly",
                    ...styles.internal,
                    ...customStyles, 
                }}
            >
                {["Tab One", "Tab Two", "Tab Three"].map((tab) => (
                    <TabsTrigger
                        key={tab}
                        value={tab}
                        isActive={activeTab === tab}
                        onClick={() => selectTab(tab)}
                        style={activeTab === tab ? styles.active : undefined}
                    >
                        {tab}
                    </TabsTrigger>
                ))}
            </TabsList>
        </Tabs>
    );
};

export default InternalNavigationSection;
