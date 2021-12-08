import { Request, Response, Nextfunction } from 'express';
import AppError from '../shared/error/AppError';

function GlobalErrors(err: Error, request: Request, response: Response, next: Nextfunction) {

    if(err instanceof AppError) {
        response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
            data: err.data
        });
    }
    
    console.error(err);

    return Response.status(500).json({
        status: 'error',
        message: 'Internal server error'
    });

}

export { GlobalErrors };