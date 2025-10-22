var merge = require('webpack-merge');
var webpack = require('webpack');

exports.default = {
    pre(options) {
        console.debug('pre');
    },
    config(cfg) {
        console.debug('config');
        return cfg;
    },
    post(options) {
        console.debug('post');
    }
    config: function(cfg) {
        const strategy = merge.strategy({
            'plugins': 'prepend'
        });

        return strategy (cfg, {
            plugins: [
                new webpack.DefinePlugin({
                    "VERSION": JSON.stringify("4711")
                })
            ]
        });
    }
}