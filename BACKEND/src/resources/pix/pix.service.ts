import { getRepository } from "typeorm";
import { encodeKey, decodeKey } from "../../utils/pix";

import { User } from "../../entity/user";
import { Pix } from "../../entity/pix";
import AppError from "../../shared/error/AppError";
import { open } from "inspector";


export default class PixService {


    async request(value: number, user: Partial<User>){

        const pixRepository = getRepository(Pix);

        const userRepository = getRepository(User);

        const currentUser = await userRepository.findOne({where: {id: user.id}});

        const requestData = {
            requestingUser = currentUser,
            value,
            status: 'open',
        };

        const register = await pixRepository.save(requestData);

        const key = encodeKey(user.id || '', value, register.id);

        return key;

    }

    async pay(key: string, user: Partial<User>) {

        const keyDecoded = decodeKey(key);

        const existUser = await userRepository.findOne({where: {email: user.email}});

        if(keyDecoded.userId === user.id) {
            throw new AppError("Error: Pix para o mesmo usuario", 401);
        }

        const pixRepository = getRepository(Pix);

        const userRepository = getRepository(User);

        const requestingUser = await userRepository.findOne({where: {id: keyDecoded.userId}});

        const payingUser = await userRepository.findOne({where: {id: user.id}});

        if(payingUser?.wallet && payingUser.wallet < Number(keyDecoded.value)) {
            throw new AppError("Sem saldo suficiente", 401);
        }

        if(!requestingUser || !payingUser) {
            throw new AppError("Cliente não existe", 401);
        }

        requestingUser.wallet = Number(requestingUser?.wallet) + Number(keyDecoded.value);

        await userRepository.save(requestingUser);

        payingUser.wallet = Number(payingUser?.wallet) + Number(keyDecoded.value);

        await userRepository.save(payingUser);

        const pixTransaction = await pixRepository.findOne({where: {id: keyDecoded.registerId,
         status: 'open'}});

         if(!pixTransaction) {
            throw new AppError("Chave invalida", 401);
        }
        
        pixTransaction.status = 'close';

        pixTransaction.payingUser = payingUser;

        await pixRepository.save(pixTransaction);

        return { msg: "Pagamento efetuado com sucesso!" };

    }

}