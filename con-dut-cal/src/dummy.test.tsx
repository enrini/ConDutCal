import { render, screen } from '@testing-library/react';
import { axe } from 'jest-axe';

describe('Jest & Axe Configuration Verification', () => {
  it('should render JSX and find it in the document', () => {
    render(<h1>Hello, ConDutCal!</h1>);
    expect(screen.getByText('Hello, ConDutCal!')).toBeInTheDocument(); 
  });

  it('should pass basic accessibility checks', async () => {
    // Render basic structure
    const { container } = render(
      <main>
        <h1>Consumer Duty Calculator</h1>
        <button type="button">Calculate</button>
      </main>
    );
    
    // Pass rendered HTML to axe-core
    const results = await axe(container);
    
    // Assert no WCAG violations present
    expect(results).toHaveNoViolations();
  });
});