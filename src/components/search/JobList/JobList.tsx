import React from 'react'
import { Box, Typography } from '@mui/material'
import jobsData from '@/mock/jobs.json'

export type JobItem = {
  id: string
  jobName: string
  companyName: string
  jobLocation: string
  jobDetail?: {
    intro: string
    jobDescription: { title: string; items: string[] }
    qualifications: { title: string; items: string[] }
    candidateCriteria: { title: string; items: string[] }
    recruitmentProcess: { title: string; items: string[] }
  }
}

type JobListProps = {
  onJobSelect?: (job: JobItem) => void
  selectedJobId?: string | null
}

const JobList = ({ onJobSelect, selectedJobId }: JobListProps) => {
  const jobs = jobsData as JobItem[]

  return (
    <Box sx={{ maxWidth: "455px", width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          height: "70px",
          borderRadius: "16px 16px 0 0",
          border: "1px solid #e5e8ed",
          backgroundColor: "#f8f8f8",
          display: "flex",
          alignItems: "center",
          padding: "23px 0 23px 30px",
        }}
      >
        <Typography sx={{ fontSize: 18, color: "#6d7b99" }}>İlgilenebileceğiniz iş ilanları</Typography>
      </Box>
      <Box
        sx={{
          width: "100%",
          height: "600px",
          borderRadius: "0 0 16px 16px",
          border: "solid 1px rgba(107, 121, 152, 0.2)",
          backgroundColor: "#fff",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        <Box
          sx={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden",
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
          {jobs.map((job) => {
            const isSelected = selectedJobId === job.id
            return (
            <Box
              key={job.id}
              onClick={() => onJobSelect?.(job)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onJobSelect?.(job)}
              sx={{
                minHeight: "120px",
                borderBottom: "solid 1px rgba(107, 121, 152, 0.2)",
                backgroundColor: isSelected ? "#e8ecff" : "#fff",
                display: "flex",
                alignItems: "center",
                padding: "23px 0 23px 30px",
                cursor: "pointer",
                transition: "background-color 0.2s, color 0.2s",
                borderLeft: isSelected ? "4px solid #4361ee" : "4px solid transparent",
                '&:hover': {
                  backgroundColor: isSelected ? "#dde2ff" : "#4361ee",
                  ...(isSelected
                    ? {}
                    : {
                        '& .job-name': { color: "#fff " },
                        '& .company-name': { color: "#fff " },
                        '& .job-location': { color: "#fff " },
                      }),
                },
              }}
            >
              <Box>
                <Typography
                  className="job-name"
                  sx={{ fontSize: 18, fontWeight: "bold", color: "#4361ee" }}
                >
                  {job.jobName}
                </Typography>
                <Typography
                  className="company-name"
                  sx={{ fontSize: 18, color: "#6b7998" }}
                >
                  {job.companyName}
                </Typography>
                <Typography
                  className="job-location"
                  sx={{ fontSize: 18, color: "#6b7998" }}
                >
                  {job.jobLocation}
                </Typography>
              </Box>
            </Box>
          )})}
        </Box>
      </Box>
    </Box>
  )
}

export default JobList