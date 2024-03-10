const mongoose = require('mongoose');
const db = require('./config/connection');
const User = require('./models/User');
const Thought = require('./models/Thought');

const seedDatabase = async () => {
  await mongoose.connect('mongodb://127.0.0.1:27017/socialNetworkDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log('MongoDB connected');

  await User.deleteMany({});
  await Thought.deleteMany({});

  // Insert users
  const users = await User.insertMany([
    { username: 'RajKoothrappali', email: 'rajkoothrappali@example.com' },
    { username: 'HowardWolowitz', email: 'howardwolowitz@example.com' },
  ]);

  console.log('Users seeded');

  const thoughts = await Thought.insertMany([
    {
      thoughtText: 'I love studying the stars!🌟',
      username: users[0].username,
      userId: users[0]._id,
    },
    {
      thoughtText: 'Did I mention I am an astronaut?🚀',
      username: users[1].username,
      userId: users[1]._id,
    },
  ]);

  console.log('Thoughts seeded');

  // update users to include thoughts in their thoughts array
  await User.findByIdAndUpdate(users[0]._id, {
    $push: { thoughts: thoughts[0]._id },
  });
  await User.findByIdAndUpdate(users[1]._id, {
    $push: { thoughts: thoughts[1]._id },
  });

  console.log('Users updated with thoughts');

  
  await db.close();
  console.log('Database seeded! 🌱');
};

seedDatabase().catch(console.error);

