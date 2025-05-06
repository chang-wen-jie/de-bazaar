import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AdvertisementsIndex({
    advertisements,
    filters,
    userCanCreate,
    translations,
}) {
    const { auth } = usePage().props;
    const [type, setType] = useState(filters.type || '');
    const [sortBy, setSortBy] = useState(filters.sortBy || '');
    const [previousSortBy, setPreviousSortBy] = useState(filters.sortBy || '');
    const [sortOrder] = useState(filters.sortOrder || 'asc');
    const trans = (key) => translations[key] || key;

    const applyFilters = () => {
        let query = new URLSearchParams();

        if (type) query.append('type', type);

        if (sortBy) {
            query.append('sortBy', sortBy);

            const newOrder =
                sortBy === previousSortBy && sortOrder === 'asc'
                    ? 'desc'
                    : 'asc';
            query.append('sortOrder', newOrder);

            setPreviousSortBy(sortBy);
        }

        const currentPath = window.location.pathname;
        window.location.href = `${currentPath}?${query.toString()}`;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {trans('advertisements')}
                </h2>
            }
        >
            <Head title="Advertisements" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        <div className="mb-6 flex justify-between">
                            <div className="flex flex-wrap items-center gap-4">
                                <select
                                    value={type}
                                    onChange={(e) => setType(e.target.value)}
                                    className="min-w-[150px] rounded border px-3 py-2"
                                >
                                    <option value="">
                                        {trans('all_types')}
                                    </option>
                                    <option value="Sale">
                                        {trans('sale')}
                                    </option>
                                    <option value="Auction">
                                        {trans('auction')}
                                    </option>
                                    <option value="Rental">
                                        {trans('rental')}
                                    </option>
                                </select>

                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    className="min-w-[150px] rounded border px-3 py-2"
                                >
                                    <option value="">{trans('sort_by')}</option>
                                    <option value="title">
                                        {trans('title')}
                                    </option>
                                    <option value="price">
                                        {trans('price')}
                                    </option>
                                </select>

                                <button
                                    onClick={applyFilters}
                                    className="rounded bg-blue-500 px-4 py-2 text-white"
                                >
                                    {trans('apply')}
                                </button>
                            </div>

                            {auth.user && (
                                <>
                                    {userCanCreate ? (
                                        <Link
                                            href={route(
                                                'advertisements.create',
                                            )}
                                            className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                                        >
                                            {trans('create_advertisement')}
                                        </Link>
                                    ) : (
                                        <div className="flex items-center">
                                            <span className="mr-2 text-sm text-gray-600">
                                                {trans('limit_reached')}
                                            </span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                            {advertisements.data.map((advertisement) => (
                                <Link
                                    key={advertisement.id}
                                    href={`/advertisements/${advertisement.id}`}
                                    className="rounded-lg border p-4 shadow-md"
                                >
                                    <h3 className="text-lg font-semibold">
                                        {advertisement.title}
                                    </h3>
                                    <p>{advertisement.description}</p>
                                    <p className="mt-2 font-bold text-blue-600">
                                        {trans('currency_symbol')}{' '}
                                        {advertisement.price}
                                    </p>
                                    <div className="mt-4">
                                        <span className="bg-gray-200 px-3 py-1 text-xs">
                                            #{advertisement.type?.name}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>

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
