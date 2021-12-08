import { Request , Response } from 'express';

export class UserController {

    async signin(req: Request, res: Response) {
        return res.send("Entrando com o usuario: (Login)");
    }

    async signup(req: Request, res: Response) {
        return res.send("Criando com o usuario: (Register)");
    }

}
