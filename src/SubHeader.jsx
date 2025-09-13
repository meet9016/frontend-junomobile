import React from "react";
import "remixicon/fonts/remixicon.css";
import Header from "./component/Header";
import { useNavigate } from "react-router";
// import 'flowbite';

const SubHeader = () => {
    const navigate = useNavigate();

    const images = Array(20).fill(
        "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/layout-engine/2022-12/paan-corner_web.png"
    );

    const product = {
        img: "https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=270/da/cms-assets/cms/product/5734b087-3ad9-485f-bbe2-52079cd9e35d.png",
        time: "14 MINS",
        name: "Amul Taaza Toned Milk",
        qty: "500 ml",
        price: "₹29",
    };
    const products = Array(6).fill(product);

    return (
        <>
            <Header />
            <div className="w-full px-4 pt-[60px] bg-[#EAEBEF] sm:pt-[80px] md:pt-[100px] flex flex-col items-center">
                <div className="w-full max-w-[1300px] flex flex-col items-center">
                    {/* Top Banner */}
                    <div>
                        <img
                            src='/src/Image/top-banner.png'
                            alt="Paan Corner"
                            className="w-full h-auto rounded-2xl object-contain"
                        />
                    </div>
                    {/* Three Category Cards */}
                    <div className="w-full max-w-[1260px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10 mt-5">
                        <img
                            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/pharmacy-WEB.jpg"
                            alt="Pharmacy"
                            className="w-full rounded-2xl object-cover"
                        />
                        <img
                            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-07/Pet-Care_WEB.jpg"
                            alt="Pet Care"
                            className="w-full rounded-2xl object-cover"
                        />
                        <img
                            src="https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=70,metadata=none,w=720/layout-engine/2023-03/babycare-WEB.jpg"
                            alt="Baby Care"
                            className="w-full rounded-2xl object-cover"
                        />
                    </div>

                    {/* Category Card Section */}
                    <div className="w-full px-4 py-16 flex justify-center" onClick={() => navigate('/product')}>
                        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-6">
                            {/* Category Cards */}
                            <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
                                <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
                                    <img src="/src/Image/Fruits-and-Vegetables.jpg" alt="Fruits & Vegetables" className="w-full h-full object-cover" />
                                </div>
                                <h5 className="mt-3 text-center text-[13px] font-bold text-black">Fruits & Vegetables</h5>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
                                <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
                                    <img src="/src/Image/Baby.webp" alt="Baby & Pregnancy" className="w-full h-full object-cover" />
                                </div>
                                <h5 className="mt-3 text-center text-[13px] font-bold text-black">Baby & Pregnancy</h5>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
                                <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
                                    <img src="/src/Image/Beverage.jpeg" alt="Beverages" className="w-full h-full object-cover" />
                                </div>
                                <h5 className="mt-3 text-center text-[13px] font-bold text-black">Beverages</h5>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
                                <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
                                    <img src="/src/Image/Meat-Seafood.jpg" alt="Meats & Seafood" className="w-full h-full object-cover" />
                                </div>
                                <h5 className="mt-3 text-center text-[13px] font-bold text-black">Meats & Seafood</h5>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
                                <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
                                    <img src="/src/Image/Biscuit & Snack.jpg" alt="Biscuit & Snacks" className="w-full h-full object-cover" />
                                </div>
                                <h5 className="mt-3 text-center text-[13px] font-bold text-black">Biscuit & Snacks</h5>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
                                <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
                                    <img src="/src/Image/Bread & Bakery.webp" alt="Breads & Bakery" className="w-full h-full object-cover" />
                                </div>
                                <h5 className="mt-3 text-center text-[13px] font-bold text-black">Breads & Bakery</h5>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
                                <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
                                    <img src="/src/Image/Breackfast & Dairy.jpg" alt="Breakfast & Dairy" className="w-full h-full object-cover" />
                                </div>
                                <h5 className="mt-3 text-center text-[13px] font-bold text-black">Breakfast & Dairy</h5>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
                                <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
                                    <img src="/src/Image/Frozen & food.png" alt="Frozen Foods" className="w-full h-full object-cover" />
                                </div>
                                <h5 className="mt-3 text-center text-[13px] font-bold text-black">Frozen Foods</h5>
                            </div>
                            <div className="flex flex-col items-center cursor-pointer hover:scale-105 transition-transform">
                                <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-gray-200 flex items-center justify-center">
                                    <img src="/src/Image/Grocery & Steples.jpg" alt="Grocery & Staples" className="w-full h-full object-cover" />
                                </div>
                                <h5 className="mt-3 text-center text-[13px] font-bold text-black">Grocery & Staples</h5>
                            </div>
                        </div>
                    </div>

                    {/* Paan Corner Grid */}
                    <div className="w-full grid grid-cols-2 border bg-white rounded-2xl border-white sm:grid-cols-5 md:grid-cols-10 mt-6">
                        {images.map((src, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <img
                                    src={src}
                                    alt={`Paan Corner ${index + 1}`}
                                    className="w-[150px] rounded-2xl object-cover"
                                />
                            </div>
                        ))}
                    </div>

                    {/* Dairy, Bread & Eggs Section */}
                    <div className="w-full px-4 mt-6 border bg-white border-white rounded-2xl py-1 flex flex-col items-center">
                        {/* Title Row */}
                        <div className="w-full flex justify-between items-center mb-4">
                            <h2 className="text-2xl font-bold">Dairy, Bread & Eggs</h2>
                            <p className="text-green-600 cursor-pointer font-semibold text-[20px] mr-4 flex items-center gap-1">
                                see all
                            </p>
                        </div>

                        {/* Products Row */}
                        <div className="w-full grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                            {products.map((item, index) => (
                                <div
                                    key={index}
                                    className="border rounded-xl p-3 hover:shadow-lg transition border-gray-200 bg-white"
                                >
                                    <img
                                        src={item.img}
                                        alt={item.name}
                                        className="w-full h-[120px] sm:h-[140px] md:h-[150px] object-contain mb-2"
                                    />
                                    <p className="text-black text-[10px] flex items-center gap-1 bg-gray-100 border rounded-2xl border-gray-100 w-15">
                                        <i className="ri-time-line"></i> {item.time}
                                    </p>
                                    <h4 className="font-semibold mt-1">{item.name}</h4>
                                    <p className="text-gray-600 text-[14px] mt-2">{item.qty}</p>
                                    <div className="flex justify-between items-center mt-2">
                                        <h5 className="font-bold text-[13px] mt-8">{item.price}</h5>
                                        <button className="px-3 py-1 mt-8 border bg-green-50 border-green-500 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition text-sm">
                                            ADD
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
};

export default SubHeader;
















































