let profileId: string = '';
describe('Пользователь заходит на страницу профиля', () => {
    beforeEach(() => {
        cy.visit('');
        cy.login().then((data) => {
            profileId = data.id;
            cy.visit(`profile/${data.id}`);
        });
    });
    afterEach(() => {
        cy.resetProfile(profileId);
    });
    it('И профиль успено загружается', () => {
        cy.getByTestId('ProfileCard.firstname').should('have.value', 'TEST USER');
    });
    it('И редактирует его', () => {
        const newFirstname = 'newname';
        const newLastname = 'lastname';
        cy.updateProfile(newFirstname, newLastname);
        cy.getByTestId('ProfileCard.firstname').should('have.value', newFirstname);
        cy.getByTestId('ProfileCard.lastname').should('have.value', newLastname);
    });
});
