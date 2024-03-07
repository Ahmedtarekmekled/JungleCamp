const mongoose = require("mongoose");
const { places, descriptors } = require("./seedHelpers");
const cities = require("./cities");
const Campground = require("../models/campground");

mongoose.connect("mongodb://127.0.0.1:27017/jungle-camp");
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const camp = async () => {
  await Campground.deleteMany({});
  for (i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const C = new Campground({
      author: "65d88f3c2517894715beb937",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      discription:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione voluptatum adipisci pariatur optio? Numquam repudiandae modi ea amet illum architecto, vitae earum, iusto beatae voluptas cumque ducimus temporibus, ab neque?",
      price: price,
      geometry: {
        type: "Point",
        coordinates: [
            cities[random1000].longitude,
            cities[random1000].latitude,
        ]
    },
      images: [
        {
          url: "https://res.cloudinary.com/dtgg0qwou/image/upload/v1709389482/JungleCamp/nah25rdadtplxyxwlkcm.jpg",
          filename: "JungleCamp/nah25rdadtplxyxwlkcm",
        },
        {
          url: "https://res.cloudinary.com/dtgg0qwou/image/upload/v1709389484/JungleCamp/w61nrcm2d3znreco9cul.jpg",
          filename: "JungleCamp/w61nrcm2d3znreco9cul",
        },
        {
          url: "https://res.cloudinary.com/dtgg0qwou/image/upload/v1709389485/JungleCamp/ckaiwyeharwuuziacdmo.jpg",
          filename: "JungleCamp/ckaiwyeharwuuziacdmo",
        },
      ],
    });
    await C.save();
  }
};

camp().then(() => {
  mongoose.connection.close();
});
