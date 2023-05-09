import db from '../models';
import bcrypt from 'bcryptjs';

const salt = bcrypt.genSaltSync(10);

const hashUserPassword = async (password) => {
	try {
		const hashPassword = await bcrypt.hashSync(password, salt);
		return hashPassword;
	} catch (e) {
		console.log(e);
	}
};

const handleUserLogin = async (email, password) => {
	try {
		const userData = {};
		const isExist = await checkUserEmail(email);
		if (isExist) {
			const user = await db.User.findOne({
				where: { email: email },
				attributes: ['email', 'password', 'roleId', 'firstName', 'lastName'],
				raw: true,
			});
			if (user) {
				const check = await bcrypt.compareSync(password, user.password);
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

const getAllUsers = async (userId) => {
	try {
		let users = '';
		if (!userId) {
			return {
				errCode: 1,
				errMessage: 'Missing required parameters',
				users: [],
			};
		}
		if (userId === 'ALL') {
			users = await db.User.findAll({
				attributes: {
					exclude: ['password'],
				},
			});
			return {
				errCode: 0,
				errMessage: 'OK',
				users,
			};
		}
		if (userId && userId !== 'ALL') {
			users = await db.User.findOne({
				where: { id: userId },
				attributes: {
					exclude: ['password'],
				},
			});
			return {
				errCode: 0,
				errMessage: 'OK',
				users,
			};
		}
	} catch (e) {
		console.log(e);
	}
};

const createNewUser = async (data) => {
	try {
		const check = await checkUserEmail(data.email);
		if (check === true) {
			return {
				errCode: 1,
				errMessage: 'Your email is already used',
			};
		} else {
			const hashPasswordFromBycrypt = await hashUserPassword(data.password);
			await db.User.create({
				email: data.email,
				password: hashPasswordFromBycrypt,
				firstName: data.firstName,
				lastName: data.lastName,
				address: data.address,
				phoneNumber: data.phoneNumber,
				gender: data.gender,
				positionId: data.position,
				roleId: data.role,
				image: data.avatar
			});
			return {
				errCode: 0,
				errMessage: 'OK',
			};
		}
	} catch (e) {
		console.log(e);
	}
};

const updateUserData = async (data) => {
	try {
		if (!data.id || !data.gender || !data.position || !data.role) {
			return {
				errCode: 2,
				errMessage: 'Missing required parameters',
			};
		}
		let user = await db.User.findOne({
			where: { id: data.id },
			raw: false,
		});
		if (user) {
			user.set({
				firstName: data.firstName,
				lastName: data.lastName,
				address: data.address,
				phoneNumber: data.phoneNumber,
				gender: data.gender,
				positionId: data.position,
				roleId: data.role,
			});
			if (data.avatar) {
				user.set({
					image: data.avatar
				});
			}
			await user.save();
			return {
				errCode: 0,
				errMessage: 'Update the user succeeds!',
			};
		} else {
			return {
				errCode: 1,
				errMessage: 'User not found',
			};
		}
	} catch (e) {
		console.log(e);
	}
};

const deleteUser = async (userId) => {
	try {
		if (!userId) {
			return {
				errCode: 1,
				errMessage: 'Missing required parameters',
			};
		}
		const user = await db.User.findOne({
			where: { id: userId },
			raw: false,
		});
		if (!user) {
			return {
				errCode: 2,
				errMessage: `The user isn't exist`,
			};
		}
		await user.destroy();
		// await db.User.destroy({
		// 	where: { id: userId },
		// });
		return {
			errCode: 0,
			errMessage: 'The user is deleted',
		};
	} catch (e) {
		console.log(e);
	}
};

const getAllCodeService = async (typeInput) => {
	try {
		if (!typeInput) {
			return {
				errCode: 1,
				errMessage: 'Missing required parameters!',
			};
		} else {
			const response = {};
			const allcode = await db.Allcode.findAll({
				where: { type: typeInput },
			});
			response.errCode = 0;
			response.data = allcode;
			return response;
		}
	} catch (e) {
		console.log(e);
	}
};

module.exports = {
	handleUserLogin: handleUserLogin,
	getAllUsers: getAllUsers,
	createNewUser: createNewUser,
	updateUserData: updateUserData,
	deleteUser: deleteUser,
	getAllCodeService: getAllCodeService,
};
