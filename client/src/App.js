import { Routes, Route } from "react-router-dom";

import Navbar from "./component/Navbar";
import Home from "./pages/Home";
import MyTicket from "./pages/MyTicket";
import MyTicketApprove from "./pages/MyTiketApprove";
import Payment from "./pages/Payment";
import AdminListTransaction from "./pages/AdminListTransaction";
import AddTicket from "./pages/AddTicket";
import AddStation from "./pages/AddStation";
import AdminListTicket from "./pages/AdminListTicket";
import ListStations from "./pages/AdminListStation";

import { UserContext } from "./context/userContext";
import React, { useContext } from "react";

function App() {

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/admin-list-transaction" element={<AdminListTransaction />} />
        <Route path="/" element={<Home />} />
        <Route path="/my-ticket" element={<MyTicket />} />
        <Route path="/my-ticket-approve" element={<MyTicketApprove />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/admin-add-ticket" element={<AddTicket />} />
        <Route path="/admin-list-ticket" element={<AdminListTicket />} />
        <Route path="/admin-add-station" element={<AddStation />} />
        <Route path="/admin-list-station" element={<ListStations />} />
      </Routes>
    </div>
  );
}

export default App;
