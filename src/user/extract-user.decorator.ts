import { createParamDecorator, ExecutionContext, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

export const ExtractUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1]; // Remove 'Bearer ' prefix
    const jwtService = new JwtService(); // Create an instance
    return jwtService.decode(token); // Decode token
  },
);
