import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom';
import Calculator from './Calculator';

describe('Calculator UI & Layout Suite', () => {
  it('should have no WCAG accessibility violations on startup', async () => {
    const { container } = render(<Calculator />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render all 4 main input fields from design', () => {
    render(<Calculator />);
    
    expect(screen.getByText('Invoice Value')).toBeInTheDocument();
    expect(screen.getByText('Ongoing Payment Amount')).toBeInTheDocument();
    expect(screen.getByText('First Payment Amount')).toBeInTheDocument();
    expect(screen.getByText('Term Length (months)')).toBeInTheDocument();
  });

  it('should include appropriate prefix indicators correctly based on Figma', () => {
    render(<Calculator />);
    
    const invoiceBox = screen.getByText('Invoice Value').parentElement;
    const termBox = screen.getByText('Term Length (months)').parentElement;

    expect(invoiceBox).toHaveTextContent('£');
    expect(termBox).not.toHaveTextContent('£');
  });

  it('should conditionally enable Maintenance/Service Costs input based on toggle', async () => {
    render(<Calculator />);
    
    const toggle = screen.getByLabelText('Maintenance/Servicing included with lease');
    
    const maintenanceInput = (screen.getByText('Maintenance/Service Costs')
      .previousSibling as HTMLElement)?.querySelector('input');
    
    expect(maintenanceInput).toBeDisabled();

    // Fire the click and wait for React to re-render the DOM
    fireEvent.click(toggle);
    
    await waitFor(() => { // <-- Add waitFor back here
      expect(maintenanceInput).not.toBeDisabled();
    });
  });

  it('should render the chart container placeholder without hardcoded bars', () => {
    render(<Calculator />);
    
    expect(screen.getByText('Total Cost (£)')).toBeInTheDocument();
    expect(screen.getByTestId('chart-placeholder')).toBeInTheDocument();
    expect(screen.queryByRole('img', { name: /bar/i })).not.toBeInTheDocument();
  });

  it('should render the Results header but hide the plain-English summary initially', () => {
    render(<Calculator />);
    
    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(screen.queryByText(/more than buying it outright/i)).not.toBeInTheDocument();
  });

// Test 7: Input State Wiring
  it('should update the Term Length value when the user types', () => {
    const { container } = render(<Calculator />);
    
    const termInput = container.querySelector('#term-length') as HTMLInputElement;
    expect(termInput).toBeInTheDocument();
    
    fireEvent.change(termInput, { target: { value: '36' } });
    
    expect(termInput.value).toBe('36');
  });
});