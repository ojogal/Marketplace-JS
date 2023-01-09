import User from '../models/models.js';
import Basket from '../models/models.js';
import ApiError from "../error/apiError.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const generatedJWT = (id, email, role) => {
  return jwt.isgn(
          { id, email, role },
          process.env.SECRET_KEY,
          { expiresIn: '24h' }
        );
};

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
    const token = generatedJWT(user.id, user.email, user.role);
    return res.json(token)
  };

  async login(req, res, next) {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return next(ApiError.internal('User not found'))
    };

    let comparePassword = bcrypt.compareSync(password, user.password);

    if (!comparePassword) {
      return next(ApiError.internal('Wrong password'))
    };
    const token = generatedJWT(user.id, user.email, user.role);
    return res.json({ token })
  };

  async check(req, res, next) {
    // const { id } = req.body;

    // if (!id) {
    //   return next(ApiError.badRequest('No id'))
    // }

    const token = generatedJWT(req.user.id, req.user.email, req.user.role);
    res.json({ token })
  }
};

export default new UserController()