module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Yummy - Tummy'
                return args
            })
    }
}
