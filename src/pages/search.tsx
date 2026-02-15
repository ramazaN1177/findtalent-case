import React, { useState } from 'react'
import { Box } from '@mui/material'
import { Header } from '@/components/common/Header/Header'
import { MainContentWithDecor } from '@/components/common/MainContentWithDecor/MainContentWithDecor'
import { Footer } from '@/components/common/Footer/Footer'
import { SearchBar } from '@/components/common/SearchBar/SearchBar'
import { useLanguage } from '@/contexts/LanguageContext'
import { Button } from '@/components/common/Button/Button'
import FilterPanel from '@/components/search/FilterPanel/FilterPanel'

const Search = () => {

    const { t } = useLanguage();
    const [searchValue, setSearchValue] = useState("");

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
                            gap: "clamp(8px, 1vw, 15px)",
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
                                flexDirection: { xs: "column", md: "row" },
                                alignItems: { xs: "center", md: "flex-start" },
                                justifyContent: { xs: "center", md: "flex-start" },
                                margin: { xs: "0 8px", sm: "0 20px", md: "0 20px" },
                                py: { xs: 2, md: 3 },
                            }}
                        >
                            <Box sx={{ width: 455, flexShrink: 0, maxWidth: "100%" }}>
                                a
                            </Box>
                            <Box sx={{ flex: 1, minWidth: 0 }}>
                                a
                            </Box>
                        </Box>
                    </Box>
            </MainContentWithDecor>
            <Footer />
        </Box>
    );
};

export default Search;