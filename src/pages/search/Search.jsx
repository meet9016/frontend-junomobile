import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "remixicon/fonts/remixicon.css";
import endPointApi from "../utils.jsx/endPointApi";
import api from "../utils.jsx/axiosInstance";
import AOS from "aos";
import "aos/dist/aos.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const Search = () => {
    const { id } = useParams();

    const navigate = useNavigate();
    const [singleProductData, setSingleProductData] = useState([])
    const [loading, setLoading] = useState(false);

    console.log("id", id);

    useEffect(() => {
        if (!id) return;

        (async () => {
            try {
                const formData = new FormData();
                formData.append("search", String(id));

                const { data } = await api.post(
                    endPointApi.viewMoreSearchProductList,
                    formData
                );

                if (data?.status === 200) {
                    setSingleProductData(data.data ?? []);
                } else {
                    setSingleProductData([]);
                }
            } catch (err) {
                console.error("Failed to fetch full results:", err);
                setSingleProductData([]);
            } finally {
                setLoading(false)
            }
        })();
    }, [id]);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    return (
        <div className="w-full mt-9 md:mt-[80px] bg-[#EAEBEF] flex justify-center">
            <div className="w-full max-w-[1300px] pb-5">
                {loading ? (
                    // Skeleton Grid
                    <div className="w-full p-2 grid grid-cols-1 mt-[40px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {Array(8)
                            .fill(0)
                            .map((_, index) => (
                                <Skeleton
                                    key={index}
                                    baseColor="#D1D5DB"
                                    highlightColor="#E5E7EB"
                                    height={350} // approximate card height
                                    className="rounded-xl"
                                />
                            ))}
                    </div>
                ) : singleProductData && singleProductData.length > 0 ? (
                    // Actual Products Grid
                    <div
                        data-aos="fade-up"
                        className="w-full p-2 grid grid-cols-1 mt-[40px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
                    >
                        {singleProductData?.map((item, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                className="group border border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all bg-white flex flex-col justify-between relative cursor-pointer"
                                onClick={() => navigate(`/single-product/${item.product_id}`)}
                            >
                                {/* Image */}
                                <div className="w-full h-[150px] sm:h-[160px] flex items-center justify-center mb-3">
                                    <img
                                        src={
                                            item.product_image && item.product_image !== ""
                                                ? item.product_image
                                                : "/src/Image/No image.jpg"
                                        }
                                        alt={item.name}
                                        className="w-full h-full object-contain group-hover:scale-105 transition-all duration-500"
                                    />
                                </div>

                                {/* Info */}
                                <h4 className="font-semibold text-sm sm:text-base text-gray-800 h-10">
                                    {item.product_name}
                                </h4>
                                <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mt-5">
                                    {item.description}
                                </p>

                                {/* Price */}
                                <div className="flex items-center gap-3 mt-3">
                                    <span className="text-lg font-bold text-black">₹{item.price}</span>
                                    <span className="text-sm font-bold text-red-500 line-through">{item.cancle_price}</span>
                                </div>

                                {/* Button */}
                                <button className="opacity-100 sm:opacity-50 sm:group-hover:opacity-100 mt-4 px-3 py-2 border bg-[#251c4b] border-[#251c4b] text-white rounded-lg transition text-md">
                                    View Product
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
                    // No Data
                    <div className="w-full mt-10 flex justify-center items-center h-[400px]">
                        <div className="flex flex-col items-center justify-center text-center">
                            <img
                                src="/src/Image/no-data.avif"
                                alt="No Data Found"
                                className="w-48 h-48 sm:w-60 sm:h-60 object-contain one-time-bounce"
                            />
                            <h2 className="mt-4 text-xl font-semibold text-gray-700">No Data Found</h2>
                            <p className="text-gray-500 text-sm mt-1">
                                Try adjusting your filters or check back later
                            </p>
                            <button
                                onClick={() => navigate("/")}
                                className="mt-6 px-5 py-2 bg-[#251C4B] cursor-pointer text-white rounded-lg shadow-md hover:bg-[#372b63] transition"
                            >
                                Go Home
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Search;
