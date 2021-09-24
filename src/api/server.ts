import app from '@src/api/app';
import '@src/api/mongodb/mongodb.database';
import log from '@src/api/logger/logger';

const server = app.listen(app.get('port'), app.get('host'), () => {
  log.info('Server is running');
});
