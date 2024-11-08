import React, { useCallback } from "react";
import { useLocation } from "react-router-dom";
import { useRazorpay } from "react-razorpay";
import axios from "axios";

function ProductDetails() {
  const Razorpay = useRazorpay();
  const location = useLocation();
  const product = location.state.product;

  const handlePayment = useCallback(async () => {
    const response = await axios.get(
      "https://backend-ecom-8ro1.onrender.com/user/order/" + product._id,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    const order = response.data.order;

    console.log(order);

    const options = {
      key: "rzp_test_cAa3gCF0eP8i4R",
      amount: order.amount,
      currency: order.currency,
      name: "ME Company",
      description: "Test Transaction",
      image: "https://example.com/your_logo",
      order_id: order.id, // Generate order_id on server
      handler: async (res) => {
        const response = await axios.post(
          "https://backend-ecom-8ro1.onrender.com/user/verify/" + order.id, // <-- route being hit
          {
            paymentId: res.razorpay_payment_id,
            orderId: res.razorpay_order_id,
            signature: res.razorpay_signature,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );

        console.log(response);
        alert("Payment Successful!");
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#F37254",
      },
    };

    const rzpay = new window.Razorpay(options);
    rzpay.open();
  }, [Razorpay]);

  return (
    <main className="flex justify-center items-center h-screen text-white">
      <div className="flex w-[300px] flex-col justify-center p-2 rounded-lg bg-slate-800">
        <img
          className="w-full max-h-[200px] object-cover"
          src={product.images[0]}
          alt="{product.name}"
        />
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>

        <button
          className="bg-blue-500 text-white p-2 rounded-md"
          onClick={handlePayment}
        >
          Buy Now
        </button>
      </div>
    </main>
  );
}

export default ProductDetails;
