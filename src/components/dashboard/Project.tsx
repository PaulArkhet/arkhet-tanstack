import projectThumb from "/iconprojectthumbnail.png";
import projectThumb2 from "/iconprojectthumbnail2.png";
import projectThumb3 from "/iconprojectthumbnail3.png";
import projectThumb4 from "/iconprojectthumbnail4.png";
import projectThumb5 from "/iconprojectthumbnail5.png";
import projectThumb6 from "/iconprojectthumbnail6.png";
import projectThumb7 from "/iconprojectthumbnail7.png";
import projectThumb8 from "/iconprojectthumbnail8.png";
import iconStar from "/iconstar.png";
import iconEllipsis from "/iconellipsis2.png";
import imageDelete from "/imagedelete.png";
import trashIcon from "/icontrash.png";
import { NavLink } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import axios from "axios";
import DOMAIN from "@/services/endpoint";

type Project = {
    project_id: string;
    title: string;
    created_at: string;
    edited_at: string;
    active: boolean;
};

interface ProjectProps {
    project: Project;
    index: number;
    setProjects: any;
}

export default function Project(props: ProjectProps) {
    const [showOverlay, setShowOverlay] = useState(false);
    const [showMenu, setShowMenu] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [deleteMode, setDeleteMode] = useState(false);
    const [projectTitle, setProjectTitle] = useState(props.project.title);

    function toggleMenu(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
        e.preventDefault();
        setShowMenu(!showMenu);
    }

    async function handleUpdateTitle(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        //@ts-ignore
        const newTitle = (e.target as HTMLFormElement).title.value;
        try {
            await axios.patch(
                `${DOMAIN}/api/v0/projects/project/${props.project.project_id}`,
                { title: newTitle }
            );
            props.setProjects((prevProjects: Project[]) =>
                prevProjects.map((project) =>
                    project.project_id === props.project.project_id
                        ? { ...project, title: newTitle }
                        : project
                )
            );
            setEditMode(false);
            setShowMenu(false);
        } catch (error) {
            console.error("Error updating project title:", error);
        }
    }

    async function handleDeleteProject(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await axios.post(
                `${DOMAIN}/api/v0/projects/project/delete/${props.project.project_id}`
            );
            props.setProjects((prevProjects: Project[]) =>
                prevProjects.map((project) =>
                    project.project_id === props.project.project_id
                        ? { ...project, active: false }
                        : project
                )
            );
        } catch (error) {
            console.error("Error deleting project:", error);
        }
    }

    return (
        <div
            className="border-[0.5px] border-[#373541] hover:border-none rounded-lg bg-gradient-to-r from-zinc-100 via-violet-950 to-black overflow-hidden duration-300 ease-in-out hover:shadow-[0_0_8px_2px_rgba(147,51,234,0.6)] w-96 h-fit relative"
            onMouseEnter={() => setShowOverlay(true)}
            onMouseLeave={() => {
                setShowOverlay(false);
                setShowMenu(false);
            }}
        >
            {deleteMode && (
                <div className="fixed z-[201] py-5 px-2 md:px-5 rounded-lg bg-[#1A1A1A] top-[10%] md:left-[35%] flex flex-col">
                    <img src={imageDelete} alt="" />
                    <div className="text-xl py-5 font-bold">
                        Delete For Eternity
                    </div>
                    <div className="">
                        You are about to permanently delete{" "}
                        <span className="text-[#D2B1FD]">
                            {props.project.title}
                        </span>
                        . This <br /> prototype will be gone forever.
                    </div>
                    <div className="mx-auto py-2">
                        <form onSubmit={handleDeleteProject}>
                            <input
                                name="content"
                                id="content"
                                defaultValue="[this message was deleted]"
                                className="hidden"
                            />
                            <div className="flex pl-64">
                                <button
                                    className="hidden md:block md:pb-1 edit-btn cursor-pointer px-5 py-2 md:my-2 mx-2 bg-[#BABABA] rounded hover:bg-[#fafafa] transition-all ease duration-300 text-black tracking-widest"
                                    onClick={() => setDeleteMode(false)}
                                >
                                    CANCEL
                                </button>
                                <button className="hidden md:block delete-btn cursor-pointer px-5 py-2 md:my-2 bg-[#DD4B63] rounded hover:bg-red-600 transition-all ease duration-300 tracking-widest">
                                    DELETE
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            {deleteMode && (
                <div
                    className="fixed inset-0 bg-black z-[200] opacity-70"
                    onClick={() => setDeleteMode(false)}
                ></div>
            )}
            <NavLink
                to={`/artboard/${props.project.project_id}`}
                key={props.project.project_id}
            >
                <img
                    src={
                        props.index == 0
                            ? projectThumb
                            : props.index == 1
                            ? projectThumb2
                            : props.index == 2
                            ? projectThumb3
                            : props.index == 3
                            ? projectThumb4
                            : props.index == 4
                            ? projectThumb5
                            : props.index == 5
                            ? projectThumb6
                            : props.index == 6
                            ? projectThumb7
                            : props.index > 6
                            ? projectThumb8
                            : ""
                    }
                    alt=""
                    className="w-full h-full object-cover"
                />
                <div className="flex flex-col h-[56px] justify-center px-3 bg-[#242029] text-xs gap-1">
                    <p>{props.project.title}</p>
                    <p className="text-[#E5E5E5]">
                        Edited{" "}
                        {formatDistanceToNow(new Date(props.project.edited_at))}{" "}
                        ago
                    </p>
                </div>
                {showOverlay && (
                    <img src={iconStar} className="absolute left-5 top-5" />
                )}
                {showOverlay && (
                    <img
                        src={iconEllipsis}
                        className="absolute right-5 top-5 py-1"
                        //@ts-ignore
                        onClick={toggleMenu}
                    />
                )}
            </NavLink>
            {showMenu && (
                <div className="absolute right-5 top-10 bg-[#242424] border border-[#373541] rounded-xl py-5 px-5">
                    <div
                        className="pb-1 cursor-pointer"
                        onClick={() => setEditMode(true)}
                    >
                        Edit Project Name
                    </div>
                    {editMode && (
                        <div>
                            <form
                                onSubmit={handleUpdateTitle}
                                className="flex flex-col"
                            >
                                <input
                                    name="title"
                                    id="title"
                                    type="text"
                                    value={projectTitle}
                                    onChange={(e) =>
                                        setProjectTitle(e.target.value)
                                    }
                                    className="bg-transparent border border-[#373541] px-1"
                                />
                                <div className="flex">
                                    <button className="pr-2">Update</button>
                                    <button
                                        className="px-2"
                                        onClick={() => setEditMode(false)}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                    <div className="flex my-2">
                        <img src={trashIcon} className="py-1" />
                        <div
                            className="pl-2 text-[#D2B1FC] cursor-pointer"
                            onClick={() => setDeleteMode(true)}
                        >
                            Delete
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
