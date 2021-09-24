import dotenv from 'dotenv';

// dotenv.config({
//   allowEmptyValues: true,
//   example: './src/config/.env.example',
// });

const result = dotenv.config({ path: './src/config/.env' });
if (result.error) {
  throw result.error;
}
const { parsed: envs } = result;

export default envs;
