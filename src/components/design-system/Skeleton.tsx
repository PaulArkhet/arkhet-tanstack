import { Skeleton } from "../ui/skeleton";

interface SkeletonComponentProps {
    type:
        | "typography"
        | "color"
        | "button"
        | "radioButton"
        | "textField"
        | "internalNavigation"
        | "segmentedButton"
        | "checkbox"
        | "card"
        | "list"
        | "toggle"
        | "table";
}

export default function SkeletonComponent({ type }: SkeletonComponentProps) {
    if (type === "color") {
        return (
            <>
                <Skeleton className="w-full h-[48px] rounded-lg mt-4" />
                <div className="flex gap-4 mt-4">
                    <Skeleton className="w-1/3 h-[48px] rounded-lg" />
                    <Skeleton className="w-1/3 h-[48px] rounded-lg" />
                    <Skeleton className="w-1/3 h-[48px] rounded-lg" />
                </div>
            </>
        );
    }

    if (type === "typography") {
        return (
            <>
                <Skeleton className="w-full h-[48px] rounded-lg mt-4" />
                <div className="flex gap-4 mt-4">
                    <Skeleton className="w-1/3 h-[48px] rounded-lg" />
                    <Skeleton className="w-1/3 h-[48px] rounded-lg" />
                    <Skeleton className="w-1/3 h-[48px] rounded-lg" />
                </div>
                <div className="flex gap-4 mt-4">
                    <Skeleton className="w-full h-[200px] rounded-md" />
                </div>
            </>
        );
    }

    if (type === "button") {
        return <Skeleton className="w-[400px] h-[50px] rounded-lg mt-4" />;
    }

    if (type === "radioButton" || type === "toggle") {
        return <Skeleton className="w-[120px] h-[50px] rounded-lg mt-4" />;
    }

    if (type === "textField" || type === "checkbox") {
        return <Skeleton className="w-[200px] h-[50px] rounded-lg mt-4" />;
    }

    if (type === "segmentedButton" || type === "internalNavigation") {
        return <Skeleton className="w-[300px] h-[50px] rounded-lg mt-4" />;
    }

    if (type === "table") {
        return (
            <>
                <Skeleton className="w-full h-[50px] rounded-lg mt-4" />
                <Skeleton className="w-full h-[50px] rounded-lg mt-4" />
                <Skeleton className="w-full h-[50px] rounded-lg mt-4" />
                <Skeleton className="w-full h-[50px] rounded-lg mt-4" />
                <Skeleton className="w-full h-[50px] rounded-lg mt-4" />
                <Skeleton className="w-full h-[50px] rounded-lg mt-4" />
                <Skeleton className="w-full h-[50px] rounded-lg mt-4" />
                <Skeleton className="w-full h-[50px] rounded-lg mt-4" />
            </>
        );
    }

    return null;
}
