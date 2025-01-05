import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/artboard/$projectId")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>blablaHello "/artboard/$projectId"!</div>;
}
