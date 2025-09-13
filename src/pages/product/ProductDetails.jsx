import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import api from "../utils.jsx/axiosInstance";
import endPointApi from "../utils.jsx/endPointApi";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import Login from "../auth/Login";
import Product from ".";
import { classNames } from "primereact/utils";
// import PageMeta from "../utils.jsx/PageMeta";



const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [singleProductData, setSingleProductData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [count, setCount] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [showLogin, setShowLogin] = useState(false)
  const auth_token = localStorage.getItem("auth_token");
  const [inquiryPopup, setInquiryPopup] = useState(false)
  const [remarkData, setRemarkData] = useState("");
  const [loading, setLoading] = useState(false);



  const getSingleProductData = async () => {
    setLoading(true)
    try {
      const formdata = new FormData();
      formdata.append("product_id", id);
      // setLoading(true);
      const res = await api.post(endPointApi.postSingleProduct, formdata);

      if (res?.data && res?.data?.data) {
        setSingleProductData(res?.data?.data || []);
        if (res?.data?.data?.images?.length > 0) {
          setSelectedImage(res.data.data.images[0].image);
        }
        if (res?.data?.data?.supplier_details) {
          setSupplierData(res.data.data.supplier_details)
        }
      }
    } catch (err) {
      console.log("Error Fetch data", err);
    } finally {
      setLoading(false)
    }
  };

  useEffect(() => {
    getSingleProductData();
  }, [id]);

  useEffect(() => {
    AOS.init({
      duration: 800,
      once: true,
    });
  }, []);

  const addToCart = () => {
    try {
      if (!auth_token) {
        localStorage.setItem("redirectAfterLogin", location.pathname);
        setShowLogin(true)
        return;
        // toast.error("Please Loginss!")
      }
      const formdata = new FormData();
      formdata.append("product_id", id);
      formdata.append("quantity", count);
      formdata.append("type", 1);
      console.log("res0000111");

      api.post(endPointApi.postAddToCart, formdata).then((res) => {
        console.log("res0000", res);

        if (res.data.status == 200) {
          toast.success(res?.data?.message);
        }
      });
      // if (res.sta) console.log("res", res);
    } catch (err) {
      console.log("Error Fetch data", err);
    } finally {
      // setLoading(false)
    }
  };

  const sendInquiry = async () => {
    try {
      const formData = new FormData();
      formData.append("product_id", id);
      formData.append("quantity", count);
      formData.append("remark", remarkData);

      const res = await api.post(endPointApi.inquiryPopup, formData);

      if (res.data && res.data.data) {
        setInquiryPopup(false);
        setRemarkData("");
        toast.success(res.data.message)
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      console.log("Error Fetch data", err);
    }
  };

  const handleViewShop = () => {
    if (supplierData?.supplier_details_id) {
      navigate(`/view-shop/${supplierData.supplier_details_id}`)
    }
  }

  return (
    <>
      {/* <PageMeta title="ProductDetail" description="This is Product detail page" /> */}
      <div className="w-full px-2  sm:px-4 md:px-6 lg:px-8 pt-[60px] sm:pt-[80px] md:pt-[100px] flex flex-col items-center">
        <div className="w-full mt-4 max-w-[1300px]">
          {/* Breadcrumb */}
          <div className="text-sm sm:text-base text-gray-500 mb-4 flex flex-wrap gap-1">
            {loading ? (
              <Skeleton width={550} height={40} baseColor="#D1D5DB"
                highlightColor="#E5E7EB" />
            ) : (
              <>
                <span
                  onClick={() =>
                    navigate('/')
                  }
                  className="cursor-pointer hover:text-black"
                >
                  Home
                </span>
                <i className="ri-arrow-right-s-line"></i>{" "}
                <span
                  className="cursor-pointer hover:text-black "
                  onClick={() =>
                    navigate(`/category/${singleProductData?.category_id}`)
                  }
                >
                  {singleProductData?.category_name}
                </span>{" "}
                <i className="ri-arrow-right-s-line"></i>{" "}
                <span
                  className="cursor-pointer hover:text-black "
                  onClick={() =>
                    navigate(`/product/${singleProductData?.category_id}/${singleProductData?.sub_category_id}`)
                  }
                >
                  {singleProductData?.sub_category_name}
                </span>{" "}
                <i className="ri-arrow-right-s-line"></i>{" "}
                {singleProductData?.product_name}{" "}
              </>
            )}
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1  lg:grid-cols-2 gap-8">
            {/* LEFT PART */}
            <div className="flex mt-0 sm:mt-4 gap-4">
              {/* Thumbnails - Left side */}
              <div className="flex  flex-col gap-2 justify-start">
                {loading
                  ? Array.from({ length: 3 }).map((_, i) => (
                    <Skeleton key={i} width={80} height={80} baseColor="#D1D5DB"
                      highlightColor="#E5E7EB" />
                  ))
                  : singleProductData?.images?.map((img) => (
                    <img
                      key={img.id}
                      src={img.image}
                      alt="No Image"
                      onClick={() => setSelectedImage(img.image)}
                      className={`w-16 h-16 sm:w-20 sm:h-20 border rounded-md object-contain cursor-pointer ${selectedImage === img.image
                        ? "border-white bg-white rounded-2xl p-1"
                        : "border-white bg-white rounded-2xl p-1"
                        }`}
                    />
                  ))}
              </div>

              {/* Main Image - Right side */}
              <div className="overflow-hidden rounded-lg flex-1">
                {loading ? (
                  <div className="h-[280px] sm:h-[500px]">
                    <Skeleton
                      baseColor="#D1D5DB"
                      highlightColor="#E5E7EB"
                      className="w-full h-full"
                    />
                  </div>

                ) : (
                  <img
                    src={
                      selectedImage ||
                      (singleProductData?.images?.length > 0
                        ? singleProductData.images[0].image
                        : "/src/Image/No image.jpg")
                    }
                    alt={singleProductData?.product_name || "Product"}
                    className="w-full h-auto object-contain bg-white rounded-2xl p-10"
                  />
                )}
              </div>
            </div>

            <div className=" sm:mt-4 px-2 mt-0 sm:px-4 lg:px-0 space-y-2 sm:space-y-5">
              {loading ? (
                <div className="w-full">
                  <Skeleton
                    height={200}
                    width={"100%"}
                    baseColor="#D1D5DB"
                    highlightColor="#E5E7EB"
                    borderRadius={12}
                  />
                </div>
              ) : (
                <>
                  <h2 className="text-2xl sm:text-3xl font-bold">
                    {singleProductData?.product_name}
                  </h2>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-gray-600">
                    {singleProductData?.description}
                  </p>

                  {/* Price, discount, etc. */}
                  <div className="flex items-center gap-2 sm:gap-5 flex-nowrap sm:flex-wrap">
                    <span className="text-black text-2xl sm:text-4xl font-bold">
                      ₹{singleProductData?.price}
                    </span>
                    <span className="line-through text-red-500 text-sm sm:text-[21px] font-bold">
                      ₹{singleProductData?.cancle_price}
                    </span>
                    <span className="inline-block bg-gradient-to-r from-green-500 to-green-700 text-white text-xs sm:text-[21px] font-bold px-2 sm:px-4 py-1 rounded-lg shadow-md">
                      {singleProductData?.off_per}% OFF
                    </span>
                  </div>

                </>
              )}

              <div className=" rounded-xl border border-gray-200 mt-3 p-0">
                {loading ? (

                  <div className="animate-pulse w-full h-40 bg-gray-300 rounded-xl"></div>
                ) : (
                  <div className="bg-white rounded-xl p-4">
                    <h3 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4">
                      Product Details
                    </h3>

                    <ul className="space-y-2 text-gray-700 text-sm">
                      <li className="flex">
                        <span className="w-32 font-medium text-gray-900">SKU</span>
                        <span className="text-gray-600">{singleProductData?.sku}</span>
                      </li>
                      <li className="flex">
                        <span className="w-32 font-medium text-gray-900">Category</span>
                        <span className="text-gray-600">{singleProductData?.category_name}</span>
                      </li>
                      <li className="flex">
                        <span className="w-32 font-medium text-gray-900">Sub Category</span>
                        <span className="text-gray-600">{singleProductData?.sub_category_name}</span>
                      </li>
                    </ul>
                  </div>
                )}
              </div>


              <div className="w-full flex mt-3 flex-col sm:flex-row items-center justify-between gap-4">
                {loading ? (
                  <div className="animate-pulse w-full h-24 bg-gray-300 rounded-lg"></div>
                ) : (
                  <>
                    <div className="flex items-center border border-gray-300 bg-white rounded-lg py-2 px-4 w-full sm:w-auto justify-between">
                      <button
                        onClick={() => setCount((prev) => Math.max(prev - 1, 0))}
                        className="h-10 w-10 flex items-center justify-center text-2xl font-bold cursor-pointer"
                      >
                        -
                      </button>
                      <span className="px-6 text-xl font-semibold">{count}</span>
                      <button
                        onClick={() => setCount((prev) => prev + 1)}
                        className="h-10 w-10 flex items-center justify-center text-2xl font-bold cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="flex flex-col sm:flex-row w-full gap-4">
                      <button
                        className="flex-1 bg-[#251C4B] hover:bg-[#1a1335] text-white py-3 rounded-lg flex items-center justify-center gap-3 text-lg cursor-pointer"
                        onClick={() => addToCart()}
                      >
                        <i className="ri-shopping-cart-fill text-2xl"></i> Add to Cart
                      </button>

                      <button
                        className="flex-1 bg-[green] hover:bg-[green] text-white py-3 rounded-lg flex items-center justify-center gap-3 text-lg cursor-pointer"
                        onClick={() => {
                          if (!auth_token) {
                            localStorage.setItem("redirectAfterLogin", location.pathname);
                            setShowLogin(true);
                            return;
                          }
                          setInquiryPopup(true);
                        }}
                      >
                        <i className="ri-whatsapp-fill text-2xl"></i> Inquiry
                      </button>
                    </div>
                  </>
                )}
              </div>



              {/* Wishlist, Share */}
              {/* <div className="flex gap-6 text-sm sm:text-base text-black flex-wrap">
                <div className="flex items-center gap-1 cursor-pointer">
                                <i className="border border-gray-300 rounded-md w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center ri-heart-line"></i>
                                Add to wishlist
                            </div>
                <div className="flex items-center gap-1 cursor-pointer">
                <i className="border border-gray-300 rounded-md w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center ri-share-2-line"></i>
                Share this Product
              </div>
              </div> */}



              <div className="mt-6">
                {loading ? (
                  <div className="w-full h-40 rounded-xl">
                    <Skeleton
                      height={160}
                      baseColor="#D1D5DB"
                      highlightColor="#E5E7EB"
                      borderRadius={12}
                    />
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-gray-200 p-4">
                    <h2 className="text-lg font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4">
                      Sold By
                    </h2>

                    {/* Parent Container */}
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 p-2 rounded-lg bg-white">

                      {/* Left Part - Image */}
                      <div className="w-28 h-28 flex-shrink-0 flex items-center justify-center rounded-md border shadow-md border-gray-200 bg-white p-2 
      mx-auto sm:mx-0 order-1 sm:order-1">
                        <img
                          src={supplierData.business_logo}
                          alt="Shop Logo"
                          className="w-full h-full object-contain rounded-md"
                        />
                      </div>

                      {/* Center Part - Company + Details */}
                      <div className="flex flex-col flex-1 items-center sm:items-start text-center sm:text-left order-2 sm:order-2">
                        {/* Company Name */}
                        <h4 className="text-lg sm:text-xl font-medium text-gray-900 truncate">
                          {supplierData.company_name}
                        </h4>

                        {/* Full Name */}
                        <p className="text-sm sm:text-base font-medium text-black mt-1">
                          {supplierData.full_name} ({supplierData.chapter_short_name})
                        </p>

                        {/* Total Products */}
                        <div className="flex flex-row items-center justify-center sm:justify-start gap-2 mt-1">
                          <h4 className="text-base sm:text-lg font-medium text-black">
                            {supplierData.total_products}
                          </h4>
                          <p className="text-sm sm:text-base font-medium">Products</p>
                        </div>

                      </div>

                      {/* Right Part - Button */}
                      <div className="w-full sm:w-auto flex justify-center sm:justify-end order-3 sm:order-3 mt-3 sm:mt-0">
                        <button
                          onClick={handleViewShop}
                          className="px-5 py-1 rounded-lg border-2 bg-[#251c4b] border-[#1d163e] 
        text-white font-medium shadow-md hover:bg-[#1d163e] transition 
        w-full sm:w-auto"
                        >
                          View Shop
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>



          {/* Description Section */}
          <div className={`mt-4 sm:mt-12 ${singleProductData?.related_products?.length === 0 ? "sm:pb-15 pb-5" : ""
            }`}>
            {loading ? (
              <Skeleton height={220} baseColor="#D1D5DB"
                highlightColor="#E5E7EB"
                borderRadius={12} />
            ) : (
              <div className="bg-white shadow-md rounded-2xl border border-gray-200 overflow-hidden">
                {/* Top Header Tabs */}
                <div className="flex gap-6 text-sm sm:text-base font-medium border-b border-gray-200 bg-gray-50 px-6 py-4 rounded-t-2xl">
                  <button
                    onClick={() => setActiveTab("description")}
                    className={`transition pb-2 ${activeTab === "description"
                      ? "border-b-2 border-black cursor-pointer text-black"
                      : "text-gray-500 cursor-pointer hover:text-black"
                      }`}
                  >
                    Description
                  </button>
                  <button
                    onClick={() => setActiveTab("additional")}
                    className={`transition pb-2 ${activeTab === "additional"
                      ? "border-b-2 cursor-pointer border-black text-black"
                      : "text-gray-500 cursor-pointer hover:text-black"
                      }`}
                  >
                    Additional Information
                  </button>
                </div>

                {/* Bottom Content */}
                <div className="px-6 py-6 bg-white h-[220px]">
                  {activeTab === "description" ? (
                    <p>{singleProductData?.long_description?.replace(/<[^>]+>/g, "")}</p>
                  ) : singleProductData?.additional ? (
                    <p>{singleProductData.additional}</p>
                  ) : (
                    <div className="flex flex-col items-center justify-center w-full">
                      <div className="w-full max-w-7xl bg-white rounded-xl p-1">
                        <div className="overflow-x-auto">
                          <div className="max-h-42 overflow-y-auto [scrollbar-width:thin] [scrollbar-color:#251C4B_#f1f1f1]">
                            <table className="w-full text-sm md:text-base border-collapse border border-gray-300 min-w-full">
                              <thead className="bg-[#251c4b] sticky top-0 z-10">
                                <tr>
                                  <th className="px-3 py-2 md:px-4 md:py-2 text-left font-semibold text-white w-1/2">
                                    Specification
                                  </th>
                                  <th className="px-3 py-2 md:px-4 md:py-2 text-left font-semibold text-white w-1/2">
                                    Detail
                                  </th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-gray-200">
                                {singleProductData?.product_details?.length > 0 ? (
                                  singleProductData.product_details.map((item, index) => (
                                    <tr
                                      key={item.specification_id || index}
                                      className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition"
                                    >
                                      <td className="px-3 py-2 md:px-4 md:py-2 text-gray-600">
                                        {item.specification}
                                      </td>
                                      <td className="px-3 py-2 md:px-4 md:py-2 font-medium text-gray-900">
                                        {item.detail}
                                      </td>
                                    </tr>
                                  ))
                                ) : (
                                  <tr>
                                    <td
                                      colSpan="2"
                                      className="px-4 py-3 text-center text-gray-500 italic"
                                    >
                                      No specifications available
                                    </td>
                                  </tr>
                                )}
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {singleProductData?.related_products?.length > 0 && (
            <div className="mt-4 sm:mt-12 w-full">
              <div className="flex items-center justify-center pb-5 mb-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#251C4B] relative">
                  Related Products
                  <span className="absolute left-1/2 -bottom-2 w-16 sm:w-20 h-0.5 bg-gradient-to-r from-[#251C4B] to-[#5D4D9E] rounded transform -translate-x-1/2"></span>
                </h2>
              </div>

              <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pb-8  hover: cursor-pointer">
                {singleProductData?.related_products?.length > 0 && (
                  singleProductData.related_products.map((item, index) => (
                    <div
                      key={index}
                      data-aos="fade-up"
                      className="group border border-gray-200 rounded-xl p-4 hover:shadow-xl transition-all bg-white flex flex-col justify-between relative"
                    >

                      <div className="w-full h-[150px] sm:h-[160px] flex items-center justify-center mb-3 perspective-1000">
                        <div
                          className="w-full h-full relative group preserve-3d"
                          onClick={() => {
                            navigate(`/single-product/${item.product_id}`);
                            window.scrollTo({ top: 0, behavior: "smooth" });
                          }}
                        >

                          <div className="absolute inset-0 backface-hidden transform  group-hover:scale-105 transition-all duration-500">
                            <img
                              src={
                                item.product_image && item.product_image !== ""
                                  ? item.product_image
                                  : "/src/Image/No image.jpg"
                              }
                              alt={item.name}
                              className="w-full h-full object-contain"
                            />
                          </div>



                        </div>
                      </div>

                      <h4 className="font-semibold text-sm sm:text-base text-gray-800 line-clamp-1">
                        {item.product_name}
                      </h4>

                      <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mt-2">
                        {item.description}
                      </p>

                      <div className="flex items-center gap-4 mt-3">
                        <span className="text-lg font-bold text-black">
                          ₹{item.price}
                        </span>
                        {item.cancle_price && (
                          <span className="text-sm font-bold text-red-500 line-through">
                            ₹{item.cancle_price}
                          </span>
                        )}
                      </div>


                      <button
                        className="
        opacity-100             
        sm:opacity-50            
        sm:group-hover:opacity-100 
        cursor-pointer
        mt-4 px-3 py-2 
        border bg-[#251c4b] border-[#251c4b] 
        text-white rounded-lg 
        transition text-md
      "
                      >
                        View Product
                      </button>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

        </div>








        {
          inquiryPopup && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
              <div
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-easing="ease-out-cubic"
                className="relative bg-white rounded-lg 
                 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%] 
                 max-h-[90vh] overflow-y-auto p-6"
              >
                {/* Title */}
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 text-center">
                  Send Inquiry
                </h2>

                {/* Remark field */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    rows={5}
                    placeholder="Write your message here..."
                    value={remarkData}
                    onChange={(e) => setRemarkData(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#251c4b]"
                  />
                </div>

                {/* Buttons */}
                {/* Buttons */}
                <div className="flex justify-between items-center mt-4">
                  <button
                    onClick={sendInquiry}
                    className="px-4 cursor-pointer sm:px-6 py-2 rounded-lg bg-[#251c4b] text-white hover:bg-[#1c1536] transition text-sm sm:text-base"
                  >
                    Send
                  </button>
                  <button
                    onClick={() => setInquiryPopup(false)}
                    className="px-4 cursor-pointer sm:px-6 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-100 transition text-sm sm:text-base"
                  >
                    Cancel
                  </button>
                </div>

              </div>
            </div>
          )
        }



        {
          showLogin && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-[9999]">
              <div
                data-aos="fade-up"
                data-aos-duration="600"
                data-aos-easing="ease-out-cubic"
                className="relative  rounded-lg w-[95%] sm:w-[80%] md:w-[70%] lg:w-[60%] xl:w-[50%] max-h-[90vh] overflow-y-auto p-4">
                <button
                  onClick={() => setShowLogin(false)}
                  className="absolute cursor-pointer top-5 right-10 translate-x-[-4px] translate-y-[4px] text-black text-xl"
                >
                  <i class="ri-close-large-line"></i>
                </button>

                {/* Login Form */}
                <Login onClose={() => setShowLogin(false)} />
              </div>
            </div>
          )
        }

      </div >
    </>
  );
};
export default ProductDetails;
