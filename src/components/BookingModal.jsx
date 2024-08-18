import React, { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import RenderField from "./RenderField";
import { useFormik } from "formik";
import {
  storeJsonInCollection,
  uploadDocumentFirebase,
} from "../queries/queries";
import { GeoPoint } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Razorpaycheckout from "./Razorpaycheckout";

function BookingModal({ show, selfDrive, setShow }) {
  const [showPayment, setShowPayment] = useState(false);
  let { id } = useParams();
  console.log("id", id);
  const formik = useFormik({
    initialValues: {
      selfDrive: selfDrive,
      to_date: "",
      from_date: "",
      pickup_or_drop: "Drop",
      driving_license: {},
    },
    onSubmit: async (values) => {
      try {
        await storeJsonInCollection("bookings", values, id);
        setShowPayment(true);
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

  return (
    <Modal show={show} size="lg" style={{ zIndex: 99999999 }} centered>
      <Modal.Header closeButton onClick={() => setShow(false)}>
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
          {values.pickup_or_drop === "Drop" && (
            <RenderField
              {...{
                label: "Drop Location",
                required: true,
                placeholder: "Pickup Location",
                type: "googleAutocomplete",
                field_name: "drop_location",
              }}
              values={values}
              touched={touched}
              errors={errors}
              handleChange={handleChange}
              setFieldValue={setFieldValue}
            />
          )}
          <div class="d-flex align-items-center justify-cotnten-end">
            <Button
              variant="dark"
              size="lg"
              type="submit"
              className="my-4 ms-auto"
            >
              Book
            </Button>
          </div>
        </Form>
      </Modal.Body>

      {showPayment && <Razorpaycheckout />}
    </Modal>
  );
}

export default BookingModal;
