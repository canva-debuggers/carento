import React, { useEffect, useRef, useState } from "react";
import { Button, ButtonGroup, Col, Container, Row } from "react-bootstrap";
import MapContainer from "../components/MapContainer";
import {
  FaArrowLeft,
  FaCarCrash,
  FaGasPump,
  FaLocationArrow,
  FaRegSun,
} from "react-icons/fa";
import { Sheet } from "react-modal-sheet";
import { PiSeat, PiSteeringWheelDuotone } from "react-icons/pi";
import { BsBoxArrowInDown, BsSpeedometer } from "react-icons/bs";
import { BiCross } from "react-icons/bi";
import { FiArrowLeftCircle } from "react-icons/fi";
import { useNavigate, useParams } from "react-router-dom";
import { isMobile } from "react-device-detect";
import { getDataFromCollection } from "../queries/queries";
import { useGeolocated } from "react-geolocated";
import BookingModal from "../components/BookingModal";

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
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selfDrive, setSelfDrive] = useState(false);
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

  const {
    car_model,
    mileage,
    price,
    image,
    km_driven,
    features,
    pickup_location,
    sun_roof,
    road_side_assistance,
    power_windows,
    power_steering,
  } = carDetails || {};

  useEffect(() => {
    if (!isOpen) {
      ref.current?.snapTo(1);
    }
  }, []);

  return !isGeolocationAvailable ? (
    <div>Your browser does not support Geolocation</div>
  ) : !isGeolocationEnabled ? (
    <div>Geolocation is not enabled</div>
  ) : coords && pickup_location ? (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Col xs={12} md={6} className="map-container">
          <MapContainer
            center={{
              lat: pickup_location?._lat,
              lng: pickup_location?._long,
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
                  paddingBottom: "100px",
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
                      {[
                        {
                          icon: <FaRegSun size={20} />,
                          text: "sunoof",
                          subText:
                            sun_roof?.toLowerCase() === "yes"
                              ? "Ray of hope for your ride"
                              : "No",
                        },
                        {
                          icon: <FaCarCrash size={20} />,
                          text: "Breakdown ",
                          subText:
                            road_side_assistance?.toLowerCase() === "yes"
                              ? "We are here to save you"
                              : "No",
                        },
                        {
                          icon: <BsBoxArrowInDown size={20} />,
                          text: "Power Windows",
                          subText:
                            power_windows?.toLowerCase() === "yes"
                              ? "We have power in your window"
                              : "No",
                        },
                        {
                          icon: <PiSteeringWheelDuotone size={20} />,
                          text: "Power Steering",
                          subText:
                            power_steering?.toLowerCase() === "yes"
                              ? "let's Rollllll!"
                              : "No",
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
                        <Button
                          variant="outline-dark"
                          size="lg"
                          onClick={() => {
                            setShowBookingModal(true);
                            setSelfDrive(true);
                          }}
                        >
                          Rent Car
                        </Button>
                        <Button
                          variant="dark"
                          size="md"
                          onClick={() => {
                            setShowBookingModal(true);
                            setSelfDrive(false);
                          }}
                        >
                          Rent with chauffeur
                        </Button>
                      </ButtonGroup>
                    </div>
                  </div>
                </Sheet.Content>
              </Sheet.Container>
              <BookingModal
                show={showBookingModal}
                setShow={setShowBookingModal}
                selfDrive={selfDrive}
                amount={price}
              />
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

                    <p className="m-0">> {km_driven} kms</p>
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
                    src={image}
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
                      icon: <FaRegSun size={40} />,
                      text: "sunoof",
                      subText:
                        sun_roof?.toLowerCase() === "yes"
                          ? "Ray of hope for your ride"
                          : "No",
                    },
                    {
                      icon: <FaCarCrash size={40} />,
                      text: "Breakdown ",
                      subText:
                        road_side_assistance?.toLowerCase() === "yes"
                          ? "We are here to save you"
                          : "No",
                    },
                    {
                      icon: <BsBoxArrowInDown size={40} />,
                      text: "Power Windows",
                      subText:
                        power_windows?.toLowerCase() === "yes"
                          ? "We have power in your window"
                          : "No",
                    },
                    {
                      icon: <PiSteeringWheelDuotone size={40} />,
                      text: "Power Steering",
                      subText:
                        power_steering?.toLowerCase() === "yes"
                          ? "let's Rollllll!"
                          : "No",
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
                    Rs. {price}
                    <span
                      style={{
                        fontSize: "12px",
                      }}
                    >
                      / day
                    </span>
                  </p>
                  <ButtonGroup>
                    <Button
                      variant="outline-dark"
                      size="lg"
                      onClick={() => {
                        setShowBookingModal(true);
                        setSelfDrive(true);
                      }}
                    >
                      Rent Car
                    </Button>
                    <Button
                      variant="dark"
                      size="md"
                      onClick={() => {
                        setShowBookingModal(true);
                        setSelfDrive(false);
                      }}
                    >
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
