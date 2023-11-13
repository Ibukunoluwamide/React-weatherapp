import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import WeatherApp from "./components/WeatherApp";

function App() {
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      window.addEventListener("load", () => {
        navigator.serviceWorker
          .register("/sw.js")
          .then((registration) => {
            console.log("sw registered: ", registration);
          })
          .catch((registrationError) => {
            console.log("sw registration failled", registrationError);
          });
      });
    }
  }, []);
  return (
    <>
      <WeatherApp />
      <ToastContainer />
    </>
  );
}

export default App;
