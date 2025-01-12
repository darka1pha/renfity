import { User } from './user.entity';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (_, req: ExecutionContext): User => {
    const user = req.switchToHttp().getRequest().user;
    return user;
  },
);
