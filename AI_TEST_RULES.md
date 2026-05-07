# AI rules for Playwright test generation

Use JavaScript and Playwright Test.

Preferred locator priority:
1. getByRole
2. getByLabel
3. getByPlaceholder
4. getByText only for stable visible text
5. getByTestId for regression-critical elements

Avoid:
- XPath
- nth-child selectors
- CSS classes used only for styling
- hard waits like page.waitForTimeout()

Test style:
- Each test must validate user-visible behavior.
- Use expect assertions with auto-waiting.
- Keep tests isolated.
- Do not store secrets in test files.
- Use process.env for environment data.
- Put reusable page actions into pages/.
- Put test data into test-data/.
