import db from '../models';

const getTopDoctorHome = async (limit) => {
	try {
		const users = await db.User.findAll({
			where: { roleId: 'R2' },
			limit: limit,
			order: [['createdAt', 'DESC']],
			attributes: {
				exclude: ['password'],
			},
			include: [
				{ model: db.Allcode, as: 'genderData', attributes: ['valueEn', 'valueVi'] },
				{ model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
			],
			raw: true,
			nest: true,
		});
		return {
			errCode: 0,
			data: users,
		};
	} catch (e) {
		console.log(e);
		return {
			errCode: -1,
			errMessage: 'Error',
		};
	}
};

const getAllDoctorsService = async () => {
	try {
		const doctors = await db.User.findAll({
			where: { roleId: 'R2' },
			attributes: {
				exclude: ['password', 'image'],
			},
		});
		return {
			errCode: 0,
			data: doctors,
		};
	} catch (e) {
		console.log(e);
		return {
			errCode: -1,
			errMessage: 'Error',
		};
	}
};

const saveInfoDoctorService = async (inputData) => {
	try {
		if (!inputData.doctorId || !inputData.contentHTML || !inputData.contentMarkdown || !inputData.action) {
			return {
				errCode: 1,
				errMessage: 'Missing parameter',
			};
		} else {
			if (inputData.action === 'CREATE') {
				await db.Markdown.create({
					doctorId: inputData.doctorId,
					contentHTML: inputData.contentHTML,
					contentMarkdown: inputData.contentMarkdown,
					description: inputData.description,
				});
			}
			if (inputData.action === 'EDIT') {
				const doctorMarkdown = await db.Markdown.findOne({
					where: { doctorId: inputData.doctorId },
					raw: false,
				});
				if (doctorMarkdown) {
					doctorMarkdown.set({
						contentHTML: inputData.contentHTML,
						contentMarkdown: inputData.contentMarkdown,
						description: inputData.description,
					});
          await doctorMarkdown.save()
				}
			}
			return {
				errCode: 0,
				errMessage: 'Save info doctor succeed!',
			};
		}
	} catch (e) {
		console.log(e);
		return {
			errCode: -1,
			errMessage: 'Error',
		};
	}
};

const getInfoDoctorByIdService = async (doctorId) => {
	try {
		if (!doctorId) {
			return {
				errCode: 1,
				errMessage: 'Missing parameter',
			};
		} else {
			let data = await db.User.findOne({
				where: { id: doctorId },
				attributes: {
					exclude: ['password'],
				},
				include: [
					{ model: db.Markdown, attributes: ['contentHTML', 'contentMarkdown', 'description'] },
					{ model: db.Allcode, as: 'positionData', attributes: ['valueEn', 'valueVi'] },
				],
				raw: true,
				nest: true,
			});

			if (!data) {
				data = {};
			}

			return {
				errCode: 0,
				data: data,
			};
		}
	} catch (e) {
		console.log(e);
		return {
			errCode: -1,
			errMessage: 'Error',
		};
	}
};

module.exports = {
	getTopDoctorHome: getTopDoctorHome,
	getAllDoctorsService: getAllDoctorsService,
	saveInfoDoctorService: saveInfoDoctorService,
	getInfoDoctorByIdService: getInfoDoctorByIdService,
};
