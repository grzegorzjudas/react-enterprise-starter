/* Models */
import { APIRoute, Request, Response } from 'server/model/API';
import { HTTPMethod } from 'server/model/HTTP';

/* Application files */
import { renderToString } from 'server/service/render';

export default {
    method: HTTPMethod.GET,
    url: '/',
    controller: async (req: Request, res: Response) => {
        return res.send(renderToString());
    }
} as APIRoute;
