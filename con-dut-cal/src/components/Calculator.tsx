import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Switch,
  Paper,
  Grid,
  TextField,
  InputAdornment,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Cancel as CancelIcon,
  FiberManualRecord as ShapeIcon,
} from '@mui/icons-material';

interface CalcFieldProps {
  id: string;
  label: string;
  showPound?: boolean;
  disabled?: boolean;
  value?: string;
  onChange?: (val: string) => void;
}

const CalcField: React.FC<CalcFieldProps> = ({
  id,
  label,
  showPound = true,
  disabled = false,
  value = '',
  onChange,
}) => {
  return (
    <Box sx={{ mb: 2 }}>
<TextField
        id={id}
        variant="filled"
        disabled={disabled}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e.target.value)}
        slotProps={{
          htmlInput: { 'aria-label': label },
          input: {
            startAdornment: showPound ? (
              <InputAdornment position="start" sx={{ color: '#1A1A1A', fontStyle: 'normal' }}>                £
              </InputAdornment>
            ) : null,
            endAdornment: (
              <InputAdornment position="end">
                <IconButton size="small" aria-label={`Clear ${label}`} disabled={disabled}>
                  <CancelIcon sx={{ fontSize: '20px', color: '#595959' }} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          width: '100%',
          '& .MuiInputBase-root': {
            backgroundColor: disabled ? '#F9F9F9' : '#EBE7EE',
            borderRadius: '4px 4px 0 0',
            height: '56px',
            fontSize: '1.1rem',
            '&:after': {
              borderBottomColor: '#005A9C',
            },
          },
          '& .MuiInputBase-input': {
            paddingTop: '16px',
          },
        }}
      />
      <Typography
        variant="caption"
        sx={{
          display: 'block',
          mt: 0.5,
          color: disabled ? '#A5A5A5' : '#595959',
          fontFamily: 'Inter',
        }}
      >
        {label}
      </Typography>
    </Box>
  );
};

export default function Calculator() {
  const [maintenanceIncluded, setMaintenanceIncluded] = useState(false);
  const [isCalculated] = useState(false); 
  
  const [termLength, setTermLength] = useState(''); 

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#FFFFFF', pb: 4 }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          px: 3,
          py: 1.5,
          borderBottom: '1px solid #E0E0E0',
        }}
      >
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography
          variant="h6"
          sx={{
            fontFamily: 'Inter',
            fontWeight: 500,
            color: '#1A1A1A',
            textAlign: 'center',
            flexGrow: 1,
          }}
        >
          Consumer Duty Calculator
        </Typography>
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: '50%',
            bgcolor: '#EBE7EE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          aria-hidden="true"
        >
          <ShapeIcon sx={{ fontSize: 16, color: '#A5A5A5' }} />
        </Box>
      </Box>

      <Box sx={{ px: { xs: 2, md: 5 }, mt: 4 }}>
        <Grid container spacing={5}>
          {/* LEFT: Inputs Block */}
          <Grid size={{ xs: 12, md: 5 }}>
            <CalcField id="invoice-value" label="Invoice Value" />
            <CalcField id="ongoing-payment" label="Ongoing Payment Amount" />
            <CalcField id="first-payment" label="First Payment Amount" />
            
            {/* Wired up Term Length input */}
            <CalcField 
              id="term-length" 
              label="Term Length (months)" 
              showPound={false} 
              value={termLength}
              onChange={setTermLength}
            />

            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                my: 3,
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: '#1A1A1A',
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  maxWidth: '70%',
                }}
              >
                Maintenance/Servicing included with lease?
              </Typography>
              <Switch
                checked={maintenanceIncluded}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setMaintenanceIncluded(e.target.checked)}
                color="primary"
                slotProps={{ input: { 'aria-label': 'Maintenance/Servicing included with lease' } }}
              />
            </Box>

            <CalcField
              id="maintenance-costs"
              label="Maintenance/Service Costs"
              disabled={!maintenanceIncluded}
            />
          </Grid>

          <Grid
            size={{ xs: 0, md: 1 }}
            sx={{
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            <Box sx={{ width: '1px', bgcolor: '#E0E0E0', height: '90%' }} />
          </Grid>

          {/* RIGHT: Visuals / Charts Card & Outputs */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper
              elevation={0}
              sx={{
                border: '1.5px solid #DCE3EB',
                borderRadius: '8px',
                p: 3,
                bgcolor: '#FFFFFF',
                mb: 4,
              }}
            >
              <Typography
                variant="h5"
                sx={{
                  color: '#005A9C',
                  fontFamily: 'Inter',
                  fontWeight: 700,
                  textAlign: 'center',
                  mb: 4,
                }}
              >
                Total Cost (£)
              </Typography>

              <Box 
                sx={{ 
                  height: 260, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  bgcolor: '#F9F9F9',
                  border: '1px dashed #DCE3EB',
                  borderRadius: 1
                }}
                data-testid="chart-placeholder"
              >
                <Typography variant="body2" sx={{ color: '#A5A5A5', fontFamily: 'Inter' }}>
                  [ Dynamic Chart Placeholder ]
                </Typography>
              </Box>
            </Paper>

            <Box sx={{ mt: 2, minHeight: '120px' }}>
              <Typography
                variant="body2"
                sx={{ color: '#595959', fontFamily: 'Inter', fontWeight: 600, mb: 0.5 }}
              >
                Results
              </Typography>
              
              {isCalculated && (
                <>
                  <Typography
                    variant="h4"
                    sx={{
                      color: '#1A1A1A',
                      fontFamily: 'Inter',
                      fontWeight: 700,
                      mb: 1.5,
                    }}
                  >
                    £[Amount]
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      color: '#1A1A1A',
                      fontFamily: 'Inter',
                      lineHeight: 1.6,
                    }}
                  >
                    Leasing this equipment over {termLength || '[X]'} months costs{' '}
                    <strong style={{ color: '#005A9C' }}>£[Amount]</strong> more than buying it outright.
                  </Typography>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}