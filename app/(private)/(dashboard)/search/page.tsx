"use client";
import CategoriesBread from "@/components/categoriesBreadcrumb";
import Loading from "@/components/loading";
import SearchInput from "@/components/searchInput";
import { fetcher } from "@/lib/fetcher";
import useSWR from "swr";

const SearchPage = () => {
  const { data: categories } = useSWR("/api/category", fetcher);

  if (!categories) {
    return <Loading />;
  }
  return (
    <>
      <div className="px-3 pt-3 md:hidden block">
        <SearchInput />
      </div>
      <div className="p-3">
        <CategoriesBread items={categories} />
      </div>
    </>
  );
};

export default SearchPage;
