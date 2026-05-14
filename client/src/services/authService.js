import axios from "axios"

const API =
  "https://cinebook-api-iifm.onrender.com/api/auth"
  
export const registerUser =
  async (userData) => {

    const { data } =
      await axios.post(

        `${API}/register`,

        userData,

        {
          headers: {
            "Content-Type":
              "application/json",
          },
        }

      )

    return data
}

export const loginUser =
  async (userData) => {

    const { data } =
      await axios.post(

        `${API}/login`,

        userData,

        {
          headers: {
            "Content-Type":
              "application/json",
          },
        }

      )

    return data
}