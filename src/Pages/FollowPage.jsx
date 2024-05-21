import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import "../components/App.css";
import Sidebar from "../components/Navbars/Sidebar";
import MobileNavbar from "../components/Navbars/MobileNavbar";
import Searchbar from "../components/Searchbar/Searchbar";
import SidePanel from "../components/SidePanel/SidePanel";
import Header from "../components/Header/Header";
import Section from "../components/Section/Section";

export default function FollowPage(props) {

    const isDesktop = useMediaQuery({ query: "(min-width: 1000px)" });
    const isTablet = useMediaQuery({ query: "(min-width: 600px)" });
    const isMobile = useMediaQuery({ query: "(max-width: 599px)" });

    const { path } = useParams();
    const sections = ["Followers", "Following"];
    let requestId = (path==="followers") ? 0 : 1;
    /* (props.requestId == 0) -> followers
    (props.requestId == 1) -> following
    */

    return (
        <div className="d-flex main-container" id="followPage">

            <div className="d-inline-flex">
                {(isTablet || isDesktop) && <Sidebar user={props.user} />}
            </div>

            <div className="d-inline-flex flex-column feed">
                {(isTablet || isDesktop) && <Header heading={props.user.name} subHeading={props.user.username} style={{ height: "72px", position: "relative" }} />}
                <Section sections={sections} user={props.user} activeIndex={requestId} />

                <div style={{ borderBottom: ".9px solid rgb(211, 211, 211, 0.3)", borderRight: ".9px solid rgb(211, 211, 211, 0.3)", paddingTop: "8px" }}>
                    <SidePanel path={path} requestId={requestId} user={props.user} heading=" " followPage={true} style={{ backgroundColor: "white", borderRadius: "0", boxShadow: "none" }} />
                </div>

                {isMobile && <MobileNavbar user={props.user} />}
            </div>

            <div className={"d-inline-flex flex-column side-panel-container"}>

                {isDesktop && <div className="sticky-top">
                    <Searchbar style={{ width: "100%" }} />
                    <SidePanel user={props.user} />
                </div>}

            </div>

        </div>
    )
}
