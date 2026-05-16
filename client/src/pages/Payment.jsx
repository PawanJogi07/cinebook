const options = {

  key: "rzp_test_SnO0abqtEKfgaL",

  amount: order.amount,

  currency: order.currency,

  redirect: false,

  name: "CineBook",

  description: "Movie Ticket Booking",

  image:
    "https://cdn-icons-png.flaticon.com/512/744/744922.png",

  order_id: order.id,

  modal: {

    escape: false,

    backdropclose: false,

    ondismiss: function () {

      console.log(
        "Payment Popup Closed"
      )

    },

  },

  handler: async function (response) {

    console.log(
      "PAYMENT RESPONSE:",
      response
    )

    try {

      // =========================
      // PAYMENT VERIFY
      // =========================

      const verifyResponse =
        await axios.post(

          "https://cinebook-api-iifm.onrender.com/api/payment/verify",

          {

            razorpay_order_id:
              response.razorpay_order_id,

            razorpay_payment_id:
              response.razorpay_payment_id,

            razorpay_signature:
              response.razorpay_signature,

          }

        )

      console.log(
        "VERIFY RESPONSE:",
        verifyResponse.data
      )

      // =========================
      // BOOKING SAVE
      // =========================

      const bookingResponse =
        await axios.post(

          "https://cinebook-api-iifm.onrender.com/api/bookings",

          {

            movieId,

            seats,

            total,

            userId:
              userInfo._id,

            email:
              userInfo.email,

            paymentId:
              response.razorpay_payment_id,

          },

          {

            headers: {

              "Content-Type":
                "application/json",

            },

          }

        )

      console.log(
        "BOOKING RESPONSE:",
        bookingResponse.data
      )

      alert(
        "Payment Successful 😄🔥"
      )

      navigate("/success", {

        state: {

          seats,

          total,

          movieName:
            "Movie Ticket",

        },

      })

    } catch (error) {

      console.log(
        "ERROR:",
        error.response?.data ||
        error.message
      )

      alert(
        "Payment Verification Failed ❌"
      )

    }

  },

  prefill: {

    name:
      userInfo?.name ||
      "CineBook User",

    email:
      userInfo?.email ||
      "test@test.com",

  },

  notes: {

    movie:
      "Movie Ticket Booking",

  },

  theme: {

    color: "#ef4444",

  },

}