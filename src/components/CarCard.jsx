import React from "react";
import { Button } from "react-bootstrap";
import { BsSpeedometer } from "react-icons/bs";
import { FaGasPump, FaLocationArrow } from "react-icons/fa";
import { PiSeat } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

function CarCard({ car_model, mileage, price, id, image }) {
  const navigate = useNavigate();
  return (
    <div className="pb-5 " onClick={() => navigate("/details" + id)}>
      <img src={image} alt="" className="w-100" />
      <h4 className="fw-bold opacity-75 fs-1">{car_model}</h4>
      <div className="d-flex align-items-center gap-4">
        <span className="fs-6 d-flex align-items-center justify-content-center gap-2 opacity-50">
          <FaGasPump />
          <p className="m-0">{mileage}KM/L</p>
        </span>
      </div>
      <div className="d-flex align-items-center gap-4">
        <span
          className=" d-flex align-items-center justify-content-center gap-2 fw-bold opacity-50"
          style={{
            fontSize: "12px",
          }}
        >
          Rs {price}/day
        </span>
        <span className="fs-6 d-flex align-items-center justify-content-center gap-2 opacity-50">
          <BsSpeedometer />
          <PiSeat />
        </span>
      </div>
      <div className="d-flex align-items-center justify-content-center mt-3">
        <Button variant="outline-dark">Book Now</Button>
      </div>
    </div>
  );
}

export default CarCard;
