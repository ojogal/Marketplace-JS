import User from '../models/models.js';
import Basket from '../models/models.js';
import ApiError from "../error/apiError.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest('Incorrect email or password'))
    };

    const candidate = await User.findOne({ where: { email } });

    if (candidate) {
      return next(ApiError.badRequest('User already exists'))
    };

    const hashPassword = await bcrypt.hash(password, 5);
    const user = await User.create({ email, role, password: hashPassword });
    const basket = await Basket.create({ userId: user.id });
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