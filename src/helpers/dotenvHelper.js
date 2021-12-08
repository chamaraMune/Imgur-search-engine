// eslint-disable-next-line import/no-anonymous-default-export
export default {
  accessValue: function (envKey, defaultValue) {
    const env  = process.env;
    return env[envKey] || defaultValue;
  },
}