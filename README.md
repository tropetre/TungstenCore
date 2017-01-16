# TungstenCore
This is the ASP.NET Core Version of Tungsten Learning.
It features Webpack bundling, Hot Module Replacement, Serverside Pre-rendering and more!

## Prerequisites
.NET Core SDK >= 1.0.1 (With Tooling)

Node.js >= 4.0

## Building
Before building the vendor-specific scripts need to be bundled. To bundle the files run: 
> webpack --config webpack.config.vendor.js

Make sure the folder is correct!

Should WebPack not run simply install it globally on the system by running: 
> npm install -g webpack

