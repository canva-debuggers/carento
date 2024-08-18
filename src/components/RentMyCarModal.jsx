import React, { useContext, useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import RenderField from "./RenderField";
import { useFormik } from "formik";
import {
  getDataFromCollectionaddGeo,
  storeJsonInCollection,
} from "../queries/queries";
import { GeoPoint } from "firebase/firestore";
import { AccountContext } from "../context/AccountProvider";

function RentMyCarModal({ show, setShow }) {
  const { user } = useContext(AccountContext);
  const formik = useFormik({
    initialValues: {
      car_model: "",
      type: "",
      brand: "",
      pickup_location: {},
      mileage: "",
      km_driven: "",
      colour: "",
      image: {},
      fuel_type: "",
      price: "",
      availability: [],
      power_steering: "",
      sun_roof: "",
      ac: "",
      power_window: "",
      air_bag: "",
      auto_drive: "",
      road_side_assistance: "",
      leather_seat_cover: "",
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
        const car = await getDataFromCollectionaddGeo("cars", {
          ...values,
          coordinates: {
            lat: values.pickup_location.lat,
            lng: values.pickup_location.lng,
          },
        });
        console.log("car", car, user);
        await storeJsonInCollection("users", { cars: [car.id] }, user.id);
        setShow(false);
      } catch (e) {
        console.log(e);
      }
    },
  });
  const { values, touched, errors, handleSubmit, handleChange, setFieldValue } =
    formik;
  console.log(values);
  const fields = [
    {
      label: "Car Model",
      required: true,
      placeholder: "select Car Model",
      type: "text",
      field_name: "car_model",
    },
    {
      label: "Type",
      required: true,
      placeholder: "select model type",
      type: "select",
      field_name: "type",
      options: [
        {
          value: "SUV",
          label: "SUV",
        },
        {
          value: "Hatchback",
          label: "Hatchback",
        },
        {
          value: "Sedan",
          label: "Sedan",
        },
        {
          value: "XUV",
          label: "XUV",
        },
      ],
    },
    {
      label: "Car Image",
      required: true,
      placeholder: "Select car image",
      type: "file",
      field_name: "image",
    },
    {
      label: "Brand",
      required: true,
      placeholder: "Write Brand",
      type: "text",
      field_name: "brand",
    },
    {
      label: "Pickup Location",
      required: true,
      placeholder: "Pickup Location",
      type: "googleAutocomplete",
      field_name: "pickup_location",
    },
    {
      label: "Mileage",
      required: true,
      placeholder: "Mileage kmpl",
      type: "text",
      field_name: "mileage",
    },
    {
      label: "KM Driven",
      required: true,
      placeholder: "Total KM driven",
      type: "text",
      field_name: "km_driven",
    },
    {
      label: "Colour",
      required: true,
      placeholder: "Select Colour",
      type: "select",
      field_name: "colour",
      options: [
        {
          value: "red",
          label: "red",
        },
        {
          value: "green",
          label: "green",
        },
        {
          value: "blue",
          label: "blue",
        },
        {
          value: "yellow",
          label: "yellow",
        },
        {
          value: "blue",
          label: "blue",
        },
        {
          value: "black",
          label: "black",
        },
        {
          value: "white",
          label: "white",
        },
        {
          value: "gray",
          label: "gray",
        },
      ],
    },
    {
      label: "Fuel Type",
      required: true,
      placeholder: "What fuel type your car needs?",
      type: "select",
      field_name: "fuel_type",
      options: [
        {
          value: "Petrol",
          label: "Petrol",
        },
        {
          value: "Diesel",
          label: "Diesel",
        },
        {
          value: "CNG",
          label: "CNG",
        },
        {
          value: "Electric",
          label: "Electric",
        },
      ],
    },
    {
      label: "Price",
      required: true,
      placeholder: "Car Price",
      type: "text",
      field_name: "price",
    },
    // {
    //   label: "Availablity",
    //   required: true,
    //   placeholder: "When is your car available?",
    //   type: "text",
    //   field_name: "availablity",
    // },
    {
      label: "Power Steering",
      required: true,
      placeholder: "Select Options",
      type: "select",
      field_name: "power_steering",
      options: [
        {
          value: "Yes",
          label: "Yes",
        },
        {
          value: "No",
          label: "No",
        },
      ],
    },
    {
      label: "Sun Roof",
      required: true,
      placeholder: "Select Options",
      type: "select",
      field_name: "sun_roof",
      options: [
        {
          value: "Yes",
          label: "Yes",
        },
        {
          value: "No",
          label: "No",
        },
      ],
    },
    {
      label: "Ac",
      required: true,
      placeholder: "Select Options",
      type: "select",
      field_name: "ac",
      options: [
        {
          value: "Yes",
          label: "Yes",
        },
        {
          value: "No",
          label: "No",
        },
      ],
    },
    {
      label: "Power Window",
      required: true,
      placeholder: "Select Options",
      type: "select",
      field_name: "power_window",
      options: [
        {
          value: "Yes",
          label: "Yes",
        },
        {
          value: "No",
          label: "No",
        },
      ],
    },
    {
      label: "Air Bag",
      required: true,
      placeholder: "Number of Airbags",
      type: "text",
      field_name: "air_bag",
    },
    {
      label: "Auto Drive",
      required: true,
      placeholder: "Select Options",
      type: "select",
      field_name: "auto_drive",
      options: [
        {
          value: "Yes",
          label: "Yes",
        },
        {
          value: "No",
          label: "No",
        },
      ],
    },
    {
      label: "Road Side Assistance",
      required: true,
      placeholder: "Select Options",
      type: "select",
      field_name: "road_side_assistance",
      options: [
        {
          value: "Yes",
          label: "Yes",
        },
        {
          value: "No",
          label: "No",
        },
      ],
    },
    {
      label: "Leather Seat Cover",
      required: true,
      placeholder: "Select Options",
      type: "select",
      field_name: "leather_seat_cover",
      options: [
        {
          value: "Yes",
          label: "Yes",
        },
        {
          value: "No",
          label: "No",
        },
      ],
    },
  ];

  return (
    <Modal show={show} size="lg">
      <Modal.Header closeButton onClick={() => setShow(false)}>
        <Modal.Title>Rent your Car</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          {fields.map((field) => (
            <RenderField
              {...field}
              values={values}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
          ))}
          <Button type="submit">Rent My Car</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RentMyCarModal;
