import { render, screen } from '@testing-library/react';

describe('Jest Configuration Verification', () => {
  // Verifies basic Jest execution
  it('should pass a simple math test', () => {
    expect(1 + 1).toBe(2);
  });

  // Verifies React Testing Library, JSDOM, and jest-dom matchers
  it('should render JSX and find it in the document', () => {
    render(<h1>Hello, ConDutCal!</h1>);
    
    const heading = screen.getByText('Hello, ConDutCal!');
    
    // toBeInTheDocument comes from your jest.setup.ts file
    expect(heading).toBeInTheDocument(); 
  });
});