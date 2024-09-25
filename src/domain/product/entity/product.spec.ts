import Product from "./product";

describe('product unit tests', () => {
    it('should throw error when id is empty', () => {
        expect(() => {
            let product = new Product('', 'Product 1', 100);
        }).toThrow('Id is required');
    })

    it('should throw error when name is empty', () => {
        expect(() => {
            let product = new Product('1', '', 100);
        }).toThrow('Name is required');
    })

    it('should throw error when price is less than zero', () => {
        expect(() => {
            let product = new Product('1', '1', -100);
        }).toThrow('Price should be greater than zero');
    })

    it('should change product name', () => {
        let product = new Product('1', 'Product 1', 100);
        product.changeName('Product 2');
        expect(product.name).toBe('Product 2');
    })

    it('should change product price', () => {
        let product = new Product('1', 'Product 1', 100);
        product.changePrice(150);
        expect(product.price).toBe(150);
    })
})