import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import api from "../utils.jsx/axiosInstance";
import endPointApi from "../utils.jsx/endPointApi";


const Model = () => {
    const navigate = useNavigate();
    const { categories_id } = useParams();
    const [loading, setLoading] = useState(false)
    const [getData, setGetData] = useState({})
    useEffect(() => {
        const fetchData = async () => {
            if (!categories_id) return;
            try {
                setLoading(true);
                const formData = new FormData();
                formData.append("categories_id", categories_id);

                const res = await api.post(endPointApi.viewSubcategoryList, formData);
                if (res.data && res.data.data) {
                    setGetData(res.data.data);
                }
            } catch (err) {
                console.log("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [categories_id]);

    return (
        <section className="w-full pt-16 md:pt-24 bg-gradient-to-b from-gray-100 to-gray-200">
            <div className="max-w-[1300px] mx-auto px-4">
                {/* Section Header */}
                <h1 className="text-xl md:text-3xl font-semibold text-center text-gray-800 mb-8">
                    Year-wise Models
                </h1>

                {Object.keys(getData).map((year) => {
                    const yearData = getData[year];
                    return (
                        <div key={year} className="mb-12">
                            {/* Year Header */}
                            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6">
                                <h2 className="text-xl md:text-2xl font-semibold text-gray-800 border-l-4 border-[#251c4b] pl-3 mb-2 sm:mb-0">
                                    {year}
                                </h2>
                                <span className="text-sm md:text-base text-gray-500 font-medium">
                                    {yearData.total_subcategories} Model
                                </span>
                            </div>

                            {/* Subcategories */}
                            <div
                                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {yearData.subcategories?.map((item, idx) => (
                                    <div
                                        onClick={() => navigate(`/product/${categories_id}/${item.sub_category_id}`)}
                                        key={idx}
                                        className="flex justify-between items-center px-3 py-2 bg-[#251c4b] text-white rounded-lg shadow-md hover:bg-white hover:text-[#251c4b] border border-[#251c4b] transition-all duration-300 cursor-pointer"
                                    >
                                        {/* Name with ellipsis if too long */}
                                        <span className="font-medium text-sm md:text-base truncate max-w-[120px] md:max-w-[140px]">
                                            {item.sub_category_name}
                                        </span>
                                        <span className="text-xs md:text-sm font-semibold bg-white/25 px-2 py-1 rounded-full transition-all duration-300 hover:bg-[#251c4b] hover:text-white">
                                            {item.product_count}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default Model;
