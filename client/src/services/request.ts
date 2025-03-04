import axios from "axios";

const KEY = import.meta.env.VITE_API_KEY;

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

export { getSchedule, getEvent };
