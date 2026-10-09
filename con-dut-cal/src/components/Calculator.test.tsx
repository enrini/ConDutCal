import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { axe } from 'jest-axe';
import '@testing-library/jest-dom'; 
import Calculator from './Calculator';

// Mock Recharts ResponsiveContainer
jest.mock('recharts', () => {
  const OriginalModule = jest.requireActual('recharts');
  return {
    ...OriginalModule,
    ResponsiveContainer: ({ children }: { children: React.ReactNode }) => (
      <div style={{ width: 800, height: 260 }}>{children}</div>
    ),
  };
});

describe('Calculator UI & Maths Logic Suite', () => {
  it('should have no WCAG accessibility violations on startup', async () => {
    const { container } = render(<Calculator />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });

  it('should render all 4 main input fields from design', () => {
    render(<Calculator />);
    
    expect(screen.getByLabelText('Invoice Value')).toBeInTheDocument();
    expect(screen.getByLabelText('Ongoing Payment Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('First Payment Amount')).toBeInTheDocument();
    expect(screen.getByLabelText('Term Length (months)')).toBeInTheDocument();
  });

  it('should include prefix indicators', () => {
    render(<Calculator />);
    
    const invoiceBox = screen.getByLabelText('Invoice Value').parentElement;
    const termBox = screen.getByLabelText('Term Length (months)').parentElement;

    expect(invoiceBox).toHaveTextContent('£');
    expect(termBox).not.toHaveTextContent('£');
  });

  it('should conditionally enable Maintenance/Service Costs input based on toggle', async () => {
    render(<Calculator />);
    
    const toggle = screen.getByLabelText('Maintenance/Servicing included with lease');
    const maintenanceInput = screen.getByLabelText('Maintenance/Service Costs');
    
    expect(maintenanceInput).toBeDisabled();

    fireEvent.click(toggle);

    await waitFor(() => {
      expect(maintenanceInput).not.toBeDisabled();
    });
  });

  it('should render the Results header but display the placeholder prompt initially', () => {
    render(<Calculator />);
    
    expect(screen.getByText('Results')).toBeInTheDocument();
    expect(screen.getByText(/Enter your values and click calculate/i)).toBeInTheDocument();
    expect(screen.queryByText(/more than buying it outright/i)).not.toBeInTheDocument();
  });

  it('should clear the input when the cancel icon is clicked', () => {
    render(<Calculator />);
    
    const termInput = screen.getByLabelText('Term Length (months)') as HTMLInputElement;
    fireEvent.change(termInput, { target: { value: '36' } });
    expect(termInput.value).toBe('36');

    const clearBtn = screen.getByLabelText('Clear Term Length (months)');
    fireEvent.click(clearBtn);

    expect(termInput.value).toBe('');
  });

  it('should calculate and display correct totals (without maintenance)', () => {
    render(<Calculator />);
    
    // Inject values
    fireEvent.change(screen.getByLabelText('Invoice Value'), { target: { value: '10000' } });
    fireEvent.change(screen.getByLabelText('Ongoing Payment Amount'), { target: { value: '300' } });
    fireEvent.change(screen.getByLabelText('First Payment Amount'), { target: { value: '500' } });
    fireEvent.change(screen.getByLabelText('Term Length (months)'), { target: { value: '36' } });
    
    // Trigger calcs
    fireEvent.click(screen.getByRole('button', { name: /calculate costs/i }));
    
    // Expected calc: 500 + (300 * 35 remaining months) = 11000
    // Expected difference: 11000 - 10000 = 1000
    expect(screen.getByText('£11,000.00')).toBeInTheDocument();
    expect(screen.getByText('£1,000.00')).toBeInTheDocument();
  });

  it('should include maintenance costs in the calculation when enabled', () => {
    render(<Calculator />);
    
    fireEvent.change(screen.getByLabelText('Invoice Value'), { target: { value: '10000' } });
    fireEvent.change(screen.getByLabelText('Ongoing Payment Amount'), { target: { value: '300' } });
    fireEvent.change(screen.getByLabelText('First Payment Amount'), { target: { value: '500' } });
    fireEvent.change(screen.getByLabelText('Term Length (months)'), { target: { value: '36' } });
    
    // Enable maintenance toggle
    fireEvent.click(screen.getByLabelText('Maintenance/Servicing included with lease'));
    
    // Add maintenance
    fireEvent.change(screen.getByLabelText('Maintenance/Service Costs'), { target: { value: '1500' } });
    
    fireEvent.click(screen.getByRole('button', { name: /calculate costs/i }));
    
    // Expected calc: 11000 (from previous test) + 1500 = 12500
    // Expected difference: 12500 - 10000 = 2500
    expect(screen.getByText('£12,500.00')).toBeInTheDocument();
    expect(screen.getByText('£2,500.00')).toBeInTheDocument();
  });
});