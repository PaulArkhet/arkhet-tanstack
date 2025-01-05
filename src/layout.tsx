/*
Author: Paul Kim, Vitor Akiyama, Selina Park
Date: September 16, 2024
Version: 0.0.1
Detail: Layout for Arkhet
*/

import { Outlet, useLocation } from "react-router-dom";
import SideNav from "./components/SideNav";
import TopNav from "./components/TopNav";
import { Toaster } from "./components/ui/toaster";
import { ViewProvider } from "./components/zoom/ViewContext";

export default function Layout() {
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
    );
}
