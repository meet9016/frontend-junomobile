import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import api from "../utils.jsx/axiosInstance";
import endPointApi from "../utils.jsx/endPointApi";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import AOS from "aos";
import "aos/dist/aos.css";
import { toast } from "react-toastify";
import Login from "../auth/Login";
import CommanButton from "../../comman/CommanButton";
// import PageMeta from "../utils.jsx/PageMeta";
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/styles.min.css';
import CommanCardList from "../../comman/CommanCardList";

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [singleProductData, setSingleProductData] = useState([]);
  const [supplierData, setSupplierData] = useState([]);
  const [count, setCount] = useState(1);
  const [selectedImage, setSelectedImage] = useState("");
  const [showLogin, setShowLogin] = useState(false)
  const auth_token = localStorage.getItem("auth_token");
  const [inquiryPopup, setInquiryPopup] = useState(false)
  const [remarkData, setRemarkData] = useState("");
  const [loading, setLoading] = useState(false);
  const [isWishlist, setIsWishlist] = useState(false);


  const getSingleProductData = async () => {
    setLoading(true)
    try {
      const formdata = new FormData();
      formdata.append("product_id", id);
      setLoading(true);
      const res = await api.post(endPointApi.postSingleProduct, formdata);
      if (res?.data && res?.data?.data) {
        setSingleProductData(res?.data?.data || []);
        setIsWishlist(res?.data?.data?.is_wishlist || false);

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

  const addWishList = async () => {
    if (!auth_token) {
      localStorage.setItem("redirectAfterLogin", location.pathname);
      setShowLogin(true);
      return
    }
    try {
      setLoading(true)
      const formData = new FormData();
      formData.append('product_id', id)
      const res = await api.post(endPointApi.postAddToWishList, formData)
      if (res.data && res.data.data) {
        toast.success(res.data.message)
        setIsWishlist(!isWishlist);
      } else {
        toast.error(res.data.message)
      }
    } catch (err) {
      console.log("Fetch error", err)
    } finally {
      setLoading(false)
    }
  }

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
                    navigate(`/model/${singleProductData?.category_id}`)
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
                    className="w-full h-[300px] md:h-[500px] object-contain bg-white rounded-2xl p-8"
                  />
                )}
                <div className="w-full flex mt-3 flex-col sm:flex-row items-center justify-between gap-4">
                  {loading ? (
                    <div className="animate-pulse w-full h-24 bg-gray-300 rounded-lg"></div>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row w-full gap-4">
                        {/* Wishlist Button */}
                        <CommanButton
                          onClick={addWishList}
                          className=" py-3 "
                          label={
                            <>
                              <i
                                className={
                                  isWishlist
                                    ? "ri-heart-fill text-white text-xl"
                                    : "ri-heart-line text-xl"
                                }
                              ></i>
                              <span>{isWishlist ? "Added to Wishlist" : "Add to Wishlist"}</span>
                            </>
                          }
                        />

                        {/* Inquiry Button */}
                        <CommanButton
                          onClick={() => {
                            if (!auth_token) {
                              localStorage.setItem("redirectAfterLogin", location.pathname);
                              setShowLogin(true);
                              return;
                            }
                            setInquiryPopup(true);
                          }}
                          textColor="text-white"
                          bgColor="bg-green-600"
                          className="py-3"
                          label={
                            <span className="flex items-center gap-2">
                              <i className="ri-whatsapp-fill text-2xl"></i>
                              Inquiry
                            </span>
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>


              {/* <div className="overflow-hidden rounded-2xl flex-1">
                {loading ? (
                  <div className="aspect-square"> 
                    <Skeleton
                      baseColor="#D1D5DB"
                      highlightColor="#E5E7EB"
                      className="w-full h-full rounded-2xl"
                    />
                  </div>
                ) : (
                  <div className="bg-white p-6 rounded-2xl flex items-center justify-center ">
                    <InnerImageZoom
                      src={
                        selectedImage ||
                        (singleProductData?.images?.length > 0
                          ? singleProductData.images[0].image
                          : "/src/Image/No image.jpg")
                      }
                      hasSpacer={true}
                      zoomSrc={
                        selectedImage ||
                        (singleProductData?.images?.length > 0
                          ? singleProductData.images[0].image
                          : "/src/Image/No image.jpg")
                      }
                      alt={singleProductData?.product_name || "Product"}
                      className="aspect-square w-full object-contain rounded-xl"
                    />
                  </div>
                )}
                <div className="w-full flex mt-3 flex-col sm:flex-row items-center justify-between gap-4">
                  {loading ? (
                    <div className="animate-pulse w-full h-24 bg-gray-300 rounded-lg"></div>
                  ) : (
                    <>
                      <div className="flex flex-col sm:flex-row w-full gap-4">
                        <CommanButton
                          onClick={addWishList}
                          className=" py-3 "
                          label={
                            <>
                              <i
                                className={
                                  isWishlist
                                    ? "ri-heart-fill text-white text-xl"
                                    : "ri-heart-line text-xl"
                                }
                              ></i>
                              <span>{isWishlist ? "Added to Wishlist" : "Add to Wishlist"}</span>
                            </>
                          }
                        />

                        <CommanButton
                          onClick={() => {
                            if (!auth_token) {
                              localStorage.setItem("redirectAfterLogin", location.pathname);
                              setShowLogin(true);
                              return;
                            }
                            setInquiryPopup(true);
                          }}
                          textColor="text-white"
                          bgColor="bg-green-600"
                          className="py-3"
                          label={
                            <span className="flex items-center gap-2">
                              <i className="ri-whatsapp-fill text-2xl"></i>
                              Inquiry
                            </span>
                          }
                        />
                      </div>
                    </>
                  )}
                </div>
              </div> */}
            </div>

            <div className="max-h-[800px] overflow-y-auto overflow-x-hidden sm:mt-4 px-2 mt-0 sm:px-4 lg:px-0 space-y-2 sm:space-y-5" style={{ scrollbarWidth: 'none' }}>
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
                  <div className="animate-pulse w-full h-150 bg-gray-300 rounded-xl"></div>
                ) : (
                  <div className="rounded-xl border border-gray-200 mt-3 p-0">
                    {loading ? (
                      <div className="animate-pulse w-full h-150 bg-gray-300 rounded-xl"></div>
                    ) : (
                      <div className="bg-white rounded-xl p-4">
                        <table className="w-full border border-gray-200 text-sm text-left text-gray-700">
                          <thead className="bg-gray-100 text-gray-900 font-semibold">
                            <tr>
                              <th className="px-4 py-2 border-b border-gray-300">Specification</th>
                              <th className="px-4 py-2 border-b border-gray-300">Detail</th>
                            </tr>
                          </thead>
                          <tbody>
                            {singleProductData?.product_details?.map((item, index) => (
                              <tr key={index} className="hover:bg-gray-50">
                                <td className="px-4 py-2 border-b border-gray-200">{item.specification}</td>
                                <td className="px-4 py-2 border-b border-gray-200">{item.detail}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                )}
              </div>



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
                        <CommanButton
                          label="View Shop"
                          onClick={handleViewShop}
                        />
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
                <img src="/src/Image/Breackfast & Dairy.jpg" className="w-[1500px] h-[400px]"></img>
              </div>
            )}
          </div>

          {singleProductData?.related_products?.length > 0 && (
            <div className="mt-4 sm:mt-12 w-full">
              <div className="flex items-center justify-center pb-5 mb-5">
                <h2 className="text-2xl sm:text-3xl font-bold text-center text-[#251C4B] relative">
                  Related Mobiles
                  <span className="absolute left-1/2 -bottom-2 w-16 sm:w-20 h-0.5 bg-gradient-to-r from-[#251C4B] to-[#5D4D9E] rounded transform -translate-x-1/2"></span>
                </h2>
              </div>
              <CommanCardList
                data={singleProductData?.related_products}
                loading={loading}
                isTrue={true}
              />
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
                    rows={7}
                    placeholder="Write your message here..."
                    value={remarkData}
                    onChange={(e) => setRemarkData(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#251c4b]"
                  />
                </div>

                {/* Buttons */}
                <div className="flex justify-between items-center gap-8 sm:gap-100 mt-4">
                  <CommanButton
                    onClick={sendInquiry}
                    label="Send"
                  />
                  <CommanButton
                    onClick={() => setInquiryPopup(false)}
                    label="Cancel"
                    bgColor="bg-gray-300"
                    textColor="text-black"
                  />
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

      </div >
    </>
  );
};
export default ProductDetails;
