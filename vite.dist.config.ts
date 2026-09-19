import { defineConfig } from "vite-plus";
import { playwright } from "vite-plus/test/browser-playwright";

export default defineConfig({
	test: {
		// Vitest v4 compatibility: preserve mock call history.
		// Remove after tests no longer rely on calls from setup or earlier tests.
		// https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
		clearMocks: false,
		browser: {
			locators: {
				// Vitest v4 compatibility: keep partial, case-insensitive locator matching.
				// Remove after updating locators for full, case-sensitive matches.
				// https://vitest.dev/guide/migration/#locators-are-strict-by-default
				exact: false,
			},
			enabled: true,
			headless: true,
			screenshotFailures: false,
			provider: playwright(),
			instances: [{ browser: "chromium" }, { browser: "firefox" }, { browser: "webkit" }],
		},
		include: ["tests/dist.test.ts"],
	},
});
