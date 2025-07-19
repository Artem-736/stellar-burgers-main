/// <reference types="cypress" />
import * as orderMock from '../fixtures/order.json';
import '../support/commands';

type JQueryElement = JQuery<HTMLElement>;
type EachCallback = (index: number, element: HTMLElement) => void;
type FilterCallback = (index: number, element: HTMLElement) => boolean;
type MapCallback = (index: number, element: HTMLElement) => string | null;

describe('E2E проверка конструктора Stellar Burgers', () => {
  beforeEach(() => {
    // 1. Мокируем API запросы
    cy.intercept('GET', '/api/ingredients', { fixture: 'ingredients' }).as('getIngredients');
    cy.intercept('GET', '/api/auth/user', { fixture: 'user' }).as('getUser');
    cy.intercept('POST', '/api/orders', { fixture: 'order' }).as('postOrder');

    // 2. Устанавливаем тестовые токены
    cy.setCookie('accessToken', 'test-access-token');
    localStorage.setItem('refreshToken', 'test-refresh-token');

    // 3. Открываем главную страницу и ждём загрузки ингредиентов
    cy.visit('/');
    cy.wait('@getIngredients');
  });

  afterEach(() => {
    // 4. Очищаем тестовые данные после каждого теста
    cy.clearCookie('accessToken');
    localStorage.removeItem('refreshToken');
  });

  it('Должны отображаться ингредиенты для выбора', () => {
    // 5. Проверяем заголовки категорий
    cy.contains('Булки').should('exist');
    cy.contains('Соусы').should('exist');
    cy.contains('Начинки').should('exist');
    
    // 6. Проверяем список ингредиентов
    cy.get('[data-testid=ingredients-list]').should('exist');
    cy.get('[data-testid^=ingredient-]').should('have.length.gt', 2); 
  });

  context('Тестирование модальных окон ингредиентов', () => {
    it('Открытие и закрытие модального окна ингредиента', () => {
      // 7. Открываем модалку первого ингредиента
      cy.get('[data-testid^=ingredient-]').first().click();
      
      // 8. Проверяем что модальное окно открылось
      cy.get('[data-testid=modal]').should('be.visible');
      
      // 9. Закрываем через крестик
      cy.get('[data-testid=modal-close-button]').click();
      cy.get('[data-testid=modal]').should('not.exist');
    });

    it('Закрытие модального окна через оверлей и Escape', () => {
      // 10. Открываем модалку
      cy.get('[data-testid^=ingredient-]').first().click();
      
      // 11. Закрываем через оверлей
      cy.get('[data-testid=modal-overlay]').click({ force: true });
      cy.get('[data-testid=modal]').should('not.exist');
      
      // 12. Открываем снова
      cy.get('[data-testid^=ingredient-]').first().click();
      
      // 13. Закрываем через Escape
      cy.get('body').type('{esc}');
      cy.get('[data-testid=modal]').should('not.exist');
    });
  });

  context('Процесс оформления заказа', () => {
    it('Полный цикл оформления заказа', () => {
      // 1. Мокируем запросы авторизации
      cy.intercept('POST', '/api/auth/login', {
        statusCode: 200,
        body: {
          success: true,
          accessToken: 'test-access-token',
          refreshToken: 'test-refresh-token',
          user: {
            email: 'example@example.gmail',
            password: 'example'
          }
        }
      }).as('loginRequest');
      
      cy.intercept('GET', '/api/auth/user', {
        statusCode: 200,
        body: {
          success: true,
          user: {
            email: 'example@example.gmail',
            password: 'example'
          }
        }
      }).as('getUser');

      // 2. Выполняем авторизацию
      cy.visit('/login');

      cy.get('[data-testid=email-input] input', { timeout: 10000 })
        .should('exist')
        .and('be.visible')
        .type('example@example.gmail', { delay: 100 });
        
      cy.get('[data-testid=password-input] input')
        .should('exist')
        .and('be.visible')
        .type('example', { delay: 100 });

      cy.get('[data-testid=login-button] button')
        .should('exist')
        .and('be.visible')
        .click();

      // 3. Возвращаемся на главную страницу
      cy.visit('/');
      cy.wait('@getIngredients');
      
      // 4. Проверяем начальное состояние
      cy.get('[data-testid=order-button]')
        .should('be.disabled')
        .and('contain', 'Оформить заказ');
      
      // 5. Проверяем загрузку ингредиентов
      cy.get('[data-testid^=ingredient-]').should('have.length.gt', 0);
  
      // 6. Отладочный вывод всех ингредиентов
      cy.get('[data-testid^=ingredient-]').each(($el: JQuery<HTMLElement>, index?: number) => {
        const idx = index ?? 0;
        cy.log(`Ingredient ${idx + 1}:`, $el.text());
      });

      // 7. Находим и добавляем булку
      cy.get('[data-testid^=ingredient-]').each(($el) => {
        if ($el.text().includes('Краторная булка N-200i')) {
          cy.wrap($el)
            .parents('li')
            .within(() => {
              cy.contains('button', 'Добавить')
                .should('exist')
                .and('be.visible')
                .click();
            });
          return false;
        }
      });
      
      // 8. Проверяем конструктор
      cy.get('[data-testid=constructor-drop-zone]')
      .find('[data-testid=constructor-bun-top]')
      .should('exist')
      .and('contain', 'Краторная булка');
      
      // 9. Добавляем начинку
      cy.contains('[data-testid^=ingredient-]', 'Филе Люминесцентного тетраодонтимформа')
        .parents('li')
        .within(() => {
          cy.contains('button', 'Добавить')
            .should('exist')
            .and('be.visible')
            .click();
        });
    
      // 10. Проверяем добавление начинки
      cy.get('[data-testid^=constructor-ingredient-]').should('exist');
    
      // 11. Проверяем активность кнопки
      cy.get('[data-testid=order-button]')
        .should('not.be.disabled')
        .click();
    
      // 12. Проверяем модальное окно заказа
      cy.get('[data-testid=order-modal]', { timeout: 10000 })
        .should('be.visible')
        .and('contain', orderMock.order.number);
    });
  });
});