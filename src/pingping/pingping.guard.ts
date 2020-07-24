import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class PingpingGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest();
		const allowedIp = process.env.PINGPING_API_ALLOWED_IP;

		if (allowedIp && allowedIp !== request.ip) {
			throw new UnauthorizedException()
		}

    return true;
  }
}
