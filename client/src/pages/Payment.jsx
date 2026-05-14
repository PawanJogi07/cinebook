import {
  useLocation,
  useNavigate,
} from "react-router-dom"

import axios from "axios"

import qr from "../assets/qr.png"

function Payment() {

  const location = useLocation()

  const navigate = useNavigate()

  const {
    movieId,
    seats,
    total,
  } = location.state

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  )

  const handlePayment = async () => {

    try {

      if (!userInfo) {

        alert("Please Login First")

        navigate("/login")

        return
      }

      console.log({
        movieId,
        seats,
        total,
        userId: userInfo._id,
      })

      const { data: order } =
        await axios.post(

          "https://cinebook-api-iifm.onrender.com/api/payments/create-order",

          {
            amount: total,
          }

        )

      console.log(order)

      const options = {

        key:
          "rzp_test_SnO0abqtEKfgaL",

        amount:
          order.amount,

        currency:
          order.currency,

        name:
          "CineBook",

        description:
          "Movie Ticket Booking",

        image:
          "https://cdn-icons-png.flaticon.com/512/744/744922.png",

        order_id:
          order.id,

        modal: {

          escape: false,

          backdropclose: false,

          ondismiss: function () {

            console.log(
              "Payment Popup Closed"
            )

          },

        },

        handler:
          async function (
            response
          ) {

            console.log(
              "PAYMENT RESPONSE:",
              response
            )

            try {

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
                "BOOKING ERROR:",
                error.response?.data ||
                error.message
              )

              alert(
                "Booking Saved But Redirect Failed"
              )

              navigate("/success", {

                state: {
                  seats,
                  total,
                  movieName:
                    "Movie Ticket",
                },

              })

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

      console.log(options)

      if (!window.Razorpay) {

        alert(
          "Razorpay SDK Failed To Load"
        )

        return
      }

      const razor =
        new window.Razorpay(
          options
        )

      razor.open()

    } catch (error) {

      console.log(
        "PAYMENT ERROR:",
        error
      )

      console.log(
        error.response?.data
      )

      alert(

        error.response?.data?.message ||

        error.message ||

        "Payment Failed ❌"

      )
    }
  }

  return (

    <div className="bg-black min-h-screen text-white flex items-center justify-center">

      <div className="bg-zinc-900 p-10 rounded-2xl w-[500px] text-center">

        <h1 className="text-5xl font-bold mb-8">
          Payment
        </h1>

        <h2 className="text-2xl mb-4">
          Seats:
        </h2>

        <p className="text-red-500 text-xl mb-6">
          {seats.join(", ")}
        </p>

        <h2 className="text-4xl font-bold mb-8">
          ₹{total}
        </h2>

        <img
          src={qr}
          alt="QR"
          className="w-[250px] mx-auto rounded-xl mb-8"
        />

        <button
          onClick={handlePayment}
          className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg text-xl font-semibold"
        >

          Payment Done

        </button>

      </div>

    </div>
  )
}

export default Payment