import React from "react";
import { Button } from "react-bootstrap";
import { BsStarFill } from "react-icons/bs";
import RentMyCarModal from "./RentMyCarModal";

function ProfileCard() {
  return (
    <div
      className="bg-light  p-3 d-flex align-items-center flex-column"
      style={{
        borderRadius: "15px",
      }}
    >
      <img
        src="https://i.pinimg.com/236x/8b/84/6f/8b846fefdc265bc26e7480e7ddc01225.jpg"
        alt=""
        className=" rounded-circle"
        style={{ height: "70px", width: "70px", objectFit: "cover" }}
      />
      <h3 className=" fs-6 text-center mt-3 fw-semibold">Aritra Kr. Basu</h3>
      <span className="fs-6 opacity-50 fw-semibold"> Rides : 5</span>
      <span className="fs-6 opacity-75">
        <BsStarFill />
        <BsStarFill />
        <BsStarFill />
        <BsStarFill />
        <BsStarFill />
      </span>
      <Button variant="outline-dark" className="mt-3" size="sm">
        Rent My Car
      </Button>
      <RentMyCarModal show={false} />
    </div>
  );
}

export default ProfileCard;
