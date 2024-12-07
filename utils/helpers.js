import jwt from "jsonwebtoken";

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
