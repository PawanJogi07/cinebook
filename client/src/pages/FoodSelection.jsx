import { useState } from "react"

import {
  useLocation,
  useNavigate,
} from "react-router-dom"

function FoodSelection() {

  const navigate = useNavigate()

  const location = useLocation()

  const {
    seats,
    total,
    movieId,
  } = location.state

  const foods = [

    {
      name: "Popcorn",
      price: 250,
    },

    {
      name: "Coke",
      price: 150,
    },

    {
      name: "Nachos",
      price: 300,
    },

    {
      name: "Burger Combo",
      price: 400,
    },

  ]

  const [selectedFood, setSelectedFood] =
    useState([])

  const toggleFood = (food) => {

    if (
      selectedFood.includes(food)
    ) {

      setSelectedFood(
        selectedFood.filter(
          (f) => f !== food
        )
      )

    } else {

      setSelectedFood([
        ...selectedFood,
        food,
      ])

    }
  }

  const foodTotal =
    selectedFood.reduce(
      (acc, item) =>
        acc + item.price,
      0
    )

  const finalTotal =
    total + foodTotal

  return (

    <div className="bg-black min-h-screen text-white p-10">

      <h1 className="text-5xl font-bold text-center mb-10">

        Food & Beverages

      </h1>

      <div className="grid md:grid-cols-2 gap-8">

        {
          foods.map((food, index) => {

            const selected =
              selectedFood.includes(food)

            return (

              <div
                key={index}
                onClick={() =>
                  toggleFood(food)
                }
                className={`p-8 rounded-2xl cursor-pointer transition

                ${
                  selected
                    ? "bg-red-500"

                    : "bg-zinc-900 hover:bg-zinc-800"
                }
                `}
              >

                <h2 className="text-3xl font-bold mb-4">

                  {food.name}

                </h2>

                <p className="text-xl">

                  ₹{food.price}

                </p>

              </div>
            )
          })
        }

      </div>

      <div className="text-center mt-12">

        <h2 className="text-4xl font-bold mb-8">

          Total : ₹{finalTotal}

        </h2>

        <button
          onClick={() =>
            navigate("/payment", {
              state: {
                movieId,
                seats,
                total: finalTotal,
              },
            })
          }
          className="bg-green-500 hover:bg-green-600 px-8 py-3 rounded-lg text-xl font-semibold"
        >

          Proceed To Payment

        </button>

      </div>

    </div>
  )
}

export default FoodSelection