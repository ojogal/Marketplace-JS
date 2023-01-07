import { Device } from '../models/models.js';
import ApiError from '../error/apiError.js';

class DeviceController {
  async index(req, res) {
    const { name, price, brandId, typeId, info } = req.body;
    const { img } = req.files;
  };

  async show(req, res) {

  };

  async create(req, res) {

  }
};

export default new DeviceController()