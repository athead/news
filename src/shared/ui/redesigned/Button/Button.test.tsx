import { render, screen } from '@testing-library/react';
// import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from '../Button/Button';

describe('Button', () => {
    test('Render', () => {
        render(<Button>TEST</Button>);
        expect(screen.getByText('TEST')).toBeInTheDocument();
    });

    test('Theme clear', () => {
        render(<Button variant="clear">TEST</Button>);
        expect(screen.getByText('TEST')).toHaveClass('clear');
    });
});
