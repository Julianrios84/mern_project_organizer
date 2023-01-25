import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

const database = async () => {
  try {
    const mongo = await mongoose.connect(
      process.env.MONGO_URL,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true
      }
    );

    const url = `${mongo.connection.host}:${mongo.connection.port}`;
    console.log(`Mongo conectado en ${url}`);
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1);
  }
};

export default database;
