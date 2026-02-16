import React, { useState } from 'react'
import { JobItem } from '../JobList/JobList'
import { Box, Typography } from '@mui/material'
import WorkOutlineIcon from '@mui/icons-material/WorkOutline'

const TABS = [
  { id: 'detay', label: 'Detay' },
  { id: 'aday-kriterleri', label: 'Aday Kriterleri' },
  { id: 'ise-alim-sureci', label: 'İşe Alım Süreci' },
] as const

type JobDetailProps = {
  job: JobItem
}

const JobDetail = ({ job }: JobDetailProps) => {
  const [activeTab, setActiveTab] = useState<(typeof TABS)[number]['id']>('detay')

  return (
    <Box sx={{ width: '100%', margin: '20px 0 0' }}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          px: 2,
        }}
      >
        {TABS.map((tab, index) => (
          <React.Fragment key={tab.id}>
            {index > 0 && (
              <Box
                sx={{
                  width: '1px',
                  height: "24px",
                  backgroundColor: 'rgba(107, 121, 152, 0.2)',
                  mx: 0.5,
                }}
              />
            )}
            <Box
              onClick={() => setActiveTab(tab.id)}
              sx={{
                py: "5px",
                px: 1,
                cursor: 'pointer',
                borderBottom: activeTab === tab.id ? '2px solid #4361ee' : '2px solid transparent',
                marginBottom: '-1px',
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                  color: activeTab === tab.id ? '#4361ee' : '#6d7b99',
                }}
              >
                {tab.label}
              </Typography>
            </Box>
          </React.Fragment>
        ))}
      </Box>
      <Box
        sx={{
          width: '100%',
          height: '496px',
          borderRadius: '16px',
          border: 'solid 1px rgba(107, 121, 152, 0.2)',
          backgroundColor: '#fff',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
            p: '30px',
            '&::-webkit-scrollbar': {
              width: '6px',
            },
            '&::-webkit-scrollbar-track': {
              background: 'transparent',
            },
            '&::-webkit-scrollbar-thumb': {
              width: '6px',
              minHeight: '119px',
              borderRadius: '10.5px',
              backgroundColor: '#d4dae6',
            },
            '&::-webkit-scrollbar-thumb:hover': {
              backgroundColor: '#c4cad6',
            },
          }}
        >
        {(!job || !job?.jobDetail) ? (
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              minHeight: 400,
              gap: 2,
            }}
          >
            <WorkOutlineIcon sx={{ fontSize: 80, color: '#4361ee' }} />
            <Typography sx={{ fontSize: 16, color: '#6b7998' }}>
              Henüz bir iş seçilmedi
            </Typography>
          </Box>
        ) : activeTab === 'detay' && job?.jobDetail ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Box>
              <Typography sx={{ fontSize: 16, color: '#6b7998', lineHeight: 1.6 }}>
                {job.jobDetail.intro}
              </Typography>
            </Box>
            <Box>
              <Typography component="span" sx={{ fontSize: 16, fontWeight: 700, color: '#1a1d2e', display: 'block', mb: 1 }}>
                {job.jobDetail.jobDescription.title}
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.5, '& li': { fontSize: 16, color: '#6b7998', lineHeight: 1.8 } }}>
                {job.jobDetail.jobDescription.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </Box>
            </Box>
            <Box>
              <Typography component="span" sx={{ fontSize: 16, fontWeight: 700, color: '#1a1d2e', display: 'block', mb: 1 }}>
                {job.jobDetail.qualifications.title}
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.5, '& li': { fontSize: 16, color: '#6b7998', lineHeight: 1.8 } }}>
                {job.jobDetail.qualifications.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </Box>
            </Box>
          </Box>
        ) : activeTab === 'aday-kriterleri' && job?.jobDetail ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Box>
              <Typography component="span" sx={{ fontSize: 16, fontWeight: 700, color: '#1a1d2e', display: 'block', mb: 1 }}>
                {job.jobDetail.candidateCriteria.title}
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.5, '& li': { fontSize: 16, color: '#6b7998', lineHeight: 1.8 } }}>
                {job.jobDetail.candidateCriteria.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </Box>
            </Box>
          </Box>
        ) : activeTab === 'ise-alim-sureci' && job?.jobDetail ? (
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <Box>
              <Typography component="span" sx={{ fontSize: 16, fontWeight: 700, color: '#1a1d2e', display: 'block', mb: 1 }}>
                {job.jobDetail.recruitmentProcess.title}
              </Typography>
              <Box component="ul" sx={{ m: 0, pl: 2.5, '& li': { fontSize: 16, color: '#6b7998', lineHeight: 1.8 } }}>
                {job.jobDetail.recruitmentProcess.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </Box>
            </Box>
          </Box>
        ) : null}
        </Box>
      </Box>
    </Box>
  )
}

export default JobDetail