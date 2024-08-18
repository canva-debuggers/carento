import React from "react";
import { Col, Row } from "react-bootstrap";
import { BsArrowRightCircle, BsArrowRightCircleFill } from "react-icons/bs";
import { FaGasPump, FaLocationArrow } from "react-icons/fa";
import { FaRegCircleDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

function PopularNearByCars({ data = [1, 2, 3, 4, 5] }) {
  return (
    <div className="bg-dark p-4 rounded">
      <div className="d-flex align-items-center justify-content-between w-100 text-white opacity-50">
        <span> Popular CARs near by </span>
        <span className="fs-6 d-flex align-items-center justify-content-center gap-2">
          <FaRegCircleDot color="green" />
          <p className="m-0 text-white">Available</p>
        </span>
      </div>
      {data.map((item, index) => (
        <Row
          className={`py-4 ${
            index === data.length - 1 ? "" : "border-bottom border-light"
          } `}
        >
          <Col xs={10}>
            <Link to="/dashboard/detail/123">
              <h5 className="fw-semibold text-white">Corolla Cross</h5>
              <div className="text-light d-flex align-items-center gap-4 opacity-25">
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
            <BsArrowRightCircle className="text-light fs-1 opacity-25" />
          </Col>
        </Row>
      ))}
    </div>
  );
}

export default PopularNearByCars;
