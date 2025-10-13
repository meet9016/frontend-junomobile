import React, { useState } from "react";
import { useNavigate } from "react-router";
import CommanButton from "./CommanButton";
import Skeleton from "react-loading-skeleton";
import { motion } from "framer-motion";

const CommanCardList = ({ data, loading, isTrue, customGrid, disableFade }) => {
    const [likedItems, setLikedItems] = useState({});
    const [floatingHearts, setFloatingHearts] = useState({});
    const navigate = useNavigate();

    // Handle Like Button + Floating Hearts
    const handleLike = (cardId) => {
        setLikedItems((prev) => {
            const isLiked = !prev[cardId];

            if (isLiked) {
                const newHearts = Array.from({ length: 6 }).map((_, i) => ({
                    id: `${cardId}-${Date.now()}-${i}`,
                    x: Math.random() * 60 - 30,
                    y: Math.random() * 60 + 60,
                    scale: Math.random() * 0.5 + 0.7,
                }));

                setFloatingHearts((prevHearts) => ({
                    ...prevHearts,
                    [cardId]: [...(prevHearts[cardId] || []), ...newHearts],
                }));

                // Remove hearts after animation
                setTimeout(() => {
                    setFloatingHearts((prevHearts) => ({
                        ...prevHearts,
                        [cardId]: (prevHearts[cardId] || []).filter(
                            (heart) => !newHearts.some((h) => h.id === heart.id)
                        ),
                    }));
                }, 1200);
            }

            return { ...prev, [cardId]: isLiked };
        });
    };

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
        // <div className="w-full p-2 grid grid-cols-1 mt-[8px] sm:mt-[10px] mb-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
            className={`w-full p-2 mt-[8px] sm:mt-[10px] mb-5 grid gap-6 ${customGrid || "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
                }`}
        >

            {data.map((item, index) => {
                // Ensure unique ID for each card
                const cardId = item.id || item.product_id || index;

                return (
                    <div
                        key={cardId}
                        // data-aos="fade-up"
                        {...(!disableFade && { "data-aos": "fade-up" })} // <-- Conditional fade
                        className="group border border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all bg-white   flex flex-col justify-between relative cursor-pointer"
                    >
                        {/* Heart Icon */}
                        {isTrue && (
                            <>
                                <div
                                    onClick={() => handleLike(cardId)}
                                    className="absolute top-3 right-3 cursor-pointer z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 border border-gray-300 transition-all duration-300"

                                >
                                    <i
                                        className={`${likedItems[cardId]
                                            ? "ri-heart-fill text-red-500"
                                            : "ri-heart-line text-gray-600"
                                            } text-xl transition-all duration-300`}
                                    ></i>
                                </div>
                                {/* Floating Hearts */}
                                {(floatingHearts[cardId] || []).map((heart) => (
                                    <motion.i
                                        key={heart.id}
                                        initial={{ opacity: 1, y: 0, x: 0, scale: heart.scale }}
                                        animate={{ opacity: 0, y: -heart.y, x: heart.x }}
                                        transition={{ duration: 1.2, ease: "easeOut" }}
                                        className="ri-heart-fill text-red-500 absolute top-6 right-6 text-lg z-[50] pointer-events-none"
                                    />
                                ))}
                            </>
                        )}

                        {!isTrue && (
                            <div
                                className="absolute top-3 right-3 cursor-pointer z-10 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 border border-gray-300 transition-all duration-300"
                            >
                                <i className="ri-close-line text-gray-600 text-md"></i>
                            </div>
                        )}


                        {/* Image */}
                        <div className="w-full h-[150px] sm:h-[160px] flex items-center justify-center mb-3">
                            <img
                                src={
                                    item.product_image && item.product_image !== ""
                                        ? item.product_image
                                        : item.product_images && item.product_images !== ""
                                            ? item.product_images
                                            : "/src/Image/No image.jpg"
                                }
                                alt={item.product_name}
                                onClick={() => navigate(`/single-product/${item.product_id}`)}
                                className="w-full h-full object-contain group-hover:scale-105 transition-all duration-500"
                            />
                        </div>

                        {/* Info */}
                        <h4 className="font-semibold text-sm mt-5 sm:text-base text-gray-800 truncate">
                            {item.product_name}
                        </h4>
                        {isTrue && (
                            <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mt-2">
                                {item.description.replace(/<[^>]+>/g, "")}
                            </p>
                        )}
                        {/* Price */}
                        <div className="flex items-center gap-4 mt-2">
                            <span className="text-lg font-bold text-black">₹{item.price}</span>
                            {item.cancle_price && (
                                <span className="text-sm font-bold text-red-500 line-through">
                                    ₹{item.cancle_price}
                                </span>
                            )}
                        </div>
                        {/* Button */}
                        {isTrue && (
                            <CommanButton label="View Mobile" className="mt-2" opacity=" opacity-100 sm:opacity-50 sm:group-hover:opacity-100" />
                        )}

                    </div>
                );
            })}
        </div>
    );
};

export default CommanCardList;
