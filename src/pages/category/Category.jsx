import React, { useEffect, useState } from "react";
import "remixicon/fonts/remixicon.css";
import { useParams, useNavigate } from "react-router";
import endPointApi from "../utils.jsx/endPointApi";
import api from "../utils.jsx/axiosInstance";
// import PageMeta from "../utils.jsx/PageMeta";

const Category = () => {
  const { categoryId } = useParams();
  const navigate = useNavigate();

  // Single source of truth for API payload
  const [categoryData, setCategoryData] = useState({
    categories_id: null,
    categories_name: "",
    sub_categories: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchCategory = async (id, controller) => {
    try {
      setLoading(true);
      setError("");

      const formData = new FormData();
      formData.append("categories_id", id);

      const res = await api.post(endPointApi.viewSubcategoryList, formData);

      const data = res?.data?.data;
      if (!data) {
        setCategoryData({ categories_id: null, categories_name: "", sub_categories: [] });
        setError("No data found.");
        return;
      }

      setCategoryData({
        categories_id: data.categories_id ?? data.categoriesId ?? id,
        categories_name: data.categories_name ?? data.categoriesName ?? "Category",
        sub_categories: Array.isArray(data.sub_categories) ? data.sub_categories : [],
      });
    } catch (err) {
      if (err?.name !== "CanceledError") {
        console.error("Error fetching category:", err);
        setError("Failed to load category. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchCategory(categoryId, controller);
    return () => controller.abort();
  }, [categoryId]);

  const { categories_id, categories_name, sub_categories } = categoryData;

  return (
    <>
      {/* <PageMeta title="Category" description="This is Category Page" /> */}
      <div className="w-full max-w-[1300px] mx-auto px-4 py-2 flex flex-col items-center">
        <div className="w-full mt-14 sm:mt-19">

          {/* Breadcrumb */}
          {/* <div className="text-sm text-gray-500 mb-4 flex items-center gap-1">
          <span
            className="cursor-pointer hover:underline"
            onClick={() => navigate("/")}
          >
            Home
          </span>
          <i className="ri-arrow-right-s-line" />
          <span className="font-medium">{categories_name || "Category"}</span>
        </div> */}

          {/* Title */}
          <div className="text-center mt-3 sm:mt-5 mb-3 sm:mb-8">
            <h2 className="inline-block relative text-xl sm:text-3xl font-bold text-gray-900 tracking-tight">
              {categories_name}
            </h2>
          </div>

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 mb-12">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="p-4 bg-white rounded-2xl">
                  <div className="h-[120px] bg-gray-100 rounded-xl animate-pulse" />
                  <div className="h-4 mt-3 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
            </div>
          )}

          {/* Error / Empty State */}
          {!loading && (error || sub_categories.length === 0) && (
            <div className="bg-white rounded-2xl p-8 text-center text-gray-600 mb-12">
              {error ? (
                <p>{error}</p>
              ) : (
                <p>
                  No sub-categories found for{" "}
                  <span className="font-semibold">ID {String(categoryId)}</span>.
                </p>
              )}
            </div>
          )}

          {/* Sub-category Grid */}
          {!loading && !error && sub_categories.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4 bg-white rounded-2xl p-6 mb-8 sm:mb-12">
              {sub_categories.map((sub, i) => (
                <div
                  key={String(sub?.sub_category_id ?? i)}
                  className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform"
                  onClick={() =>
                    navigate(`/product/${categories_id}/${sub.sub_category_id}`)
                  }
                >
                  <div className="p-4 bg-[#eef7ff] rounded-xl flex justify-center items-center">
                    <img
                      src={sub.image}
                      alt={sub.sub_category_name}
                      className="w-[120px] h-[120px] object-contain"
                      loading={i < 6 ? "eager" : "lazy"}
                    />
                  </div>
                  <p className="mt-3 text-center text-sm font-medium">
                    {sub.sub_category_name}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>

  );
};

export default Category;
