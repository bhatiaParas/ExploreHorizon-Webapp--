const moongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelper');
const { default: mongoose } = require('mongoose');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelpcamp');
//useNewUrlParser: true,
//useCreateIndex: true,
//useUnifiedTopology: true


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 200; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '64231b0df2baf5531b5ba5b8',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },
            //https://res.cloudinary.com/dsfsiamms/image/upload/v1681665951/mt.-cook-cover_eexga3.jpg
            images: [
                {
                    url: 'https://res.cloudinary.com/dsfsiamms/image/upload/v1682690435/YelpCamp/qr054wvzkqvdt4ieojly.jpg',
                    filename: 'YelpCamp/sgnuf0zmtu8iaxpegu4x'
                },
                {
                    url: 'https://res.cloudinary.com/dsfsiamms/image/upload/v1680884110/YelpCamp/vvu1jobtqrd4x857v2yn.jpg',
                    filename: 'YelpCamp/vb93jo0xhpxbkxt5tslh'
                }
            ]
        })
        await camp.save();
    }
}
seedDB().then(() => {
    mongoose.connection.close();
})
