export default function () {
    return [ (req, res, next) => {
        res.set('Access-Control-Allow-Origin', req.headers.origin || req.headers.host);
        res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
        res.set('Access-Control-Allow-Headers', req.headers['access-control-request-headers'] || '*');

        return next();
    } ];
}
