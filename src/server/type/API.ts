/* Types */
import { AnySchema } from 'joi';
import { RequestHandler } from 'express';
import { HTTPMethod } from 'server/type/HTTP';

export type APIRoute = {
    method: HTTPMethod;
    url: string;
    schema?: AnySchema;
    controller: RequestHandler;
};
