import userService from '../services/userService';

const handleLogin = async (req, res) => {
	const email = req.body.email;
	const password = req.body.password;

	if (!email || !password) {
		return res.status(500).json({
			errCode: 1,
			errMessage: 'Missing inputs parameter',
		});
	}

	const userData = await userService.handleUserLogin(email, password);

	return res.status(200).json({
		errCode: userData.errCode,
		errMessage: userData.errMessage,
		user: userData.user ? userData.user : {},
	});
};

const handleGetAllUsers = async (req, res) => {
	const id = req.query.id;

	if (!id) {
		return res.status(200).json({
			errCode: 1,
			errMessage: 'Missing required parameters',
			users: [],
		});
	}

	const users = await userService.getAllUsers(id);

	return res.status(200).json({
		errCode: 0,
		errMessage: 'OK',
		users
	});
};

const handleCreateNewUser = async (req, res) => {
	const message = await userService.createNewUser(req.body)
	return res.status(200).json(message)
}

const handleEditUser = async (req, res) => {
  const data = req.body
  const message = await userService.updateUserData(data);
  return res.status(200).json(message)
}

const handleDeleteUser = async (req, res) => {
	const message = await userService.deleteUser(req.body.id)
	return res.status(200).json(message)
}

const getAllCode = async (req, res) => {
	try {
		setTimeout(async () => {
			const data = await userService.getAllCodeService(req.query.type)
			return res.status(200).json(data)
		}, 0)
	} catch (e) {
		return res.status(200).json({
			errCode: -1,
			errMessage: "Error from server"
		})
	}
}

module.exports = {
	handleLogin: handleLogin,
	handleGetAllUsers: handleGetAllUsers,
	handleCreateNewUser: handleCreateNewUser,
	handleEditUser: handleEditUser,
	handleDeleteUser: handleDeleteUser,
	getAllCode: getAllCode,
};
