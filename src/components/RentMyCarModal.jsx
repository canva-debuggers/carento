import React, { useEffect } from "react";
import { Form, Modal } from "react-bootstrap";
import RenderField from "./RenderField";
import { useFormik } from "formik";
import { storeJsonInCollection } from "../queries/queries";
import { GeoPoint } from "firebase/firestore";

function RentMyCarModal({ show }) {
  const formik = useFormik({
    initialValues: {
      car_model: "",
      type: "",
      brand: ""
    },
    onSubmit: async (values) => {
      console.log(values);
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
      type: "select",
      field_name: "car_model",
      options: [
        {
          value: "Model 1",
          label: "Model 1",
        },
      ],
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
          label: "SUV"
        },
        {
          value: "Hatchback",
          label: "Hatchback"
        },
        {
          value: "Sedan",
          label: "Sedan"
        },
        {
          value: "XUV",
          label: "XUV"
        }
      ]
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
      type: "text",
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
          label: "red"
        },
        {
          value: "green",
          label: "green"
        },
        {
          value: "blue",
          label: "blue"
        },
        {
          value: "yellow",
          label: "yellow"
        },
        {
          value: "blue",
          label: "blue"
        },
        {
          value: "black",
          label: "black"
        },
        {
          value: "white",
          label: "white"
        },
        {
          value: "gray",
          label: "gray"
        }
      ]
    },
    {
      label: "Fuel Type",
      required: true,
      placeholder: "What fuel type your car needs?",
      type: "select",
      field_name: "fuel_type",
      options: [
        {
          value:"Petrol",
          label: "Petrol"
        },
        {
          value:"Diesel",
          label: "Diesel"
        },
        {
          value:"CNG",
          label: "CNG"
        },
        {
          value:"Electric",
          label: "Electric"
        }
      ]
    },
    {
      label: "Price",
      required: true,
      placeholder: "Car Price",
      type: "text",
      field_name: "price",
    },
    {
      label: "Availablity",
      required: true,
      placeholder: "When is your car available?",
      type: "text",
      field_name: "availablity",
    },
    {
      label: "Features",
      required: true,
      placeholder: "Write at least 3 features of your car",
      type: "text",
      field_name: "features",
    },
  ];

  return (
    <Modal show={show} size="lg">
      <Modal.Header closeButton>
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
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default RentMyCarModal;
