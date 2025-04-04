// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */
import { AuthProvider } from "./services/AuthContext";

// Import the main app component
import App from "./App";
import FighterDetails from "./components/FighterDetails";
import SignupForm from "./components/SignupForm";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Event from "./pages/Event";
import Fighters from "./pages/Fighters";
import Forbidden from "./pages/Forbidden";
import Homepage from "./pages/Homepage";
import News from "./pages/News";
import Odds from "./pages/Odds";
import Profile from "./pages/Profile";
import Rankings from "./pages/Rankings";
import RankingDetails from "./pages/RankingsDetails";
import Schedule from "./pages/Schedule";
import Videos from "./pages/Videos";
import { DarkThemeProvider } from "./services/DarkThemeContext";
import {
  getAuthorization,
  getAuthorizationForUser,
  getEvent,
  getFighterByName,
  getFightersBdd,
  getNews,
  getOdds,
  getRankings,
  getRankingsById,
  getSchedule,
  getUsers,
  getUsersById,
  getVideos,
} from "./services/request";

// Import additional components for new routes
// Try creating these components in the "pages" folder

// import About from "./pages/About";
// import Contact from "./pages/Contact";

/* ************************************************************************* */

// Create router configuration with routes
// You can add more routes as you build out your app!
const router = createBrowserRouter([
  {
    path: "/", // The root path
    element: <App />, // Renders the App component for the home page
    children: [
      {
        path: "/",
        element: <Homepage />,
        loader: async () => ({
          data: await getSchedule(),
          news: await getNews(),
          rankings: await getRankings(),
        }),
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
        loader: async () => ({
          authorization: await getAuthorization(),
          videos: await getVideos(),
          users: await getUsers(),
        }),
        errorElement: <Forbidden />,
      },

      {
        path: "/event/:eventid",
        element: <Event />,
        loader: ({ params }) => getEvent(Number(params.eventid)),
      },
      {
        path: "/fighters",
        element: <Fighters />,
        loader: getFightersBdd,
      },
      {
        path: "/fighterdetails/:fighterId",
        loader: ({ params }) => {
          if (!params.fighterId) {
            throw new Error("Fighter ID is required");
          }

          const [firstName, lastName] = params.fighterId.split("-");

          if (!firstName || !lastName) {
            throw new Error("Invalid fighter ID format");
          }

          return getFighterByName(firstName, lastName);
        },
        element: <FighterDetails />,
      },
      {
        path: "/news",
        element: <News />,
        loader: getNews,
      },
      {
        path: "/auth",
        element: <Auth />,
      },
      {
        path: "/signup",
        element: <SignupForm />,
      },
      {
        path: "/schedule",
        element: <Schedule />,
        loader: getSchedule,
      },
      {
        path: "/odds",
        element: <Odds />,
        loader: getOdds,
        errorElement: <Forbidden />,
      },
      {
        path: "/rankings",
        element: <Rankings />,
        loader: getRankings,
      },
      {
        path: "/rankings/:divisionid",
        element: <RankingDetails />,
        loader: ({ params }) => getRankingsById(String(params.divisionid)),
      },
      {
        path: "/videos",
        element: <Videos />,
        loader: async () => ({
          authorization: await getAuthorizationForUser(),
          videos: await getVideos(),
        }),
        errorElement: <Forbidden />,
      },
      {
        path: "/profil/:id",
        element: <Profile />,
        loader: async ({ params }) => {
          await getAuthorizationForUser();
          return getUsersById(Number(params.id));
        },
        errorElement: <Forbidden />, // Redirige si non autorisé
      },
    ],
  }, // Try adding a new route! For example, "/about" with an About component
]);

/* ************************************************************************* */

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <DarkThemeProvider>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </DarkThemeProvider>
  </StrictMode>,
);

/**
 * Helpful Notes:
 *
 * 1. Adding More Routes:
 *    To add more pages to your app, first create a new component (e.g., About.tsx).
 *    Then, import that component above like this:
 *
 *    import About from "./pages/About";
 *
 *    Add a new route to the router:
 *
 *      {
 *        path: "/about",
 *        element: <About />,  // Renders the About component
 *      }
 *
 * 2. Try Nested Routes:
 *    For more complex applications, you can nest routes. This lets you have sub-pages within a main page.
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#nested-routes
 *
 * 3. Experiment with Dynamic Routes:
 *    You can create routes that take parameters (e.g., /users/:id).
 *    Documentation: https://reactrouter.com/en/main/start/tutorial#url-params-in-loaders
 */
