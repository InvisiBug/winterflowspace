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

    console.log(jsonResponse);

    headers.Authorization = `Bearer ${jsonResponse.access_token}`;

    return headers;
  } catch {
    return null;
  }
};
