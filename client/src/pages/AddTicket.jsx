import React, { useState, useEffect } from "react";
import Footer from "../component/Footer";
import { Form, Button } from "react-bootstrap";
import { API } from "../config/api";
import { useMutation } from "react-query";
import Swal from "sweetalert2";
import { useQuery } from "react-query";

export default function AddTicket() {
  const [form, setForm] = useState({
    train_name: "",
    train_class: "",
    departure_date: "",
    start_station_id: "",
    destination_station_id: "",
    start_time: "",
    arrival_time: "",
    price: "",
    qty: "",
  });
  console.log(form);

  let { data: stations } = useQuery("stationsCache", async () => {
    const response = await API.get("/stations");
    console.log(response);
    return response.data.data;
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = useMutation(async (e) => {
    try {
      e.preventDefault();
      const formData = new FormData();
      formData.set("train_name", form.train_name);
      formData.set("train_class", form.train_class);
      formData.set("departure_date", form.departure_date);
      formData.set("start_station_id", form.start_station_id);
      formData.set("destination_station_id", form.destination_station_id);
      formData.set("start_time", form.start_time);
      formData.set("arrival_time", form.arrival_time);
      formData.set("price", form.price);
      formData.set("qty", form.qty);

      const response = await API.post("/tickets", formData);
      if (response.status === 200) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "New ticket has been added!",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to add ticket",
        showConfirmButton: false,
        timer: 1500,
      });
      console.log(error);
    }
  });

  return (
    <>
      <div className="container mt-5">
        <h1 className="fw-bold">Add Ticket</h1>
        <Form
          className="mt-5"
          onSubmit={(e) => {
            handleSubmit.mutate(e);
          }}
        >
          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="train_name"
              placeholder="Nama Kereta"
              onChange={handleChange}
              value={form.train_name}
            />
          </Form.Group>

          <Form.Select
            className="mb-3"
            name="train_class"
            aria-label="Default select example"
            onChange={handleChange}
            value={form.train_class}
          >
            <option hidden>Jenis Kereta</option>
            <option value="Ekonomi">Ekonomi</option>
            <option value="Bisnis">Bisnis</option>
            <option value="Eksekutif">Eksekutif</option>
          </Form.Select>

          <Form.Group className="mb-3">
            <Form.Control
              type="date"
              name="departure_date"
              placeholder="Tanggal Keberangkatan"
              onChange={handleChange}
              value={form.departure_date}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="time"
              name="start_time"
              placeholder="Jam Keberangkatan"
              onChange={handleChange}
              value={form.start_time}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="time"
              name="arrival_time"
              placeholder="Jam Tiba"
              onChange={handleChange}
              value={form.arrival_time}
            />
          </Form.Group>

          <Form.Select className="mb-3"
            aria-label="Default select example"
            name="start_station_id"
            onChange={handleChange}
            value={form.start_station_id}
          >
            <option hidden>Start Station</option>
            {stations?.map((item) => (
              <option key={item.id} value={item?.id}>
                {item.name} {item.city}
              </option>
            ))}
          </Form.Select>

          <Form.Select className="mb-3"
            aria-label="Default select example"
            name="destination_station_id"
            onChange={handleChange}
            value={form.destination_station_id}
          >
            <option hidden>Tujuan Station</option>
            {stations?.map((item) => (
              <option key={item.id} value={item?.id}>
                {item?.name} {item?.city}
              </option>
            ))}
          </Form.Select>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="price"
              min={0}
              placeholder="Harga Tiket"
              onChange={handleChange}
              value={form.price}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Control
              type="text"
              name="qty"
              min={0}
              placeholder="Qty"
              onChange={handleChange}
              value={form.qty}
            />
          </Form.Group>

          <Button
            className="mt-5"
            variant="outline-light fw-bold"
            type="submit"
            style={{
              width: "535px",
              height: "50px",
              background: "#0ACF83",
              marginLeft: "282px",
            }}
          >
            Save
          </Button>
        </Form>
      </div>
      <Footer />
    </>
  );
}
