import React from "react";
import { BsStarFill } from "react-icons/bs";

function ProfileCard() {
  return (
    <div className="bg-light rounded p-3 d-flex align-items-center flex-column">
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
    </div>
  );
}

export default ProfileCard;
