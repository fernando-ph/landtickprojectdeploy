import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "./assets/css/Main.css";
import App from "./App";

import "bootstrap/dist/css/bootstrap.min.css";
import { UserContextProvider } from "./context/userContext";
import "./App.css";

import { BrowserRouter as Router } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";

const client = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={client}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
