const path = require('path');

module.exports = (env,argv) =>{
    const isDevelopment = argv.mode.trim() === 'development';

    return {
        entry:{
            main: "./server.js",  // Entry point of the express server
        },
        output:{
            path: path.resolve(__dirname, isDevelopment ? 'dist-dev':'dist-prod'),  // Output directory based on mode
            publicPath: "/",
            filename: '[name].js', // Output file name
            clean: true,
        },
        mode: isDevelopment ? 'development' : 'production',
        target: 'node',
        module:{
            rules:[
                // JavaScript/JSX files
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                    loader: 'babel-loader', // Use Babel loader to transpile JavaScript
                    options: {
                        presets: ['@babel/preset-env'],
                    },
                    },
                },
                // CSS files
                {
                    test: /\.css$/,
                    use: ['style-loader', 'css-loader'], // Use style-loader and css-loader to handle CSS files
                },
            ],
        },
        devServer:{
            contentBase: path.resolve(__dirname, 'dev-dist'), // Serve files from the dist directory
            port: 3000, // Specify the port for the development server
        },
    }
}