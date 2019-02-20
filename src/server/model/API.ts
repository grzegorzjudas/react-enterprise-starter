/* Models */
import { SchemaLike } from 'joi';
import {RequestHandler, Request as ExpressRequest, Response as ExpressResponse } from 'express';
import { HTTPMethod } from './HTTP';

export type APIRoute = {
    method: HTTPMethod;
    url: string;
    schema?: SchemaLike;
    controller: RequestHandler;
};

export interface Request extends ExpressRequest {
}

export interface Response extends ExpressResponse {
}
