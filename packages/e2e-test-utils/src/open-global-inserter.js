/**
 * Opens the global inserter
 */
export async function openGlobalInserter() {
	await page.click( '.edit-post-header [aria-label="Add block"]' );
	// Waiting here is necessary because sometimes the inserter takes more time to
	// render than Puppeteer takes to complete the 'click' action
	await page.waitForSelector( '.editor-inserter__menu' );
}
