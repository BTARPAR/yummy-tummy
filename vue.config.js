module.exports = {
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = 'Yummy - Tummy'
                return args
            })

        config
            .plugin("define").tap((args) => {
            const _base = args[0]["process.env"];
            args[0]["process.env"] = {
                ..._base,
                "URL": JSON.stringify(process.env.API_KEY || 'http://localhost:4000'),
            };
            return args;
        });
    }
}
