import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from 'src/user/user.entity';

export const GetUser = createParamDecorator(
  (_, req: ExecutionContext): User => {
    const user = req.switchToHttp().getRequest().user;
    return user;
  },
);
