import React from "react";
import { useNavigate } from "react-router";
import CommanButton from "./CommanButton";
import Skeleton from "react-loading-skeleton";

const CommanCardList = ({ data, loading }) => {
    const navigate = useNavigate();
    if (loading) {
        return (
            <div className="w-full p-2 grid grid-cols-1 mt-[40px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array(4)
                    .fill(0)
                    .map((_, index) => (
                        <Skeleton
                            key={index}
                            height={350}
                            baseColor="#D1D5DB"
                            highlightColor="#E5E7EB"
                            className="rounded-xl"
                        />
                    ))}
            </div>
        );
    }

    if (!data || data.length === 0) {
        return (
            <div className="w-full mt-10 flex justify-center items-center h-[400px]">
                <div className="flex flex-col items-center justify-center text-center">
                    <img
                        src="https://superadmin.progressalliance.org/upload/web_logo/not-found.png"
                        alt="No Data Found"
                        className="w-48 h-48 sm:w-60 sm:h-60 object-contain one-time-bounce"
                    />
                    <h2 className="mt-4 text-xl font-semibold text-gray-700">
                        No Product Found
                    </h2>
                    <CommanButton
                        onClick={() => navigate("/")}
                        label="Go Home"
                        className="mt-6 "
                    />
                </div>
            </div>
        );
    }

    return (
        <div className="w-full p-2 grid grid-cols-1 mt-[8px] sm:mt-[40px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {data.map((item, index) => (
                <div
                    key={item.id || index}
                    data-aos="fade-up"
                    className="group border border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all bg-white flex flex-col justify-between relative cursor-pointer"
                    onClick={() => navigate(`/single-product/${item.product_id}`)}
                >
                    {/* Heart Icon */}
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <i className="ri-heart-line text-xl bg-white rounded-md p-2 shadow-md hover:bg-red-500 hover:text-white transition-all duration-300"></i>
                    </div>

                    {/* Image */}
                    <div className="w-full h-[150px] sm:h-[160px] flex items-center justify-center mb-3">
                        <img
                            src={
                                item.product_image && item.product_image !== ""
                                    ? item.product_image
                                    : "/src/Image/No image.jpg"
                            }
                            alt={item.product_name}
                            className="w-full h-full object-contain group-hover:scale-105 transition-all duration-500"
                        />
                    </div>

                    {/* Info */}
                    <h4 className="font-semibold text-sm sm:text-base text-gray-800 truncate">
                        {item.product_name}
                    </h4>
                    <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mt-2">
                        {item.description.replace(/<[^>]+>/g, "")}
                    </p>

                    {/* Price */}
                    <div className="flex items-center gap-3 mt-3">
                        <span className="text-lg font-bold text-black">₹{item.price}</span>
                        {item.cancle_price && (
                            <span className="text-sm font-bold text-red-500 line-through">
                                ₹{item.cancle_price}
                            </span>
                        )}
                    </div>

                    {/* Button */}
                    <CommanButton label="View Product" opacity=" opacity-100 sm:opacity-50 sm:group-hover:opacity-100" />
                </div>
            ))}
        </div>
    );
};

export default CommanCardList;
