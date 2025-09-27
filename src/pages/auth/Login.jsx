import React, { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import api from "../utils.jsx/axiosInstance";
import endPointApi from "../utils.jsx/endPointApi";
import { saveToken } from "../utils.jsx/tokenManager";
import { toast } from "react-toastify";
import OtpInput from "react-otp-input";
import CommanInput from "../../comman/CommanInput";
import CommanButton from "../../comman/CommanButton";

const Login = ({ onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const param = location.pathname;

    const authToken = localStorage.getItem("auth_token");
    const [formData, setFormData] = useState({
        mobile: "",
        otp: "",
        capture_code: "",
        full_name: "",
        businessName: "",
        address: "",
        city: "",
        pincode: "",
    });
    const [error, setError] = useState({});
    const [otpSent, setOtpSent] = useState(false);
    const [newSupplier, setNewSupplier] = useState(false);
    const [showButtons, setShowButtons] = useState(false); // new state
    const [userType, setUserType] = useState(false);
    // console.log(userType, 'USERTYPE')

    const handleChange = (e) => {
        const { name, value } = e.target;
        let newValue = value;
        if (name === 'mobile') {
            newValue = value.replace(/[^0-9]/g, "");
            if (newValue.length > 10) {
                newValue = newValue.slice(0, 10);
            }
        }
        setFormData((prev) => ({
            ...prev,
            [name]: newValue,
        }));
        setError((prev) => ({
            ...prev,
            [name]: "",
        }));
    };

    // Send OTP
    const sendOtp = async () => {
        if (!formData.mobile) {
            setError({ mobile: "Mobile number is required" });
            return;
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            setError({ mobile: "Please enter a valid 10-digit mobile number" });
            return;
        }
        try {
            const formdata = new FormData();
            formdata.append("number", formData.mobile);

            const res = await api.post(`${endPointApi.loginUser}`, formdata);
            if (res.data.status === 200) {
                toast.success(res.data.message);
                setOtpSent(true);
            } else {
                toast.error(res.data.message)
            }
        } catch (err) {
            console.log("aaa")
        }
    };

    // Login
    const onLoginClick = async () => {
        let newErrors = {};
        if (!formData.mobile) {
            newErrors.mobile = "Mobile number is required";
        } else if (!/^\d{10}$/.test(formData.mobile)) {
            newErrors.mobile = "Enter a valid 10-digit mobile number";
        }

        if (!formData.otp) {
            newErrors.otp = "OTP is required";
        } else if (!/^\d{4,6}$/.test(formData.otp)) {
            newErrors.otp = "OTP should be 4–6 digits";
        }

        if (formData.capture_code) {
            if (!formData.full_name) newErrors.full_name = "Full name is required"
            // if (!formData.fubusinessNamell_name) newErrors.businessName = "Business name is required"
            // if (!formData.address) newErrors.address = "Address is required"
            if (!formData.city) newErrors.city = "City is required"
            if (!formData.pincode) {
                newErrors.pincode = "Pincode is required"
            } else if (!/^\d{6}$/.test(formData.pincode)) {
                newErrors.pincode = "Enter a valid 6-digit pincode"
            }
        }
        if (Object.keys(newErrors).length > 0) {
            setError(newErrors);
            return;
        }

        const formdata = new FormData();
        // formdata.append("number", formData.mobile);
        // formdata.append("otp", formData.otp);
        formdata.append("number", formData.mobile);
        formdata.append("otp", formData.otp);
        if (formData.capture_code) formdata.append('capture_code', formData.capture_code)
        if (formData.full_name) formdata.append('full_name', formData.full_name)
        // if (formData.businessName) formdata.append('full_name', formData.businessName)
        // if (formData.address) formdata.append('address', formData.address)
        if (formData.city) formdata.append('city', formData.city)
        if (formData.pincode) formdata.append('pincode', formData.pincode)
        const res = await api.post(`${endPointApi.loginUser}`, formdata);
        if (res.data.status === 200) {
            saveToken(res?.data?.data?.token);
            setShowButtons(true); //  only show Become & Supplier buttons
            if (res.data.data.user_type == 2) {
                setUserType(true)
                setShowButtons(true); // only show Become & Supplier buttons
            } else {
                const redirectPath = localStorage.getItem("redirectAfterLogin") || "/";
                localStorage.removeItem("redirectAfterLogin");
                if (onClose) onClose()
                navigate(redirectPath);
                toast.success(res?.data?.message || 'Logged in')
            }
        } else if (res.data.status === 203) {
            setFormData((prev) => ({
                ...prev,
                capture_code: res.data.data?.capture_code ?? prev.capture_code,
            }));
            setNewSupplier(true);
            toast.info(
                res?.data?.message || "Enter the OTP / capture code sent to you"
            );
        } else {
            toast.error(res.data.message)
        }
    };

    const Suuplier = () => {
        window.location.href = `https://seller.progressalliance.org/?token=${authToken}`;
    };

    const onCounting = () => {
        if (onClose) onClose();
        if (param) {
            navigate(param)
        } else {
            navigate("/");
        }
    };

    return (
        <div className="w-full mx-auto bg-gray-100 rounded-xl p-4 sm:p-5 md:p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* LEFT */}
                <div className="hidden md:flex bg-[#251C4B] text-white rounded-2xl p-4 sm:p-5 flex-col justify-between">
                    <div className="flex justify-center mt-4">
                        <img
                            src={`${import.meta.env.VITE_API_URL}/upload/web_logo/be_come_seller.jpeg`}
                            alt="Welcome Illustration"
                            className="w-full object-contain"

                        />
                    </div>
                </div>

                {/* RIGHT */}
                <div className="flex flex-col justify-center px-4 sm:px-5 py-6">
                    {!showButtons && !newSupplier && (
                        <div className="flex justify-center mb-6">
                            <img
                                src={`${import.meta.env.VITE_API_URL}/upload/web_logo/login_popup.png`}
                                alt="Logo"
                                className="w-28 sm:w-32 md:w-40 lg:w-52 xl:w-60 border border-white rounded-2xl cursor-pointer"
                                onClick={() => navigate("/")}
                            />
                        </div>
                    )}

                    {/* If showButtons true → only show 2 buttons */}
                    {showButtons ? (
                        <div className="flex flex-col items-center gap-8 p-0 w-full max-w-sm mx-auto">
                            {/* Image Section */}
                            <div className="relative w-32 h-32 sm:w-40 sm:h-40 border border-white p-5 rounded-2xl bg-white overflow-hidden">
                                <img
                                    src="https://superadmin.progressalliance.org/upload/web_logo/switch-roles.png"
                                    alt="Switch Role"
                                    className="w-full h-full object-cover "
                                />
                                {/* Overlay tint color if needed */}
                                <div className="absolute inset-0 bg-white mix-blend-multiply"></div>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col gap-4 w-full">
                                <CommanButton
                                    label="Continue as Supplier"
                                    onClick={Suuplier}
                                    className="py-3"
                                />
                                <CommanButton
                                    label="Continue as Buyer"
                                    onClick={onCounting}
                                    className="py-3"
                                />
                            </div>
                        </div>
                    ) : (
                        <>
                            {
                                newSupplier ? (
                                    <div className="text-center">
                                        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                                            Welcome
                                        </h3>
                                        <p className="mt-1 font-normal text-black text-[18px]">
                                            Add details to create your account
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-center">
                                        <h3 className="text-xl sm:text-2xl font-extrabold text-gray-900">
                                            Welcome Back
                                        </h3>
                                        <p className="mt-1 font-normal text-black text-[18px]">
                                            Please login to your account
                                        </p>
                                    </div>
                                )
                            }

                            <div className="mt-6 space-y-4">
                                {/* Mobile */}
                                <div>
                                    <CommanInput
                                        type="text"
                                        name='mobile'
                                        placeholder="Phone Number"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        maxLength={10}
                                        disabled={newSupplier}
                                    />
                                    {error.mobile && (
                                        <p className="text-red-500 text-sm leading-tight m-1">
                                            {error.mobile}
                                        </p>
                                    )}
                                </div>

                                {/* OTP */}
                                {otpSent && !newSupplier && (
                                    <div className="flex flex-col items-center">
                                        <OtpInput
                                            value={formData.otp}
                                            onChange={(otp) =>
                                                setFormData((prev) => ({ ...prev, otp }))
                                            }
                                            numInputs={6}
                                            renderSeparator={<span className="text-[#f3f4f6]">-</span>}
                                            shouldAutoFocus
                                            renderInput={(props) => (
                                                <input
                                                    {...props}
                                                    type="text"
                                                    inputMode="numeric"
                                                    pattern="[0-9]"
                                                    maxLength="6"
                                                    style={{ width: "35px", height: "40px" }}
                                                    className="border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#251C4B] transition"
                                                />
                                            )}
                                        />
                                        {error.otp && (
                                            <p className="text-red-500 text-sm leading-tight mt-2">{error.otp}</p>
                                        )}
                                    </div>
                                )}
                                {
                                    newSupplier && (
                                        <>
                                            {/* Full Name */}
                                            <div>
                                                <CommanInput
                                                    type="text"
                                                    name='full_name'
                                                    placeholder='Full Name'
                                                    value={formData.full_name}
                                                    onChange={handleChange}
                                                />
                                                {error.full_name && (
                                                    <p className="text-red-500 text-sm">{error.full_name}</p>
                                                )}
                                            </div>

                                            {/* Business Name */}
                                            {/* <div>
                                        <input
                                            type="text"
                                            name="businessName"
                                            placeholder="Business Name"
                                            className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
                                            value={formData.businessName}
                                            onChange={handleChange}
                                        />
                                        {error.businessName && (
                                            <p className="text-red-500 text-sm">{error.businessName}</p>
                                        )}
                                    </div> */}

                                            {/* Address */}
                                            {/* <div>
                                                <textarea
                                                    name="address"
                                                    placeholder="Full Address"
                                                    className="w-full border rounded-md px-3 py-3 focus:ring-2 focus:ring-[#251C4B] outline-none"
                                                    rows={3}
                                                    value={formData.address}
                                                    onChange={handleChange}
                                                />
                                                {error.address && (
                                                    <p className="text-red-500 text-sm">{error.address}</p>
                                                )}
                                            </div> */}

                                            {/* City */}
                                            <div>
                                                <CommanInput
                                                    name='city'
                                                    type="text"
                                                    placeholder="cityyyyyyyyyyy"
                                                    value={formData.city}
                                                    onChange={handleChange}
                                                />
                                                {error.city && (
                                                    <p className="text-red-500 text-sm">{error.city}</p>
                                                )}
                                            </div>

                                            {/* Pincode */}
                                            <div>
                                                <CommanInput
                                                    type="text"
                                                    name="pincode"
                                                    placeholder="Pincodeeeee"
                                                    value={formData.pincode}
                                                    onChange={handleChange}
                                                    maxLength={6}
                                                />
                                                {error.pincode && (
                                                    <p className="text-red-500 text-sm">{error.pincode}</p>
                                                )}
                                            </div>
                                        </>
                                    )
                                }

                                {/* Button */}
                                <div className="mt-5 w-full">
                                    {!otpSent ? (
                                        <CommanButton
                                            label="Send OTP"
                                            onClick={sendOtp}
                                            bgColor="bg-[#251c4b]"
                                            className="w-full py-3"

                                        />
                                    ) : (
                                        <CommanButton
                                            onClick={onLoginClick}
                                            label={newSupplier ? "Register" : "Login"}
                                            bgColor="bg-[#251c4b]"
                                            className="w-full py-3"
                                        />
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Login;




