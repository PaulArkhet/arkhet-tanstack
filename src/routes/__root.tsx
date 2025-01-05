import * as React from "react";
import { Outlet, createRootRoute, useLocation } from "@tanstack/react-router";
import { ViewProvider } from "@/components/zoom/ViewContext";
import { Toaster } from "@/components/ui/toaster";
import TopNav from "@/components/TopNav";
import SideNav from "@/components/SideNav";
import "../index.css";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const location = useLocation();

    const hideSideNavRoutes = [
        "/",
        "/login",
        "/signup",
        "/artboard",
        "/prototype/1",
        "/prototype/2",
    ];

    const shouldShowSideNav =
        !hideSideNavRoutes.includes(location.pathname) &&
        !/^\/artboard\/\d+$/.test(location.pathname);

    return (
        <React.Fragment>
            <div className="flex flex-col min-h-screen w-full bg-zinc-800 text-white font overflow-hidden">
                {shouldShowSideNav && <TopNav />}
                <div
                    className={`flex-grow ${
                        shouldShowSideNav ? "pl-[200px]" : ""
                    } flex flex-row`}
                >
                    {shouldShowSideNav && <SideNav />}
                    <ViewProvider>
                        <Outlet />
                    </ViewProvider>
                    <Toaster />
                </div>
            </div>
        </React.Fragment>
    );
}
