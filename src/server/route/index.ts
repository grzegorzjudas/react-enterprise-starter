/* Models */
import { APIRoute } from 'server/model/API';

/* Application files */
import render from './render';
import status from './status';

export default [
    render,
    status
] as APIRoute[];
