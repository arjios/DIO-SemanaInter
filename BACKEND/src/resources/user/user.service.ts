import { getRepository } from "typeorm";
import { User } from "../../entity/user";
import { sign } from 'jsonwebtoken';
import authConfig from '../../config/auth';
import AppError from "../../shared/error/AppError";
import md5 from 'crypto-js/md5';

//const md5 = require('crypto.js');

import { UserSignIn } from "./dtos/user.signin.dtos";
import { UserSignUp } from "./dtos/user.signup.dtos ";

export default class UserService {


    async signin(user: UserSignIn){

        const userRepository = getRepository(User);

        const {email, password} = user;

        const passwordHash = md5(password).toString();

        const existUser = await userRepository.findOne({where: {email, password: passwordHash}});

        if(!existUser) {
            throw new AppError("User not found", 401);
        }

        const { secret, expireIn } = authConfig.jwt;

        const token = sign({
            firstName = existUser.firstName,
            lastName = existUser.lastName,
            accountNumber = existUser.accountNumber,
            accountDigit = existUser.accountDigit,
            walet = existUser.wallet
        },
        secret, { 
            subject: existUser.id, expireIn,
        });

        delete existUser.password;

        return { accessToken: token };
    }

    async signup(user: UserSignUp){

    }

}