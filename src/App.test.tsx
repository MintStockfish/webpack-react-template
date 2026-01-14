import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Hi! text', () => {
    render(<App />);

    const linkElement = screen.getByText(/Hi!/i);

    expect(linkElement).toBeInTheDocument();
});
