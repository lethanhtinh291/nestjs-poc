import {ArgumentsHost, Catch, HttpException, HttpStatus,} from '@nestjs/common';
import {Response} from 'express';

@Catch()
export class HttpExceptionFilter extends HttpException {
	catch(exception: any, host: ArgumentsHost) {
		const context = host.switchToHttp();
		const response = context.getResponse<Response>();
		const request = context.getRequest<Request>();
		const status =
			exception instanceof HttpException
				? exception.getStatus()
				: HttpStatus.INTERNAL_SERVER_ERROR;

		response.status(status).json({
			error: {
				path: request.url,
				statusCode: status,
				message: exception.message,
				timestamp: new Date(),
			},
		});
	}
}
