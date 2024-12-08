import jwt from "jsonwebtoken";
import moment from "moment";

export const generateToken = (userId, email) => {
  try {
    const token = jwt.sign({ id: userId, email }, process.env.JWT_SECRET, {
      expiresIn: "15d", // 15 days expiration
    });
    return token;
  } catch (error) {
    console.error("Error generating token:", error);
    throw new Error("Token generation failed");
  }
};

export const isValidDate = (dateString) => {
  return moment(dateString, moment.ISO_8601, true).isValid(); // Validate if the date is in a valid ISO 8601 format
};
