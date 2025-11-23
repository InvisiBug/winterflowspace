export const getTotalUsers = async (username, password, gymId) => {
  const data = {
    grant_type: "password",
    username: username,
    password: password,
    scope: "pgcapi",
    client_id: "ro.client",
  };

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    "User-Agent": "PureGym/1523 CFNetwork/1312 Darwin/21.0.0",
    Authorization: "",
  };

  const loginToken = await fetch("https://auth.puregym.com/connect/token", {
    method: "POST",
    cache: "no-store",
    headers,
    body: new URLSearchParams(data).toString(),
  });
  const jsonResponse = await loginToken.json();

  headers.Authorization = `Bearer ${jsonResponse.access_token}`;

  // console.log(headers);

  const gymData = await fetch(`https://capi.puregym.com/api/v2/gymSessions/gym?gymId=${gymId}`, {
    cache: "no-store",
    headers,
  });

  const parsedGymData = await gymData.json();

  const result = parsedGymData.TotalPeopleInGym;

  console.log(result);

  return result;
};
