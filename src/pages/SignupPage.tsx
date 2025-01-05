import { NavLink, useNavigate } from "react-router-dom";
import logo from "/logo_black.png";
import { useEffect, useState } from "react";
import axios from "axios";
import DOMAIN from "@/services/endpoint";
import useAuthStore from "@/store/AuthStore";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { EyeOpenIcon, EyeClosedIcon } from "@radix-ui/react-icons";
import signupImg from "/Signup.png";

export default function SignupPage() {
    const navigate = useNavigate();
    const [notification, setNotification] = useState("");
    //@ts-ignore
    const { loginService } = useAuthStore((state) => state);
    //const captchaRef = useRef(null);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        document.title = "Signup | Arkhet";
    }, []);

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(DOMAIN);
        // const token = captchaRef.current.getValue();
        // captchaRef.current.reset();
        // if (!token)
        //     return setNotification("Please confirm that you are human!");
        try {
            const email = (e.target as HTMLFormElement).email.value;
            const username = (e.target as HTMLFormElement).username.value;
            const password = (e.target as HTMLFormElement).password.value;
            const confirm = (e.target as HTMLFormElement).confirm.value;

            console.log(email, username, password, confirm);
            if (password != confirm) {
                return setNotification("passwords don't match!");
            }
            const new_user = { email, username, password }; // add recaptcha token later
            const res = await axios.post(`${DOMAIN}/api/v0/users`, new_user);
            if (res?.data?.success) {
                setNotification("success! Redirecting...");
                setTimeout(() => {
                    loginService(email, password);
                    navigate("/dashboard");
                }, 1000);
            } else {
                setTimeout(() => {
                    setNotification(res?.data?.message);
                }, 1000);
            }
        } catch (err) {
            setNotification(
                "There was an error signing up :( We will look into this, please try again in the near future!"
            );
            console.log(err);
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    return (
        //         <form
        //             onSubmit={handleSubmit}
        //             className="flex flex-col px-10 py-5 bg-[#404040] rounded"
        //         >
        //             <h2 className="text-2xl text-center">Sign Up</h2>
        //             <input
        //                 type="text"
        //                 name="username"
        //                 placeholder="Username"
        //                 className="px-2 my-3 text-black"
        //                 required
        //             />
        //             <input
        //                 type="email"
        //                 name="email"
        //                 placeholder="Email"
        //                 className="px-2 my-3 text-black"
        //                 required
        //             />
        //             <input
        //                 type="password"
        //                 name="password"
        //                 placeholder="Password"
        //                 className="px-2 my-3 text-black"
        //                 required
        //             />
        //             <div className="flex flex-col my-2">
        //                 <input
        //                     type="password"
        //                     name="confirm"
        //                     id="confirm"
        //                     placeholder="Confirm Password"
        //                     required
        //                     className="px-2 my-3 text-black"
        //                 />
        //             </div>
        //             <button className="bg-[#2C2C2C] py-2 my-5">Sign Up</button>
        //         </form>
        //         <div className="flex py-5">
        //             <div className="pr-2">Already have an account?</div>
        //             <NavLink to="/login" className="font-bold">
        //                 Login
        //             </NavLink>
        //         </div>
        //         <p className="text-center w-[300px]">{notification}</p>
        //     </div>
        // </div>

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
                        Create an account
                    </p>
                    <p className="text-[0.6rem] text-[#868686] text-center">
                        Accelerated Experimentation starts today
                    </p>
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col mt-2 text-xs gap-3"
                    >
                        <div className="grid w-full max-w-sm items-center">
                            <Label
                                htmlFor="username"
                                className="text-black font-bold text-xs mb-1"
                            >
                                Name
                            </Label>
                            <Input
                                className="border-[#D9D9D9] h-6 px-2 text-xs text-black"
                                type="text"
                                id="username"
                                name="username"
                                required
                            />
                        </div>
                        <div className="grid w-full max-w-sm items-center ">
                            <Label
                                htmlFor="email"
                                className="text-black font-bold text-xs mb-1"
                            >
                                Email
                            </Label>

                            <Input
                                className="border-[#D9D9D9] h-6 px-2 text-xs text-black pr-10"
                                type="email"
                                id="email"
                                name="email"
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
                                    name="password"
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
                        </div>
                        <div className="grid w-full max-w-sm items-center ">
                            <Label
                                htmlFor="confirm"
                                className="text-black font-bold text-xs mb-1"
                            >
                                Confirm Password
                            </Label>
                            <div className="relative">
                                <Input
                                    className="border-[#D9D9D9] h-6 px-2 text-xs text-black pr-10"
                                    type={
                                        showConfirmPassword
                                            ? "text"
                                            : "password"
                                    }
                                    id="confirm"
                                    name="confirm"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={toggleConfirmPasswordVisibility}
                                    className="absolute inset-y-0 right-2 flex items-center text-gray-400"
                                >
                                    {showConfirmPassword ? (
                                        <EyeClosedIcon className="w-5 h-5" />
                                    ) : (
                                        <EyeOpenIcon className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>

                        <button className="bg-[#9253E4] py-2 my-5 text-center rounded hover:bg-[#6f41ac]">
                            Register
                        </button>
                    </form>
                    <div className="flex py-3 text-xs gap-x-1 justify-center items-center">
                        <p className="text-[#868686]">
                            Already have an account?
                        </p>
                        <NavLink
                            to="/"
                            className="font-semibold text-black hover:text-[#6f41ac]"
                        >
                            Log in
                        </NavLink>
                    </div>
                    <p className="text-center text-sm text-black">
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
                    src={signupImg}
                    alt="Sign Up Page Image"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}
