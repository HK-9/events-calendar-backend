import User from "../../models/user.model.js";

export const getUserDetails = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.user.id }).select(
      "-password"
    );

    if (!userData) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json({ user: userData });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
