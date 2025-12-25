export const getTotalUsers = async (access_token, gymId) => {
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "PureGym/1523 CFNetwork/1312 Darwin/21.0.0",
  };

  headers["Authorization"] = `Bearer ${access_token.token}`;

  const gymData = await fetch(`https://capi.puregym.com/api/v2/gymSessions/gym?gymId=${gymId}`, {
    cache: "no-store",
    headers,
  });
  console.log("🚀 ~ getTotalUsers ~ gymData:", gymData);

  const parsedGymData = await gymData.json();

  const result = parsedGymData.TotalPeopleInGym;

  console.log(result);

  return result;
};

export const login = async (username: string, password: string) => {
  const data = {
    grant_type: "password",
    username,
    password,
    scope: "pgcapi",
    client_id: "ro.client",
  };

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "PureGym/1523 CFNetwork/1312 Darwin/21.0.0",
    Authorization: "",
  };

  try {
    const loginToken = await fetch("https://auth.puregym.com/connect/token", {
      method: "POST",
      cache: "no-store",
      headers,
      body: new URLSearchParams(data).toString(),
    });
    const jsonResponse = await loginToken.json();

    return jsonResponse.access_token;
  } catch {
    return null;
  }
};
