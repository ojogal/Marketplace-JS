import Device from '../models/models.js';
import ApiError from '../error/apiError.js';
import { UUID } from 'sequelize';
import path from 'path';

class DeviceController {
  async index(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = UUID.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const device = await Device.create({ name, price, brandId, typeId, img: fileName });
      return res.json(device)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  };

  async show(req, res) {

  };

  async create(req, res) {

  }
};

export default new DeviceController()