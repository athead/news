import { User } from '../../../src/entities/User';

export const updateProfile = (firstname: string, lastname: string) => {
    cy.getByTestId('EditableProfileCardHeader.EditButton').click();
    cy.getByTestId('ProfileCard.firstname').clear();
    cy.getByTestId('ProfileCard.firstname').type(firstname);
    cy.getByTestId('ProfileCard.lastname').clear();
    cy.getByTestId('ProfileCard.lastname').type(lastname);
    cy.getByTestId('EditableProfileCardHeader.SaveButton').click();
};

export const resetProfile = (profileId: string) => {
    return cy.request({
        method: 'PUT',
        url: `http://localhost:8000/profiles/${profileId}`,
        headers: { Authorization: 'auth' },
        body: {
            id: '4',
            firstname: 'TEST USER',
            lastname: 'USER',
            age: 18,
            currency: 'RUB',
            country: 'Russia',
            city: 'Moscow',
            username: 'testuser',
            avatar: 'https://xakep.ru/wp-content/uploads/2018/05/171485/KuroiSH-hacker.jpg',
        },
    });
};

declare global {
    namespace Cypress {
        interface Chainable {
            updateProfile(firstname: string, lastname: string): Chainable<User>;
            resetProfile(profileId: string): Chainable<User>;
        }
    }
}
