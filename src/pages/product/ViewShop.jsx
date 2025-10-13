import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router'
import api from '../utils.jsx/axiosInstance';
import endPointApi from '../utils.jsx/endPointApi';
import CommanCardList from '../../comman/CommanCardList';
import { toast } from 'react-toastify';


const ViewShop = () => {
    const { id } = useParams();
    const [alldata, setAllData] = useState([]);
    const [supplierData, setSupplierData] = useState({})
    const [loading, setLoading] = useState(false)
    const [isFollowing, setIsFollowing] = useState(false);

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
                setAllData(res.data.data || [])
                setSupplierData(res.data.data.supplier_details || {})
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

    const handleOnFollow = async () => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("supplier_details_id", id);

            const res = await api.post(endPointApi.addToFollow, formData);

            if (res.data && res.data.status === 200) {
                // Toggle the follow state
                setIsFollowing((prev) => !prev);

                // Toast message based on state
                if (!isFollowing) {
                    toast.success(res.data.message);
                } else {
                    toast.info(res.data.message);
                }
            } else {
                toast.error(res.data.messagea);
            }
        } catch (err) {
            console.log("Error Fetch", err);
        } finally {
            setLoading(false);
        }
    };


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
                    {/* Social Icons + Follow Button */}
                    <div className="flex flex-col items-center sm:items-start gap-3 sm:gap-4 mt-2 sm:mt-0">
                        <div className="flex justify-center sm:justify-start flex-wrap gap-3 sm:gap-4">
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

                        {/* Follow Button exactly below icons */}
                        <button
                            onClick={handleOnFollow}
                            className="w-28 cursor-pointer border rounded-md h-10 bg-[#251c4b] text-white hover:bg-[#3b2b6f] transition">
                            {isFollowing ? "Following" : "Follow"}
                        </button>
                    </div>
                </div>


                <div className="mt-8 flex flex-col sm:flex-row justify-between gap-4">
                    {/* Left Part */}
                    <div className="flex-1 bg-white p-4 h-[500px] rounded-lg shadow-md max-w-md mx-auto">
                        {/* Image & Description */}
                        <div className="mb-3 flex flex-col items-center text-center">
                            <img
                                src="https://i0.wp.com/picjumbo.com/wp-content/uploads/detailed-shot-of-ripples-at-sunset-free-image.jpeg?w=600&quality=80"
                                alt="Shopno"
                                className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-full mb-3 border-2 border-gray-200"
                            />
                            <p className="text-gray-700 text-sm sm:text-sm">
                                Shopno is an Ecommerce Website Builder for small businesses in India. Create your own online store easily.
                            </p>
                        </div>

                        {/* Horizontal line */}
                        <hr className="my-3 border-gray-300" />

                        {/* Contact Info */}
                        <div className="space-y-2 text-gray-700 text-sm">
                            <div className="flex items-start gap-2">
                                <i className="ri-reply-fill text-lg text-[#251c4b] mt-1"></i>
                                <p>2nd Floor, Shreenathji Bungalow, 6, Peddar Rd, near Raghuvir Shoppers, Mota Varachha, Surat, India, Gujarat</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="ri-phone-line text-lg text-[#251c4b]"></i>
                                <p>07016268071</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="ri-mail-line text-lg text-[#251c4b]"></i>
                                <p>contact@shopno.in</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="ri-instagram-line text-lg text-pink-500"></i>
                                <p>shopno.in</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="ri-facebook-circle-line text-lg text-blue-600"></i>
                                <p>shopnoecommerce</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <i className="ri-global-line text-lg text-green-600"></i>
                                <p>shopno.in</p>
                            </div>
                        </div>
                    </div>




                    {/* Right Part */}
                    <div className="flex-1 bg-white p-4 rounded max-h-[800px] overflow-y-auto" style={{ scrollbarWidth: 'none' }}>
                        {/* Images - Horizontal Scroll */}
                        <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4" >
                            <img
                                src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"
                                className="w-64 h-40 object-cover flex-shrink-0 rounded-md"
                                alt="Product 1"
                            />
                            <img
                                src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"
                                className="w-64 h-40 object-cover flex-shrink-0 rounded-md"
                                alt="Product 2"
                            />
                            <img
                                src="https://www.industrialempathy.com/img/remote/ZiClJf-1920w.jpg"
                                className="w-64 h-40 object-cover flex-shrink-0 rounded-md"
                                alt="Product 3"
                            />
                            {/* Add more images here */}
                        </div>

                        {/* Buttons - Horizontal Scroll */}
                        <div className="flex gap-3 overflow-x-auto no-scrollbar py-2">
                            <button className="flex-shrink-0 px-4 py-2 bg-[#251c4b] text-white rounded hover:bg-[#3b2b6f] transition">
                                iPhone
                            </button>
                            <button className="flex-shrink-0 px-4 py-2 bg-[#251c4b] text-white rounded hover:bg-[#3b2b6f] transition">
                                Vivo
                            </button>
                            <button className="flex-shrink-0 px-4 py-2 bg-[#251c4b] text-white rounded hover:bg-[#3b2b6f] transition">
                                RealMe
                            </button>
                            <button className="flex-shrink-0 px-4 py-2 bg-[#251c4b] text-white rounded hover:bg-[#3b2b6f] transition">
                                Oppo
                            </button>
                            <button className="flex-shrink-0 px-4 py-2 bg-[#251c4b] text-white rounded hover:bg-[#3b2b6f] transition">
                                Samsung
                            </button>
                            <button className="flex-shrink-0 px-4 py-2 bg-[#251c4b] text-white rounded hover:bg-[#3b2b6f] transition">
                                Mi
                            </button>

                            {/* Add more buttons here */}
                        </div>

                        {/* Card Section */}
                        <div className="mt-4">
                            <CommanCardList
                                data={alldata?.product_details}
                                loading={loading}
                                isTrue={true}
                                customGrid="grid-cols-1 sm:grid-cols-1 lg:grid-cols-3"
                                disableFade={true}
                            />
                        </div>
                    </div>
                </div>


            </div>
        </div >
    )
}

export default ViewShop
