# TungstenCore
This is the ASP.NET Core Version of Tungsten Learning.
It features Webpack bundling, Hot Module Replacement, Serverside Pre-rendering and more!

## Building
In order to build you will need to have the .NET Core SDK and Tooling along with Node version >=4.0.
Before building the vendor-specific scripts need to be bundled using: "webpack --config webpack.config.vendor.js"
Should WebPack not run simply install it globally on the system using "npm install webpack -g"
