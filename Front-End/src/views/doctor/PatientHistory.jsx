import React from 'react';
import { 
  Paper, Typography, Box, Accordion, AccordionSummary, 
  AccordionDetails, Avatar, Stack, Chip, Divider 
} from '@mui/material';
import { 
  ExpandMore, History, CalendarMonth, LocalPharmacy, 
  AssignmentInd, ChevronRight 
} from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const PatientHistory = () => {
  const patientData = [
    { 
      name: 'Ali Khan', 
      id: '#P-001', 
      lastVisit: '12 Feb 2026', 
      diagnosis: 'Seasonal Flu & Dehydration', 
      prescription: 'Panadol (500mg), ORS, Rest for 3 days',
      status: 'Recovered'
    },
    { 
      name: 'Sara Bakar', 
      id: '#P-042', 
      lastVisit: '28 Jan 2026', 
      diagnosis: 'Hypertension Checkup', 
      prescription: 'Lisinopril (10mg) once daily',
      status: 'Ongoing'
    }
  ];

  return (
    <DashboardLayout role="Doctor" name="Dr. Muhammad Usman">
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="900" sx={{ color: '#0f172a', letterSpacing: '-0.5px' }}>
          Patient Medical History
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b', mt: 0.5 }}>
          Access and review previous clinical records and prescriptions.
        </Typography>
      </Box>

      {/* History List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {patientData.map((patient, index) => (
          <Accordion 
            key={index} 
            elevation={0}
            sx={{ 
              borderRadius: '16px !important', 
              border: '1px solid #e2e8f0',
              overflow: 'hidden',
              '&:before': { display: 'none' },
              boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
              '&.Mui-expanded': { boxShadow: '0 10px 20px rgba(0,0,0,0.05)', my: 2 }
            }}
          >
            <AccordionSummary 
              expandIcon={<ExpandMore sx={{ color: '#1976d2' }} />}
              sx={{ py: 1, '&.Mui-expanded': { bgcolor: '#f8fafc' } }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', pr: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                  <Avatar sx={{ bgcolor: '#e0f2fe', color: '#0369a1', width: 45, height: 45 }}>
                    <AssignmentInd />
                  </Avatar>
                  <Box>
                    <Typography fontWeight="800" variant="body1" sx={{ color: '#1e293b' }}>
                      {patient.name}
                    </Typography>
                    <Typography variant="caption" sx={{ color: '#64748b', fontWeight: '600' }}>
                      Patient ID: {patient.id}
                    </Typography>
                  </Box>
                </Stack>
                
                <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center', gap: 2 }}>
                   <Chip 
                    label={patient.status} 
                    size="small" 
                    sx={{ 
                      fontWeight: '700', 
                      bgcolor: patient.status === 'Recovered' ? '#dcfce7' : '#fef9c3',
                      color: patient.status === 'Recovered' ? '#166534' : '#854d0e',
                    }} 
                   />
                   <Stack direction="row" spacing={1} alignItems="center">
                     <CalendarMonth sx={{ fontSize: 16, color: '#94a3b8' }} />
                     <Typography variant="caption" fontWeight="600" color="#64748b">{patient.lastVisit}</Typography>
                   </Stack>
                </Box>
              </Box>
            </AccordionSummary>

            <AccordionDetails sx={{ px: 3, pb: 3, pt: 1 }}>
              <Divider sx={{ mb: 2 }} />
              
              {/* Flex container for details */}
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                <Box sx={{ flex: '1 1 300px' }}>
                  <Typography variant="subtitle2" fontWeight="800" sx={{ color: '#1976d2', mb: 1, display: 'flex', alignItems: 'center' }}>
                    <History sx={{ fontSize: 18, mr: 0.5 }} /> Latest Diagnosis
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6, bgcolor: '#f1f5f9', p: 1.5, borderRadius: 2 }}>
                    {patient.diagnosis}
                  </Typography>
                </Box>

                <Box sx={{ flex: '1 1 300px' }}>
                  <Typography variant="subtitle2" fontWeight="800" sx={{ color: '#059669', mb: 1, display: 'flex', alignItems: 'center' }}>
                    <LocalPharmacy sx={{ fontSize: 18, mr: 0.5 }} /> Prescribed Medication
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#334155', lineHeight: 1.6, bgcolor: '#f0fdf4', p: 1.5, borderRadius: 2, border: '1px dashed #bbf7d0' }}>
                    {patient.prescription}
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Typography 
                  variant="caption" 
                  sx={{ 
                    cursor: 'pointer', 
                    color: '#1976d2', 
                    fontWeight: '700', 
                    display: 'flex', 
                    alignItems: 'center',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  View Full Medical Report <ChevronRight sx={{ fontSize: 16 }} />
                </Typography>
              </Box>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    </DashboardLayout>
  );
};

export default PatientHistory;