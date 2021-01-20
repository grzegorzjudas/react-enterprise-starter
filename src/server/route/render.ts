/* Types */
import { Request, Response } from 'express';
import { APIRoute } from 'server/type/API';
import { HTTPMethod } from 'server/type/HTTP';

/* Application files */
import { renderToString } from 'server/service/render';

export default {
    method: HTTPMethod.GET,
    url: '/*',
    controller: async (req: Request, res: Response) => {
        return res.send(renderToString(req.url));
    }
} as APIRoute;
