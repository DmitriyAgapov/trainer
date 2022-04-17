/** @type {import('next').NextConfig} */
const path = require('path')
const withReactSvg = require('next-react-svg')


const {withKeystone} = require("@keystone-6/core/next");

module.exports = withKeystone(
    withReactSvg({
        include: path.resolve(__dirname, 'public/files'),
        reactStrictMode: true,
        images: {
            // domains: ['*'],
            deviceSizes: [360, 768, 1024, 1440, 1920],
            imageSizes: [16, 240, 480, 720, 1024],
            minimumCacheTTL: 60,
            formats: ['image/avif', 'image/webp' ],
            dangerouslyAllowSVG: true,
            contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        },
        sassOptions: {
            includePaths: [path.join(__dirname, 'assets/styles')],
        },
        // async rewrites() {
        //     return [
        //         {
        //             source: '/admin',
        //             destination: 'http://localhost:3001',
        //         },
        //     ]
        // },
        // plugins: ['macros'],
        // 'fontawesome-svg-core': {
        //     'license': 'free'
        // },
        // images: {
        //     dangerouslyAllowSVG: true,
        //     contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
        // },
    }
))