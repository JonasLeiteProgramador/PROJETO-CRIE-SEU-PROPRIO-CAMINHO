import { Router } from 'express';
import { imageRoutes } from './images.routes.js';


const routes = Router();

routes.use('/images', imageRoutes);




routes.get('/', (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

export { routes };
