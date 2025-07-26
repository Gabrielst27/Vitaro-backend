import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  AUTH_SERVICE,
  IAuthService,
} from '../application/auth.service.interface';
import { ErrorCodes } from '../../shared/domain/enums/error-codes.enum';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(@Inject(AUTH_SERVICE) private authService: IAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.getToken(request);
    if (!token) {
      throw new UnauthorizedException(ErrorCodes.TOKEN_NOT_PROVIDED);
    }
    try {
      request['user'] = await this.authService.verifyToken(token);
    } catch (error) {
      throw new UnauthorizedException(ErrorCodes.INVALID_TOKEN);
    }
    return true;
  }

  private getToken(request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
