import mongoose from "mongoose";

const { Schema } = mongoose;

const categorySchema = new Schema({
  type: {
    type: String,
    enum: [
      "living expenses",
      "food",
      "transportation",
      "shopping",
      "entertainment",
      "health",
      "education",
      "other",
    ],
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    default: null,
  },
  icon: String,
  color: String,
});
const categoryModel = mongoose.model("Category", categorySchema);

export default categoryModel;
