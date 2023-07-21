import React, { useState, useContext, useEffect } from "react";
import Table from "react-bootstrap/Table";
import Footer from "../component/Footer";
import ModalDetailTicket from "../component/ModalDetailTicket";
import { useQuery, useMutation } from "react-query";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import { useNavigate } from "react-router-dom";
import DeleteData from "../component/ModalDeleteTransaction";
import Swal from "sweetalert2";

export default function AdminListStation() {
  const navigate = useNavigate();
  const [state] = useContext(UserContext);
  const [showTicket, setShowTicket] = useState(null);
  // UseState for delete Station data
  const [idDelete, setIdDelete] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);
  // Modal for Confirm delete data
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // To get station id & show modal to confirm delete data
  const handleDelete = (id) => {
    setIdDelete(id);
    handleShow();
  };

  const handleShowTicket = () => setShowTicket(true);
  const handleCloseTicket = () => setShowTicket(false);

  let { data: stationList, refetch } = useQuery("stationsCache", async () => {
    const response = await API.get("/stations");
    return response.data.data;
  });
  console.log(stationList);

  // If confirm is true, execute delete data
  const deleteById = useMutation(async (id) => {
    try {
      const response = await API.delete(`/stations/${id}`);
      console.log(response);
      refetch();
      navigate("/");
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Delete Successful",
        showConfirmButton: false,
        timer: 1000,
      });
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Delete Failed",
        showConfirmButton: false,
        timer: 1000,
      });
      console.log(error);
    }
  });

  useEffect(() => {
    if (confirmDelete) {
      // Close modal confirm delete data
      handleClose();
      // execute delete data by id function
      deleteById.mutate(idDelete);
      setConfirmDelete(null);
      // window.location.reload();
    }
  }, [confirmDelete]);

  return (
    <>
      <div className="container mt-5">
        <h1>List Stations</h1>
        <div className="mt-5">
          <Table striped className="m-auto w-100" style={{ border: "none", width: "100%" }}>
            <thead className="">
              <tr>
                <th>No</th>
                <th>Station City</th>
                <th>Station Name</th>
              </tr>
            </thead>
            <tbody>
              {stationList?.map((station, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{station.name}</td>
                    <td>{station.city}</td>
                    <td className="">
                      <div className="d-flex">
                        <div>
                          <img onClick={handleShowTicket} src="/images/IconSearch.png" alt="" className="" style={{ cursor: "pointer" }} />
                        </div>
                        <div>
                          <img onClick={() => handleDelete(station?.id)} src="/images/IconTrash.png" alt="" className="ms-5" style={{ cursor: "pointer" }} />
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
      <Footer />
      <DeleteData setConfirmDelete={setConfirmDelete} show={show} handleClose={handleClose} />
    </>
  );
}
