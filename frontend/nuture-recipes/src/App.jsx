import React from "react";
import Menu from "./components/layout/header";

import { UserProvider } from "./context/UserContext";

const App = () => {
  return (
    <UserProvider>
      <Menu />
    </UserProvider>
  );
};

export default App;
