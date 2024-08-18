import React, { memo } from "react";
import { FloatingLabel, Form } from "react-bootstrap";
import GooglePlacesAutocomplete, {
  geocodeByPlaceId,
  getLatLng,
} from "react-google-places-autocomplete";
import Select from "react-select";
import { uploadDocumentFirebase } from "../queries/queries";

function RenderField({
  type,
  label,
  placeholder,
  field_name,
  handleChange,
  values,
  touched,
  errors,
  options,
  setFieldValue,
  required,
  disabled = false,
}) {
  async function uploadFile(e, fieldName) {
    try {
      const file = e.target.files[0];
      console.log("file", file);
      const url = await uploadDocumentFirebase(file);
      setFieldValue(fieldName, url);
      console.log("url", url);
    } catch (e) {
      console.log(e);
    }
  }
  function getNestedValue(errors, path) {
    if (!errors || !path) return undefined;
    const parts = path.split(".");

    return parts.reduce((currentObject, part) => {
      if (currentObject === undefined || typeof currentObject !== "object") {
        return undefined; // Path is incorrect or leads to a non-object
      }

      const [key, index] = part.split("["); // Split key and optional index

      if (index) {
        // If index exists, access array element
        const closingBracketIndex = part.indexOf("]");
        if (closingBracketIndex === -1) {
          return undefined; // Invalid path with missing closing bracket
        }
        const arrayIndex = parseInt(index); // Convert index string to number
        return currentObject[key] ? currentObject[key][arrayIndex] : undefined; // Check if array exists and access element
      } else {
        return currentObject[key]; // Access normal property
      }
    }, errors);
  }

  switch (type) {
    case "select":
      return (
        <FloatingLabel
          className="mb-3 custom-form-floating "
          controlId="floatingSelect"
          label={`${label} ${required ? "*" : ""}`}
        >
          <Form.Select
            aria-label={label}
            name={field_name}
            onChange={handleChange}
            value={values[field_name]}
            isInvalid={
              getNestedValue(touched, field_name) &&
              !!getNestedValue(errors, field_name)
            }
            disabled={disabled}
          >
            <option value="">{placeholder}</option>
            {options?.length > 0 &&
              options.map((data, key) => (
                <option key={key} value={data.value}>
                  {data.label}
                </option>
              ))}
          </Form.Select>

          <Form.Control.Feedback type="invalid">
            {getNestedValue(errors, field_name)}
          </Form.Control.Feedback>
        </FloatingLabel>
      );
    case "switch":
      return (
        <Form.Group
          className="mb-3 d-flex justify-content-between"
          controlId="formBasicEmail"
        >
          <Form.Label>
            {label} {required ? "*" : ""}
          </Form.Label>
          <Form.Check
            className="flex-shrink-0"
            name={field_name}
            onChange={(e) => {
              setFieldValue(field_name, e.target.checked ? 1 : 0);
            }}
            checked={values[field_name] === 1 ? true : false}
            type="switch"
            aria-controls="collapse-text"
          />
        </Form.Group>
      );
    case "multiselect":
      return (
        <Form.Group controlId="ControlSelectMultiple" className="mb-3">
          <Form.Label>
            {label} {required ? "*" : ""}
          </Form.Label>
          <Select
            options={options}
            placeholder={placeholder}
            name={field_name}
            isMulti
            onChange={(value) => {
              setFieldValue(field_name, value?.map(({ value }) => value) || []);
            }}
          />
        </Form.Group>
      );

    case "textarea":
      return (
        <FloatingLabel
          controlId={label}
          label={`${label} ${required ? "*" : ""}`}
          className="mb-3 custom-form-floating "
        >
          <Form.Control
            as="textarea"
            placeholder={label}
            rows={5}
            name={field_name}
            onChange={handleChange}
            value={values[field_name]}
            isInvalid={
              getNestedValue(touched, field_name) &&
              !!getNestedValue(errors, field_name)
            }
          />
          <Form.Control.Feedback type="invalid">
            {getNestedValue(errors, field_name)}
          </Form.Control.Feedback>
        </FloatingLabel>
      );
    case "number":
      return (
        <FloatingLabel
          controlId={label}
          label={`${label} ${required ? "*" : ""}`}
          className="mb-3 custom-form-floating "
        >
          <Form.Control
            type={type}
            placeholder={placeholder}
            name={field_name}
            onChange={handleChange}
            value={getNestedValue(values, field_name)}
            isInvalid={
              getNestedValue(touched, field_name) &&
              !!getNestedValue(errors, field_name)
            }
            min={0}
          />

          <Form.Control.Feedback type="invalid">
            {getNestedValue(errors, field_name)}
          </Form.Control.Feedback>
        </FloatingLabel>
      );
    case "googleAutocomplete":
      return (
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
                    setFieldValue(field_name, latLng);
                  })
                  .catch((error) => console.error(error));
              }
            },
          }}
        />
      );
    case "file":
      return (
        <FloatingLabel
          controlId={label}
          label={`${label} ${required ? "*" : ""}`}
          className="mb-3 custom-form-floating "
        >
          <Form.Control
            type={type}
            placeholder={placeholder}
            name={field_name}
            onChange={(e) => uploadFile(e, field_name)}
            isInvalid={
              getNestedValue(touched, field_name) &&
              !!getNestedValue(errors, field_name)
            }
          />

          <Form.Control.Feedback type="invalid">
            {getNestedValue(errors, field_name)}
          </Form.Control.Feedback>
        </FloatingLabel>
      );
    default:
      return (
        <FloatingLabel
          controlId={label}
          label={`${label} ${required ? "*" : ""}`}
          className="mb-3 custom-form-floating "
        >
          <Form.Control
            type={type}
            placeholder={placeholder}
            name={field_name}
            onChange={handleChange}
            value={getNestedValue(values, field_name)}
            isInvalid={
              getNestedValue(touched, field_name) &&
              !!getNestedValue(errors, field_name)
            }
          />

          <Form.Control.Feedback type="invalid">
            {getNestedValue(errors, field_name)}
          </Form.Control.Feedback>
        </FloatingLabel>
      );
  }
}

export default memo(RenderField);
