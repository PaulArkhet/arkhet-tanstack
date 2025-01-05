import protoIcon from "/iconproto.svg";
import avatarIcon from "/iconavatar.png";
import logoutIcon from "/iconlogout.svg";
import starsIcon from "/iconstars.svg";
import stackIcon from "/iconstack.svg";
import homeIcon from "/iconhome.svg";
import { useEffect, useState } from "react";
import ProgressBar from "progressbar.js";
import aiIcon from "/iconai.svg";
import { CgProfile } from "react-icons/cg";
import chartImage from "/imagechart.svg";
import trafficImage from "/imagetraffic.png";
import barImage from "/imagebar.png";
import pieImage from "/imagepiechart.png";

export default function Prototype2() {
    const [loadingState, setLoadingState] = useState(true);
    const [currentPage, setCurrentPage] = useState("home");
    const aiText1 = (
        <div className="py-2">
            Segment created. You have <span className="font-bold">405,381</span>{" "}
            fans in this segment. What do you want to name this segment?
        </div>
    );
    const aiText2 = (
        <div className="py-2">
            Absolutely! You have <span className="font-bold">348,293</span> fans
            now. Do you want to keep narrowing it down?
        </div>
    );
    const aiText3 = (
        <div className="py-2">
            The average ticket price for this segment is $37.
        </div>
    );
    const aiText4 = (
        <div className="py-2">
            Ok. You now have 242,951 fans in this segment. The new average
            ticket price for this segment is $46.
        </div>
    );
    const [userMessage, setUserMessage] = useState("");
    const [userMessages, setUserMessages] = useState<string[]>([]);

    useEffect(() => {
        document.title = "Donkees";
    }, []);

    useEffect(() => {
        const circleBar = new ProgressBar.Circle("#circle-container", {
            color: "white",
            strokeWidth: 2,
            trailWidth: 25,
            trailColor: "black",
            easing: "easeInOut",
            //@ts-ignore
            from: { color: "#FF9900", width: 1 },
            //@ts-ignore
            to: { color: "#009900", width: 25 },
            text: {
                value: "0",
                className: "progress-text",
                style: {
                    color: "black",
                    position: "absolute",
                    top: "45%",
                    left: "37%",
                    padding: 0,
                    margin: 0,
                    transform: null,
                },
            },
            step: (state, shape: any) => {
                shape.path.setAttribute("stroke", state.color);
                shape.path.setAttribute("stroke-width", state.width);
                shape.setText(Math.round(shape.value() * 100) + " %");
            },
        });
        circleBar.animate(1.0, {
            duration: 1500,
        });
    }, []);
    setTimeout(() => setLoadingState(false), 2000);

    return (
        <div className="bg-white text-black w-screen">
            {loadingState && (
                <div className="px-10 py-10">
                    <div className=" text-center font-bold text-4xl">
                        Building Your Prototype...
                    </div>
                    <div id="circle-container"></div>
                </div>
            )}
            {!loadingState && currentPage == "home" && (
                <div className="flex">
                    <div className="bg-white drop-shadow-xl h-screen flex flex-col justify-between">
                        <div>
                            <div className="xl:flex px-5 py-5 border-b">
                                <img
                                    src={protoIcon}
                                    alt=""
                                    className="h-[75px] w-[75px]"
                                />
                                <div className="md:pl-5">
                                    <h1 className="font-extrabold text-2xl">
                                        Donkees
                                    </h1>
                                    <h2>Fan AI Tool</h2>
                                </div>
                            </div>
                            <div className="py-5 px-5">
                                <div className="py-4 flex">
                                    <img
                                        src={starsIcon}
                                        alt=""
                                        className="ml-1"
                                    />
                                    <div className="ml-2 text-[#1B2559] font-bold">
                                        Create Segment
                                    </div>
                                </div>
                                <div className="py-4 flex">
                                    <img
                                        src={stackIcon}
                                        alt=""
                                        className="ml-1"
                                    />
                                    <div className="ml-3 text-[#1B2559]">
                                        Manage Segment
                                    </div>
                                </div>
                                <div className="py-4 flex">
                                    <img src={homeIcon} alt="" />
                                    <div className="ml-2 text-[#1B2559]">
                                        Templates
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:flex px-5 py-10">
                            <img src={avatarIcon} alt="" />
                            <div className="px-5 py-1 font-bold">Mick Mant</div>
                            <img src={logoutIcon} alt="" className="pl-5" />
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="md:flex py-10 md:px-5 font-bold">
                            <div className="px-10 underline cursor-pointer text-blue-900">
                                Chat UI
                            </div>
                            <div
                                className="px-10 cursor-pointer"
                                onClick={() => setCurrentPage("data")}
                            >
                                Explore Data
                            </div>
                            <div className="px-10">Suggestions</div>
                        </div>
                        <div className="px-5 md:px-20 xl:w-[1000px] h-[30%] md:h-[70%] mx-auto overflow-y-auto">
                            {userMessages.length > 0 && (
                                <div className="flex justify-between">
                                    <div></div>
                                    <div className="flex py-2 my-2 px-10 ">
                                        <div className="px-5 py-5 mr-5 border rounded-2xl">
                                            {userMessages[0]}
                                        </div>
                                        <CgProfile size={30} />
                                    </div>
                                </div>
                            )}
                            {userMessages.length > 0 && (
                                <div className="flex py-2">
                                    <img src={aiIcon} alt="" className="mr-5" />
                                    <div>{aiText1}</div>
                                </div>
                            )}
                            {userMessages.length > 1 && (
                                <div className="flex justify-between py-2 my-2 px-10">
                                    <div></div>
                                    <div className="flex">
                                        <div className="px-5 py-5 mr-5 border rounded-2xl">
                                            {userMessages[1]}
                                        </div>
                                        <CgProfile size={30} />
                                    </div>
                                </div>
                            )}
                            {userMessages.length > 1 && (
                                <div className="flex py-2">
                                    <img src={aiIcon} alt="" className="mr-5" />
                                    <div>{aiText2}</div>
                                </div>
                            )}
                            {userMessages.length > 2 && (
                                <div className="flex justify-between py-2 my-2 px-10">
                                    <div></div>
                                    <div className="flex">
                                        <div className="px-5 py-5 mr-5 border rounded-2xl">
                                            {userMessages[2]}
                                        </div>
                                        <CgProfile size={30} />
                                    </div>
                                </div>
                            )}
                            {userMessages.length > 2 && (
                                <div className="flex py-2">
                                    <img src={aiIcon} alt="" className="mr-5" />
                                    <div>{aiText3}</div>
                                </div>
                            )}
                            {userMessages.length > 3 && (
                                <div className="flex justify-between py-2 my-2 px-10">
                                    <div></div>
                                    <div className="flex">
                                        <div className="px-5 py-5 mr-5 border rounded-2xl">
                                            {userMessages[3]}
                                        </div>
                                        <CgProfile size={30} />
                                    </div>
                                </div>
                            )}
                            {userMessages.length > 3 && (
                                <div className="flex py-2">
                                    <img src={aiIcon} alt="" className="mr-5" />
                                    <div>{aiText4}</div>
                                </div>
                            )}
                            {userMessages.length > 4 && (
                                <div className="flex justify-between py-2 my-2 px-10">
                                    <div></div>
                                    <div className="flex">
                                        <div className="px-5 py-5 mr-5 border rounded-2xl">
                                            {userMessages[4]}
                                        </div>
                                        <CgProfile size={30} />
                                    </div>
                                </div>
                            )}
                        </div>
                        <div className="fixed bottom-[10%] md:left-[35%]">
                            <input
                                type="text"
                                placeholder="Describe your fan segment..."
                                className="border px-5 py-3 w-[300px] rounded-2xl mr-2"
                                value={userMessage}
                                onChange={(e) => {
                                    setUserMessage(e.target.value);
                                }}
                            />
                            <button
                                className="bg-[#4B7C9D] px-10 py-3 rounded-3xl text-[#412D00] font-bold"
                                onClick={() => {
                                    let newUserMessages = [...userMessages];
                                    newUserMessages.push(userMessage);
                                    setUserMessages(newUserMessages);
                                    setUserMessage("");
                                }}
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            )}
            {!loadingState && currentPage == "data" && (
                <div className="flex">
                    <div className="bg-white drop-shadow-xl h-screen flex flex-col justify-between fixed top-0 left-0">
                        <div>
                            <div className="xl:flex px-5 py-5 border-b">
                                <img
                                    src={protoIcon}
                                    alt=""
                                    className="h-[75px] w-[75px]"
                                />
                                <div className="md:pl-5">
                                    <h1 className="font-extrabold text-2xl">
                                        Donkees
                                    </h1>
                                    <h2>Fan AI Tool</h2>
                                </div>
                            </div>
                            <div className="py-5 px-5">
                                <div className="py-4 flex">
                                    <img
                                        src={starsIcon}
                                        alt=""
                                        className="ml-1"
                                    />
                                    <div className="ml-2 text-[#1B2559] font-bold">
                                        Create Segment
                                    </div>
                                </div>
                                <div className="py-4 flex">
                                    <img
                                        src={stackIcon}
                                        alt=""
                                        className="ml-1"
                                    />
                                    <div className="ml-3 text-[#1B2559]">
                                        Manage Segment
                                    </div>
                                </div>
                                <div className="py-4 flex">
                                    <img src={homeIcon} alt="" />
                                    <div className="ml-2 text-[#1B2559]">
                                        Templates
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="md:flex px-5 py-10">
                            <img src={avatarIcon} alt="" />
                            <div className="px-5 py-1 font-bold">Mick Mant</div>
                            <img src={logoutIcon} alt="" className="pl-5" />
                        </div>
                    </div>
                    <div className="flex-1 pl-[300px]">
                        <div className="md:flex py-10 px-5 font-bold cursor-pointer">
                            <div
                                className="px-10"
                                onClick={() => setCurrentPage("home")}
                            >
                                Chat UI
                            </div>
                            <div
                                className="px-10 underline cursor-pointer text-blue-900"
                                onClick={() => setCurrentPage("data")}
                            >
                                Explore Data
                            </div>
                            <div className="px-10">Suggestions</div>
                        </div>
                        <div className="">
                            <div className="xl:flex">
                                <div className="px-10 py-10 xl:px-5 xl:py-5 my-5 xl:my-0 rounded-xl bg-[#E3F5FF] mr-10 ">
                                    <div>New Fans</div>
                                    <div className="flex justify-between">
                                        <div className="text-2xl font-bold mr-10">
                                            7,265
                                        </div>
                                        <div className="flex text-xs ">
                                            <div>+11.02%</div>
                                            <svg
                                                width="17"
                                                height="16"
                                                viewBox="0 0 17 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M9.20488 5.60777L14.75 4L13.3698 9.6061L11.648 7.9532L8.87069 10.8463C8.77641 10.9445 8.64615 11 8.51 11C8.37385 11 8.24359 10.9445 8.14931 10.8463L6.11 8.72199L3.11069 11.8463C2.91946 12.0455 2.60294 12.0519 2.40373 11.8607C2.20453 11.6695 2.19807 11.3529 2.38931 11.1537L5.74931 7.65373C5.84359 7.55552 5.97385 7.5 6.11 7.5C6.24615 7.5 6.37641 7.55552 6.47069 7.65373L8.51 9.77801L10.9266 7.26067L9.20488 5.60777Z"
                                                    fill="#1C1C1C"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-10 py-10 xl:px-5 xl:py-5 my-5 xl:my-0 rounded-xl bg-[#E5ECF6] mr-10">
                                    <div>Engaged Fans</div>
                                    <div className="flex justify-between">
                                        <div className="text-2xl font-bold mr-10">
                                            3,671
                                        </div>
                                        <div className="flex text-xs ">
                                            <div>-0.03%</div>
                                            <svg
                                                width="17"
                                                height="16"
                                                viewBox="0 0 17 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M14.8463 3.63931C15.0455 3.83054 15.0519 4.14706 14.8607 4.34627L11.5007 7.84627C11.4064 7.94448 11.2761 8 11.14 8C11.0039 8 10.8736 7.94448 10.7793 7.84627L8.74 5.72199L6.32335 8.23933L8.04513 9.89223L2.5 11.5L3.88019 5.8939L5.60197 7.5468L8.37931 4.65373C8.47359 4.55552 8.60385 4.5 8.74 4.5C8.87615 4.5 9.00641 4.55552 9.10069 4.65373L11.14 6.77801L14.1393 3.65373C14.3305 3.45453 14.6471 3.44807 14.8463 3.63931Z"
                                                    fill="#1C1C1C"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-10 py-10 xl:px-5 xl:py-5 my-5 xl:my-0 rounded-xl bg-[#E3F5FF] mr-10">
                                    <div>Avidity</div>
                                    <div className="flex justify-between">
                                        <div className="text-2xl font-bold mr-10">
                                            156
                                        </div>
                                        <div className="flex text-xs ">
                                            <div>+15.03%</div>
                                            <svg
                                                width="17"
                                                height="16"
                                                viewBox="0 0 17 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M9.20488 5.60777L14.75 4L13.3698 9.6061L11.648 7.9532L8.87069 10.8463C8.77641 10.9445 8.64615 11 8.51 11C8.37385 11 8.24359 10.9445 8.14931 10.8463L6.11 8.72199L3.11069 11.8463C2.91946 12.0455 2.60294 12.0519 2.40373 11.8607C2.20453 11.6695 2.19807 11.3529 2.38931 11.1537L5.74931 7.65373C5.84359 7.55552 5.97385 7.5 6.11 7.5C6.24615 7.5 6.37641 7.55552 6.47069 7.65373L8.51 9.77801L10.9266 7.26067L9.20488 5.60777Z"
                                                    fill="#1C1C1C"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="px-10 py-10 xl:px-5 xl:py-5 my-5 xl:my-0 rounded-xl bg-[#E5ECF6] mr-10">
                                    <div>In Market</div>
                                    <div className="flex justify-between">
                                        <div className="text-2xl font-bold mr-10">
                                            2,318
                                        </div>
                                        <div className="flex text-xs ">
                                            <div>+6.08%</div>
                                            <svg
                                                width="17"
                                                height="16"
                                                viewBox="0 0 17 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    fill-rule="evenodd"
                                                    clip-rule="evenodd"
                                                    d="M9.20488 5.60777L14.75 4L13.3698 9.6061L11.648 7.9532L8.87069 10.8463C8.77641 10.9445 8.64615 11 8.51 11C8.37385 11 8.24359 10.9445 8.14931 10.8463L6.11 8.72199L3.11069 11.8463C2.91946 12.0455 2.60294 12.0519 2.40373 11.8607C2.20453 11.6695 2.19807 11.3529 2.38931 11.1537L5.74931 7.65373C5.84359 7.55552 5.97385 7.5 6.11 7.5C6.24615 7.5 6.37641 7.55552 6.47069 7.65373L8.51 9.77801L10.9266 7.26067L9.20488 5.60777Z"
                                                    fill="#1C1C1C"
                                                />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="xl:flex py-10 rounded-xl">
                                <div className=" my-5 xl:my-0 bg-[#F7F9FB] px-10 py-10 mr-10">
                                    <div className="font-bold">Total Fans</div>
                                    <img src={chartImage} alt="" />
                                </div>
                                <div className=" my-5 xl:my-0 px-10 py-10 bg-[#F7F9FB]">
                                    <img src={trafficImage} alt="" />
                                </div>
                            </div>
                            <div className="xl:flex">
                                <div className=" my-5 xl:my-0 bg-[#F7F9FB] px-2 py-10 mr-2">
                                    <div className="font-bold">
                                        Fan Engagement
                                    </div>
                                    <img src={barImage} alt="" className="" />
                                </div>
                                <div className="bg-[#F7F9FB] px-2 py-10 mr-2">
                                    <div className="font-bold">
                                        Fan By Location
                                    </div>
                                    <img src={pieImage} alt="" className="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
