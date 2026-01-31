import { FC, useState, useEffect, useCallback } from "react";
import Cookies from "js-cookie";
import LandingPage from "@/lib/ui/LandingPage";
import { getAllGyms, getTotalUsers } from "@/lib/api";
import Layout from "@/lib/layout";
import Switcher from "@/lib/ui/switcher";
import { getSchedule } from "@/lib/api";

const StudioFree: FC = () => {
  const [availableGyms, setAvailableGyms] = useState(null);
  const [usersGym, setUsersGym] = useState(null);
  const [schedule, setSchedule] = useState(null);
  const [totalOccupants, setTotalOccupants] = useState(undefined);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGyms = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      //? Get all gyms
      const gyms = await getAllGyms();
      setAvailableGyms(gyms);

      //? Get users gym from cookies and save to state if it exists
      const usersGymCookie = Cookies.get("userGym");
      const accessTokenCookie = Cookies.get("accessToken");

      if (usersGymCookie) {
        const selectedGym = usersGymCookie ? JSON.parse(decodeURIComponent(usersGymCookie)) : null;
        setUsersGym(selectedGym);

        //? Get the schedule for the user's gym
        const classSchedule = await getSchedule(selectedGym); //* raw at this point
        setSchedule(classSchedule);

        if (accessTokenCookie) {
          const token = accessTokenCookie ? JSON.parse(decodeURIComponent(accessTokenCookie)).token : undefined;

          setTotalOccupants(await getTotalUsers(token, selectedGym.id));
        }
      }

      //
    } catch (err) {
      console.error("Failed to fetch gyms:", err);
      setError(err instanceof Error ? err.message : "Failed to fetch gyms");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGyms();
  }, [fetchGyms]);

  if (loading) {
    return (
      <Layout>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            color: "white",
          }}
        >
          Loading gyms...
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
            color: "white",
          }}
        >
          <p>Error loading gyms. Please try again.</p>
          <button
            onClick={fetchGyms}
            style={{
              padding: "10px 20px",
              marginTop: "10px",
              background: "#3b82f6",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Retry
          </button>
        </div>
      </Layout>
    );
  }

  if (!usersGym) {
    return <LandingPage availableGyms={availableGyms} />;
  }
  return (
    <Layout>
      <Switcher data={schedule} availableGyms={availableGyms} peopleInGym={totalOccupants} />
    </Layout>
  );
};

export default StudioFree;
