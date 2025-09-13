import React, { useEffect, useState } from "react";
import api from "../utils.jsx/axiosInstance";
import endPointApi from "../utils.jsx/endPointApi";
import { useNavigate } from "react-router";

const MyProfile = () => {


    const [profileData, setProfileData] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const getData = async () => {
        try {
            setLoading(true);
            const res = await api.post(endPointApi.userProfile, {})
            if (res.data && res.data.data) {
                setProfileData(res.data.data)
            }
        } catch (err) {
            console.log("Error Fetch Data", err)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className="w-full px-4 bg-[#EAEBEF] flex mt-[80px] justify-center">
            <div className="w-full max-w-[700px] mt-8 pb-10">
                <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-[#251c4b] text-white px-6 py-4 flex justify-between items-center">
                        <h2 className="text-lg sm:text-2xl font-semibold">My Profile</h2>
                        <button
                            className="p-2 cursor-pointer rounded-full hover:bg-white/20 transition"
                            onClick={() => navigate('/edit-profile', { state: profileData })}
                        >
                            <i className="ri-edit-box-line text-2xl"></i>
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 sm:p-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                            {/* Image */}
                            <div className="flex justify-center sm:justify-start">
                                <img
                                    src={
                                        profileData?.user_image
                                            ? profileData.user_image
                                            : "https://superadmin.progressalliance.org/upload/web_logo/No-user.png "
                                    }
                                    alt="Profile"
                                    className="w-50 h-50 rounded-full border-2  border-[#251c4b] object-cover"
                                />
                            </div>


                            {/* User Info */}
                            <div className="space-y-3 text-gray-700">
                                <div className="flex items-center gap-3">
                                    <i className="ri-user-3-line text-[#251c4b] text-lg"></i>
                                    <p>
                                        <span className="font-bold">Full Name:</span> {profileData.full_name}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <i className="ri-phone-line text-[#251c4b] text-lg"></i>
                                    <p>
                                        <span className="font-bold">Phone:</span> {profileData.number}
                                    </p>
                                </div>

                                {/* <div className="flex items-center gap-3">
                                    <i className="ri-map-2-fill text-[#251c4b]/60 text-lg"></i>
                                    <p>
                                        <span className="font-bold">Address:</span> {profileData.address}
                                    </p>
                                </div> */}


                                <div className="flex items-center gap-3">
                                    <i className="ri-building-line text-[#251c4b] text-lg"></i>
                                    <p>
                                        <span className="font-bold">City:</span> {profileData.city}
                                    </p>
                                </div>

                                <div className="flex items-center gap-3">
                                    <i className="ri-map-pin-line text-[#251c4b] text-lg"></i>
                                    <p>
                                        <span className="font-bold">Pincode:</span> {profileData.pincode}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;
