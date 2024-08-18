import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Calendar, DateRangePicker } from "react-date-range";
import {
  Button,
  ButtonGroup,
  Col,
  Container,
  Form,
  Offcanvas,
  Row,
} from "react-bootstrap";
import sedanImage from "../assets/sedan.png";
import suvImage from "../assets/suv.png";
import muvImage from "../assets/muv.png";
import hatchBachImage from "../assets/hatchback.png";
import CategoryCard from "../components/CategoryCard";
import DatePicker from "react-datepicker";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from "react-google-places-autocomplete";
import RangeSelector from "../components/RangeSelector";
import {
  FaGasPump,
  FaLocationArrow,
  FaMapMarkerAlt,
  FaThList,
} from "react-icons/fa";
import { isMobile } from "react-device-detect";
import CarCard from "../components/CarCard";
import MapContainer from "../components/MapContainer";
import { BsArrowRightCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { APIProvider } from "@vis.gl/react-google-maps";

function Search() {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [locationFilterValue, setLocationFilterValue] = useState({});
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [showAdvanceSearch, setShowAdvanceSearch] = useState(false);
  const [listType, setListType] = useState("grid");
  const markersLocations = [
    {
      lat: 22.6131968,
      lng: 88.2835456,
    },
    {
      lat: 22.5379962582623,
      lng: 88.36240842317525,
    },
  ];
  return (
    <Container>
      <Row>
        <Col xs={12} md={6} className="p-4 pb-0">
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
        </Col>
        <Col
          xs={12}
          md={6}
          className="p-4 d-flex flex-row flex-md-column justify-content-between justify-content-md-end align-items-start align-items-md-end gap-3"
        >
          <ButtonGroup>
            <Button
              size="sm"
              variant="outline-dark"
              className="ms-auto "
              onClick={() => setShowAdvanceSearch(!showAdvanceSearch)}
            >
              Filter
            </Button>
            <Button
              size="sm"
              variant="dark"
              className="ms-auto "
              onClick={() => setShowAdvanceSearch(!showAdvanceSearch)}
            >
              Sort
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button
              size="sm"
              variant={listType === "grid" ? "dark" : "outline-dark"}
              className="ms-auto "
              onClick={() => setListType("grid")}
            >
              <FaThList />
            </Button>
            <Button
              size="sm"
              variant={listType === "map" ? "dark" : "outline-dark"}
              className="ms-auto "
              onClick={() => setListType("map")}
            >
              <FaMapMarkerAlt />
            </Button>
          </ButtonGroup>
        </Col>

        <Col xs={12} className="p-4">
          {listType === "grid" ? (
            <Row>
              {[1, 2, 3, 4].map((item, index) => (
                <Col xs={6} md={3} key={index}>
                  <CarCard />
                </Col>
              ))}
            </Row>
          ) : (
            <Row>
              <Col lg={7} xs={12}>
                <div style={{ height: "50vh" }}>
                  <MapContainer
                    center={{
                      lat: 22.572645,
                      lng: 88.363892,
                    }}
                    zoom={15}
                    markersLocations={markersLocations}
                  />
                </div>
              </Col>
              <Col lg={5} xs={12}>
                {markersLocations.map((item, index) => (
                  <Row
                    className={`py-4 ${
                      index === markersLocations.length - 1
                        ? ""
                        : "border-bottom border-dark"
                    } `}
                  >
                    <Col xs={10}>
                      <Link to="/dashboard/123">
                        <h5 className="fw-semibold text-dark">Corolla Cross</h5>
                        <div className="text-dark d-flex align-items-center gap-4 opacity-25">
                          <span className=" fs-6 d-flex align-items-center justify-content-center gap-2">
                            <FaGasPump />
                            <p className="m-0">5KM/L</p>
                          </span>
                          <span className="fs-6 d-flex align-items-center justify-content-center gap-2">
                            <FaLocationArrow />

                            <p className="m-0"> {">500kms"}</p>
                          </span>
                        </div>
                      </Link>
                    </Col>
                    <Col xs={2} className="d-flex align-items-center">
                      <BsArrowRightCircle className="text-dark fs-1 opacity-25" />
                    </Col>
                  </Row>
                ))}
              </Col>
            </Row>
          )}
        </Col>
      </Row>
      <Offcanvas
        show={showAdvanceSearch}
        onHide={() => setShowAdvanceSearch(!showAdvanceSearch)}
        scroll={true}
      >
        <Offcanvas.Header closeButton></Offcanvas.Header>
        <Offcanvas.Body>
          <Row>
            <Col xs={12} className="p-4">
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
            </Col>
            <Col xs={12} className="p-4">
              <h4 className="fw-bold opacity-25 fs-2">Filter By Date</h4>
              <div className="d-flex align-items-center gap-3">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  allowSameDay
                  showYearDropdown
                  customInput={
                    <Form.Control
                      style={{
                        width: "150px",
                      }}
                    />
                  }
                />{" "}
                -
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)}
                  customInput={
                    <Form.Control
                      style={{
                        width: "150px",
                      }}
                    />
                  }
                />
              </div>
            </Col>
            <Col xs={12} className="p-4">
              <h4 className="fw-bold opacity-25 fs-2">Search By Location</h4>
              <GooglePlacesAutocomplete
                apiKey="AIzaSyCrkT383kr0odCNYNvNULUcWn9B_wmOIYE"
                componentRestrictions={{ country: "in" }}
                debounce={300}
                selectProps={{
                  //   value: locationFilterValue,
                  onChange: (selctedAddress) => {
                    if (
                      selctedAddress &&
                      selctedAddress.value &&
                      selctedAddress.value.place_id
                    ) {
                      geocodeByPlaceId(selctedAddress.value.place_id)
                        .then((results) => getLatLng(results[0]))
                        .then((latLng) => {
                          setLocationFilterValue(latLng);
                        })
                        .catch((error) => console.error(error));
                    }
                  },
                }}
              />
            </Col>
            <Col xs={12} className="p-4">
              <h4 className="fw-bold opacity-25 fs-2">Search By Price Range</h4>
              <RangeSelector
                setMaxPrice={setMaxPrice}
                setMinPrice={setMinPrice}
                maxPrice={maxPrice}
                minPrice={minPrice}
              />
            </Col>
            <Col xs={12} className="p-4">
              <ButtonGroup className="w-100">
                <Button
                  variant="dark"
                  className="w-100"
                  onClick={() => {
                    setShowAdvanceSearch(!showAdvanceSearch);
                  }}
                >
                  Apply
                </Button>
                <Button
                  variant="outline-dark"
                  className="w-100"
                  onClick={() => {
                    setShowAdvanceSearch(!showAdvanceSearch);
                    setMinPrice(0);
                    setMaxPrice(1000);
                    setStartDate(null);
                    setEndDate(null);
                    setLocationFilterValue(null);
                  }}
                >
                  Reset
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Offcanvas.Body>
      </Offcanvas>
    </Container>
  );
}

export default Search;
