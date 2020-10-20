const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
require('dotenv').config();

const Campground = require('../models/campground');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Database connected');
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '5f8d77fc62a1105d41bd8c80',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: { type: 'Point', coordinates: [-122.3301, 47.6038] },
      images: [
        {
          url:
            'https://res.cloudinary.com/photouploarder/image/upload/v1603173183/YelpCamp/lrxv0yqg1vvtxtgprweb.jpg',
          filename: 'YelpCamp/lrxv0yqg1vvtxtgprweb',
        },
        {
          url:
            'https://res.cloudinary.com/photouploarder/image/upload/v1603173182/YelpCamp/re12bxzzhkasaxk2tvw7.jpg',
          filename: 'YelpCamp/re12bxzzhkasaxk2tvw7',
        },
      ],
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente harum perferendis amet ipsam doloremque ipsum sit aliquid dolore totam tempore debitis eligendi nostrum repellat, autem, blanditiis repudiandae repellendus. Voluptatem, magni.',
      price,
    });
    await camp.save();
  }
};

seedDB().then(() => {
  mongoose.connection.close();
});
