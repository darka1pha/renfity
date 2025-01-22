import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { UserType } from '../../user/enum/user.type.enum';
import { User } from 'src/user/user.entity';

@Injectable()
export class AgencyGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const user: User = request.user;

    if (!user || user.type !== UserType.AGENCY) {
      throw new ForbiddenException('Access restricted to agency users only');
    }

    return true;
  }
}
