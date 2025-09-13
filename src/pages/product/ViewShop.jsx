import React, { useEffect, useState } from 'react'
import { Form, useNavigate, useParams } from 'react-router'
import api from '../utils.jsx/axiosInstance';
import endPointApi from '../utils.jsx/endPointApi';

const ViewShop = () => {
    const { id } = useParams();
    const navigate = useNavigate()
    const [alldata, setAllData] = useState([]);
    const [supplierData, setSupplierData] = useState({})
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        window.scroll({ top: 0, behavior: 'smooth' })
    }, [])

    const getData = async () => {
        try {

            const formData = new FormData();
            formData.append('supplier_details_id', id)
            setLoading(true)
            const res = await api.post(endPointApi.supplierProductList, formData)
            if (res.data && res.data.data) {
                setAllData(res.data.data)
                setSupplierData(res.data.data.supplier_details)
            } else {
                console.log("Not Data")
            }
        } catch (err) {
            console.log("Error", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="w-full px-4 bg-[#EAEBEF] flex mt-[80px] justify-center">
            <div className="w-full max-w-[1300px] mt-0 sm:mt-4 pb-5">

                <div className="flex flex-col sm:flex-row items-center sm:items-stretch mt-0 sm:mt-3 gap-3 sm:gap-6 p-3 sm:p-6 bg-white rounded-lg shadow-md flex-wrap">

                    {/* Left: Image */}
                    <div className="w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 shadow-sm mx-auto sm:mx-0">
                        <img
                            src={supplierData.business_logo}
                            alt="Shop Logo"
                            className="w-full h-full object-contain rounded-lg"
                        />
                    </div>

                    {/* Right: Info */}
                    <div className="flex flex-col flex-1 min-w-0 gap-1 sm:gap-2 mt-2 sm:mt-0 text-center sm:text-left">
                        <h4 className="text-lg sm:text-2xl font-bold text-gray-900 break-words">
                            {supplierData.company_name}
                        </h4>

                        <p className="text-sm sm:text-lg font-bold text-black">
                            {supplierData.full_name} ({supplierData.chapter_short_name})
                        </p>

                        {/* Total Products */}
                        <div className="flex flex-row justify-center sm:justify-start items-center gap-2">
                            <h4 className="text-base sm:text-xl font-bold text-black">
                                {supplierData.total_products}
                            </h4>
                            <p className="text-sm sm:text-lg text-black font-bold">Products</p>
                        </div>
                    </div>

                    {/* Social Icons */}
                    <div className="flex justify-center sm:justify-start flex-wrap gap-3 sm:gap-4 mt-2 sm:mt-0">
                        {supplierData?.website_link && (
                            <a
                                href={supplierData?.website_link}
                                target="_blank"
                                className="text-gray-500 hover:text-[#25D366] transition transform hover:scale-110 text-xl sm:text-2xl"
                            >
                                <i className="ri-global-line"></i>
                            </a>
                        )}
                        {supplierData?.facebook_link && (
                            <a
                                href={supplierData?.facebook_link}
                                target="_blank"
                                className="text-gray-500 hover:text-blue-600 transition transform hover:scale-110 text-xl sm:text-2xl"
                            >
                                <i className="ri-facebook-circle-line"></i>
                            </a>
                        )}
                        {supplierData?.instagram_link && (
                            <a
                                href={supplierData?.instagram_link}
                                target="_blank"
                                className="text-gray-500 hover:text-pink-500 transition transform hover:scale-110 text-xl sm:text-2xl"
                            >
                                <i className="ri-instagram-line"></i>
                            </a>
                        )}
                        {supplierData?.youtube_link && (
                            <a
                            
                                href={supplierData?.youtube_link}
                                target="_blank"
                                className="text-gray-500 hover:text-red-600 transition transform hover:scale-110 text-xl sm:text-2xl"
                            >
                                <i className="ri-youtube-line"></i>
                            </a>
                        )}
                        {supplierData?.linkdin_link && (
                            <a
                                href={supplierData?.linkdin_link}
                                target="_blank"
                                className="text-gray-500 hover:text-[#0A66C2] transition transform hover:scale-110 text-xl sm:text-2xl"
                            >
                                <i className="ri-linkedin-line"></i>
                            </a>
                        )}
                    </div>
                </div>


                {loading ? (
                    <div className="w-full mt-20 flex justify-center items-center h-[300px]">
                        <div className="animate-spin rounded-full h-12 w-12 border-4 border-[#251C4B] border-t-transparent"></div>
                    </div>
                ) : alldata?.product_details && alldata?.product_details.length > 0 ? (
                    <div className="w-full p-0 sm:p-0 grid grid-cols-1 mt-5 sm:mt-7 rounded-md sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {alldata?.product_details?.map((item, index) => (
                            <div
                                key={index}
                                data-aos="fade-up"
                                className="group border border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all bg-white flex flex-col justify-between relative cursor-pointer"
                                onClick={() => navigate(`/single-product/${item.product_id}`)}
                            >
                                {/* Product Image */}
                                <div className="w-full h-[160px] flex items-center justify-center mb-3 overflow-hidden">
                                    <img
                                        src={item.product_image || "/src/Image/No image.jpg"}
                                        alt={item.product_name}
                                        className="w-full h-full object-contain group-hover:scale-105 transition-all duration-500"
                                    />
                                </div>

                                {/* Product Name */}
                                <h4 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-1">
                                    {item.product_name}
                                </h4>

                                {/* Description */}
                                <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mt-2">
                                    {item.description?.replace(/<[^>]+>/g, "") || "No description available"}
                                </p>

                                {/* Price Section */}
                                <div className="flex items-center gap-3 mt-3">
                                    <span className="text-lg font-bold text-black">
                                        ₹{item.price}
                                    </span>
                                    {item.cancle_price && (
                                        <span className="text-sm text-red-500 line-through">
                                            ₹{item.cancle_price}
                                        </span>
                                    )}
                                </div>

                                {/* Button */}
                                <button
                                    className="
          opacity-100 sm:opacity-50 sm:group-hover:opacity-100
          cursor-pointer mt-4 px-3 py-2 
          border bg-[#251c4b] border-[#251c4b] 
          text-white rounded-lg 
          transition text-md
        "
                                >
                                    View Product
                                </button>
                            </div>
                        ))}
                    </div>
                ) : (
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

                            <button
                                onClick={() => navigate("/")}
                                className="mt-6 px-5 py-2 bg-[#251C4B] text-white rounded-lg cursor-pointer shadow-md hover:bg-[#372b63] transition"
                            >
                                Go Home
                            </button>
                        </div>
                    </div>
                )}

            </div>
        </div >
    )
}

export default ViewShop
