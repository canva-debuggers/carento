import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import RenderField from "./RenderField";
import { useFormik } from "formik";
import { storeJsonInCollection } from "../queries/queries";
import { GeoPoint } from "firebase/firestore";
import { useParams } from "react-router-dom";

function BookingModal({ show, selfDrive }) {
  let { id } = useParams();
  console.log("id", id);
  const formik = useFormik({
    initialValues: {
      selfDrive: selfDrive,
      to_date: "",
      from_date: "",
      pickup_or_drop: "Drop",
      driving_license: "",
    },
    onSubmit: async (values) => {
      try {
        console.log(values);
        // await storeJsonInCollection("booking", values, id);
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
      label: "To date",
      required: true,
      placeholder: "select date",
      type: "date",
      field_name: "to_date",
    },
    {
      label: "From date",
      required: true,
      placeholder: "select date",
      type: "date",
      field_name: "from_date",
    },
    {
      label: "Driving License",
      required: true,
      placeholder: "Select File",
      type: "file",
      field_name: "driving_license",
    },
    {
      label: "How do I get my car?",
      required: true,
      placeholder: "Select option",
      type: "select",
      field_name: "pickup_or_drop",
      options: [
        {
          value: "Drop",
          label: "Drop",
        },
        {
          value: "Pickup",
          label: "Pickup",
        },
      ],
    },
  ];
  if (values.pickup_or_drop === "Drop") {
    fields.push({
      label: "Drop Location",
      required: true,
      placeholder: "Pickup Location",
      type: "googleAutocomplete",
      field_name: "drop_location",
    });
  }
  return (
    <Modal show={show} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Rent Car</Modal.Title>
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
          <Button type="submit">Book</Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default BookingModal;
