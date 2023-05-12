import doctorService from '../services/doctorServices';

const getTopDoctorHome = async (req, res) => {
	let limit = req.query.limit;
	if (!limit) {
		limit = 10;
	}
	const response = await doctorService.getTopDoctorHome(+limit);
	return res.status(200).json(response);
};

const getAllDoctors = async (req, res) => {
	const response = await doctorService.getAllDoctorsService();
	return res.status(200).json(response);
}

const saveInfoDoctor = async (req, res) => {
	const response = await doctorService.saveInfoDoctorService(req.body);
	return res.status(200).json(response);
}

const getInfoDoctorById = async (req, res) => {
	const response = await doctorService.getInfoDoctorByIdService(req.query.id);
	return res.status(200).json(response);
}

module.exports = {
	getTopDoctorHome: getTopDoctorHome,
	getAllDoctors: getAllDoctors,
	saveInfoDoctor: saveInfoDoctor,
	getInfoDoctorById: getInfoDoctorById
};
