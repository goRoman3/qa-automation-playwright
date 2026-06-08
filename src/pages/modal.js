/**
 * Modal Page Object
 *
 * Scaffold-ETH 2 uses DaisyUI modals which are controlled by hidden checkboxes,
 * NOT by [role="dialog"]. A modal is "open" when its controlling checkbox is checked.
 *
 * Standard ARIA dialogs ([role="dialog"]) are also supported for future pages.
 */
class Modal {
  constructor(page) {
    this.page = page;
  }

  // True when any DaisyUI modal checkbox is checked OR a standard dialog is visible
  async isModalOpen() {
    const daisyOpen = await this.page.locator('.modal input[type="checkbox"]:checked').count();
    if (daisyOpen > 0) return true;
    return this.page.locator('[role="dialog"]').isVisible().catch(() => false);
  }

  async isAlertDialogOpen() {
    return this.page.locator('[role="alertdialog"]').isVisible().catch(() => false);
  }

  // Open a DaisyUI modal by clicking its label trigger
  async openModalByLabel(labelText) {
    await this.page.getByRole('label', { name: labelText }).click();
  }

  // Close a DaisyUI modal by unchecking its controlling checkbox
  async closeModal() {
    const checked = this.page.locator('.modal input[type="checkbox"]:checked').first();
    if (await checked.count() > 0) {
      await checked.evaluate(el => { el.checked = false; el.dispatchEvent(new Event('change')); });
      return;
    }
    // Fallback: standard close button
    const closeBtn = this.page.locator('button[aria-label="close"], button[aria-label="Close"]').first();
    if (await closeBtn.isVisible()) await closeBtn.click();
  }

  async getModalText() {
    const modal = this.page.locator('[role="dialog"]').first();
    return modal.textContent();
  }

  async getModalButtons() {
    return this.page.locator('[role="dialog"] button').all();
  }

  async clickModalButton(buttonText) {
    await this.page.locator('[role="dialog"]').getByRole('button', { name: buttonText }).click();
  }

  async getModalTitle() {
    return this.page
      .locator('[role="dialog"]')
      .locator('h1, h2, h3, [role="heading"]')
      .first()
      .textContent();
  }

  async waitForModalClose() {
    await this.page.locator('.modal input[type="checkbox"]:checked').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
    await this.page.waitForFunction(() => !document.querySelector('[role="dialog"]'), { timeout: 5000 }).catch(() => {});
  }

  async waitForModalOpen() {
    await this.page.locator('.modal input[type="checkbox"]:checked, [role="dialog"]').waitFor({ timeout: 5000 });
  }
}

module.exports = Modal;
