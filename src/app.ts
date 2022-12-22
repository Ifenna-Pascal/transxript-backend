import express from 'express';
import PreMiddleware from './middleware/premiddleware';
import routes from './routes/index';

// initialize app
const app = express();
// handling all premiddlewares
PreMiddleware(app);
// application route setup
app.use('/api/', routes);

export default app;
