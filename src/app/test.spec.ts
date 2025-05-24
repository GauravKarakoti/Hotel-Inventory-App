import { Calculator } from './testservice';
describe('testservice', () => {
    it('should add 2 numbers', () => {
        const service=new Calculator();
        expect(service.add(2, 3)).toBe(5);
    });
    it('should subtract 2 numbers', () => {
        const service=new Calculator();
        expect(service.subtract(5, 3)).toBe(2);
    });
});