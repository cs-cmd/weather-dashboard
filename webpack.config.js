import { resolve } from 'path';

module.exports = {
    entry:'./src/js/driver.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
    },
}