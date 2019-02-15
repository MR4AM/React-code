const path = require('path');
const node_modules = path.resolve(__dirname, 'node_modules');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const pxtorem = require('postcss-pxtorem');
const autoprefixer = require('autoprefixer');
const HappyPack = require('happypack');
const lessToJs = require('less-vars-to-js');
const fs = require('fs');


const app_theme = lessToJs(fs.readFileSync(path.join(__dirname, './src/theme/theme.less'), 'utf8'));

const svgDirs = [
  require.resolve('antd').replace(/warn\.js$/, ''),
  require.resolve('antd-mobile').replace(/warn\.js$/, ''), // 1. 属于 antd-mobile 内置 svg 文件
  // path.resolve(__dirname, 'src/my-project-svg-foler'),  // 2. 自己私人的 svg 存放目录
];

const dev_stg = (function(e){
  let obj = {
    dev:{
      extractText:true,//是否禁用样式抽离
      chunks: ['common.js', 'index'],//首页需要导入的文件
      devtool:"#eval-source-map",//制定文件格式为最快速文件格式
      debug:true//开启debug模式
    },
    stg:{
      extractText:false,//是否禁用样式抽离
      chunks: ['common.js', 'index','index.css'],//首页需要导入的文件
      devtool:false,//制定文件格式为最小体积文件格式
      debug:false//关闭debug模式
    }
  }
  if(e === 'dev' || e === 'loc'){
    return obj['dev'];
  }else{
    return obj['stg'];
  }
})(process.env.NODE_ENV)

//配置文件
const config = {
  entry: {
    index: './src/app/index.js',
  },
  output: {
    path: './dist',
    filename: '[name]-v_[chunkhash:8].js',
  },
  module: {
    loaders: [{
        test: /\.js?$/,
        loader: 'happypack/loader?id=js',
        exclude: /node_modules/,
        include: __dirname
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css!postcss')
      },
      {
        test: /\.less$/i,
        loader: ExtractTextPlugin.extract(
          'style', 'css!postcss!' +
          `less-loader?{"sourceMap":true,"modifyVars":${JSON.stringify(app_theme)}}`
        )
      },
      {
        test:/\.scss$/,
        loaders:['style-loader','css-loader','sass-loader'],
      },
      {
        test: /\.jpe?g$|\.gif$|\.png$/i,
        exclude: /node_modules/,
        loader: 'url?limit=8192&name=images/[hash:8].[name].[ext]'
      },
      {
        test: /\.(svg)$/i,
        loader: 'svg-sprite',
        include: svgDirs, // 把 svgDirs 路径下的所有 svg 文件交给 svg-sprite-loader 插件处理
      },
    ],
    noParse: []
  },
  externals: {},

  postcss: [
    autoprefixer({
      browsers: ['last 2 versions', 'Firefox ESR', '> 1%', 'ie >= 8', 'iOS >= 8', 'Android >= 4'],
    }),
    pxtorem({
      rootValue: 100,
      propWhiteList: [],
    }),

  ],
  resolve: {
    extensions: ['', '.web.js', '.js', '.jsx', '.json', '.css'],
    modulesDirectories: ['node_modules', path.join(__dirname, '../node_modules')],
    alias: {
      'components': path.join(__dirname, 'src/app/components'),
      'utils': path.join(__dirname, 'src/app/utils'),
      'pages': path.join(__dirname, 'src/app/pages'),
      'config': path.join(__dirname, 'src/app/config'),
      'assets': path.join(__dirname, 'src/app/assets'),
    }
  },
  debug: dev_stg.debug,
  devtool: dev_stg.devtool,
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('common.js'),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin([
      { from: './src/app/assets', to: 'assets' },
    ]),
    new webpack.DefinePlugin({
      "ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    new HtmlWebpackPlugin({
      chunks: dev_stg.chunks,
      // excludeChunks:['common.js','index'],
      showErrors: true,
      hash: true,
      template: 'src/index.html',
    }),
    new ExtractTextPlugin("[name].css", {
      disable: dev_stg.extractText,//抽离组件样式
      allChunks: true,
    }),
    new HappyPack({
      id: 'js',
      threads: 10,
      loaders: [{
        path: 'babel-loader',
        query: {
          presets: ['es2015', 'react', 'stage-1'],
          plugins: [
            "transform-runtime",
            "transform-decorators-legacy",
            "transform-class-properties", ["import", { libraryName: "antd-mobile", style: true }]
          ]
        }
      }]
    })
  ],devServer :{
    disableHostCheck:true,
    host: '0.0.0.0',
    port:90
  }
};
if (process.env.NODE_ENV == 'stage' || process.env.NODE_ENV == 'test') {
  config.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,//开启压缩
        output: {
          comments: false,  //去掉注释
        },
        compress: {
          warnings: false,
        }
      }),
      //引入第三方库
      new webpack.DllReferencePlugin({
        context: __dirname,
        /**
         * 在这里引入 manifest 文件
         */
        manifest: require('./dist/dll/vendor-manifest.json')
      })
    );
}
module.exports = config;
