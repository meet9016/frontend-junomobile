import React, { useEffect, useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import api from '../utils.jsx/axiosInstance';
import endPointApi from '../utils.jsx/endPointApi';

const MOBILE_BREAKPOINT = 520;

const Inquiry = () => {
    const [inquiryData, setInquiryData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [isMobile, setIsMobile] = useState(typeof window !== 'undefined' ? window.innerWidth <= MOBILE_BREAKPOINT : false);
    console.log(inquiryData, 'setInquiry')

    useEffect(() => {
        const onResize = () => setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
        onResize();
        window.addEventListener('resize', onResize);
        return () => window.removeEventListener('resize', onResize);
    }, []);

    const getProduct = async () => {
        try {
            setLoading(true);
            const res = await api.post(endPointApi.inquiryList, {});
            if (res.data && res.data.data) {
                setInquiryData(res.data.data);
            } else {
                setInquiryData([]);
            }
        } catch (err) {
            console.log('Error Fetch Data', err);
            setInquiryData([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const actionBodyTemplate = (row) => {
        return (
            <button
                onClick={() => {
                    if (row.link) {
                        window.open(row.link, '_blank');
                    } else {
                        console.log('No link available');
                    }
                }}
                className="flex items-center gap-2 px-3 py-1 bg-[#251c4b] cursor-pointer text-white text-sm font-medium rounded-lg shadow-md transition duration-300"
            >
                <span>View Product</span>
            </button>
        );
    };

    // Safe formatter for date
    const formatDate = (d) => {
        if (!d) return '-';
        try {
            return new Date(d).toLocaleDateString('en-GB');
        } catch {
            return '-';
        }
    };

    return (
        // outer wrapper: ensure no accidental horizontal overflow
        <div className="w-full px-4 bg-[#EAEBEF] flex mt-[80px] justify-center overflow-x-hidden">
            <div className="w-full max-w-[1300px] sm:mt-8 pb-5">
                {/* MOBILE: card/list layout to avoid horizontal scroll */}
                {isMobile ? (
                    <div className="flex flex-col gap-4">
                        {loading ? (
                            <div className="text-center py-6">Loading...</div>
                        ) : inquiryData.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-10">
                                <img
                                    src="https://superadmin.progressalliance.org/upload/web_logo/not-found.png"
                                    alt="No Data Found"
                                    className="w-40 h-40 sm:w-52 sm:h-52 object-contain one-time-bounce"
                                />
                                <p className="mt-4 text-gray-600 font-medium text-lg">No inquiry found</p>
                            </div>
                        ) : (
                            inquiryData.map((row, idx) => (
                                <div
                                    key={row.order_number ?? idx}
                                    className="bg-white rounded-lg p-2 sm:p-4 shadow-sm break-words"
                                >
                                    <div className="mb-2">
                                        <div className="text-xs text-gray-500">Inquiry Number</div>
                                        <div className="text-sm font-medium">{row.order_number ?? '-'}</div>
                                    </div>
                                    <div className="mb-2">
                                        <div className="text-xs text-gray-500">Inquiry Date</div>
                                        <div className="text-sm">{formatDate(row.order_date)}</div>
                                    </div>
                                    <div className="mt-3">{actionBodyTemplate(row)}</div>
                                </div>
                            ))
                        )}
                    </div>
                ) : (
                    // DESKTOP / TABLET: DataTable
                    <DataTable
                        value={inquiryData}
                        emptyMessage={
                            <div className="flex flex-col items-center justify-center py-10">
                                <img
                                    src="https://superadmin.progressalliance.org/upload/web_logo/not-found.png"
                                    alt="No Data Found"
                                    className="w-40 h-40 sm:w-40 sm:h-40 object-contain one-time-bounce"
                                />
                                <p className="mt-4 text-gray-600 font-medium text-lg">No inquiry found</p>
                            </div>
                        }
                        responsiveLayout="stack"
                        breakpoint="960px"
                        className="w-full"
                    >
                        <Column field="order_number" header="Inquiry Number" sortable />
                        <Column
                            field="order_date"
                            header="Inquiry Date"
                            sortable
                            body={(rowData) => {
                                const date = new Date(rowData.order_date);
                                return date.toLocaleDateString("en-GB");
                            }}
                        />
                        <Column body={actionBodyTemplate} header="Action" />
                    </DataTable>
                )}
            </div>
        </div>
    );
};

export default Inquiry;
