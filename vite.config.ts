import { defineConfig, defaultExclude } from "vite-plus";
import { playwright } from "vite-plus/test/browser-playwright";

const OUTPUT_BASE_FILE_NAME = "cookies-eu-banner";

export default defineConfig({
	pack: [
		{
			deps: {
				// tsdown <0.23 compatibility: resolve external dependency subpaths.
				// Remove to preserve subpath imports as written (the new default).
				// https://tsdown.dev/options/dependencies#deps-resolvedepsubpath
				resolveDepSubpath: true,
			},
			entry: {
				[OUTPUT_BASE_FILE_NAME]: `src/index.ts`,
			},
			platform: "browser",
		},

		{
			deps: {
				// tsdown <0.23 compatibility: resolve external dependency subpaths.
				// Remove to preserve subpath imports as written (the new default).
				// https://tsdown.dev/options/dependencies#deps-resolvedepsubpath
				resolveDepSubpath: true,
			},
			entry: {
				[`${OUTPUT_BASE_FILE_NAME}.headless`]: `src/headless.ts`,
			},
			platform: "browser",
		},

		{
			deps: {
				// tsdown <0.23 compatibility: resolve external dependency subpaths.
				// Remove to preserve subpath imports as written (the new default).
				// https://tsdown.dev/options/dependencies#deps-resolvedepsubpath
				resolveDepSubpath: true,
			},
			entry: {
				[OUTPUT_BASE_FILE_NAME]: `src/index.global.ts`,
			},
			minify: true,
			dts: true,
			platform: "browser",
			format: "iife",
			globalName: "CookiesEuBanner",
			outputOptions: {
				entryFileNames: "[name].global.js",
			},
		},
	],
	staged: {
		"*": "vp check --fix",
	},
	lint: {
		jsPlugins: [{ name: "vite-plus", specifier: "vite-plus/oxlint-plugin" }],
		rules: { "vite-plus/prefer-vite-plus-imports": "error" },
		options: { typeAware: true, typeCheck: true },
	},
	test: {
		// Vitest v4 compatibility: preserve mock call history.
		// Remove after tests no longer rely on calls from setup or earlier tests.
		// https://release-v1-0-0-rc-1-viteplus-dev.voidzero-docs.workers.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
		// https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
		clearMocks: false,
		browser: {
			locators: {
				// Vitest v4 compatibility: keep partial, case-insensitive locator matching.
				// Remove after updating locators for full, case-sensitive matches.
				// https://release-v1-0-0-rc-1-viteplus-dev.voidzero-docs.workers.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
				// https://vitest.dev/guide/migration/#locators-are-strict-by-default
				exact: false,
			},
			enabled: true,
			headless: true,
			screenshotFailures: false,
			provider: playwright(),
			instances: [{ browser: "chromium" }, { browser: "firefox" }, { browser: "webkit" }],
		},
		include: ["tests/**/*.test.ts"],
		exclude: [...defaultExclude, "tests/dist.test.ts"],
		coverage: {
			provider: "istanbul",
			thresholds: {
				100: true,
			},
			include: ["src/**/*.ts"],
		},
	},
	run: {
		tasks: {
			"test:dist": {
				command: "vp test --config vite.dist.config.ts",
				dependsOn: ["build"],
			},
		},
	},
});
