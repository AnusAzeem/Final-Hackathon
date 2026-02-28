import React from 'react';
import { 
  Box, Card, CardContent, Typography, Button, List, 
  ListItem, ListItemIcon, ListItemText, Divider, Chip, Stack 
} from '@mui/material';
import { CheckCircle, Stars, WorkspacePremium, BusinessCenter, RocketLaunch } from '@mui/icons-material';
import DashboardLayout from '../../components/Layout/DashboardLayout';

const Subscriptions = () => {
  const plans = [
    { 
      name: 'Clinic Basic', 
      price: 'Free', 
      icon: <RocketLaunch sx={{ color: '#64748b' }} />,
      features: ['Up to 5 Doctors', 'Basic AI Diagnosis', 'Email Support'],
      recommended: false
    },
    { 
      name: 'Clinic Pro', 
      price: '$99', 
      period: '/mo',
      icon: <WorkspacePremium sx={{ color: '#1976d2' }} />,
      features: ['Up to 20 Doctors', 'Advanced AI Assistant', 'Priority Support', 'Cloud Storage'],
      recommended: true 
    },
    { 
      name: 'Enterprise', 
      price: '$299', 
      period: '/mo',
      icon: <BusinessCenter sx={{ color: '#7c3aed' }} />,
      features: ['Unlimited Everything', 'Custom AI Training', '24/7 Dedicated Support', 'White Labeling'],
      recommended: false 
    },
  ];

  return (
    <DashboardLayout role="Admin" name="Super Admin">
      {/* Header */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
        <Typography variant="h4" fontWeight="900" sx={{ color: '#0f172a', mb: 1 }}>
          Subscription Plans
        </Typography>
        <Typography variant="body1" sx={{ color: '#64748b' }}>
          Manage your hospital's service tiers and feature accessibility.
        </Typography>
      </Box>

      {/* Flex Container for Cards */}
      <Box 
        sx={{ 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: 4, 
          justifyContent: 'center',
          alignItems: 'stretch' // Cards will have equal height
        }}
      >
        {plans.map((plan) => (
          <Card 
            key={plan.name}
            elevation={0}
            sx={{ 
              flex: { xs: '1 1 100%', md: '1 1 300px' }, // Flex property instead of Grid
              maxWidth: { md: '350px' },
              borderRadius: 6, 
              position: 'relative', 
              overflow: 'visible', 
              border: plan.recommended ? '2px solid #1976d2' : '1px solid #e2e8f0',
              boxShadow: plan.recommended ? '0 20px 25px -5px rgba(25, 118, 210, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
              transition: 'transform 0.3s ease',
              '&:hover': { transform: 'translateY(-10px)' }
            }}
          >
            {/* Recommended Badge */}
            {plan.recommended && (
              <Chip 
                label="MOST POPULAR" 
                color="primary" 
                size="small"
                sx={{ 
                  position: 'absolute', 
                  top: -14, 
                  left: '50%', 
                  transform: 'translateX(-50%)',
                  fontWeight: '900',
                  fontSize: '0.7rem',
                  px: 1
                }} 
              />
            )}

            <CardContent sx={{ p: 4, display: 'flex', flexDirection: 'column', height: '100%' }}>
              <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                {plan.icon}
                <Typography variant="h6" fontWeight="800" color="#1e293b">
                  {plan.name}
                </Typography>
              </Stack>

              <Box sx={{ mb: 3, mt: 1 }}>
                <Typography variant="h3" fontWeight="900" color={plan.recommended ? 'primary' : '#0f172a'} sx={{ display: 'inline' }}>
                  {plan.price}
                </Typography>
                {plan.period && (
                  <Typography variant="h6" sx={{ display: 'inline', color: '#64748b', ml: 0.5 }}>
                    {plan.period}
                  </Typography>
                )}
              </Box>

              <Divider sx={{ mb: 3 }} />

              <List sx={{ flexGrow: 1, mb: 3 }}>
                {plan.features.map((f) => (
                  <ListItem key={f} disablePadding sx={{ mb: 1.5, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <CheckCircle sx={{ fontSize: 20, color: plan.recommended ? '#1976d2' : '#10b981' }} />
                    </ListItemIcon>
                    <ListItemText 
                      primary={f} 
                      primaryTypographyProps={{ variant: 'body2', fontWeight: '500', color: '#475569' }} 
                    />
                  </ListItem>
                ))}
              </List>

              <Button 
                fullWidth 
                variant={plan.recommended ? "contained" : "outlined"} 
                sx={{ 
                  py: 1.5, 
                  borderRadius: 3, 
                  fontWeight: '800', 
                  textTransform: 'none',
                  boxShadow: plan.recommended ? '0 10px 15px -3px rgba(25, 118, 210, 0.3)' : 'none'
                }}
              >
                Modify Plan
              </Button>
            </CardContent>
          </Card>
        ))}
      </Box>
    </DashboardLayout>
  );
};

export default Subscriptions;