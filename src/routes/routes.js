import express from 'express';
import homeController from '../controllers/homeController';

const router = express.Router();

const initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/create-user', homeController.createUser);
  router.get('/display-user', homeController.displayUser)
  router.get('/edit-user', homeController.editUser);
  router.get('/delete-user', homeController.deleteUser);

  router.post('/post-user', homeController.postUser);
  router.post('/put-user', homeController.putUser);

  return app.use('/', router);
};

module.exports = initWebRoutes;
