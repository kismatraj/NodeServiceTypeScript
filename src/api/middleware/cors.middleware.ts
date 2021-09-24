import cors, { CorsOptions } from 'cors';

const allowlist = ['http://localhost:4000/', 'http://localhost:5000/'];

const corsOptions: CorsOptions = {
  allowedHeaders: [
    'origin',
    'X-Requested-With',
    'Content-Type',
    'Accept',
    'X-Access-Token',
  ],
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  preflightContinue: false,
  optionsSuccessStatus: 200,
  origin: 'http://localhost:4000/',
};

export default cors(corsOptions);
