import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio heading', () => {
  render(<App />);
  const headingElement = screen.getByRole('heading', { name: /Piyush Kumar/i });
  expect(headingElement).toBeInTheDocument();
});
