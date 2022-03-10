const compose = require("next-compose-plugins");

// --=[Transformers]=----------------------------------------------------------

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});
const withModules = require("next-transpile-modules")([
	"@taygo/abstract",
	"@taygo/config",
	"@taygo/primitives",
	"@taygo/protocol",
	"@taygo/sensors",
	"@taygo/theme",
	"@taygo/types",
	"@taygo/universal",
	"@taygo/utils",
]);
const withSvgr = require("next-svgr");

/** @type {import('next').NextConfig} */
module.exports = compose([withBundleAnalyzer, withModules, withSvgr], {
	reactStrictMode: true,
	swcMinify: process.env.STAGE === "production",
	compiler: {
		removeConsole: process.env.STAGE === "production",
		styledComponents: true,
	},
	async rewrites() {
		return [
			{
				source: "/",
				destination: "/home",
			},
		];
	},
});
