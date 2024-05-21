import React from "react";
import { useMediaQuery } from "react-responsive";
import "../components/App.css";

import Header from "../components/Header/Header";
import Sidebar from "../components/Navbars/Sidebar";
import MobileNavbar from "../components/Navbars/MobileNavbar";
import Searchbar from "../components/Searchbar/Searchbar";
import SidePanel from "../components/SidePanel/SidePanel";
import Section from "../components/Section/Section.jsx";
import Trending from "../components/Trending/Trending.jsx";

export default function Explore(props){

    const isDesktop = useMediaQuery({ query: "(min-width: 1000px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 600px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 599px)" });

    let sections = ["For you", "Trending", "News", "Sports"]

    return (
        <div className="d-flex main-container">
            
            <div className="d-inline-flex">
                {(isTablet || isDesktop) && <Sidebar user={props.user} />}
            </div>

            <div className="d-inline-flex flex-column feed">
                {/* <Header heading="Explore" subHeading="" /> */}
                <div className="d-flex justify-content-center align-items-center w-100">
                    <Searchbar style={{ width: "96%" }} />
                </div>

                {!isMobile && <Section sections={sections} activeIndex={0} />}
                {!isMobile && <Trending />}
                {isMobile && <Section sections={["Who to follow"]} activeIndex={0} />}
                {isMobile && <SidePanel classNames="mt-2" user={props.user} requestId={0} heading=" " style={{ backgroundColor: "white", borderRadius: "0", boxShadow: "none" }} />}

                {/* <Tweet /> */}
                {isMobile && <MobileNavbar user={props.user} />}
            </div>

            <div className={"d-inline-flex flex-column side-panel-container"}>

                {isDesktop && <div className="sticky-top">
                    <SidePanel classNames="mt-2" user={props.user} />
                </div>} 

            </div>

        </div>
    );
}
