const mongoose = require("mongoose");
const { campgroundSchema } = require("../schemas");
const { Schema } = mongoose;

const Review = require("./review");


const ImageSchema = new Schema({
  url: String,
  filename: String
});

ImageSchema.virtual('thumbnail').get(function() {
  return this.url.replace('/upload', '/upload/w_200');
});

const opts = { toJSON: { virtuals: true } };

const campGroundSchema = new Schema({
  title: String,
  price: Number,
  images: [ImageSchema],
  geometry:{
    type:{
      type: String,
      enum: ['Point'],
      required: true
    },
    coordinates:{
      type: [Number],
      required: true
    }
  },
  discription: String,
  location: String,
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
}, opts);

campGroundSchema.virtual('properties.popUpMarkup').get(function () {
  return `
  <strong><a href="/campgrounds/${this._id}">${this.title}</a><strong><p>${this.discription.substring(0, 20)}...</p>
  `
});

campGroundSchema.post("findOneAndDelete", async function (doc) {
  if (doc) {
    await Review.deleteMany({
      _id: {
        $in: doc.reviews,
      },
    });
  }
});

module.exports = mongoose.model("Campground", campGroundSchema);
