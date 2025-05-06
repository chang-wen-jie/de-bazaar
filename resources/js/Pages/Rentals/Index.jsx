import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { format } from 'date-fns';
import { useState } from 'react';

export default function Index({ rentals, isGuest, flash, translations }) {
    const [returnModalOpen, setReturnModalOpen] = useState(false);
    const [selectedRental, setSelectedRental] = useState(null);
    const trans = (key) => translations[key] || key;

    const { data, setData, post, progress, processing, errors, reset } =
        useForm({
            return_photo: null,
        });

    const openReturnModal = (rental) => {
        setSelectedRental(rental);
        setReturnModalOpen(true);
        reset();
    };

    const closeReturnModal = () => {
        setReturnModalOpen(false);
        setSelectedRental(null);
    };

    const handleFileChange = (e) => {
        setData('return_photo', e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('rentals.return', selectedRental.id), {
            onSuccess: () => {
                closeReturnModal();
            },
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {isGuest
                        ? trans('my_rented_items')
                        : trans('my_rental_listings')}
                </h2>
            }
        >
            <Head
                title={
                    isGuest
                        ? trans('my_rented_items')
                        : trans('my_rental_listings')
                }
            />

            {/* Success message */}
            {flash && flash.success && (
                <div className="mx-auto mb-6 max-w-7xl border-l-4 border-green-500 bg-green-100 p-4 text-green-700 sm:px-6 lg:px-8">
                    <p>{flash.success}</p>
                </div>
            )}

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {rentals.length > 0 ? (
                                <div className="space-y-4">
                                    {rentals.map((rental) => (
                                        <div
                                            key={rental.id}
                                            className="flex flex-col gap-4 rounded-lg border p-4 md:flex-row"
                                        >
                                            <div className="w-full flex-shrink-0 md:w-1/4">
                                                {rental.return_photo ? (
                                                    <div>
                                                        <p className="mb-1 text-sm font-medium text-gray-600">
                                                            {trans(
                                                                'return_photo',
                                                            )}
                                                        </p>
                                                        <img
                                                            src={`/storage/${rental.return_photo}`}
                                                            alt="Return photo"
                                                            className="h-40 w-full rounded object-cover"
                                                        />
                                                    </div>
                                                ) : (
                                                    <>
                                                        {rental.advertisement
                                                            .photos &&
                                                        rental.advertisement
                                                            .photos.length >
                                                            0 ? (
                                                            <img
                                                                src={`/storage/${rental.advertisement.photos[0].path}`}
                                                                alt={
                                                                    rental
                                                                        .advertisement
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
                                                    </>
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
                                                                {trans(
                                                                    'rental_period',
                                                                )}
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

                                                        {!isGuest &&
                                                            rental.user && (
                                                                <div>
                                                                    <span className="font-medium">
                                                                        {trans(
                                                                            'rented_by',
                                                                        )}
                                                                    </span>{' '}
                                                                    {
                                                                        rental
                                                                            .user
                                                                            .full_name
                                                                    }
                                                                </div>
                                                            )}

                                                        {rental.wear_and_tear && (
                                                            <div>
                                                                <span className="font-medium">
                                                                    {trans(
                                                                        'condition',
                                                                    )}
                                                                </span>{' '}
                                                                {
                                                                    rental.wear_and_tear
                                                                }
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Return Button for guests */}
                                                {isGuest &&
                                                    !rental.return_photo && (
                                                        <button
                                                            onClick={() =>
                                                                openReturnModal(
                                                                    rental,
                                                                )
                                                            }
                                                            className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                                        >
                                                            {trans(
                                                                'return_item',
                                                            )}
                                                        </button>
                                                    )}

                                                {/* Status for returned items */}
                                                {rental.return_photo && (
                                                    <div className="mt-4 inline-block rounded-md bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                                                        {trans('item_returned')}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                                    <p className="text-gray-500">
                                        {isGuest
                                            ? trans('no_active_rentals')
                                            : trans('no_rental_listings')}
                                    </p>
                                    {isGuest && (
                                        <Link
                                            href={route('advertisements.index')}
                                            className="mt-4 inline-block rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                        >
                                            {trans('browse_advertisements')}
                                        </Link>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {returnModalOpen && selectedRental && (
                <div className="fixed inset-0 z-10 overflow-y-auto">
                    <div className="flex min-h-screen items-end justify-center px-4 pb-20 pt-4 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>
                        <span
                            className="hidden sm:inline-block sm:h-screen sm:align-middle"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>
                        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:align-middle">
                            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                    <div className="mt-3 w-full text-center sm:ml-4 sm:mt-0 sm:text-left">
                                        <h3 className="text-lg font-medium leading-6 text-gray-900">
                                            {trans('return_item_modal_title')}{' '}
                                            {selectedRental.advertisement.title}
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500">
                                                {trans(
                                                    'return_item_instructions',
                                                )}
                                            </p>
                                            <form
                                                onSubmit={handleSubmit}
                                                className="mt-4"
                                            >
                                                <div className="mb-4">
                                                    <label className="mb-2 block text-sm font-bold text-gray-700">
                                                        {trans('return_photo')}
                                                    </label>
                                                    <input
                                                        type="file"
                                                        accept="image/*"
                                                        onChange={
                                                            handleFileChange
                                                        }
                                                        className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-blue-500"
                                                    />
                                                    {errors.return_photo && (
                                                        <p className="mt-1 text-xs text-red-500">
                                                            {
                                                                errors.return_photo
                                                            }
                                                        </p>
                                                    )}
                                                </div>

                                                {progress && (
                                                    <div className="mb-4">
                                                        <div className="h-2 rounded-full bg-gray-200">
                                                            <div
                                                                className="h-full rounded-full bg-blue-600"
                                                                style={{
                                                                    width: `${progress.percentage}%`,
                                                                }}
                                                            ></div>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                                                    <button
                                                        type="submit"
                                                        disabled={
                                                            processing ||
                                                            !data.return_photo
                                                        }
                                                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 sm:ml-3 sm:w-auto sm:text-sm"
                                                    >
                                                        {processing
                                                            ? trans('uploading')
                                                            : trans(
                                                                  'submit_return',
                                                              )}
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={
                                                            closeReturnModal
                                                        }
                                                        className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm"
                                                    >
                                                        {trans('cancel')}
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
}
