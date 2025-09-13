import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import api from "../utils.jsx/axiosInstance";
import endPointApi from "../utils.jsx/endPointApi";
import { toast } from "react-toastify";

const EditProfile = () => {
    const location = useLocation();
    const profileData = location.state;
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        mobile: "",
        fullname: "",
        address: "",
        city: "",
        pincode: "",
        image: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };
    useEffect(() => {
        if (profileData) {
            setFormData({
                mobile: profileData.number || "",
                fullname: profileData.full_name || "",
                address: profileData.address || "",
                city: profileData.city || "",
                pincode: profileData.pincode || "",
                image: profileData.user_image || "",
            });
        }
    }, [profileData]);



    const handleSave = async () => {
        try {
            setLoading(true);

            const datas = new FormData();
            datas.append("full_name", formData.fullname);
            datas.append("address", formData.address);
            datas.append("city", formData.city);
            datas.append("pincode", formData.pincode);
            datas.append("user_image", formData.image);

            const res = await api.post(endPointApi.editProfile, datas);

            if (res.data && res.data.data) {
                toast.success(res.data.message)
                navigate("/my-profile");
            } else {
                toast.error(res.data.message)
            }
        } catch (err) {
            console.error("ERROR", err);
            alert("Something went wrong!");
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className="w-full px-4 bg-[#F5F6FA] flex mt-[80px] justify-center">
            <div className="w-full max-w-[850px] mt-8 pb-10">
                <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
                    {/* Header */}
                    <div className="bg-[#251c4b] text-white px-6 py-4 flex justify-between items-center">
                        <h2 className="text-lg sm:text-2xl font-semibold">Edit Profile</h2>
                        <button
                            className="p-2 cursor-pointer rounded-full hover:bg-white/20 transition"
                        >
                        </button>
                    </div>


                    {/* Form Content */}
                    <div className="p-8 sm:p-10">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                            {/* Profile Image Upload */}
                            <div className="sm:col-span-2 flex flex-col items-center">
                                <div className="relative group">
                                    {/* Profile Image */}
                                    <img
                                        src={
                                            formData.preview || formData.image ||
                                            "https://superadmin.progressalliance.org/upload/web_logo/No-user.png"
                                        }
                                        alt="Profile"
                                        className="w-45 h-45 rounded-full border-4 border-[#251c4b] shadow-md object-cover"
                                    />

                                    {/* Overlay on Hover */}
                                    <div className="absolute inset-0 bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                        <label
                                            htmlFor="profileImage"
                                            className="bg-white text-[#251c4b] p-3 rounded-full cursor-pointer shadow-lg hover:bg-[#251c4b] hover:text-white transition"
                                        >
                                            <i className="ri-camera-line text-xl"></i>
                                        </label>
                                    </div>

                                    {/* Hidden File Input */}
                                    <input
                                        id="profileImage"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files[0];
                                            if (file) {
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    image: file,
                                                    preview: URL.createObjectURL(file),
                                                }));
                                            }
                                        }}
                                    />
                                </div>
                                <p className="text-sm text-gray-500 mt-3">
                                    Click the camera to change profile photo
                                </p>
                            </div>

                            {/* Phone Number */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="text"
                                    name="mobile"
                                    value={formData.mobile}
                                    onChange={handleChange}
                                    placeholder="Enter phone number"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#251c4b] shadow-sm"
                                    disabled
                                />
                            </div>

                            {/* Full Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="fullname"
                                    value={formData.fullname}
                                    onChange={handleChange}
                                    placeholder="Enter full name"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#251c4b] shadow-sm"
                                />
                            </div>

                            {/* Address */}
                            {/* <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Full Address
                                </label>
                                <textarea
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    placeholder="Enter full address"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-3 h-28 resize-none focus:outline-none focus:ring-2 focus:ring-[#251c4b] shadow-sm"
                                />
                            </div> */}

                            {/* City */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    City
                                </label>
                                <input
                                    type="text"
                                    name="city"
                                    value={formData.city}
                                    onChange={handleChange}
                                    placeholder="Enter city"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#251c4b] shadow-sm"
                                />
                            </div>

                            {/* Pincode */}
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Pincode
                                </label>
                                <input
                                    type="text"
                                    name="pincode"
                                    value={formData.pincode}
                                    onChange={handleChange}
                                    placeholder="Enter pincode"
                                    className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#251c4b] shadow-sm"
                                />
                            </div>
                        </div>

                        {/* Save Button */}
                        <div className="mt-10 flex justify-end">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="bg-[#251c4b] cursor-pointer text-white px-8 py-3 rounded-lg font-medium hover:bg-[#1d163c] transition shadow-lg"
                            >
                                Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditProfile;
