import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const articleSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  category: {
    type: String,
    enum: ["Technology", "Lifestyle", "Education", "Health", "Travel", "Food", "Other"],
    default: "Other"
  },
  tags: [{
    type: String,
  }],
}, {timestamps: true})

articleSchema.plugin(mongooseAggregatePaginate);

export const Article = mongoose.model("Article", articleSchema);