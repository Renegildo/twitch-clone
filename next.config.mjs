/** @type {import('next').NextConfig} */
const nextConfig = {
	webpack: (config) => {
		config.module.rules.push({
			test: /\.mjs$/,
			include: /node_modules/,
			type: "javascript/auto",
		});

		return config;
	},
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "utfs.io",
				port: "",
				pathname: "/f/**",
			},
			{
				protocol: "https",
				hostname: "img.clerk.com",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
