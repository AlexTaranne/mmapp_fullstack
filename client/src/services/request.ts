import axios from "axios";
import { Zoom, toast } from "react-toastify";

const KEY = import.meta.env.VITE_API_KEY;
const KEY_2 = import.meta.env.VITE_API_KEY_2;
const API = import.meta.env.VITE_API_URL;

interface UserData {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface FighterType {
  lastName: string;
  firstName: string;
  nationality: string;
  photo: string;
  category_id: number;
  wins: number;
  losses: number;
  nickname: string;
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

const getVideos = () => {
  return axios
    .get("http://localhost:3310/api/fights", { withCredentials: true })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error);
      return [];
    });
};

const formatName = (name: string) => {
  return name.trim().toLowerCase().replaceAll(" ", "-");
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
  return axios
    .post(`${API}/api/users`, userData)
    .then((response) => {
      if (response.status === 201) {
        toast.success("Your account has been created.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Zoom,
        });
        return true;
      }
      toast.error(`${response.data.error}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      });
      return false;
    })
    .catch(() => {
      toast.error("An error occurred while creating the account.", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Zoom,
      });
      return false;
    });
};

const getOdds = () => {
  return axios
    .get(
      `https://api.the-odds-api.com/v4/sports/mma_mixed_martial_arts/odds/?apiKey=${KEY_2}&regions=us&markets=h2h`,
    )
    .then((response) => response.data);
};

const editFighter = async (id: number, updatedFighter: FighterType) => {
  try {
    const response = await axios.put(
      `${API}/api/fighter/${id}`,
      updatedFighter,
    );
    return response;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du film :", error);
    throw error;
  }
};

const getRankingsById = (divisionId: string) => {
  return axios
    .get(`https://api.octagon-api.com/division/${divisionId}`)
    .then((response) => response.data);
};

const getUsers = () => {
  return axios
    .get(`${API}/api/users`, { withCredentials: true })
    .then((response) => response.data);
};

const getUsersById = (id: number) => {
  return axios
    .get(`http://localhost:3310/api/users/${id}`, { withCredentials: true })
    .then((response) => response.data);
};

const getAuthorization = () => {
  return axios
    .get("http://localhost:3310/api/checkAdmin", {
      withCredentials: true,
    })
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });
};

const getAuthorizationForUser = () => {
  return axios
    .get("http://localhost:3310/api/checkAdminOrUser", {
      withCredentials: true,
    })
    .then((response) => response)
    .catch((error) => {
      throw new Error(error);
    });
};

export {
  createUser,
  editFighter,
  getAuthorization,
  getAuthorizationForUser,
  getSchedule,
  getEvent,
  getNews,
  getRankings,
  getRankingsById,
  getVideos,
  getFightersBdd,
  getFighterByName,
  getOdds,
  getUsersById,
  getUsers,
};
