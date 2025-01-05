import { createLazyFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/AuthStore";
import axios from "axios";
import DOMAIN from "@/services/endpoint";
import useArtboardStore from "@/store/ArtboardStore";
import Project from "@/components/dashboard/Project";
import dashboardLegend from "/dashboardbg.png";
import dashboardPlanet from "/dashboardplanet.png";
import SkeletonComponent from "@/components/design-system/components/Skeleton";

type Project = {
    project_id: string;
    user_id: string;
    title: string;
    img_src: string;
    created_at: string;
    edited_at: string;
    iterations: number;
    active: boolean;
};

export const Route = createLazyFileRoute("/dashboard")({
    component: RouteComponent,
});

function RouteComponent() {
    const { user } = useAuthStore((state) => state);
    const [projects, setProjects] = useState<Project[]>([]);
    const { setShapes } = useArtboardStore((state) => state);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        document.title = "Arkhet";
        if (!user) navigate({ to: "/" });
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        setShapes(JSON.parse("[]"));
        async function getProjects() {
            const projects = await axios.get(
                `${DOMAIN}/api/v0/projects/${user!.user_id}`
            );

            const newProjects: Project[] = [];
            projects.data.forEach((project: Project) => {
                newProjects.push(project);
            });
            console.log("In Dashboard: newProjects");
            console.log(newProjects);
            setProjects(newProjects);
        }
        getProjects();
    }, []);

    async function handleCreatePrototype() {
        try {
            setShapes(JSON.parse("[]"));
            const title = "Untitled";
            const user_id = user!.user_id;

            const new_project = { title, user_id };
            const res = await axios.post(
                `${DOMAIN}/api/v0/projects`,
                new_project
            );
            if (res.data?.success && res.data.content.project_id) {
                navigate({ to: `/artboard/${res.data.content.project_id}` });
            } else {
                throw new Error("Project ID not found in response");
            }
            const new_wireframe = {
                project_id: res.data.content.project_id,
                content: "",
            };
            await axios.post(`${DOMAIN}/api/v0/wireframes`, new_wireframe);
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <main>
            {loading && <SkeletonComponent type="grid" />}
            {!loading &&
                projects.filter((project) => project.active).length == 0 && (
                    <div>
                        <div className="relative p-5">
                            <img src={dashboardLegend} className="pl-7 py-5" />
                            <div className="absolute top-32 left-32 text-4xl font-bold">
                                Mission: Build your first prototype
                            </div>
                            <div className="absolute top-48 left-32">
                                Your journey to discovery begins now. Explore,
                                experiment, and bring your ideas to life.
                            </div>
                            <button
                                className="absolute bottom-20 right-20 bg-[#424242] px-5 py-4 rounded"
                                onClick={handleCreatePrototype}
                            >
                                Create Prototype
                            </button>
                        </div>
                        <img
                            src={dashboardPlanet}
                            className="mx-auto w-[200px] pt-14"
                        />
                        <p className="text-center">
                            Access all your prototypes in one space.
                        </p>
                    </div>
                )}
            {!loading &&
                projects.filter((project) => project.active).length > 0 && (
                    <h2 className="px-5 text-md mb-5 tracking-widest">
                        PROTOTYPES
                    </h2>
                )}
            <div className="px-5 flex flex-row flex-wrap gap-8">
                {/* {!loading &&
                    projects.map(
                        (project, index) =>
                            project.active && (
                                <Project
                                    project={project}
                                    index={index}
                                    setProjects={setProjects}
                                    key={index}
                                />
                            )
                    )} */}
            </div>
        </main>
    );
}
