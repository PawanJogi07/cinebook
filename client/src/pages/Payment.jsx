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

        order_id:
          order.id,

        handler:
          async function (
            response
          ) {

            console.log(response)

            try {

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
                }

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

              console.log(error)

              alert(
                "Booking Save Failed ❌"
              )

            }

          },

        theme: {

          color: "#ef4444",

        },

      }

      console.log(options)

      const razor =
        new window.Razorpay(
          options
        )

      razor.open()

    } catch (error) {

      console.log(error)

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