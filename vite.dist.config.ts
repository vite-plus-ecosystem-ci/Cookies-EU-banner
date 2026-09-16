import { defineConfig } from "vite-plus";
import { playwright } from "vite-plus/test/browser-playwright";

export default defineConfig({
	test: {
		clearMocks: false,
		browser: {
			locators: { exact: false },
			enabled: true,
			headless: true,
			screenshotFailures: false,
			provider: playwright(),
			instances: [{ browser: "chromium" }, { browser: "firefox" }, { browser: "webkit" }],
		},
		include: ["tests/dist.test.ts"],
	},
});
