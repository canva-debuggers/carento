import React from "react";
import { Button } from "react-bootstrap";
import { BsSpeedometer } from "react-icons/bs";
import { FaGasPump, FaLocationArrow } from "react-icons/fa";
import { PiSeat } from "react-icons/pi";

function CarCard() {
  return (
    <div className="pb-5 ">
      <img
        src="https://pngimg.com/uploads/bmw/bmw_PNG99550.png"
        alt=""
        className="w-100"
      />
      <h4 className="fw-bold opacity-75 fs-1">BMW X5</h4>
      <div className="d-flex align-items-center gap-4">
        <span className="fs-6 d-flex align-items-center justify-content-center gap-2 opacity-50">
          <FaGasPump />
          <p className="m-0">5KM/L</p>
        </span>
      </div>
      <div className="d-flex align-items-center gap-4">
        <span className="fs-6 d-flex align-items-center justify-content-center gap-2 fw-bold opacity-50">
          Rs 500/day
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
