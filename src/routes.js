/*!

=========================================================
* Black Dashboard PRO React - v1.1.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import Dashboard from "views/Dashboard.js";
import Pricing from "views/pages/Pricing.js";
import Register from "views/pages/Register.js";
import Timeline from "views/pages/Timeline.js";
import User from "views/pages/User.js";
import Login from "views/pages/Login.js";
import Rtl from "views/pages/Rtl.js";
import Lock from "views/pages/Lock.js";
import TypingPractice from "./views/Typing";
import Profile from "./views/Profile";

const routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-chart-pie-36",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/typing",
    name: "Typing Practice",
    rtlName: "لوحة القيادة",
    icon: "tim-icons icon-laptop",
    component: TypingPractice,
    layout: "/admin",
  },
  {
    path: "/profile",
    name: "My Profile",
    icon: "tim-icons icon-single-02",
    component: Profile,
    layout: "/admin",
  },
  {
    collapse: true,
    name: "Typing Practice",
    icon: "tim-icons icon-image-02",
    state: "pagesCollapse",
    views: [
      {
        path: "/pricing",
        name: "Pricing",
        mini: "P",
        rtlMini: "ع",
        component: Pricing,
        layout: "/auth",
      },
      {
        path: "/rtl-support",
        name: "RTL Support",
        mini: "RS",
        component: Rtl,
        layout: "/rtl",
      },
      {
        path: "/timeline",
        name: "Timeline",
        mini: "T",
        component: Timeline,
        layout: "/admin",
      },
      {
        path: "/login",
        name: "Login",
        mini: "L",
        component: Login,
        layout: "/auth",
      },
      {
        path: "/register",
        name: "Register",
        mini: "R",
        component: Register,
        layout: "/auth",
      },
      {
        path: "/lock-screen",
        name: "Lock Screen",
        mini: "LS",
        component: Lock,
        layout: "/auth",
      },
      {
        path: "/user-profile",
        name: "User Profile",
        mini: "UP",
        component: User,
        layout: "/admin",
      },
    ],
  },
];

export default routes;
