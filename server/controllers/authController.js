import User from "../models/User.js"
import bcrypt from "bcryptjs"

import generateToken from "../utils/generateToken.js"

export const registerUser = async (req, res) => {

  try {

    console.log(
      "REGISTER BODY:",
      req.body
    )

    const { name, email, password } = req.body || {}

    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        message:
          "All fields are required"
      })

    }

    const userExists =
      await User.findOne({
        email
      })

    if (userExists) {

      return res.status(400).json({
        message:
          "User already exists"
      })

    }

    const salt =
      await bcrypt.genSalt(10)

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      )

    const user =
      await User.create({

        name,
        email,
        password:
          hashedPassword,

      })

    console.log(
      "REGISTERED USER:",
      user
    )

    res.status(201).json({

      _id: user.id,
      name: user.name,
      email: user.email,

      token:
        generateToken(
          user.id
        ),

    })

  } catch (error) {

    console.log(
      "REGISTER ERROR:",
      error
    )

    res.status(500).json({
      message:
        error.message || "Registration failed"
    })

  }
}

export const loginUser = async (req, res) => {

  try {

    console.log(
      "LOGIN BODY:",
      req.body
    )

    const { email, password } = req.body || {}

    if (
      !email ||
      !password
    ) {

      return res.status(400).json({
        message:
          "Email and Password required"
      })

    }

    const user =
      await User.findOne({
        email
      })

    console.log(
      "FOUND USER:",
      user
    )

    if (!user) {

      return res.status(401).json({
        message:
          "Invalid Credentials"
      })

    }

    console.log(
      "INPUT PASSWORD:",
      password
    )

    console.log(
      "HASHED PASSWORD:",
      user.password
    )

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      )

    console.log(
      "PASSWORD MATCH:",
      isMatch
    )

    if (!isMatch) {

      return res.status(401).json({
        message:
          "Invalid Credentials"
      })

    }

    const token =
      generateToken(user.id)

    console.log(
      "TOKEN:",
      token
    )

    res.status(200).json({

      _id: user.id,
      name: user.name,
      email: user.email,

      token,

    })

  } catch (error) {

    console.log(
      "FULL LOGIN ERROR:",
      error
    )

    res.status(500).json({
      message:
        error.message || "Login failed"
    })

  }
}