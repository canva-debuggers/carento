import React, { useContext, useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import CarCard from "./CarCard";
import { AccountContext } from "../context/AccountProvider";

function MyGarage() {
  const [carList, setCarList] = useState([]);
  const { user } = useContext(AccountContext);
  const { cars } = user || {};
  useEffect(() => {
    if (cars && cars.length > 0) {
    }
  }, [cars]);
  return (
    <>
      <h4 className="fw-bold opacity-25 fs-2">MyGarage</h4>
      <Row>
        {[1, 2, 3].map((item, index) => (
          <CarCard {...item} key={index} noBookButton={true} />
        ))}
      </Row>
    </>
  );
}

export default MyGarage;
