import React, { useState, useEffect } from "react";

import logoImage from "/demo/logo.png";
import sideMenuImage from "/demo/sidemenu.png";
import userProfileImage from "/demo/userprofile.png";
import topNav1Image from "/demo/topnav1.png";
import topNav2Image from "/demo/topnav2.png";
import topNav3Image from "/demo/topnav3.png";
import searchBarImage from "/demo/searchbar.png";

import topGraph1Image from "/demo/topgraph1.png";
import topGraph2Image from "/demo/topgraph2.png";
import topGraph3Image from "/demo/topgraph3.png";
import topGraph4Image from "/demo/topgraph4.png";
import middleGraph1Image from "/demo/middlegraph1.png";
import middleGraph2Image from "/demo/middlegraph2.png";
import bottomGraph1Image from "/demo/bottomgraph1.png";
import bottomGraph2Image from "/demo/bottomgraph2.png";

interface PrototypeSkeletonProps {
    id: number;
    width: number;
    height: number;
    xOffset: number;
    yOffset: number;
}

const PrototypeSkeleton: React.FC<PrototypeSkeletonProps> = ({
    id,
    width,
    height,
    xOffset,
    yOffset,
}) => {
    const [visibleComponents, setVisibleComponents] = useState({
        logo: false,
        sideMenu: false,
        userProfile: false,
        topNav: false,
        topGraphs: false,
        middleGraphs: false,
        bottomGraphs: false,
        rightBar: false,
    });

    useEffect(() => {
        const randomDelays = {
            logo: Math.random() * 5000,
            sideMenu: Math.random() * 5000,
            userProfile: Math.random() * 5000,
            topNav: Math.random() * 5000,
            topGraphs: Math.random() * 5000,
            middleGraphs: Math.random() * 5000,
            bottomGraphs: Math.random() * 5000,
            rightBar: Math.random() * 5000,
        };

        Object.entries(randomDelays).forEach(([component, delay]) => {
            setTimeout(
                () =>
                    setVisibleComponents((prev) => ({
                        ...prev,
                        [component]: true,
                    })),
                delay
            );
        });
    }, []);

    const commonStyles: React.CSSProperties = {
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: "white",
        position: "absolute",
        left: `${xOffset}px`,
        top: `${yOffset}px`,
        display: "flex",
        flexDirection: "column",
    };

    const renderLeftPanel = () => (
        <div className="flex flex-col h-fit justify-between w-fit m-1">
            {visibleComponents.logo && (
                <div className="border-b border-gray-100 flex">
                    <img
                        src={logoImage}
                        className="w-16 h-auto my-1"
                        alt="Logo"
                    />
                </div>
            )}
            {visibleComponents.sideMenu && (
                <img
                    src={sideMenuImage}
                    className="h-auto w-20"
                    alt="Side Menu"
                />
            )}
            {visibleComponents.userProfile && (
                <div className="bottom-0 absolute flex flex-row gap-16 m-1">
                    <img
                        src={userProfileImage}
                        className="w-20"
                        alt="User Profile"
                    />
                    <img
                        src={searchBarImage}
                        className="w-60"
                        alt="Search Bar"
                    />
                </div>
            )}
        </div>
    );

    const renderTopNav = () =>
        visibleComponents.topNav && (
            <div className="flex flex-row">
                <img
                    src={topNav1Image}
                    alt="Top Navigation"
                    className="w-10 h-10"
                />
                <img
                    src={topNav2Image}
                    alt="Top Navigation"
                    className="w-10 h-10"
                />
                <img
                    src={topNav3Image}
                    alt="Top Navigation"
                    className="w-10 h-10"
                />
            </div>
        );

    const renderGraphs = () => (
        <div className="flex flex-col">
            <div className="flex flex-row">
                {visibleComponents.topNav && (
                    <img src={topGraph1Image} className="w-14" />
                )}
                {visibleComponents.logo && (
                    <img src={topGraph2Image} className="w-14" />
                )}
                {visibleComponents.userProfile && (
                    <img src={topGraph3Image} className="w-14" />
                )}
                {visibleComponents.topGraphs && (
                    <img src={topGraph4Image} className="w-14" />
                )}
            </div>
            <div className="flex flex-row gap-5">
                {visibleComponents.logo && (
                    <img src={middleGraph1Image} className="w-40" />
                )}
                {visibleComponents.topGraphs && (
                    <img src={middleGraph2Image} className="w-10" />
                )}
            </div>
            <div className="flex flex-row">
                {visibleComponents.rightBar && (
                    <img src={bottomGraph1Image} className="w-36" />
                )}
                {visibleComponents.topNav && (
                    <img src={bottomGraph2Image} className="w-24" />
                )}
            </div>
        </div>
    );

    if (id === 1) {
        return (
            <div style={commonStyles}>
                <div className="flex">
                    {renderLeftPanel()}
                    {renderTopNav()}
                </div>
            </div>
        );
    }

    if (id === 2) {
        return (
            <div style={commonStyles}>
                <div className="flex">
                    {renderLeftPanel()}
                    <div>
                        {renderTopNav()}
                        {renderGraphs()}
                    </div>
                </div>
            </div>
        );
    }
};

export default PrototypeSkeleton;
