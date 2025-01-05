/*
Author: Paul Kim, Vitor Akiyama, Selina Park
Date: September 16, 2024
Version: 0.0.1
Detail: React Router for Arkhet
*/

import {
    createBrowserRouter,
    createRoutesFromElements,
    Route,
} from "react-router-dom";
import Layout from "./layout";
import Dashboard from "./pages/Dashboard";
import Artboard, { projectLoader } from "./pages/Artboard";
import DesignSystemPage from "./pages/DesignSystemPage";
import DataSetPage from "./pages/DataSetPage";
import Prototype from "./pages/Prototype";
import Prototype2 from "./pages/Prototype2";
import HomePage from "./pages/HomePage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

export function Router() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <Route element={<Layout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/artboard" element={<Artboard />} />
                <Route
                    path="/artboard/:project_id"
                    element={<Artboard />}
                    loader={projectLoader}
                />
                <Route path="/designsystem" element={<DesignSystemPage />} />
                <Route path="/dataset" element={<DataSetPage />} />
                <Route path="/prototype/1" element={<Prototype />} />
                <Route path="/prototype/2" element={<Prototype2 />} />
                <Route path="/prototype/1" element={<Prototype />} />
                <Route path="/prototype/2" element={<Prototype2 />} />
                <Route path="/*" element={<HomePage />} />
            </Route>
        )
    );
    return router;
}
