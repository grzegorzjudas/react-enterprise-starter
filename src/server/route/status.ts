/* Types */
import { Request, Response } from 'express';
import { APIRoute } from 'server/type/API';
import { HTTPMethod } from 'server/type/HTTP';

/* Application files */
import { respondSuccess } from 'server/lib/http';

export default {
    method: HTTPMethod.GET,
    url: '/status',
    controller: async (req: Request, res: Response) => {
        return respondSuccess(res, { status: 'up' });
    }
} as APIRoute;
