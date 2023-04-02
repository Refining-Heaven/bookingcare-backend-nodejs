import db from '../models';
import bcrypt from 'bcryptjs';

const handleUserLogin = async (email, password) => {
	try {
		const userData = {};
		const isExist = await checkUserEmail(email);
		if (isExist) {
			const user = await db.User.findOne({
				where: { email: email },
        attributes: ['email', 'password', 'roleId'],
        raw: true
			});
			if (user) {
        const check = await bcrypt.compareSync(password, user.password)
        if (check) {
          userData.errCode = 0;
          userData.errMessage = 'Ok';
          delete user.password;
          userData.user = user;
        } else {
          userData.errCode = 3;
          userData.errMessage = 'Wrong password';
        }
			} else {
				userData.errCode = 2;
				userData.errMessage = `User not found`;
			}
		} else {
			userData.errCode = 1;
			userData.errMessage = `Your Email isn't exist in our system`;
		}
    return userData;
	} catch (e) {
		console.log(e);
	}
};

const checkUserEmail = async (userEmail) => {
	try {
		const user = await db.User.findOne({
			where: { email: userEmail },
		});
		if (user) {
			return true;
		} else {
			return false;
		}
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	handleUserLogin: handleUserLogin,
};
