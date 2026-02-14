import featuredJobsData from "@/mock/featuredJobs.json";

// --- Types ---
export type FeaturedJobItem = {
  jobTitle: string;
  companyName: string;
  logoPaths: string[];
};

export type PopularSearchItem = {
  id: string;
  label: string;
};

// --- Veri ---
const popularSearchesData: PopularSearchItem[] = [
  { id: "1", label: "UX designer" },
  { id: "2", label: "UI designer" },
  { id: "3", label: "Front-end developer" },
  { id: "4", label: "Back-end developer" },
  { id: "5", label: "iOS developer" },
];

// --- API (hepsi buradan) ---
export function getFeaturedJobs(): Promise<FeaturedJobItem[]> {
  return Promise.resolve(featuredJobsData as FeaturedJobItem[]);
}

export function getPopularSearches(): Promise<PopularSearchItem[]> {
  return Promise.resolve(popularSearchesData);
}
