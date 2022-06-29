const path = require('path'); // подключаем path к конфигу вебпак

const HtmlWebpackPlugin = require('html-webpack-plugin'); // подключите плагин

const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин

const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  mode: "development", // "production" | "development" | "none"
  // Chosen mode tells webpack to use its built-in optimizations accordingly.
  entry: {
    main: "./src/pages/index.js"
  }, // string | object | array
  // defaults to ./src
  // Here the application starts executing
  // and webpack starts bundling
  output: {
    // options related to how webpack emits results
    path:path.resolve(__dirname, "dist"), // string (default)
    filename: 'main.js',
    publicPath: ''
  },
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    open: true // сайт будет открываться сам при запуске npm run dev
  },
    module: {
    rules: [ 
      // добавим в него объект правил для бабеля
      {
        // регулярное выражение, которое ищет все js файлы
        test: /\.js$/,
        // при обработке этих файлов нужно использовать babel-loader
        use: 'babel-loader',
        // исключает папку node_modules, файлы в ней обрабатывать не нужно
        exclude: '/node_modules/'
      },
      // добавили правило для обработки файлов
      {
        // регулярное выражение для картинок
        test: /\.(png|svg|jpg|gif)$/,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]'
        }
      },
      {
        // загрука HTML loader - чтобы не менять картинки в src="<%=require('./images/logo.svg')%>"
        test: /\.html?$/,
        use: ['html-loader']
      },
      {
      // регулярное выражение для шрифтов
      test: /\.(woff(2)?|eot|ttf|otf)$/,
      type: 'asset/resource',
      generator: {
        filename: 'fonts/[name].[hash][ext]'
      }
      },
      {
        // применять это правило только к CSS-файлам
        test: /\.css$/,
        // при обработке этих файлов нужно использовать
        // MiniCssExtractPlugin.loader и css-loader
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          // если используется import в CSS
          options: { importLoaders: 1 }
        }, // Добавьте postcss-loader
          'postcss-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html' // путь к файлу index.html
  }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin() // подключение плагина для объединения файлов
  ]
};