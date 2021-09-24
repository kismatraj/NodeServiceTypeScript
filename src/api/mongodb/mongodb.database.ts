import mongoose from 'mongoose';
import '@src/config/server.config';
import log from '@src/api/logger/logger';

const mongooseConnection = `mongodb://${process.env.MONGOOSE_HOST}:${process.env.MONGOOSE_PORT}/${process.env.MONGOOSE_DBNAME}`;
const options: mongoose.ConnectOptions = process.env
  .MONGOOSE_OPTIONS as mongoose.ConnectOptions;

mongoose.connect(mongooseConnection, options, () => {
  console.log('Mongoose connected to server');
});
const connection = mongoose.connection;

connection.on('connected', () => {
  log.info('Mongoose is connected to db');
});

connection.on('disconnected', () => {
  log.info('Mongoose disconnected to Db');
});

process.on('SIGINT', async () => {
  await connection.close();
  process.exit(0);
});

export default mongoose;
