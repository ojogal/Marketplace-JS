import { User } from '../models/models.js';
import ApiError from "../error/apiError.js";

class UserController {
  async registration(req, res) {

  };

  async login(req, res) {

  };

  async check(req, res, next) {
    const { id } = req.body;

    if (!id) {
      return next(ApiError.badRequest('No id'))
    }
  }
};

export default new UserController()