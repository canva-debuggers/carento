import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import MapContainer from "../components/MapContainer";
import { FaArrowLeft, FaGasPump, FaLocationArrow } from "react-icons/fa";
import { Sheet } from "react-modal-sheet";
import { PiSeat } from "react-icons/pi";
import { BsSpeedometer } from "react-icons/bs";
import { BiCross } from "react-icons/bi";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { getDataFromCollection } from "../queries/queries";
import { useGeolocated } from "react-geolocated";

function Details() {
  const [carDetails, setCarDetails] = useState({});
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });

  const [isOpen, setOpen] = useState(true);
  const ref = useRef();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    if (id) {
      getDataFromCollection("cars", id).then((data) => {
        setCarDetails(data);
      });
    }
  }, [id]);

  const { car_model, mileage, price, image, km_driven, features, location } =
    carDetails || {};

  useEffect(() => {
    if (!isOpen) {
      ref.current?.snapTo(1);
    }
  }, []);

  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords && location ? (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Col xs={12} md={6} className="map-container">
          <MapContainer
            center={{
              lat: location?._lat,
              lng: location?._long,
            }}
            navigateFrom={{
              lat: coords?.latitude,
              lng: coords?.longitude,
            }}
          />
          <div
            className="d-block d-md-none position-absolute top-0 w-100 p-3"
            style={{
              background:
                "linear-gradient(to bottom, white 40%, rgba(255, 255, 255, 0))",
            }}
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft fontSize={"20px"} />
          </div>
        </Col>
        <Col
          xs={12}
          md={6}
          style={{
            height: "100vh",
          }}
        >
          {isMobile ? (
            <Sheet
              ref={ref}
              isOpen={isOpen}
              onClose={() => ref.current?.snapTo(1)}
              snapPoints={[800, 400, 0]}
              initialSnap={1}
            >
              <Sheet.Container
                className="bg-dark"
                style={{
                  borderTopLeftRadius: "50px",
                  borderTopRightRadius: "50px",
                }}
              >
                <Sheet.Header />
                <Sheet.Content>
                  <div
                    style={{
                      paddingLeft: "25px",
                      paddingRight: "25px",
                      paddingBottom: "40px",
                    }}
                  >
                    <h4 className="fw-bold opacity-50 fs-1 text-white ">
                      {car_model}
                    </h4>
                    <div className="d-flex align-items-center gap-4  text-white opacity-25">
                      <span className="fs-6 d-flex align-items-center justify-content-center gap-2 ">
                        <FaGasPump />
                        <p className="m-0">{mileage} KM/L</p>
                      </span>
                      <span className="fs-6 d-flex align-items-center justify-content-center gap-2 ">
                        <FaLocationArrow />

                        <p className="m-0">>{km_driven} kms</p>
                      </span>
                    </div>
                  </div>

                  <div
                    className="bg-light"
                    style={{
                      borderTopLeftRadius: "50px",
                      borderTopRightRadius: "50px",
                      paddingLeft: "25px",
                      paddingRight: "25px",
                      height: "100%",
                    }}
                  >
                    <img
                      src={image}
                      className="img-fluid"
                      style={{
                        marginTop: "-40px",
                      }}
                    />
                    <p className="fw-bold fs-5 ">Features</p>
                    <Row className="g-2">
                      {features &&
                        features.map((item, index) => (
                          <Col xs={6} md={6} key={index} className="p-2">
                            <div className="border border-1 p-3  d-flex align-items-center justify-content-center gap-2 flex-column">
                              {item?.icon}
                              <p className="m-0">{item.name}</p>
                              <p className="m-0">{item.value}</p>
                            </div>
                          </Col>
                        ))}
                    </Row>

                    <div className="d-flex align-items-center justify-content-between w-100 mt-3">
                      <p className="m-0 fw-bold fs-4">
                        Rs. {price}{" "}
                        <span
                          style={{
                            fontSize: "12px",
                          }}
                        >
                          / day
                        </span>
                      </p>
                    </div>
                    <div className="d-flex align-items-center justify-content-center w-100 mt-3">
                      <ButtonGroup>
                        <Button variant="outline-dark" size="lg">
                          Rent Car
                        </Button>
                        <Button variant="dark" size="md">
                          Rent with chauffeur
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                </Sheet.Content>
              </Sheet.Container>
              {/* <Sheet.Backdrop /> */}
            </Sheet>
          ) : (
            <div className="container-fluid bg-dark pt-4">
              <div
                style={{
                  paddingLeft: "25px",
                  paddingRight: "25px",
                  paddingBottom: "40px",
                }}
              >
                <h4 className="fw-bold opacity-50 fs-1 text-white ">BMW X5</h4>
                <div className="d-flex align-items-center gap-4  text-white opacity-25">
                  <span className="fs-6 d-flex align-items-center justify-content-center gap-2 ">
                    <FaGasPump />
                    <p className="m-0">5KM/L</p>
                  </span>
                  <span className="fs-6 d-flex align-items-center justify-content-center gap-2 ">
                    <FaLocationArrow />

                    <p className="m-0">>500kms</p>
                  </span>
                </div>
              </div>

              <div
                className="bg-light"
                style={{
                  borderTopLeftRadius: "50px",
                  borderTopRightRadius: "50px",
                  paddingLeft: "25px",
                  paddingRight: "25px",
                  height: "100%",
                }}
              >
                <div className="d-flex justify-content-end">
                  <img
                    src="https://pngimg.com/uploads/bmw/bmw_PNG99550.png"
                    className="img-fluid w-75"
                    style={{
                      marginTop: "-60px",
                    }}
                  />
                </div>
                <p className="fw-bold fs-5 ">Features</p>
                <Row className="g-2">
                  {[
                    {
                      icon: <FaGasPump size={40} />,
                      text: "Disel",
                      subText: "Common Rail Fuel Injection",
                    },
                    {
                      icon: <BsSpeedometer size={40} />,
                      text: "Acceleration",
                      subText: "0 - 100km / 11s",
                    },
                    {
                      icon: <PiSeat size={40} />,
                      text: "Cool Seat",
                      subText: "Temp Control on seat",
                    },
                    {
                      icon: <FaGasPump size={40} />,
                      text: "Disel",
                      subText: "Common Rail Fuel Injection",
                    },
                    {
                      icon: <BsSpeedometer size={40} />,
                      text: "Acceleration",
                      subText: "0 - 100km / 11s",
                    },
                    {
                      icon: <PiSeat size={40} />,
                      text: "Cool Seat",
                      subText: "Temp Control on seat",
                    },
                    {
                      icon: <FaGasPump size={40} />,
                      text: "Disel",
                      subText: "Common Rail Fuel Injection",
                    },
                    {
                      icon: <BsSpeedometer size={40} />,
                      text: "Acceleration",
                      subText: "0 - 100km / 11s",
                    },
                    {
                      icon: <PiSeat size={40} />,
                      text: "Cool Seat",
                      subText: "Temp Control on seat",
                    },
                    {
                      icon: <FaGasPump size={40} />,
                      text: "Disel",
                      subText: "Common Rail Fuel Injection",
                    },
                    {
                      icon: <BsSpeedometer size={40} />,
                      text: "Acceleration",
                      subText: "0 - 100km / 11s",
                    },
                    {
                      icon: <PiSeat size={40} />,
                      text: "Cool Seat",
                      subText: "Temp Control on seat",
                    },
                    {
                      icon: <FaGasPump size={40} />,
                      text: "Disel",
                      subText: "Common Rail Fuel Injection",
                    },
                    {
                      icon: <BsSpeedometer size={40} />,
                      text: "Acceleration",
                      subText: "0 - 100km / 11s",
                    },
                    {
                      icon: <PiSeat size={40} />,
                      text: "Cool Seat",
                      subText: "Temp Control on seat",
                    },
                  ].map((item, index) => (
                    <Col xs={6} md={4} key={index} className="p-2">
                      <div className="border border-1 p-3  d-flex align-items-center justify-content-center gap-2 flex-column">
                        {item.icon}
                        <p className="m-0 fw-bold fs-5">{item.text}</p>
                        <p className="m-0" style={{ fontSize: "12px" }}>
                          {item.subText}
                        </p>
                      </div>
                    </Col>
                  ))}
                </Row>

                <div className="d-flex align-items-center justify-content-between w-100 mt-3">
                  <p className="m-0 fw-bold fs-4">
                    Rs. 50000{" "}
                    <span
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      / day
                    </span>
                  </p>
                  <ButtonGroup>
                    <Button variant="outline-dark" size="lg">
                      Rent Car
                    </Button>
                    <Button variant="dark" size="md">
                      Rent with chauffeur
                    </Button>
                  </ButtonGroup>
                </div>
              </div>
            </div>
          )}
        </Col>
      </Row>
    </Container>
  ) : (
    <div></div>
  );
}

export default Details;
