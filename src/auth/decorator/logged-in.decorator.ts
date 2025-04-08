import { createParamDecorator, ExecutionContext } from '@nestjs/common';

/**
 * This decorator is used to get the current user from the request object
 */
export const LoggedInUser = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
