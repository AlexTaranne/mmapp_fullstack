import axios from "axios";

const KEY = import.meta.env.VITE_API_KEY;
const API = import.meta.env.VITE_API_URL;

interface UserData {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const getSchedule = () => {
  return axios
    .get(
      `https://api.sportsdata.io/v3/mma/scores/json/Schedule/UFC/2025?key=${KEY}`,
    )
    .then((response) => response.data);
};

const getEvent = (eventId: number) => {
  return axios
    .get(
      `https://api.sportsdata.io/v3/mma/scores/json/Event/${eventId}?key=${KEY}`,
    )
    .then((response) => response.data.Fights);
};

const getNews = () => {
  return axios
    .get(
      "https://newsdata.io/api/1/news?apikey=pub_67074e5cefb9723c0dafd0cbffcc8e10729d3&q=UFC%FIGHT&country=us&language=en&category=sports",
    )
    .then((response) => response.data.results);
};

const getRankings = () => {
  return axios
    .get("https://api.octagon-api.com/rankings")
    .then((response) => response.data);
};

const getFightersBdd = () => {
  return axios
    .get("http://localhost:3310/api/fighter")
    .then((response) => response.data);
};

const formatName = (name: string) => {
  return name.trim().toLowerCase().replace(/\s+/g, "-");
};

const getFighterByName = async (firstName: string, lastName: string) => {
  const formattedFirstName = formatName(firstName);
  const formattedLastName = formatName(lastName);

  try {
    const response = await axios.get(
      `https://api.octagon-api.com/fighter/${formattedFirstName}-${formattedLastName}`,
    );

    if (response.data) {
      return { ...response.data, source: "API externe" };
    }
  } catch (error) {
    console.error(
      `Fighter ${firstName} ${lastName} not found in external API.`,
    );
  }

  try {
    const localResponse = await axios.get(
      `http://localhost:3310/api/fighter/${formattedFirstName}-${formattedLastName}`,
    );

    if (localResponse.data) {
      return { ...localResponse.data, source: "API locale" };
    }
  } catch (localError) {
    console.error("Error fetching from local API:", localError);
    return null;
  }
};

const createUser = (userData: UserData): Promise<boolean> => {
  return axios.post(`${API}/api/users`, userData).then((response) => {
    if (response.status === 201) {
      return true;
    }
    response.data.error;
    return false;
  });
};

export {
  createUser,
  getSchedule,
  getEvent,
  getNews,
  getRankings,
  getFightersBdd,
  getFighterByName,
};
