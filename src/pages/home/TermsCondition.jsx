import React, { useEffect } from "react";

const TermsCondition = () => {
    useEffect(() => {
        window.scroll({ top: 0, behavior: 'smooth' })
    }, [])
    return (
        <div className="w-full px-4 bg-[#EAEBEF] flex mt-[80px] justify-center">
            {/* Main Content Box */}
            <div className="w-full max-w-[1300px] my-10 p-8 bg-white rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-2">Terms & Conditions</h1>
                <p className="text-sm text-gray-600 mb-6">Last updated: September 04, 2025</p>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">1. Introduction</h2>
                    <p>
                        Welcome to{" "}
                        <a
                            href="https://shop.progressalliance.org/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 underline"
                        >
                            shop.progressalliance.org
                        </a>{" "}
                        (“we,” “our,” or “us”). By accessing or using our website, you agree to
                        these Terms & Conditions. If you do not agree, please do not use our website.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">2. Services Offered</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Multiple suppliers can list their products on our website.</li>
                        <li>
                            Users can view products, add them to a cart, and place orders or inquiries
                            via WhatsApp.
                        </li>
                        <li>Users can log in using their WhatsApp number and OTP.</li>
                        <li>Users can view their inquiry history within their account.</li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">3. User Responsibilities</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>You agree to provide accurate information when logging in or placing orders/inquiries.</li>
                        <li>You are responsible for keeping your WhatsApp number and OTP secure.</li>
                        <li>You must not use our website for fraudulent or illegal purposes.</li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">4. Supplier Responsibilities</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Suppliers are responsible for the accuracy of the product details they list.</li>
                        <li>Suppliers are solely responsible for fulfilling orders and handling customer inquiries.</li>
                        <li>We act only as a platform to connect users with suppliers.</li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">5. Orders & Payments</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>
                            Orders may be placed via WhatsApp through our website’s “Add to Cart” and “Order” features.
                        </li>
                        <li>
                            Prices and availability of products are determined by the suppliers and may change without notice.
                        </li>
                        <li>
                            Payment terms and delivery details are arranged directly between users and suppliers.
                        </li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">6. Inquiries</h2>
                    <ul className="list-disc pl-6 space-y-1">
                        <li>Users may submit inquiries to suppliers through our website.</li>
                        <li>We are not responsible for the response time or outcome of supplier inquiries.</li>
                    </ul>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">7. Limitation of Liability</h2>
                    <p>
                        We provide the platform “as is” and make no warranties regarding product quality, supplier performance,
                        or delivery. Any disputes regarding orders, products, or services are between the user and the supplier.
                        We are not liable for any direct, indirect, incidental, or consequential damages arising from your use of our website.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">8. Privacy</h2>
                    <p>
                        Your use of our website is also governed by our{" "}
                        <a href="/privacy-policy" className="text-blue-600 underline">
                            Privacy Policy
                        </a>
                        , which describes how we collect and process your personal information.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">9. Changes to Terms</h2>
                    <p>
                        We may update these Terms & Conditions from time to time. Updates will be posted on this page with a new effective date.
                        Continued use of the website after changes means you accept the updated terms.
                    </p>
                </section>

                <section className="mb-4">
                    <h2 className="text-xl font-semibold mb-2">10. Contact Us</h2>
                    <p>
                        Email:{" "}
                        <a href="mailto:admin@progressalliance.org" className="text-blue-600 underline">
                            admin@progressalliance.org
                        </a>
                        <br />
                        WhatsApp:{" "}
                        <a href="tel:+918000251001" className="text-blue-600 underline">
                            +91 80002 51001
                        </a>
                    </p>
                    <p className="mt-4 text-sm text-gray-600">
                        These Terms & Conditions apply to{" "}
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
                </section>
            </div>
        </div>
    );
};

export default TermsCondition;
