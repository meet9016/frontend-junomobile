import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import api from "../utils.jsx/axiosInstance";
import endPointApi from "../utils.jsx/endPointApi";
import CommanCardList from "../../comman/CommanCardList";
import Login from "../auth/Login";

const WishList = () => {
    const [wishlistData, setWishList] = useState([]);
    const [loading, setLoading] = useState(false)
    const [showLogin, setShowLogin] = useState(false)
    const auth_token = localStorage.getItem("auth_token");
    const getData = async () => {
        if (!auth_token) return;
        setLoading(true)
        try {
            const res = await api.post(endPointApi.postWishList, {});
            if (res.data && res.data.data) setWishList(res.data.data.wishlist);
        } catch (err) {
            console.log("Fetch Error", err);
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        getData();
    }, []);

    useEffect(() => {
        AOS.init({ duration: 800, once: true });
    }, []);



    if (!auth_token) {
        return (
            <div className="w-full pt-[60px] bg-[#EAEBEF] sm:pt-[80px] md:pt-[20px]">
                <div className="w-full max-w-[1300px] mx-auto flex flex-col justify-center items-center min-h-[80vh] px-4">
                    <h2 className="text-lg sm:text-xl font-semibold text-[#251c4b] text-center mb-2">
                        PLEASE LOG IN
                    </h2>
                    <p className="text-gray-600 text-center mb-6">
                        Login to view items in your wishlist.
                    </p>

                    {/* Illustration */}
                    <img
                        src="https://cdni.iconscout.com/illustration/premium/thumb/empty-wishlist-illustration-svg-download-png-11068637.png"
                        alt="Login illustration"
                        className="w-28 h-28 mb-6 object-contain"
                    />

                    {/* Login Button */}
                    <button
                        onClick={() => setShowLogin(true)}
                        className="border cursor-pointer border-[#251c4b] text-[#251c4b] px-6 py-2 rounded-md hover:bg-[#251c4b] hover:text-white transition-all font-semibold"
                    >
                        LOGIN
                    </button>
                </div>
                {
                    showLogin && (
                        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
                            <div
                                data-aos="fade-up"
                                data-aos-duration="600"
                                data-aos-easing="ease-out-cubic"
                                className="relative  rounded-lg w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] max-h-[90vh] overflow-y-auto p-4">
                                <span
                                    onClick={() => setShowLogin(false)}
                                    className="absolute cursor-pointer top-5 right-10 translate-x-[-4px] translate-y-[4px] text-black text-xl"
                                >
                                    <i class="ri-close-large-line"></i>
                                </span>

                                {/* Login Form */}
                                <Login onClose={() => setShowLogin(false)} />
                            </div>
                        </div>
                    )
                }
            </div>

        );
    }

    return (
        <div className="w-full pt-[60px] bg-[#EAEBEF] sm:pt-[80px] md:pt-[100px]">
            <div className="w-full max-w-[1300px] mx-auto px-4 flex flex-col items-center">
                {/* Title */}
                <h2 className="text-3xl font-semibold text-[#251c4b] mb-2 text-center">
                    My Wishlist ❤️
                </h2>

                {/* Share Section */}
                {/* <div className="flex items-center justify-center space-x-2 mb-8">
                        <span className="text-[#251c4b] font-semibold text-xl">Share on:</span>
                        <div className="flex items-center space-x-0">
                            <i className="ri-facebook-circle-fill text-blue-600 hover:text-blue-700 text-3xl cursor-pointer transition-transform transform hover:scale-125"></i>
                            <i className="ri-twitter-fill text-sky-500 hover:text-sky-600 text-3xl cursor-pointer transition-transform transform hover:scale-125"></i>
                            <i className="ri-instagram-fill text-pink-500 hover:text-pink-600 text-3xl cursor-pointer transition-transform transform hover:scale-125"></i>
                        </div>
                    </div> */}

                {/* Masonry Style Wishlist */}
                <CommanCardList data={wishlistData} loading={loading} isTrue={false} />
            </div>

        </div >
    );
};

export default WishList;


