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
import CommanCardList from "../../comman/CommanCardList";




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
          {/*  Show Card */}
          <CommanCardList data={singleProductData} loading={loading} />
        </div>
      </div>
    </>
  );
};

export default Product;















