import Home from "./components/layout/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import store from "./reduxStore/store";
import { persistor } from "./reduxStore/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./app.css";
import ProfilePage from "./components/profile/ProfilePage";

import { NextUIProvider } from "@nextui-org/react";
import EditProfile from "./components/profile/EditProfile";
import AboutPage from "./components/layout/AboutPage";
import HotelList from "./components/Hotel/HotelList";

// Error Boundary Component
const ErrorPage = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-red-500">
      <h1 className="text-3xl font-bold">Oops! Something went wrong.</h1>
      <p className="text-lg">The page you are looking for might not exist or an error occurred.</p>
      <a href="/" className="text-blue-500 mt-4 underline">Go Back Home</a>
    </div>
  );
};

const router = createBrowserRouter([
  { path: "/", element: <Home />, errorElement: <ErrorPage /> },
  { path: "/login", element: <Login />, errorElement: <ErrorPage /> },
  { path: "/signup", element: <Signup />, errorElement: <ErrorPage /> },
  { path: "/edit-profile", element: <EditProfile />, errorElement: <ErrorPage /> },
  { path: "/profile", element: <ProfilePage />, errorElement: <ErrorPage /> },
  { path: "/about", element: <AboutPage />, errorElement: <ErrorPage /> },
  { path: "/hotels", element: <HotelList />, errorElement: <ErrorPage /> },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <NextUIProvider>
          <RouterProvider router={router} />
          <ToastContainer position="bottom-right" autoClose={700} pauseOnHover />
        </NextUIProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
