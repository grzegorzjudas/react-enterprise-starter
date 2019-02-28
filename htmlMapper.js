const HtmlLoader = require('html-loader');

module.exports = {
    process: (src) => {
        return HtmlLoader(src);
    }
};
