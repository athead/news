import { login } from 'cypress/support/commands/common';

let articleId: string = '';

describe('Пользователь заходит на страницу статьи', () => {
    beforeEach(() => {
        login().then(() => {
            cy.visit('articles');
            cy.createArticle().then((article) => {
                articleId = article.id;
                cy.visit(`articles/${article.id}`);
            });
        });
    });
    afterEach(() => {
        cy.removeArticle(articleId);
    });
    // Создали статью - протестили - удали статью
    it('И видит содержимое статьи', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
    });
    it('И видит список рекомендаций', () => {
        cy.getByTestId('ArticleRecommendationsList').should('exist');
    });
    it('И оставляет комментарий', () => {
        cy.getByTestId('ArticleDetails.Info').should('exist');
        cy.getByTestId('AddCommentForm').scrollIntoView();
        cy.addComment('text');
        cy.getByTestId('CommentCard.Content').should('have.length', 1);
    });
    it('И ставит оценку', () => {
        cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });
        cy.getByTestId('ArticleDetails.Info').should('exist');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(4, 'feedback');
        cy.get('[data-selected=true]').should('have.length', 4);
    });

    it('И ставит оценку (пример со стабом на фикстурах)', () => {
        cy.intercept('GET', '**/articles/*', { fixture: 'article-details.json' });
        cy.getByTestId('ArticleDetails.Info').should('exist');
        cy.getByTestId('RatingCard').scrollIntoView();
        cy.setRate(4, 'feedback');
        cy.get('[data-selected=true]').should('have.length', 4);
    });
});
