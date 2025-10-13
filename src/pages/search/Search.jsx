import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "remixicon/fonts/remixicon.css";
import endPointApi from "../utils.jsx/endPointApi";
import api from "../utils.jsx/axiosInstance";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-loading-skeleton/dist/skeleton.css";
import CommanCardList from "../../comman/CommanCardList";

const Search = () => {
    const { id } = useParams();
    const [singleProductData, setSingleProductData] = useState([])
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (!id) return;
        (async () => {
            try {
                const formData = new FormData();
                formData.append("search", String(id));
                const { data } = await api.post(
                    endPointApi.viewMoreSearchProductList,
                    formData
                );
                if (data?.status === 200) {
                    setSingleProductData(data.data ?? []);
                } else {
                    setSingleProductData([]);
                }
            } catch (err) {
                console.error("Failed to fetch full results:", err);
                setSingleProductData([]);
            } finally {
                setLoading(false)
            }
        })();
    }, [id]);

    useEffect(() => {
        AOS.init({
            duration: 800,
            once: true,
        });
    }, []);

    return (
        <div className="w-full mt-9 md:mt-[80px] bg-[#EAEBEF] flex justify-center">
            <div className="w-full max-w-[1300px] mt-3 sm:mt-0 sm:p-0 p-4 pb-5">
                {/* Show Card */}
                <CommanCardList data={singleProductData} loading={loading} isTrue={true} />
            </div>
        </div>
    );
};

export default Search;
