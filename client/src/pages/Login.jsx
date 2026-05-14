import { useState } from "react"

import {
  loginUser,
} from "../services/authService"

function Login() {

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const handleLogin =
    async (e) => {

      e.preventDefault()

      try {

        const data =
          await loginUser({

            email,
            password,
          })

        localStorage.setItem(

          "userInfo",

          JSON.stringify(data)

        )

        alert(
          "Login Successful 😄🔥"
        )

        window.location.href = "/"

      } catch (error) {

        console.log(error)

        alert(

          error.response?.data
            ?.message ||

          "Login Failed ❌"

        )

      }

    }

  return (

    <div className="bg-black min-h-screen flex items-center justify-center">

      <form
        onSubmit={handleLogin}
        className="bg-zinc-900 p-10 rounded-2xl w-[400px]"
      >

        <h1 className="text-white text-4xl font-bold mb-8 text-center">
          Login
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
          className="w-full mb-4 p-3 rounded-lg bg-zinc-800 text-white outline-none"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
          className="w-full mb-6 p-3 rounded-lg bg-zinc-800 text-white outline-none"
        />

        <button
          type="submit"
          className="w-full bg-red-500 hover:bg-red-600 p-3 rounded-lg text-white font-semibold"
        >

          Login

        </button>

      </form>

    </div>
  )
}

export default Login