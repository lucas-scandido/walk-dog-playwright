import faker from 'faker-br';

export function generateUserData() {
    const fullName = `${faker.name.firstName()} ${faker.name.lastName()}`;
    const email = `${fullName.replace(/\s+/g, '')}@qa.com.br`;

    return {
        fullName,
        email,
        cpf: faker.br.cpf(),
        cep: '08295005',
        houseNumber: '111',
        complement: 'Casa'
    };
}

export const activities = ["Cuidar", "Adestrar"];
export const documentPath = 'fixtures/images/cnh.png';