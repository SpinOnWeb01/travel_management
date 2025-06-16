import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@radix-ui/themes/styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Theme } from "@radix-ui/themes";
import { AuthProvider } from "./auth/AuthContext";
import { Provider } from "react-redux";
import store from "./redux/store";

export const ThemeContext = React.createContext();

function RootApp() {
  const [appearance, setAppearance] = useState("light"); // default to dark

  return (
    <ThemeContext.Provider value={{ appearance, setAppearance }}>
      <Theme appearance={appearance} accentColor="crimson" grayColor="sand" radius="large" scaling="100%">
        <App />
      </Theme>
    </ThemeContext.Provider>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <RootApp />
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
