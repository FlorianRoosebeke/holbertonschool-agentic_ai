const { calculateTotal } = require('../src/cart_calculator');

describe('calculateTotal', () => {
    it('should_return_zero_when_cart_is_empty', () => {
        // Arrange
        const items = [];

        // Act
        const total = calculateTotal(items);

        // Assert
        expect(total).toBe(0);
    });

    it('should_return_zero_when_cart_is_not_an_array', () => {
        // Arrange
        const items = { price: 10, quantity: 1 };

        // Act
        const total = calculateTotal(items);

        // Assert
        expect(total).toBe(0);
    });

    it('should_apply_default_tax_rate_when_tax_rate_is_omitted', () => {
        // Arrange
        const items = [{ price: 10, quantity: 1 }];

        // Act
        const total = calculateTotal(items);

        // Assert
        expect(total).toBe(12);
    });

    it('should_apply_custom_tax_rate_when_tax_rate_is_provided', () => {
        // Arrange
        const items = [{ price: 20, quantity: 2 }];

        // Act
        const total = calculateTotal(items, 0.05);

        // Assert
        expect(total).toBe(42);
    });

    it('should_apply_zero_discount_when_discount_is_omitted', () => {
        // Arrange
        const items = [{ price: 10, quantity: 1 }];

        // Act
        const total = calculateTotal(items, 0);

        // Assert
        expect(total).toBe(10);
    });

    it('should_apply_discount_before_tax_when_discount_is_provided', () => {
        // Arrange
        const items = [{ price: 100, quantity: 1 }];

        // Act
        const total = calculateTotal(items, 0.2, 10);

        // Assert
        expect(total).toBe(108);
    });

    it('should_return_zero_when_discount_exceeds_subtotal', () => {
        // Arrange
        const items = [{ price: 5, quantity: 1 }];

        // Act
        const total = calculateTotal(items, 0.2, 10);

        // Assert
        expect(total).toBe(0);
    });

    it('should_multiply_price_by_quantity_when_calculating_subtotal', () => {
        // Arrange
        const items = [{ price: 10, quantity: 2 }];

        // Act
        const total = calculateTotal(items, 0);

        // Assert
        expect(total).toBe(20);
    });

    it('should_sum_all_items_when_cart_contains_multiple_items', () => {
        // Arrange
        const items = [
            { price: 10, quantity: 2 },
            { price: 5, quantity: 3 }
        ];

        // Act
        const total = calculateTotal(items, 0.2);

        // Assert
        expect(total).toBe(42);
    });

    it('should_default_quantity_to_one_when_quantity_is_omitted', () => {
        // Arrange
        const items = [{ price: 5 }];

        // Act
        const total = calculateTotal(items, 0);

        // Assert
        expect(total).toBe(5);
    });

    it('should_default_quantity_to_one_when_quantity_is_zero', () => {
        // Arrange
        const items = [{ price: 5, quantity: 0 }];

        // Act
        const total = calculateTotal(items, 0);

        // Assert
        expect(total).toBe(5);
    });

    it('should_clamp_quantity_to_zero_when_quantity_is_negative', () => {
        // Arrange
        const items = [{ price: 5, quantity: -2 }];

        // Act
        const total = calculateTotal(items, 0);

        // Assert
        expect(total).toBe(0);
    });

    it('should_default_price_to_zero_when_price_is_omitted', () => {
        // Arrange
        const items = [{ quantity: 2 }];

        // Act
        const total = calculateTotal(items, 0);

        // Assert
        expect(total).toBe(0);
    });

    it('should_clamp_price_to_zero_when_price_is_negative', () => {
        // Arrange
        const items = [{ price: -5, quantity: 2 }];

        // Act
        const total = calculateTotal(items, 0);

        // Assert
        expect(total).toBe(0);
    });

    it('should_round_total_to_two_decimal_places_when_result_has_extra_decimals', () => {
        // Arrange
        const items = [{ price: 10.129, quantity: 1 }];

        // Act
        const total = calculateTotal(items, 0);

        // Assert
        expect(total).toBe(10.13);
    });
});
