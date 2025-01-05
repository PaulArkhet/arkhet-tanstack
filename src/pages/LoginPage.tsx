import { NavLink, useNavigate } from "react-router-dom";
import logo from "/Arkhet-logo_white 1.png";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/AuthStore";

export default function LoginPage() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState("");
    //@ts-ignore
    const { loginService, authLoading, user } = useAuthStore((state) => state);

    useEffect(() => {
        document.title = "Login | Arkhet";
    }, []);

    useEffect(() => {
        if (!!user) {
            navigate(`/dashboard`);
        }
    }, [user]);

    async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const email = (e.target as HTMLFormElement).email.value;
        const password = (e.target as HTMLFormElement).password.value;
        console.log(email);
        console.log(password);
        if (!email || !password) return;
        loginService(email, password);
        if (!user) {
            setTimeout(() => {
                setNotification("Invalid login credentials");
            }, 700);
        }
    }

    return (
        <div className="mx-auto">
            <NavLink to="/">
                <div className="flex flex-col pt-10 md:pt-24 mx-auto text-center ">
                    <img
                        src={logo}
                        alt=""
                        className="mx-auto w-[50px] h-[50px]"
                    />
                    <h1 className="py-5">Arkhet</h1>
                </div>
            </NavLink>
            <div>
                <form
                    onSubmit={handleLogin}
                    className="flex flex-col px-10 py-5 bg-[#404040] rounded"
                >
                    <h2 className="text-2xl text-center">Login</h2>
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="px-2 my-3 text-black"
                        required
                    />
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="px-2 my-3 text-black"
                        required
                    />
                    <button className="bg-[#2C2C2C] py-2 my-5 text-center">
                        Login
                    </button>
                </form>
                <div className="flex py-5">
                    <div className="pr-2">Don't have an account?</div>
                    <NavLink to="/signup" className="font-bold">
                        Sign Up
                    </NavLink>
                </div>
                <p className="text-center w-[300px]">{notification}</p>
            </div>
        </div>
    );
}
