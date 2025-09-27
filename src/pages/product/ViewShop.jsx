import React, { useEffect, useState } from 'react'
import { Form, useNavigate, useParams } from 'react-router'
import api from '../utils.jsx/axiosInstance';
import endPointApi from '../utils.jsx/endPointApi';
import CommanButton from '../../comman/CommanButton';
import CommanCardList from '../../comman/CommanCardList';

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
                <CommanCardList data={alldata?.product_details} loading={loading} />
            </div>
        </div >
    )
}

export default ViewShop
