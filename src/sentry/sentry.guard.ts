import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
const crypto = require('crypto');

@Injectable()
export class SentryGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();

		if (!verifySignature(request, process.env.SENTRY_API_SECRET)) {
			throw new UnauthorizedException()
		}

    return true;
  }
}

const verifySignature = (request: Request, secret: string) => {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(JSON.stringify(request.body), 'utf8');
	const digest = hmac.digest('hex');
  return digest === request.headers['sentry-hook-signature'];
}
