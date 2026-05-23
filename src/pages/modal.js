/**
 * Modal/Dialog Page Object
 * Используется для работы с модальными окнами и диалоговыми окнами
 * Может использоваться независимо или в комбинации с другими Page Objects
 */
class Modal {
  // Selectors для различных типов модалей
  dialogRole = '[role="dialog"]';
  alertRole = '[role="alertdialog"]';
  modalBackdrop = '[class*="backdrop"], [class*="overlay"]';
  closeButton = 'button[aria-label="close"], button[aria-label="Close"], [class*="close"]';

  constructor(page) {
    this.page = page;
  }

  /**
   * Проверить, открыто ли модальное окно
   */
  async isModalOpen() {
    return await this.page.isVisible(this.dialogRole);
  }

  /**
   * Проверить, видна ли спецификация алерта
   */
  async isAlertDialogOpen() {
    return await this.page.isVisible(this.alertRole);
  }

  /**
   * Получить текст модального окна
   */
  async getModalText() {
    const modal = await this.page.locator(this.dialogRole).first();
    return await modal.textContent();
  }

  /**
   * Закрыть модальное окно кликом на кнопку закрытия
   */
  async closeModal() {
    const closeBtn = await this.page.locator(this.closeButton).first();
    if (await closeBtn.isVisible()) {
      await closeBtn.click();
    }
  }

  /**
   * Закрыть модальное окно кликом на бэкдроп
   */
  async closeModalByBackdrop() {
    const backdrop = await this.page.locator(this.modalBackdrop).first();
    if (await backdrop.isVisible()) {
      // Клик вне модального окна
      await backdrop.click({ position: { x: 10, y: 10 } });
    }
  }

  /**
   * Получить все кнопки внутри модального окна
   */
  async getModalButtons() {
    const modal = await this.page.locator(this.dialogRole).first();
    return await modal.locator('button').all();
  }

  /**
   * Кликнуть на кнопку в модальном окне по тексту
   */
  async clickModalButton(buttonText) {
    const modal = await this.page.locator(this.dialogRole).first();
    const button = modal.locator(`button:has-text("${buttonText}")`);
    await button.click();
  }

  /**
   * Получить текст заголовка модального окна
   */
  async getModalTitle() {
    const modal = await this.page.locator(this.dialogRole).first();
    const title = modal.locator('h1, h2, h3, [role="heading"]').first();
    return await title.textContent();
  }

  /**
   * Ждать, пока модальное окно закроется
   */
  async waitForModalClose() {
    await this.page.waitForFunction(
      () => !document.querySelector('[role="dialog"]'),
      { timeout: 5000 }
    );
  }

  /**
   * Ждать, пока модальное окно откроется
   */
  async waitForModalOpen() {
    await this.page.waitForSelector(this.dialogRole, { timeout: 5000 });
  }

  /**
   * Получить все инпуты в модальном окне
   */
  async getModalInputs() {
    const modal = await this.page.locator(this.dialogRole).first();
    return await modal.locator('input').all();
  }

  /**
   * Заполнить инпут в модальном окне по индексу
   */
  async fillModalInput(index, text) {
    const inputs = await this.getModalInputs();
    if (inputs[index]) {
      await inputs[index].fill(text);
    }
  }

  /**
   * Получить видимый модальный элемент
   */
  async getModalElement() {
    return await this.page.locator(this.dialogRole).first();
  }
}

module.exports = Modal;
