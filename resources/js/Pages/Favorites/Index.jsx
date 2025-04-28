import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, Link } from '@inertiajs/react';

export default function FavoritesIndex({ favorites }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Favorites
                </h2>
            }
        >
            <Head title="Favorites" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">

                            {favorites.length > 0 ? (
                                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                    {favorites.map((advertisement) => (
                                        <Link
                                            key={advertisement.id}
                                            href={route(
                                                'advertisements.show',
                                                advertisement.id,
                                            )}
                                            className="block overflow-hidden rounded-lg border shadow-md transition-shadow hover:shadow-lg"
                                        >
                                            <div className="p-4">
                                                <h3 className="font-semibold text-gray-900">
                                                    {advertisement.title}
                                                </h3>
                                                <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                                                    {advertisement.description}
                                                </p>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <p className="font-bold text-blue-600">
                                                        € {advertisement.price}
                                                    </p>
                                                    <span className="bg-gray-200 px-2 py-1 text-xs">
                                                        #
                                                        {
                                                            advertisement.type
                                                                .name
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                                    <p className="text-gray-500">
                                        You haven't saved any advertisements
                                        yet.
                                    </p>
                                    <Link
                                        href={route('advertisements.index')}
                                        className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                    >
                                        Browse Advertisements
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
