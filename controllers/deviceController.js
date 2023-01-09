import Device from '../models/models.js';
import DeviceInfo from '../models/models.js';
import ApiError from '../error/apiError.js';
import { UUID } from 'sequelize';
import path from 'path';

class DeviceController {
  async index(req, res, next) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;

    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset })
    };

    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
    };

    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
    };

    if (brandId && typeId) {
      devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset })
    };
    return res.json(devices)
  };

  async show(req, res) {
    const { id } = req.params;
    const device = await Device.findOne(
      {
        where: { id },
        include: [ { model: DeviceInfo, as: 'info' } ]
      }
    );
    return res.json(device)
  };

  async create(req, res, next) {
    try {
      let { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;
      let fileName = UUID.v4() + '.jpg';
      img.mv(path.resolve(__dirname, '..', 'static', fileName));
      const device = await Device.create({ name, price, brandId, typeId, img: fileName });

      if (info) {
        info = JSON.parse(info);
        info.forEach(i => DeviceInfo.create({
          title: i.title,
          description: i.description,
          deviceId: device.id
        }))
      };

      return res.json(device)
    } catch (e) {
      next(ApiError.badRequest(e.message))
    }
  }
};

export default new DeviceController()