import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AdvertisementsIndex({ advertisements, filters }) {
    const { url } = usePage();

    // State for filters and sorting
    const [type, setType] = useState(filters.type || '');
    const [status, setStatus] = useState(filters.status || '');
    const [sortBy, setSortBy] = useState(filters.sortBy || '');
    const [sortOrder, setSortOrder] = useState(filters.sortOrder || 'asc');

    const applyFilters = () => {
        let query = new URLSearchParams();
        if (type) query.append('type', type);
        if (status) query.append('status', status);
        if (sortBy) {
            query.append('sortBy', sortBy);
            query.append('sortOrder', sortOrder);
        }

        window.location.href = `${url.split('?')[0]}?${query.toString()}`;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Advertisements
                </h2>
            }
        >
            <Head title="Advertisements" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        {/* Filters & Sorting */}
                        <div className="mb-4 flex flex-wrap items-center gap-4">
                            <select
                                value={type}
                                onChange={(e) => setType(e.target.value)}
                                className="rounded border px-3 py-2"
                            >
                                <option value="">All Types</option>
                                <option value="Sale">Sale</option>
                                <option value="Auction">Auction</option>
                            </select>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="rounded border px-3 py-2"
                            >
                                <option value="">All Statuses</option>
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>

                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                className="rounded border px-3 py-2"
                            >
                                <option value="">Sort By</option>
                                <option value="title">Title</option>
                                <option value="price">Price</option>
                                <option value="start_date">Start Date</option>
                            </select>

                            <select
                                value={sortOrder}
                                onChange={(e) => setSortOrder(e.target.value)}
                                className="rounded border px-3 py-2"
                            >
                                <option value="asc">Ascending</option>
                                <option value="desc">Descending</option>
                            </select>

                            <button
                                onClick={applyFilters}
                                className="rounded bg-blue-500 px-4 py-2 text-white"
                            >
                                Apply
                            </button>
                        </div>

                        {/* Advertisements List */}
                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {advertisements.data.map((advertisement) => (
                                <div
                                    key={advertisement.id}
                                    className="rounded-lg border p-4 shadow-md"
                                >
                                    <h3 className="text-lg font-semibold">
                                        {advertisement.title}
                                    </h3>
                                    <p>{advertisement.description}</p>
                                    <p className="mt-2 font-bold text-blue-600">
                                        ${advertisement.price}
                                    </p>
                                    <p className="text-sm">
                                        Listed: {advertisement.start_date}
                                    </p>
                                    <p className="text-sm">
                                        Ends: {advertisement.end_date}
                                    </p>
                                    <div className="mt-4">
                                        <span className="bg-gray-200 px-3 py-1 text-xs">
                                            {advertisement.type?.name}
                                        </span>
                                        <span
                                            className={`ml-2 rounded px-3 py-1 text-xs ${
                                                advertisement.status?.name ===
                                                'Active'
                                                    ? 'bg-green-200 text-green-800'
                                                    : 'bg-red-200 text-red-800'
                                            }`}
                                        >
                                            {advertisement.status?.name}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Pagination */}
                        <div className="mt-6 flex justify-center">
                            {advertisements.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url || '#'}
                                    className={`mx-1 border px-4 py-2 ${
                                        link.active
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-white text-blue-500'
                                    } rounded`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
