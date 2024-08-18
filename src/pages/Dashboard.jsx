import React, { useEffect, useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { FaGasPump, FaLocationArrow } from "react-icons/fa";
import { FaRegCircleDot } from "react-icons/fa6";
import { IoIosNotifications } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import ProfileCard from "../components/ProfileCard";
import VisitedLocations from "../components/VisitedLocations";
import PopularNearByCars from "../components/PopularNearByCars";
import CategoryCard from "../components/CategoryCard";
import sedanImage from "../assets/sedan.png";
import suvImage from "../assets/suv.png";
import muvImage from "../assets/muv.png";
import hatchBachImage from "../assets/hatchback.png";
import CarCard from "../components/CarCard";
import { GeoPoint } from "firebase/firestore";
import {
  getDataFromCollection,
  getDataFromCollectionByGeo,
} from "../queries/queries";
import notFound from "../assets/notfound.png";
import { useGeolocated } from "react-geolocated";

function Dashboard() {
  const [carList, setCarList] = useState([]);
  const [filteredCars, setFilteredCars] = useState(carList);
  const [nearestCar, setNearestCar] = useState([]);
  const navigate = useNavigate();
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  useEffect(() => {
    if (isGeolocationAvailable && coords) {
      getDataFromCollectionByGeo(
        "cars",
        new GeoPoint(coords.latitude, coords.longitude)
      ).then((data) => {
        setNearestCar(data);
      });
    }
  }, [coords]);

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
          {nearestCar && nearestCar.length > 0 && (
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
              <img src={nearestCar[0]?.image} className="img-fluid" />
              <h4 className="fw-bold opacity-50 fs-1">
                {nearestCar[0]?.car_model}
              </h4>
              <div className="d-flex align-items-center gap-4">
                <span className="fs-6 d-flex align-items-center justify-content-center gap-2">
                  <FaGasPump />
                  <p className="m-0">{nearestCar[0]?.mileage} KM/L</p>
                </span>
                <span className="fs-6 d-flex align-items-center justify-content-center gap-2">
                  <FaLocationArrow />

                  <p className="m-0">> {nearestCar[0]?.km_driven} kms</p>
                </span>
              </div>
              <div className="d-flex align-items-center justify-content-between w-100 mt-3">
                <p className="m-0 fw-bold fs-5">Rs. {nearestCar[0]?.price}</p>
                <Button
                  variant="dark"
                  size="lg"
                  className="ms-auto"
                  onClick={() =>
                    navigate(`/dashboard/detail/${nearestCar[0]?.id}`)
                  }
                >
                  Book Now
                </Button>
              </div>
            </div>
          )}

          {
            <div className="d-none d-md-block mt-4">
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
