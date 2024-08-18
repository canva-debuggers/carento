import React, { useContext, useEffect } from "react";
import useRazorpay from "react-razorpay";
import { AccountContext } from "../context/AccountProvider";

function Razorpaycheckout({ amount }) {
  const { user } = useContext(AccountContext);
  const { email, name } = user || {};
  const [Razorpay] = useRazorpay();
  const handlePayment = async (params) => {
    const options = {
      key: "rzp_test_wO4SZ05nsOx6LO",
      amount: amount,
      currency: "INR",
      name: "Carento",
      description: "Car rent",
      handler: function (response) {
        alert("payment successful");
      },
      prefill: {
        name: name,
        email: email,
      },
      theme: {
        color: "#000000",
      },
    };
    const rzp1 = new Razorpay(options);
    rzp1.on("payment.failed", function (response) {
      alert(response.error.code);
      alert(response.error.description);
      alert(response.error.source);
      alert(response.error.step);
      alert(response.error.reason);
      alert(response.error.metadata.order_id);
      alert(response.error.metadata.payment_id);
    });

    rzp1.open();
  };

  useEffect(() => {
    setTimeout(() => {
      handlePayment();
    }, 3000);
  }, [amount]);
}

export default Razorpaycheckout;
