import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { User } from '../user.entity'; // Adjust the import path based on your project structure
import { UserType } from '../user.type.enum';

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
