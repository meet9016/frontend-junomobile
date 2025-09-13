import React, { useEffect } from "react";

const PrivacyPolicy = () => {
    useEffect(() => {
        window.scroll({ top: 0, behavior: 'smooth' })
    }, [])
    return (
        <div className="w-full px-4 bg-[#EAEBEF] flex mt-[80px] justify-center">
            {/* Main Content Box */}
            <div className="w-full max-w-[1300px] my-10 p-8 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-2">Privacy Policy</h1>
                <p className="text-sm text-gray-600 mb-6">Effective Date: 10-09-2025</p>

                <p className="mb-4">
                    Progress Alliance (“we”, “our”, “us”) operates{" "}
                    <a
                        href="https://shop.progressalliance.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        shop.progressalliance.org
                    </a>
                    . We respect your privacy and are committed to protecting the personal
                    information you share with us when using our website and services.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                    1. Information We Collect
                </h2>
                <p>When you use our website, we may collect:</p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>
                        <strong>Personal information:</strong> mobile number (for WhatsApp /
                        OTP login), name, email, delivery address.
                    </li>
                    <li>
                        <strong>Transaction & activity information:</strong> products you
                        view, add to cart, inquire, or order.
                    </li>
                    <li>
                        <strong>Supplier & product data:</strong> product details and inquiry
                        records.
                    </li>
                    <li>
                        <strong>Technical information:</strong> IP address, device/browser
                        details, timestamps, analytics.
                    </li>
                    <li>
                        <strong>WhatsApp interaction:</strong> phone number and message
                        content when contacting us.
                    </li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                    2. How We Use Your Information
                </h2>
                <ul className="list-disc pl-6 space-y-1">
                    <li>To manage accounts and authenticate OTP logins.</li>
                    <li>
                        To enable browsing, cart, inquiry, and placing orders via WhatsApp.
                    </li>
                    <li>
                        To forward inquiry/order details to suppliers for fulfillment.
                    </li>
                    <li>To communicate about orders, inquiries, and support.</li>
                    <li>To detect fraud and comply with law.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                    3. Sharing & Disclosure
                </h2>
                <ul className="list-disc pl-6 space-y-1">
                    <li>
                        <strong>Suppliers:</strong> necessary order/inquiry details are
                        shared with suppliers.
                    </li>
                    <li>
                        <strong>Service providers:</strong> hosting, OTP/WhatsApp delivery,
                        analytics, payment support.
                    </li>
                    <li>
                        <strong>Legal obligations:</strong> when required by law.
                    </li>
                </ul>
                <p className="font-medium mt-2">
                    We do not sell your personal information.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                    4. Cookies & Tracking
                </h2>
                <p>
                    We use cookies, local storage, and analytics tools to improve your
                    experience, remember preferences, and analyze site usage.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">5. Security</h2>
                <p>
                    We apply reasonable technical and administrative measures (encryption,
                    access controls) to protect your data. No online system is completely
                    secure.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                    6. Data Retention & Your Rights
                </h2>
                <p>We retain data as long as necessary. You may:</p>
                <ul className="list-disc pl-6 space-y-1">
                    <li>Request access to your data.</li>
                    <li>Request correction or deletion.</li>
                    <li>Opt out of promotional communications.</li>
                </ul>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                    7. Third-party Links & Services
                </h2>
                <p>
                    Our site integrates third-party services (e.g., WhatsApp, analytics).
                    Please review their policies separately.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">8. Children</h2>
                <p>
                    Our website is not for children under 13. We do not knowingly collect
                    such data. Contact us to remove if mistakenly collected.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">
                    9. Changes to this Policy
                </h2>
                <p>
                    We may update this Privacy Policy. Updates will be posted here with a
                    new effective date.
                </p>

                <h2 className="text-xl font-semibold mt-6 mb-2">10. Contact Us</h2>
                <p>
                    Email:{" "}
                    <a
                        href="mailto:admin@progressalliance.org"
                        className="text-blue-600 underline"
                    >
                        admin@progressalliance.org
                    </a>
                </p>
                <p>
                    WhatsApp / Phone:{" "}
                    <a
                        href="tel:+918000251001"
                        className="text-blue-600 underline"
                    >
                        +91 80002 51001
                    </a>
                </p>

                <p className="mt-6 text-sm text-gray-600">
                    This Privacy Policy applies to{" "}
                    <a
                        href="https://shop.progressalliance.org/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline"
                    >
                        shop.progressalliance.org
                    </a>
                    .
                </p>
            </div>
        </div>
    );
};

export default PrivacyPolicy;
