import { NavLink, useNavigate } from "react-router-dom";
import logo from "/logo_black.png";
import { useEffect, useState } from "react";
import useAuthStore from "@/store/AuthStore";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import loginImg from "/Login.png";

export default function HomePage() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState("");
    //@ts-ignore
    const { loginService, authLoading, user } = useAuthStore((state) => state);
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        document.title = "Home | Arkhet";
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
        if (!email || !password) return;
        loginService(email, password);
        if (!user) {
            setTimeout(() => {
                setNotification("Invalid login credentials");
            }, 700);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="w-screen bg-[#FFFFFF] grid md:grid-cols-3 p-2">
            <div className="flex flex-col gap-2 m-3 justify-start order-2 md:order-1">
                <NavLink to="/" className="flex items-center space-x-2">
                    <div style={{ marginTop: "0.05rem" }}>
                        <svg
                            width="14"
                            height="12"
                            viewBox="0 0 14 12"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M0.293945 5.29365C-0.0966797 5.68428 -0.0966797 6.31865 0.293945 6.70928L5.29395 11.7093C5.68457 12.0999 6.31895 12.0999 6.70957 11.7093C7.1002 11.3187 7.1002 10.6843 6.70957 10.2937L3.4127 6.9999H13.0002C13.5533 6.9999 14.0002 6.55303 14.0002 5.9999C14.0002 5.44678 13.5533 4.9999 13.0002 4.9999H3.41582L6.70645 1.70615C7.09707 1.31553 7.09707 0.681152 6.70645 0.290527C6.31582 -0.100098 5.68145 -0.100098 5.29082 0.290527L0.29082 5.29053L0.293945 5.29365Z"
                                fill="black"
                            />
                        </svg>
                    </div>
                    <p className="text-black text-xs font-bold">Go Back</p>
                </NavLink>
                <div className="flex flex-col pt-10 md:pt-24 mx-auto gap-2 w-56">
                    <img src={logo} className="mx-auto w-[16px] h-[21px]" />
                    <p className="font-bold text-black w-full text-center tracking-wide">
                        Welcome back to Arkhet
                    </p>
                    <form
                        onSubmit={handleLogin}
                        className="flex flex-col mt-2 text-xs gap-3"
                    >
                        <div className="grid w-full max-w-sm items-center">
                            <Label
                                htmlFor="email"
                                className="text-black font-bold text-xs mb-1"
                            >
                                Email
                            </Label>
                            <Input
                                className="border-[#D9D9D9] h-6 px-2 text-xs text-black"
                                type="email"
                                id="email"
                                required
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center ">
                            <Label
                                htmlFor="password"
                                className="text-black font-bold text-xs mb-1"
                            >
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    className="border-[#D9D9D9] h-6 px-2 text-xs text-black pr-10"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute inset-y-0 right-2 flex items-center text-gray-400"
                                >
                                    {showPassword ? (
                                        <EyeClosedIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeOpenIcon className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                            <button className="text-right text-[#868686] text-[0.6rem] hover:text-[#9253E4]">
                                Forgot Password
                            </button>
                        </div>

                        <button className="bg-[#9253E4] py-2 my-5 text-center rounded hover:bg-[#6f41ac]">
                            Log In
                        </button>
                    </form>
                    <div className="flex py-3 text-xs gap-x-1 justify-center items-center">
                        <p className="text-[#868686]">Don't have an account?</p>
                        <NavLink
                            to="/signup"
                            className="font-semibold text-black hover:text-[#6f41ac]"
                        >
                            Register
                        </NavLink>
                    </div>
                    <p className="text-black text-sm text-center">
                        {notification}
                    </p>
                </div>
                <div className="flex justify-between items-center w-full mt-auto text-[#868686] text-[0.6rem] p-2">
                    <p className="text-[#868686] text-[0.6rem]">
                        ©2024 Arkhet AI Inc All rights reserved
                    </p>
                    <div className="flex space-x-4">
                        <a href="#" className="hover:underline font-semibold">
                            Privacy Policy
                        </a>
                        <a href="#" className="hover:underline font-semibold">
                            Terms & Conditions
                        </a>
                    </div>
                </div>
            </div>
            <div className="order-1 md:order-2 md:col-span-2 h-60 md:h-[calc(100vh-1rem)] bg-[#1e1e2f] flex items-center justify-center relative overflow-hidden rounded-3xl mb-4 md:mb-0">
                <img
                    src={loginImg}
                    alt="Logic Page Image"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}
