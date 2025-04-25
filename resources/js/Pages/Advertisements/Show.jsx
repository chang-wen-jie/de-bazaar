import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, Link } from '@inertiajs/react';

export default function AdvertisementShow({ advertisement }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Advertisement Details
                </h2>
            }
        >
            <Head title={advertisement.title} />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="border-b border-gray-200 p-4">
                            <Link
                                href={route('advertisements.index')}
                                className="flex items-center text-sm text-blue-600 hover:underline"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="mr-2 h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                    />
                                </svg>
                                Back to Advertisements
                            </Link>
                        </div>

                        <div className="p-6">
                            <div className="mb-8 border-b pb-6">
                                <div className="flex flex-wrap items-center justify-between">
                                    <h1 className="mb-2 text-3xl font-bold text-gray-900">
                                        {advertisement.title}
                                    </h1>
                                    <div className="flex items-center gap-2">
                                        <span className="rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-600">
                                            {advertisement.type.name}
                                        </span>
                                    </div>
                                </div>
                                <p className="mt-4 text-2xl font-bold text-blue-600">
                                    € {advertisement.price}
                                </p>
                            </div>

                            <div className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                                    Description
                                </h2>
                                <p className="whitespace-pre-line text-gray-700">
                                    {advertisement.description}
                                </p>
                            </div>

                            <div className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                                    About the Seller
                                </h2>
                                <Link
                                    href={`/users/${advertisement.user.id}`}
                                    className="flex items-center rounded-lg p-2 transition-colors hover:bg-gray-50"
                                >
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-center">
                                        {advertisement.user.first_name.charAt(
                                            0,
                                        )}
                                    </div>
                                    <div className="ml-4">
                                        <p className="font-medium text-gray-900">
                                            {advertisement.user.full_name}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            Member since{' '}
                                            {new Date(
                                                advertisement.user.created_at,
                                            ).toLocaleDateString()}
                                        </p>
                                    </div>
                                </Link>
                            </div>

                            <div className="mt-8">
                                <button
                                    type="button"
                                    className="w-full rounded-md bg-blue-600 py-3 text-center font-medium text-white hover:bg-blue-700"
                                >
                                    Buy
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
