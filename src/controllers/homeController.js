import db from '../models/index';
import CRUDService from '../services/CRUDService';

const getHomePage = async (req, res) => {
  try {
    const data = await db.User.findAll();
    return res.render('homepage.ejs', {
      data: JSON.stringify(data),
    });
  } catch (e) {
    console.log(e);
  }
};

const createUser = async (req, res) => {
  return res.render('createUser.ejs');
};

const postUser = async (req, res) => {
  const message = await CRUDService.createNewUser(req.body);
  console.log(message);
  return res.redirect('/');
};

const displayUser = async (req, res) => {
  const data = await CRUDService.getAllUser();
  return res.render('display.ejs', {
    dataTable: data
  })
}

const editUser = async (req, res) => {
  const userId = req.query.id
  if (userId) {
    const userData = await CRUDService.getUserInfoById(userId)
    return res.render('editUser.ejs', {
      user: userData
    })
  } else {
    return res.send('User not found!')
  }
}

const putUser = async (req, res) => {
  const data = req.body
  await CRUDService.updateUserData(data);
  return res.redirect('/display-user');
}

const deleteUser = async (req, res) => {
  const userId = req.query.id;
  if (userId) {
    await CRUDService.deleteUserById(userId)
    return res.redirect('/display-user');
  } else {
    return res.send('User not found!')
  }
}

module.exports = {
  getHomePage: getHomePage,
  createUser: createUser,
  postUser: postUser,
  displayUser: displayUser,
  editUser: editUser,
  putUser: putUser,
  deleteUser: deleteUser,
};
