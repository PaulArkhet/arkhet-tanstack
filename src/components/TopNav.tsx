import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import useAuthStore from "@/store/AuthStore";
import { useState } from "react";

import userIcon from "/iconuser.png";
import { useNavigate } from "@tanstack/react-router";

export default function TopNav() {
    const [showUserMenu, setShowUserMenu] = useState(false);
    //@ts-ignore
    const { user, logoutService } = useAuthStore((state) => state);
    const navigate = useNavigate();

    function toggleUserMenu() {
        setShowUserMenu(!showUserMenu);
    }

    function handleLogout() {
        logoutService();
        navigate({ to: "/" });
    }

    return (
        <div className="w-full flex items-center justify-end pr-10 pt-5 z-10">
            <button className="ml-5 w-8 h-8">
                <Avatar
                    className="w-full h-full bg-[#8C7DFF]"
                    onClick={toggleUserMenu}
                >
                    <AvatarImage src={userIcon} />
                    <AvatarFallback className="text-white">User</AvatarFallback>
                </Avatar>
            </button>
            {showUserMenu && (
                <div className="fixed top-[70px] right-[20px] bg-zinc-700 py-5 px-5 rounded hover:cursor-pointer">
                    <button onClick={handleLogout} className="">
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}
