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
  for (let i = 0; i < 300; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 20) + 10;
    const camp = new Campground({
      author: '5f8d77fc62a1105d41bd8c80',
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      geometry: {
        type: 'Point',
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
      images: [
        {
          url:
            'https://res.cloudinary.com/photouploarder/image/upload/v1603281625/YelpCamp/zwwiobtn7y4rawv0bwva.jpg',
          filename: 'YelpCamp/zwwiobtn7y4rawv0bwva',
        },
        {
          url:
            'https://res.cloudinary.com/photouploarder/image/upload/v1603281625/YelpCamp/nadrxvqcorfu9kzblzw3.jpg',
          filename: 'YelpCamp/nadrxvqcorfu9kzblzw3',
        },
        {
          url:
            'https://res.cloudinary.com/photouploarder/image/upload/v1603282045/YelpCamp/crkaqsa1b0ln3uwv6cud.jpg',
          filename: 'YelpCamp/crkaqsa1b0ln3uwv6cud',
        },
        {
          url:
            'https://res.cloudinary.com/photouploarder/image/upload/v1603282045/YelpCamp/nbp6sylj5pglsqxlns3q.jpg',
          filename: 'YelpCamp/nbp6sylj5pglsqxlns3q',
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
