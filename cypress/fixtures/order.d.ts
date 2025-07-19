/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Перехватывает API запросы
     * @param method HTTP метод
     * @param url URL для перехвата
     * @param response Ответ (может быть фикстурой)
     */
    intercept(
      method: string,
      url: string,
      response?: any
    ): Chainable<null>;

    /**
     * Перехватывает API запросы (альтернативный синтаксис)
     */
    intercept(options: {
      method: string;
      url: string;
    }, response?: any): Chainable<null>;
  }
}