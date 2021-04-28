const webpack = require('webpack')

module.exports = {
    module: {
        rules: [
            // ... other rules omitted

            // this will apply to both plain `.scss` files
            // AND `<style lang="scss">` blocks in `.vue` files
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader',
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    'vue-loader',
                    'vue-svg-loader',
                ],
            }
        ]
    },
    // plugin omitted
    plugins: [
        new webpack.DefinePlugin({API_KEY: JSON.stringify(process.env.API_KEY || 'http://localhost:4000')})
    ]
}