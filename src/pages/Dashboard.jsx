import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaGasPump, FaLocationArrow } from "react-icons/fa";
import { FaRegCircleDot } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { Link } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import VisitedLocations from "../components/VisitedLocations";
import PopularNearByCars from "../components/PopularNearByCars";
import CategoryCard from "../components/CategoryCard";
import sedanImage from "../assets/sedan.png";
import suvImage from "../assets/suv.png";
import muvImage from "../assets/muv.png";
import hatchBachImage from "../assets/hatchback.png";
import CarCard from "../components/CarCard";
import { getDataFromCollection } from "../queries/queries";
import notFound from "../assets/notfound.png";

function Dashboard() {
  const [carList, setCarList] = useState([]);
  const [filteredCars, setFilteredCars] = useState(carList);

  useEffect(() => {
    getDataFromCollection("cars").then((data) => {
      setCarList(data);
      setFilteredCars(data);
    });
  }, []);
  return (
    <Container>
      <Row>
        <Col xs={12} md={4} className="p-4">
          <div
            className="d-flex flex-column  align-items-start justify-content-center bg-light p-4"
            style={{ borderRadius: "15px" }}
          >
            <div className="d-flex align-items-center justify-content-between w-100">
              <span> NEAREST CAR </span>
              <span className="fs-6 d-flex align-items-center justify-content-center gap-2">
                <FaRegCircleDot color="green" />
                <p className="m-0">Available</p>
              </span>
            </div>
            <img
              src="https://pngimg.com/uploads/bmw/bmw_PNG99550.png"
              className="img-fluid"
            />
            <h4 className="fw-bold opacity-50 fs-1">BMW X5</h4>
            <div className="d-flex align-items-center gap-4">
              <span className="fs-6 d-flex align-items-center justify-content-center gap-2">
                <FaGasPump />
                <p className="m-0">5KM/L</p>
              </span>
              <span className="fs-6 d-flex align-items-center justify-content-center gap-2">
                <FaLocationArrow />

                <p className="m-0">>500kms</p>
              </span>
            </div>
            <div className="d-flex align-items-center justify-content-between w-100 mt-3">
              <p className="m-0 fw-bold fs-5">Rs. 50000</p>
              <Button variant="dark" size="lg" className="ms-auto">
                Book Now
              </Button>
            </div>
          </div>

          {
            <div className="d-none d-md-block mt-4">
              <h4 className="fw-bold opacity-25 fs-2">Search By Categories</h4>
              <Row>
                {[
                  {
                    name: "HatchBack",
                    icon: hatchBachImage,
                  },
                  {
                    name: "Sedan",
                    icon: sedanImage,
                  },
                  {
                    name: "SUV",
                    icon: suvImage,
                  },
                  {
                    name: "MUV",
                    icon: muvImage,
                  },
                ].map((item, index) => (
                  <Col key={index} xs={3}>
                    <CategoryCard key={index} {...item} />
                  </Col>
                ))}
              </Row>
            </div>
          }
        </Col>
        <Col xs={6} md={3} className="p-4 d-flex gap-4 flex-column">
          <ProfileCard />
          <div className="d-none d-md-block" style={{ height: "300px" }}>
            <VisitedLocations />
          </div>
        </Col>
        <Col xs={6} md={4} className="p-4 d-block d-md-none">
          <VisitedLocations />
        </Col>
        <Col xs={12} md={5} className="p-4">
          <PopularNearByCars />
        </Col>
        <Col xs={12} className="p-4" className="d-block d-md-none">
          <h4 className="fw-bold opacity-25 fs-2">Search By Categories</h4>
          <Row>
            {[
              {
                name: "HatchBack",
                key: "hatchback",
                icon: hatchBachImage,
              },
              {
                name: "Sedan",
                key: "sedan",
                icon: sedanImage,
              },
              {
                name: "SUV",
                key: "suv",
                icon: suvImage,
              },
              {
                name: "MUV",
                key: "muv",
                icon: muvImage,
              },
            ].map((item, index) => (
              <Col key={index} xs={3}>
                <CategoryCard
                  key={index}
                  {...item}
                  onClick={() =>
                    setFilteredCars(
                      carList.filter((_item) => _item.type === item.key)
                    )
                  }
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col xs={12} className="p-4">
          <Row>
            {filteredCars && filteredCars.length > 0 ? (
              filteredCars.map((item, index) => (
                <Col xs={6} md={3} key={index}>
                  <CarCard {...item} key={index} />
                </Col>
              ))
            ) : (
              <div className="d-flex flex-column align-items-center justify-content-center">
                <img src={notFound} className="img-fluid" alt="" />
                No data found
              </div>
            )}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;
