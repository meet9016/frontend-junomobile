import React from "react";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            {/* Header */}
            <header className="bg-[#251c4b] text-white p-4">
                My App Header
            </header>

            {/* Main Content */}
            <main className="flex-1 p-6">{children}</main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white p-4 text-center">
                © 2025 My App
            </footer>
        </div>
    );
};

export default Layout;
