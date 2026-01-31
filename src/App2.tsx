// "use client";
// import React, { FC } from "react";
// import Cookies from "js-cookie"
// import Switcher from "@/lib/ui/switcher";
// import LandingPage from "@/lib/ui/LandingPage";
// import { getTotalUsers, getAllGyms, getSchedule } from "@/lib/api";
// import Layout from "./layout";

const StudioFree = () => {
  // const cookieStore = await cookies();

  // //* Get the user's gym from cookies
  // const usersGymCookie = Cookies.get("userGym");
  // const usersGym = usersGymCookie ? JSON.parse(decodeURIComponent(usersGymCookie.value)) : null;

  // //* Get login token from cookies
  // const accessTokenCookie = cookieStore.get("accessToken");
  // const token = accessTokenCookie ? JSON.parse(decodeURIComponent(accessTokenCookie.value)).token : null;

  // const availableGyms = await getAllGyms();

  // // If no gym is selected, show the landing page
  // if (!usersGymCookie) {
  //   return <LandingPage availableGyms={availableGyms} />;
  // }

  // const schedule = await getSchedule(usersGym);

  // let totalUsers = undefined;

  // if (accessTokenCookie) {
  //   totalUsers = (await getTotalUsers(token, usersGym.id)) || 0;
  // }

  // return (
  //   <Layout>
  //     <Switcher data={schedule} availableGyms={availableGyms} peopleInGym={totalUsers} />
  //   </Layout>
  // );
  return <h1>Studio Free Coming Soon!</h1>;
};

export default StudioFree;
