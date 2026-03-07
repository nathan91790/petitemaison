import '@testing-library/jest-dom';

global.fetch = () =>
    Promise.resolve({
        json: () =>
            Promise.resolve([
                { id: 1, name: "Test", description: "Test", price: 10 }
            ])
    });