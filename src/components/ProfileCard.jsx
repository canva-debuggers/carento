import React, { useContext } from "react";
import { BsStarFill } from "react-icons/bs";
import { AccountContext } from "../context/AccountProvider";
import { Button } from "react-bootstrap";
import RentMyCarModal from "./RentMyCarModal";
import default_profile from "../assets/default_profile.jpg";

function ProfileCard() {
  const { user } = useContext(AccountContext);
  console.log("user", user);
  return (
    <div
      className="bg-light  p-3 d-flex align-items-center flex-column"
      style={{
        borderRadius: "15px",
      }}
    >
      <img
        src={user?.photoURL ? user.photoURL : default_profile}
        alt=""
        className=" rounded-circle"
        style={{ height: "70px", width: "70px", objectFit: "cover" }}
      />
      <h3 className=" fs-6 text-center mt-3 fw-semibold">{user.name}</h3>
      <span className="fs-6 opacity-50 fw-semibold"> Rides : {user.rides}</span>
      <span className="fs-6 opacity-75">
        {Array.from({ length: user.ratings }).map((_, index) => (
          <BsStarFill />
        ))}
      </span>
      <Button variant="outline-dark" className="mt-3" size="sm">
        Rent My Car
      </Button>
      <RentMyCarModal show={true} />
    </div>
  );
}

export default ProfileCard;
