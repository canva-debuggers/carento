import React from "react";
import { Form, Modal } from "react-bootstrap";
import RenderField from "./RenderField";
import { useFormik } from "formik";

function RentMyCarModal() {
  const formik = useFormik({
    initialValues: {
      car_model: "",
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
      label: "Pickup Location",
      required: true,
      placeholder: "Pickup Location",
      type: "text",
      field_name: "pickup_location",
    },
  ];

  return (
    <Modal show={true} size="lg">
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
