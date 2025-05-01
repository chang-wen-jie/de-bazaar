import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';

export default function Index({ activeRentals }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Rentals
                </h2>
            }
        >
            <Head title="Rentals" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {activeRentals.length > 0 ? (
                                <div className="space-y-4">
                                    {activeRentals.map((rental) => (
                                        <div
                                            key={rental.id}
                                            className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row"
                                        >
                                            <div className="w-full flex-shrink-0 md:w-1/4">
                                                {rental.advertisement.photos &&
                                                rental.advertisement.photos
                                                    .length > 0 ? (
                                                    <img
                                                        src={`/storage/${rental.advertisement.photos[0].path}`}
                                                        alt={
                                                            rental.advertisement
                                                                .title
                                                        }
                                                        className="h-40 w-full rounded object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex h-40 w-full items-center justify-center rounded bg-gray-200">
                                                        <span className="text-gray-500">
                                                            No image
                                                        </span>
                                                    </div>
                                                )}
                                            </div>
                                            <div className="flex-grow">
                                                <h5 className="text-lg font-semibold">
                                                    {rental.advertisement.title}
                                                </h5>
                                                <p className="mt-1 text-sm text-gray-600">
                                                    {rental.advertisement.description?.substring(
                                                        0,
                                                        255,
                                                    )}
                                                    {rental.advertisement
                                                        .description?.length >
                                                    255
                                                        ? '...'
                                                        : ''}
                                                </p>
                                                <div className="mt-3 text-sm">
                                                    <div className="flex flex-wrap gap-x-8 gap-y-2">
                                                        <div>
                                                            <span className="font-medium">
                                                                Rental Period:
                                                            </span>{' '}
                                                            {format(
                                                                new Date(
                                                                    rental.start_date,
                                                                ),
                                                                'MMM d, yyyy',
                                                            )}{' '}
                                                            -{' '}
                                                            {format(
                                                                new Date(
                                                                    rental.end_date,
                                                                ),
                                                                'MMM d, yyyy',
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                                    <p className="text-gray-500">
                                        You don't have any active rentals.
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
