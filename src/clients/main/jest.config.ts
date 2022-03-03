import { default as NJ } from "next/jest";

const createJestConfig = NJ({
	dir: "./",
});

const config = {
	setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
	moduleNameMapper: {
		"^@eden/client.main/(.*)$": [
			"<rootDir>/src/$1",
			"<rootDir>/src/components/$1",
		],
	},
	testEnvironment: "jest-environment-jsdom",
};

export default createJestConfig(config);
