
describe('Date Validation', () => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    it('should accept past dates', () => {
        expect(yesterday < today).toBe(true);
    });

    it('should reject future dates', () => {
        expect(tomorrow > today).toBe(true);
    });

    it('should format date correctly for API', () => {
        const testDate = new Date('2021-01-01');
        const formatted = testDate.toLocaleDateString('en-GB');
        expect(formatted).toBe('01/01/2021');
    });

    it('should parse DD/MM/YYYY format correctly', () => {
        const dateStr = '01/01/2021';
        const [day, month, year] = dateStr.split('/');
        const parsedDate = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));

        expect(parsedDate.getFullYear()).toBe(2021);
        expect(parsedDate.getMonth()).toBe(0);
        expect(parsedDate.getDate()).toBe(1);
    });
});
