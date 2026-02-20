# Security

## Known Security Issues

### ajv < 8.18.0 (Moderate Severity)

**Status:** Accepted Risk

**Description:** The `ajv` package versions below 8.18.0 have a ReDoS (Regular Expression Denial of Service) vulnerability when using the `$data` option.

**Why Not Fixed:**
- The vulnerability only affects code that enables the `$data` option in ajv configuration
- Our dependencies (`eslint` and `@eslint/eslintrc`) do not enable the `$data` option
- Upgrading to ajv 8.x would require breaking changes to multiple eslint packages
- ajv is only used as a development dependency for linting, not in production code

**Impact Assessment:**
- **Severity:** Moderate
- **Exploitability:** Low (requires `$data` option to be enabled)
- **Scope:** Development environment only
- **Production Impact:** None

**Verification:**
We verified that `@eslint/eslintrc` does not use the `$data` option by inspecting its ajv configuration in `node_modules/@eslint/eslintrc/dist/eslintrc-universal.cjs` and `eslintrc.cjs`.

**Future Resolution:**
This issue will be resolved when the ESLint ecosystem updates to support ajv 8.x, which is expected in future releases of ESLint.

## Fixed Vulnerabilities

### minimatch < 10.2.1 (High Severity) ✅ FIXED

**Status:** Fixed via npm overrides

**Description:** minimatch had a ReDoS vulnerability via repeated wildcards with non-matching literal in pattern.

**Resolution:** Updated to minimatch ^10.2.1 using npm overrides in package.json

**Impact:** Fixed 14 high-severity vulnerabilities in various eslint-related packages.
