import express from 'express';
import homeController from '../controllers/homeController';
import userController from '../controllers/userController'

const router = express.Router();

const initWebRoutes = (app) => {
  router.get('/', homeController.getHomePage);
  router.get('/create-user', homeController.createUser);
  router.get('/display-user', homeController.displayUser)
  router.get('/edit-user', homeController.editUser);
  router.get('/delete-user', homeController.deleteUser);

  router.post('/post-user', homeController.postUser);
  router.post('/put-user', homeController.putUser);

  router.post('/api/login', userController.handleLogin)

  return app.use('/', router);
};

module.exports = initWebRoutes;
