"use client";

import { useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import useAPIFetch from "@/hooks/useAPIFetch";
import { FastApiResponse } from "@/types/aiResponse";
import { useToast } from "@/context/ToastContext";
import { scrollToTop } from "@/utils/helpers";
import { categoriesList } from "@/components/FilterModal";

export default function useSearch() {
  const router = useRouter();
  const params = useSearchParams();
  const { showToast } = useToast();

  const currentWord = params.get("word") || "welcome";
  const currentPage = parseInt(params.get("page") || "1", 10);

  const [word, setWord] = useState(currentWord);
  const [categories, setCategories] = useState<string[]>(
    categoriesList.map((cat) => cat.id)
  );
  const [modalOpen, setModalOpen] = useState(false);

  const SEARCH_LIMIT = 100;

  const { data, loading, error } = useAPIFetch<FastApiResponse>(
    `/sentences/${currentWord}?categories=${categories.join(
      ","
    )}&page=${currentPage}`
  );

  const totalPage = data?.total_results
    ? Math.ceil(data.total_results / 10)
    : 1;

  const handleResults = useCallback(() => {
    if (word.length > SEARCH_LIMIT) {
      return showToast("Word is too long", "warning");
    }
    router.push(`/search?word=${word}&page=1`);
    scrollToTop();
  }, [word, router, showToast]);

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      router.push(`/search?word=${word}&page=${value}`);
    },
    [word, router]
  );

  const openFilterModal = () => setModalOpen(true);
  const closeFilterModal = () => setModalOpen(false);

  return {
    word,
    setWord,
    currentPage,
    currentWord,
    categories,
    setCategories,
    modalOpen,
    openFilterModal,
    closeFilterModal,
    data,
    loading,
    error,
    totalPage,
    handleResults,
    handlePageChange,
  };
}
