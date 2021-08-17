const path = require('path')

module.exports = {
    publicPath: './', // 基本路径
    // outputDir: 'dist/js', // 输出文件目录
    lintOnSave: false, // eslint-loader 是否在保存的时候检查
    devServer: {
        hot: true
    },
    pages: {
        explore: {
            entry: "./src/main.js",
            template: "public/index.html",
            filename: "index.html",
            chunks: ["chunk-vendors", "chunk-common", "explore"]
        },
        editor: {
            entry: "./src/editor.js",
            template: "public/editor.html",
            filename: "editor.html",
            chunks: ["chunk-vendors", "chunk-common", "editor"]
        }
    },
    chainWebpack: config => {
        config.output
            .filename("js/[name]-bundle.js")
            .end();
        // 修复HMR
        config.resolve.symlinks(true);
        // 别名配置
        config.resolve.alias
            .set('@', path.resolve(__dirname, './src'))
            .set('@a', path.resolve(__dirname, './src/assets'))
            .set('@c', path.resolve(__dirname, './src/components'))
            .set('@p', path.resolve(__dirname, './src/pages'))
            .set('@s', path.resolve(__dirname, './src/store'))
            .set('$', 'jquery/dist/jquery.min.js');
        config.module
            .rule('svg')
            .exclude.add(path.resolve('./src/assets/icon'))
            .end();
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .use('html-loader')
            .loader('html-loader');
        config
            .plugin('MiniCssExtractPlugin')
            .use(require.resolve('mini-css-extract-plugin'), [{ filename: './css/[name]-bundle.css' }])
            // config.module
            //     .rule('pics')
            //     .test(/\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2)(\?.+)?$/)
            //     .use('file-loader')
            //     .loader('file-loader')
            //     .options({
            //         limit: 10000,
            //         outputPath: '../assets',
            //         name: '[name].[ext]'                
            //     })
            // .options({
            //     minimize: true
            // })
            // .use([{
            //     loader: 'html-loader',
            //     options: {
            //         minimize: true
            //     }
            // }])
            // .test(/\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2)(\?.+)?$/)
            // .loader('file-loader')
            // .use([{
            //     loader: 'file-loader',
            //     options: {
            //         limit: 10000,
            //         outputPath: '../assets',
            //         name: '[name].[ext]'
            //     }
            // }])
            // .end()
    },
    configureWebpack: (config) => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config.mode = 'production'
        } else {
            // 为开发环境修改配置...
            config.mode = 'development'
            config.devtool = 'source-map'
        }
        // Object.assign(config, {
        //     // 开发生产共同配置
        //     resolve: {
        //         alias: {
        //             '@': path.resolve(__dirname, './src'),
        //             '@c': path.resolve(__dirname, './src/components'),
        //             '@p': path.resolve(__dirname, './src/pages')
        //         } // 别名配置
        //     }
        // })
    },
    productionSourceMap: false, // 生产环境是否生成sourceMap文件
    // css相关配置
    css: {
        extract: true, // 是否使用css分离插件 ExtractTextPlugin
        sourceMap: false, // 开启 CSS source maps?
        loaderOptions: {
            css: {}, // 这里的选项会传递给 css-loader
            // postcss: {} // 这里的选项会传递给 postcss-loader
        }, // css预设器配置项 详见https://cli.vuejs.org/zh/config/#css-loaderoptions
        modules: false // 启用 CSS modules for all css / pre-processor files.
    }
}