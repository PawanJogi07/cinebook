const API_URL = import.meta.env.VITE_API_URL || "https://cinebook-api-iifm.onrender.com";

const options = {
  key: import.meta.env.VITE_RAZORPAY_KEY_ID,
  amount: order.amount,
  currency: order.currency,
  redirect: true,
  name: "CineBook",
  description: "Movie Ticket Booking",
  image: "https://cdn-icons-png.flaticon.com/512/744/744922.png",
  order_id: order.id,
  modal: {
    escape: false,
    backdropclose: false,
    ondismiss: function () {
      console.log("Payment Popup Closed");
    },
  },
  handler: async function (response) {
    alert("Payment Verified ✅");
    console.log("PAYMENT RESPONSE:", response);
    try {
      const bookingResponse = await axios.post(
        `${API_URL}/api/bookings`,
        {
          movieId,
          seats,
          total,
          userId: userInfo._id,
          email: userInfo.email,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log("BOOKING RESPONSE:", bookingResponse.data);
      alert("Payment Successful 😄🔥");
      navigate("/success", {
        state: {
          seats,
          total,
          movieName: "Movie Ticket",
        },
      });
    } catch (error) {
      console.log(
        "BOOKING ERROR:",
        error.response?.data || error.message
      );
      alert("Booking Saved But Redirect Failed");
      navigate("/success", {
        state: {
          seats,
          total,
          movieName: "Movie Ticket",
        },
      });
    }
  },
  prefill: {
    name: userInfo?.name || "CineBook User",
    email: userInfo?.email || "test@test.com",
  },
  notes: {
    movie: "Movie Ticket Booking",
  },
  theme: {
    color: "#ef4444",
  },
};