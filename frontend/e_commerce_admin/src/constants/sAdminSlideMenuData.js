import React from "react";

import * as AiIcons from "react-icons/ai";
import * as FaIcons from "react-icons/fa";
// import * as IoIcons from "react-icons/io";
import * as MdIcons from "react-icons/md";
import * as SiIcons from "react-icons/si";
import * as RiIcons from "react-icons/ri";

import { routesList } from "./routesList";

export const sAdminSlideMenuData = [{
        title: "Dashboard",
        path: routesList.S_ADMIN_DASHBOARD,
        icon: < MdIcons.MdDashboard / > ,
        cName: "nav-text",
    },
    {
        title: "Category",
        path: routesList.S_ADMIN_PRODUCT_CATEGORY,
        icon: < FaIcons.FaBars / > ,
        cName: "nav-text",
    },
    {
        title: "Subcategory",
        path: routesList.S_ADMIN_PRODUCT_SUBCATEGORY,
        icon: < AiIcons.AiOutlineBars / > ,
        cName: "nav-text",
    },
    {
        title: "Brand",
        path: routesList.S_ADMIN_PRODUCT_BRAND,
        icon: < SiIcons.SiBrandfolder / > ,
        cName: "nav-text",
    },
    {
        title: "Product",
        path: routesList.S_ADMIN_PRODUCT,
        icon: < SiIcons.SiProducthunt / > ,
        cName: "nav-text",
    },
    {
        title: "Slider Image",
        path: routesList.S_ADMIN_PRODUCT_SLIDER_IMAGE,
        icon: < RiIcons.RiSlideshow2Line / > ,
        cName: "nav-text",
    },
];
// eslint-disable-next-line no-lone-blocks
{
    /*


    {
        title: "Sub-Category",
        path: routesList.S_ADMIN_PRODUCT_CATEGORY,
        icon: < AiIcons.AiOutlineBars / > ,
        cName: "nav-text",
    },




*/
    /*        {
                                                                                                                                                            title: "Diet Chart",
                                                                                                                                                            path: routesList.S_ADMIN_DIET_CHART,
                                                                                                                                                            icon: < IoIcons.IoMdHelpCircle / > ,
                                                                                                                                                            cName: "nav-text",
                                                                                                                                                        },*/
    /*
                                                                                                                                                        

                                                                                              {
                                                                                                  title: "Exercise Routine",
                                                                                                  path: routesList.S_ADMIN_EXERCISE_ROUTINE,
                                                                                                  icon: < IoIcons.IoMdHelpCircle / > ,
                                                                                                  cName: "nav-text",
                                                                                              },
                                                                                                                                                        */
    /*
                                                                                                                                                       
                                                                                                                                                       
                                                                                                                                                       
                                                                                                                                                       */
    /*
                                                                                                                                                      
                                                                                                                                                      
                                                                                {
                                                                                    title: "Monthly Subscription",
                                                                                    path: routesList.S_ADMIN_MONTHLY_SUBSCRIPTION,
                                                                                    icon: < IoIcons.IoMdHelpCircle / > ,
                                                                                    cName: "nav-text",
                                                                                },
                                                                                                                                                      
                                                                                                                                                      
                                                                                                                                                      
                                                                                                                                                      */
    /*
                                                                                                                                                     
                                                                                                                                                     
                                                                              {
                                                                                  title: "Attendance",
                                                                                  path: routesList.S_ADMIN_ATTENDANCE,
                                                                                  icon: < IoIcons.IoMdHelpCircle / > ,
                                                                                  cName: "nav-text",
                                                                              },


                                                                                                                                                     */
    /*
                                                                                                                                                    

                                                                                                                                                    
                                                                            {
                                                                                title: "SMS",
                                                                                path: routesList.S_ADMIN_SMS,
                                                                                icon: < IoIcons.IoMdHelpCircle / > ,
                                                                                cName: "nav-text",
                                                                            },

                                                                                                                                                    
                                                                                                                                                    */
}