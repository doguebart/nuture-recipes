import React from "react";
import Menu from "./components/layout/header";
import Router from "./routes/router";
import Footer from "./components/layout/footer";

import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <Menu />
      <Router />
      <Footer />
    </UserProvider>
  );
};

export default App;
