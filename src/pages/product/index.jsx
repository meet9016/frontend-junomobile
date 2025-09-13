import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "remixicon/fonts/remixicon.css";
import endPointApi from "../utils.jsx/endPointApi";
import api from "../utils.jsx/axiosInstance";
import AOS from "aos";
import "aos/dist/aos.css";
// import PageMeta from "../utils.jsx/PageMeta";
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'




const Product = () => {
  const navigate = useNavigate();
  const { categories_id, sub_category_id } = useParams();
  const [singleProductData, setSingleProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState([]);

  const getSingleProductData = async () => {
    try {
      const formdata = new FormData();
      formdata.append("categories_id", categories_id);
      formdata.append("sub_categories_id", sub_category_id);

      setLoading(true);
      const res = await api.post(
        endPointApi.postCategorySingleProduct,
        formdata
      );

      if (res?.data && res?.data?.data) {
        setSingleProductData(res?.data?.data?.products || []);
        setName(res?.data);
      }
    } catch (err) {
      console.log("Error Fetch data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getSingleProductData();
  }, []);

  useEffect(() => {
    getSingleProductData();
    AOS.init({
      duration: 800,
      once: true,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      {/* <PageMeta title="Sub-Category" description="This is sub-category-page" /> */}



      <div className="w-full px-4 bg-[#EAEBEF] flex mt-[60px] sm:mt-[80px] justify-center">
        <div className="w-full max-w-[1300px] mt-2 md:mt-4 pb-6">
          <div className="w-full mt-0 mb-0 sm:mt-1 sm:mb-2 md:mb-12 flex justify-center">
            {loading ? (
              <Skeleton
                height={70}
                width={300}
                baseColor="#D1D5DB"
                highlightColor="#E5E7EB"
                className="mx-auto rounded"
              />
            ) : (
              <div className="text-center mt-0 sm:mt-5">
                <h2 className="inline-block relative text-lg sm:text-3xl font-bold text-gray-900 tracking-tight">
                  {name?.data?.categories_name}
                </h2>
                <p className="mt-1 sm:mt-2 text-gray-500 text-sm sm:text-lg">
                  Explore our latest collection in
                  <span className="text-black font-semibold">
                    {" "}
                    {name?.data?.categories_name}
                  </span>
                </p>
              </div>
            )}
          </div>





          {/*  Show Loader First */}
          {loading ? (
            // Skeleton Grid
            <div className="w-full p-2 grid grid-cols-1 mt-[40px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array(4) // 8 skeleton cards
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
          ) : singleProductData && singleProductData.length > 0 ? (
            // Actual Products Grid
            <div className="w-full p-2 grid grid-cols-1 mt-[8px] sm:mt-[40px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
      </div>
    </>
  );
};

export default Product;




















