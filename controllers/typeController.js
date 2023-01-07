import Type from '../models/models.js';
import ApiError from '../error/apiError.js';

class TypeController {
  async index(req, res) {
    const types = await Type.findAll();
    return res.json(types)
  };

  async create(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type)
  }
};

export default new TypeController()