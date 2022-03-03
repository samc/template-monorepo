const compose = require("next-compose-plugins");

// --=[Transformers]=----------------------------------------------------------

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});
const withModules = require("next-transpile-modules")([
	"@eden/abstract",
	"@eden/config",
	"@eden/primitives",
	"@eden/protocol",
	"@eden/sensors",
	"@eden/theme",
	"@eden/types",
	"@eden/universal",
	"@eden/utils",
]);
const withSvgr = require("next-svgr");

/** @type {import('next').NextConfig} */
module.exports = compose([withBundleAnalyzer, withModules, withSvgr], {
	reactStrictMode: true,
	swcMinify: process.env.STAGE === "production",
	compiler: {
		relay: {
			src: "./src",
			artifactDirectory: "./.tina/__generated__",
			language: "typescript",
		},
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
