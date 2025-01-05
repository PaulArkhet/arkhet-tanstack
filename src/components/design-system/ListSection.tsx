import { forwardRef } from "react";
import CardList from "../custom-ui/CardList";

//@ts-ignore
const ListSection = forwardRef<HTMLDivElement>((props, ref) => {
    return (
        <div ref={ref}>
            <h1 className="text-grey design-system-title-size mb-10">List</h1>
            <div className="flex flex-row gap-3">
                <CardList
                    listItems={[
                        { title: "List item", avatar: "A" },
                        { title: "List item", avatar: "A" },
                        { title: "List item", avatar: "A" },
                        { title: "List item", avatar: "A" },
                        { title: "List item", avatar: "A" },
                        { title: "List item", avatar: "A" },
                        { title: "List item", avatar: "A" },
                        { title: "List item", avatar: "A" },
                        { title: "List item", avatar: "A" },
                        { title: "List item", avatar: "A" },
                        { title: "List item", avatar: "A" },
                        { title: "List item", avatar: "A" },
                    ]}
                />
                <CardList
                    //@ts-ignore
                    cardClassName="w-2/3 bg-[#1E1E1E]"
                    showAvatar={false}
                    showCheckbox={false}
                    listItems={[
                        { title: "Menu item" },
                        { title: "Menu item" },
                        { title: "Menu item" },
                        { title: "Menu item" },
                        { title: "Menu item" },
                        { title: "Menu item" },
                        { title: "Menu item" },
                        { title: "Menu item" },
                        { title: "Menu item" },
                        { title: "Menu item" },
                        { title: "Menu item" },
                        { title: "Menu item" },
                    ]}
                />
            </div>
        </div>
    );
});

export default ListSection;
