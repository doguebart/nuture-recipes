import React from "react";
import Menu from "./components/layout/header";
import Footer from "./components/layout/footer";

import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <Menu />
      <Footer />
    </UserProvider>
  );
};

export default App;
