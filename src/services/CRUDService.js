import bcrypt from 'bcryptjs';
import db from '../models/index';

const salt = bcrypt.genSaltSync(10);

const createNewUser = async (data) => {
  try {
    const hashPasswordFromBycrypt = await hashUserPassword(data.password);
    await db.User.create({
      email: data.email,
      password: hashPasswordFromBycrypt,
      firstName: data.firstName,
      lastName: data.lastName,
      address: data.address,
      phoneNumber: data.phoneNumber,
      gender: data.gender === '1' ? true : false,
      roleId: data.roleId,
    });
    return ('Success!');
  } catch (e) {
    console.log(e);
  }
};

const hashUserPassword = async (password) => {
  try {
    const hashPassword = await bcrypt.hashSync(password, salt);
    return hashPassword;
  } catch (e) {
    console.log(e);
  }
};

const getAllUser = async () => {
  try {
    const users = await db.User.findAll({
      raw: true,
    });
    return users;
  } catch (e) {
    console.log(e);
  }
};

const getUserInfoById = async (userId) => {
  try {
    const user = await db.User.findOne({
      where: { id: userId },
      raw: true,
    });
    if (user) {
      return user;
    } else {
      return {};
    }
  } catch (e) {
    console.log(e);
  }
};

const updateUserData = async (data) => {
  try {
    let user = await db.User.findOne({
      where: { id: data.id },
      raw: false
    });
    if (user) {
      user.set({
        firstName: data.firstName,
        lastName: data.lastName,
        address: data.address,
      });
      await user.save();
    }
  } catch (e) {
    console.log(e);
  }

  // try {
  //   let user = await db.User.findOne({
  //     where: { id: data.id },
  //     raw: false
  //   });
  //   if (user) {
  //     user.firstName = data.firstName
  //     user.lastName = data.lastName
  //     user.address = data.address
  //     await user.save()
  //   }
  // } catch (e) {
  //   console.log(e);
  // }
  
  // try {
  //   await db.User.upsert({
  //     id: data.id,
  //     firstName: data.firstName,
  //     lastName: data.lastName,
  //     address: data.address,
  //   });
  // } catch (e) {
  //   console.log(e);
  // }
};

const deleteUserById = async (userId) => {
  try {
    const user = await db.User.findOne({
      where: { id: userId },
    });
    if (user) {
      await user.destroy();
    }
    return('Success!')
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  createNewUser: createNewUser,
  getAllUser: getAllUser,
  getUserInfoById: getUserInfoById,
  updateUserData: updateUserData,
  deleteUserById: deleteUserById,
};
