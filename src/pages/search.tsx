import React, { useState, useEffect } from 'react'
import { Box, Typography } from '@mui/material'
import { Header } from '@/components/common/Header/Header'
import { MainContentWithDecor } from '@/components/common/MainContentWithDecor/MainContentWithDecor'
import { Footer } from '@/components/common/Footer/Footer'
import { SearchBar } from '@/components/common/SearchBar/SearchBar'
import { useLanguage } from '@/contexts/LanguageContext'
import { useSearchContext } from '@/contexts/SearchContext'
import { Button } from '@/components/common/Button/Button'
import FilterPanel from '@/components/search/FilterPanel/FilterPanel'
import { Footer2 } from '@/components/common/Footer/Footer-2'
import JobList, { type JobItem } from '@/components/search/JobList/JobList'
import JobDetail from '@/components/search/JobDetail/JobDetail'

const Search = () => {
    const { t } = useLanguage();
    const { selectedJob: contextSelectedJob, clearSelectedJob } = useSearchContext();
    const [searchValue, setSearchValue] = useState("");
    const [selectedJob, setSelectedJob] = useState<JobItem | null>(null);

    useEffect(() => {
        if (contextSelectedJob) {
            setSelectedJob(contextSelectedJob);
            clearSelectedJob();
        }
    }, [contextSelectedJob, clearSelectedJob]);

    const handleSearch = () => {
        // TODO: arama işlemi
    };

    return (
        <Box>
            <Header />
            <MainContentWithDecor>
                <Box sx={{
                    width: "100%",
                    backgroundColor: "#f5f7ff",
                    padding: "20px 0",
                    display: "flex",
                    justifyContent: "center",
                }}>
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: { xs: "column", sm: "row" },
                            alignItems: { xs: "stretch", sm: "flex-start" },
                            justifyContent: "center",
                            gap: { xs: 2, sm: 3, md: 6, lg: "100px" },
                            width: "100%",
                            maxWidth: { xs: "100%", sm: "100%", md: 734 },
                            mx: "auto",
                            px: { xs: 2, sm: 2, md: 0 },
                        }}
                    >
                        <SearchBar
                            firstLabel={t("hero.searchJobs")}
                            placeholder={t("hero.placeholder")}
                            value={searchValue}
                            onChange={setSearchValue}
                            onSearch={handleSearch}
                            borderRadius={28}
                            padding="0 20px"
                            sx={{
                                minWidth: { xs: 0, sm: 0, md: 798 },
                                maxWidth: "100%",
                                flex: { sm: 1, md: 1 },
                                height: "clamp(36px, 4vw, 56px)",
                                borderRadius: "clamp(18px, 2vw, 28px)",
                            }}
                        />

                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Button
                                onClick={handleSearch}
                                padding="0 40px"
                                backgroundColor="#fff"
                                borderColor="#fff"
                                hoverBackgroundColor="rgba(255,255,255,0.85)"
                                imgSrc="/group-6@3x.png"
                                imgSrcSet="/group-6@2x.png 2x, /group-6@3x.png 3x"
                                imgAlt={t("hero.searchAlt")}
                                imgHeight="clamp(14px, 1.8vw, 25px)"
                                sx={{
                                    width: { xs: "100%", sm: 160 },
                                    minHeight: "clamp(36px, 4vw, 56px)",
                                    borderRadius: "clamp(18px, 2vw, 28px)",
                                }}
                            />
                        </Box>
                    </Box>
                </Box>
                <FilterPanel />

                <Box sx={{
                    width: "100%",
                    maxWidth: { xs: 1200, md: "none" },
                    mx: "auto",
                    px: { xs: 1.5, sm: 2, md: "150px" },
                }}>

                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            margin: { xs: "0 8px", sm: "0 20px", md: "0 20px" },
                            py: { xs: 2, md: 3 },
                            gap: "20px",
                        }}
                    >
                        <Box sx={{ width: "100%", mb: 2, mt: { xs: 9, lg: 0 }, textAlign: { xs: "center", lg: "left" } }}>
                            <Typography sx={{ fontSize: 24, fontWeight: 700, color: "#4361ee" }}>{t("search.noMatchingJobs")}</Typography>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                flexDirection: { xs: "column", md: "row" },
                                alignItems: { xs: "center", md: "flex-start" },
                                justifyContent: "flex-start",
                                gap: "33px",
                            }}
                        >
                            <Box sx={{ width: 455, flexShrink: 0, maxWidth: "100%" }}>
                                <JobList onJobSelect={setSelectedJob} selectedJobId={selectedJob?.id} />
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        width: "100%",
                                        height: "120px",
                                        border: "solid 1px rgba(107, 121, 152, 0.2)",
                                        backgroundColor: "#fff",
                                        borderRadius: "16px",
                                        padding: "23px 30px",

                                    }}>
                                    <Box sx={{ width: "100%", height: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <Box>
                                            {selectedJob ? (
                                                <>
                                                    <Typography sx={{ fontSize: 18, color: "#4361ee", fontWeight: "bold" }}>
                                                        {selectedJob.jobName}
                                                    </Typography>
                                                    <Typography sx={{ fontSize: 18, color: "#6d7b99" }}>
                                                        {selectedJob.companyName} - {selectedJob.jobLocation}
                                                    </Typography>
                                                </>
                                            ) : (
                                                <Typography sx={{ fontSize: 18, color: "#6d7b99" }}>
                                                    {t("search.noJobSelected")}
                                                </Typography>
                                            )}
                                        </Box>
                                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                                            <Button
                                                disabled={!selectedJob}
                                                sx={{
                                                    width: "120px",
                                                    minHeight: "40px",
                                                    height: "40px",
                                                    padding: "8px 31px",
                                                    fontSize: 18,
                                                    fontWeight: "bold",
                                                    color: "#4361ee",
                                                }}
                                            >
                                                {t("search.apply")}
                                            </Button>
                                            <Box sx={{ display: "flex", gap: "16px" }}>
                                                <Box component="img" src="/icon-filled-favorite@3x.png" alt="arrow-right" sx={{ width: 24, height: 24 }} />
                                                <Box component="img" src="/go-on-filled-icon@3x.png" alt="arrow-right" sx={{ width: 24, height: 24 }} />
                                            </Box>
                                        </Box>
                                    </Box>
                                </Box>
                                <JobDetail job={selectedJob ?? (undefined as unknown as JobItem)} />
                            </Box>
                        </Box>
                    </Box>
                </Box>
                <Footer2 />
            </MainContentWithDecor>
            <Footer />
        </Box>
    );
};

export default Search;