module.exports = (function () {

    function Env(options) {
        var envFolderPath,
            envFilePath = options.envFilePath || '../../../env.js',
            env = options.env,
            envData = {},
            envLocalData = {};

        envLocalData = require(`${envFilePath}`);

        if ( ! env) {
            env = envLocalData[options.envVar || 'APP_ENV'];
        }

        if (env) {
            envFolderPath = (options.envFolderPath || '../../../src/env') + '/' + env + '.js';
            envData = require(`${envFolderPath}`);
        }

        this.data = Object.assign(envData, envLocalData);
    }

    Env.prototype.get = function (key, def) {
        return this.data[key] || def;
    };

    Env.prototype.set = function (key, val) {
        var i;

        if (typeof key === 'object') {
            for (i in key) {
                this.data[i] = key[i];
            }
        }
        else {
            this.data[key] = val;
        }
    };

    return function install(Vue, options) {
        Vue.prototype.$env = new Env(options || {});
    }

})();