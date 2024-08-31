import React from "react";
import SiteEngineerNavbar from "./siteEngineerNavbar";
import ProjectListForSite from "./ProjectListForSite";

function SiteEngineerHome(){
    return(
        <>
            <SiteEngineerNavbar />
            <ProjectListForSite />
        </>
    )
}

export default SiteEngineerHome;