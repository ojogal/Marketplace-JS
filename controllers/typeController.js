import Type from '../models/models.js'
import ApiError from '../error/apiError.js';

class TypeController {
  async index(req, res) {
    const { name } = req.body;
    const type = await Type.create({ name });
    return res.json(type)
  };

  async create(req, res) {
    
  }
};

export default new TypeController()