import React, { useState } from "react";
import { Col, Form, Row } from "react-bootstrap";

function RangeSelector({
  minPrice = 0,
  maxPrice = 1000,
  setMinPrice,
  setMaxPrice,
}) {
  const handleMinChange = (e) => {
    const value = Math.min(Number(e.target.value), maxPrice);
    setMinPrice(value);
  };

  const handleMaxChange = (e) => {
    const value = Math.max(Number(e.target.value), minPrice);
    setMaxPrice(value);
  };
  return (
    <Form>
      <Row>
        <Col>
          <Form.Group>
            <Form.Label>Min Price</Form.Label>
            <Form.Control
              type="number"
              value={minPrice}
              onChange={handleMinChange}
            />
          </Form.Group>
        </Col>
        <Col>
          <Form.Group>
            <Form.Label>Max Price</Form.Label>
            <Form.Control
              type="number"
              value={maxPrice}
              onChange={handleMaxChange}
            />
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
}

export default RangeSelector;
