import { create } from "zustand";

// 검색어를 저장/불러올 때 사용할 고정된 키값
const STORAGE_KEY = "recent_search_keywords";

export type HeaderState = {
  search: string;
  recentKeywords: string[];
  showDropdown: boolean;
  setSearch: (search: string) => void;
  setShowDropdown: (show: boolean) => void;
  handleSearch: (keyword: string, callback?: (q: string) => void) => void;
  loadRecentKeywords: () => void;
  removeRecentKeyword: (keyword: string) => void;
};

export const useHeaderStore = create<HeaderState>((set, get) => ({
  search: "",
  recentKeywords: [],
  showDropdown: false,
  setSearch: (value) => set({ search: value }),
  setShowDropdown: (value) => set({ showDropdown: value }),
  loadRecentKeywords: () => {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    set({ recentKeywords: stored });
  },

  handleSearch: (keyword, callback) => {
    const query = keyword.trim().toLowerCase();
    if (!query) return;

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    const filtered = stored.filter((item: string) => item !== query);
    const updated = [query, ...filtered].slice(0, 8);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    set({
      search: "",
      recentKeywords: updated,
      showDropdown: false,
    });

    if (callback) callback(query);
  },

  // 검색어 삭제기능
  removeRecentKeyword: (keyword: string) => {
    const updated = get().recentKeywords.filter((item) => item !== keyword);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    set({ recentKeywords: updated });
  },
}));
