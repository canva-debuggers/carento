import React from "react";

function CategoryCard({ name, icon }) {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div
        className="bg-light rounded-circle d-flex align-items-center justify-content-center"
        style={{
          height: "70px",
          width: "70px",
          marginRight: "30px",
        }}
      >
        <img
          src={icon}
          alt=""
          className="img-circle img-fluid"
          style={{
            marginLeft: "30px",
          }}
        />
      </div>
      <p className="fw-semibold fs-6">{name}</p>
    </div>
  );
}

export default CategoryCard;
