import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, Link, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function UserShow({
    user,
    averageRating,
    reviewCount,
    hasReviewed,
    currentUserId,
    allListings,
    translations,
}) {
    const isGuest = user.role?.name === 'guest';
    const [isFormOpen, setIsFormOpen] = useState(false);
    const trans = (key) => translations[key] || key;

    const { data, setData, post, processing, errors, reset } = useForm({
        rating: 5,
        comment: '',
        reviewable_id: user.id,
        reviewable_type: 'App\\Models\\User',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(route('reviews.store', { type: 'user', id: user.id }), {
            data: {
                rating: data.rating,
                comment: data.comment,
                reviewable_id: user.id,
                reviewable_type: 'App\\Models\\User',
            },
            onSuccess: () => {
                reset();
                setIsFormOpen(false);
            },
        });
    }

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg
                    key={`full-${i}`}
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>,
            );
        }

        if (hasHalfStar) {
            stars.push(
                <svg
                    key="half"
                    className="h-5 w-5 text-yellow-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <defs>
                        <linearGradient id="halfGradient">
                            <stop offset="50%" stopColor="currentColor" />
                            <stop offset="50%" stopColor="#D1D5DB" />
                        </linearGradient>
                    </defs>
                    <path
                        fill="url(#halfGradient)"
                        d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                    />
                </svg>,
            );
        }

        for (let i = Math.ceil(rating); i < 5; i++) {
            stars.push(
                <svg
                    key={`empty-${i}`}
                    className="h-5 w-5 text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>,
            );
        }

        return stars;
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {trans('user_profile')}
                </h2>
            }
        >
            <Head title={`${user.full_name}'s Profile`} />

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
                                {trans('back_to_advertisements')}
                            </Link>
                        </div>

                        <div className="p-6">
                            <div className="flex flex-col items-center border-b border-gray-200 pb-6 sm:flex-row sm:items-start">
                                <div className="flex h-24 w-24 items-center justify-center rounded-full bg-blue-100 text-center text-4xl font-bold text-blue-600">
                                    {user.first_name.charAt(0)}
                                </div>

                                <div className="mt-4 text-center sm:ml-6 sm:mt-0 sm:text-left">
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        {user.full_name}
                                    </h1>
                                    <p className="mt-1 text-sm text-gray-500">
                                        {trans('member_since')}{' '}
                                        {new Date(
                                            user.created_at,
                                        ).toLocaleDateString()}
                                    </p>
                                    <div className="mt-2 flex items-center">
                                        <div className="flex">
                                            {renderStars(averageRating)}
                                        </div>
                                        <span className="ml-2 text-sm text-gray-500">
                                            ({reviewCount}{' '}
                                            {reviewCount === 1
                                                ? trans('review')
                                                : trans('reviews')}
                                            )
                                        </span>
                                    </div>
                                    <div className="mt-2 flex flex-wrap gap-2">
                                        <span
                                            className={`rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800`}
                                        >
                                            {trans(user.role?.name)}
                                        </span>
                                        {!isGuest ? (
                                            <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-800">
                                                {user.advertisements_count || 0}{' '}
                                                {trans('listings')}
                                            </span>
                                        ) : (
                                            <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800">
                                                {allListings?.length || 0}{' '}
                                                {trans('transactions_count')}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {isGuest ? (
                                <div className="mt-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-800">
                                        {trans('transactions')}
                                    </h2>

                                    {allListings && allListings.length > 0 ? (
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                            {allListings.map(
                                                (advertisement) => (
                                                    <Link
                                                        key={advertisement.id}
                                                        href={`/advertisements/${advertisement.id}`}
                                                        className="block rounded-lg border shadow-md transition-shadow hover:shadow-lg"
                                                    >
                                                        <div className="p-4">
                                                            <h3 className="font-semibold text-gray-900">
                                                                {
                                                                    advertisement.title
                                                                }
                                                            </h3>
                                                            <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                                                                {
                                                                    advertisement.description
                                                                }
                                                            </p>
                                                            <p className="mt-2 font-bold text-blue-600">
                                                                {trans(
                                                                    'currency_symbol',
                                                                )}{' '}
                                                                {
                                                                    advertisement.price
                                                                }
                                                            </p>
                                                            <div className="mt-2 flex flex-wrap gap-2">
                                                                <span className="bg-gray-200 px-2 py-1 text-xs">
                                                                    #
                                                                    {
                                                                        advertisement
                                                                            .type
                                                                            ?.name
                                                                    }
                                                                </span>
                                                                {advertisement.rental_dates && (
                                                                    <span className="bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                                                        {new Date(
                                                                            advertisement.rental_dates.start,
                                                                        ).toLocaleDateString()}{' '}
                                                                        -{' '}
                                                                        {new Date(
                                                                            advertisement.rental_dates.end,
                                                                        ).toLocaleDateString()}
                                                                    </span>
                                                                )}
                                                                {advertisement.purchase_date && (
                                                                    <span className="bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                                                        {new Date(
                                                                            advertisement.purchase_date,
                                                                        ).toLocaleDateString()}
                                                                    </span>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ),
                                            )}
                                        </div>
                                    ) : (
                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                                            <p className="text-gray-500">
                                                {trans('no_transactions')}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="mt-8">
                                    <h2 className="mb-4 text-xl font-semibold text-gray-800">
                                        {trans('active_listings')}
                                    </h2>

                                    {user.advertisements &&
                                    user.advertisements.length > 0 ? (
                                        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                            {user.advertisements.map(
                                                (advertisement) => (
                                                    <Link
                                                        key={advertisement.id}
                                                        href={`/advertisements/${advertisement.id}`}
                                                        className="block rounded-lg border shadow-md transition-shadow hover:shadow-lg"
                                                    >
                                                        <div className="p-4">
                                                            <h3 className="font-semibold text-gray-900">
                                                                {
                                                                    advertisement.title
                                                                }
                                                            </h3>
                                                            <p className="mt-1 line-clamp-2 text-sm text-gray-500">
                                                                {
                                                                    advertisement.description
                                                                }
                                                            </p>
                                                            <p className="mt-2 font-bold text-blue-600">
                                                                {trans(
                                                                    'currency_symbol',
                                                                )}{' '}
                                                                {
                                                                    advertisement.price
                                                                }
                                                            </p>
                                                            <div className="mt-2 flex flex-wrap gap-2">
                                                                <span className="bg-gray-200 px-2 py-1 text-xs">
                                                                    #
                                                                    {
                                                                        advertisement
                                                                            .type
                                                                            ?.name
                                                                    }
                                                                </span>
                                                                <span className="bg-gray-100 px-2 py-1 text-xs text-gray-600">
                                                                    {trans(
                                                                        'ends',
                                                                    )}{' '}
                                                                    {new Date(
                                                                        advertisement.end_date,
                                                                    ).toLocaleDateString()}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ),
                                            )}
                                        </div>
                                    ) : (
                                        <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                                            <p className="text-gray-500">
                                                {trans('no_active_listings')}
                                            </p>
                                        </div>
                                    )}

                                    <div className="mt-8">
                                        <div className="flex items-center justify-between">
                                            <h2 className="text-xl font-semibold text-gray-800">
                                                {trans('reviews_heading')}
                                            </h2>

                                            {!hasReviewed &&
                                                currentUserId !== user.id && (
                                                    <button
                                                        onClick={() =>
                                                            setIsFormOpen(true)
                                                        }
                                                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                                    >
                                                        {trans('write_review')}
                                                    </button>
                                                )}
                                        </div>

                                        {isFormOpen && (
                                            <div className="mt-4 rounded-lg border bg-gray-50 p-4">
                                                <h3 className="mb-2 font-medium">
                                                    {trans('write_review')}
                                                </h3>
                                                <form onSubmit={handleSubmit}>
                                                    <div className="mb-3">
                                                        <label className="mb-1 block text-sm text-gray-700">
                                                            {trans('rating')}
                                                        </label>
                                                        <div className="flex">
                                                            {[
                                                                1, 2, 3, 4, 5,
                                                            ].map((star) => (
                                                                <button
                                                                    key={star}
                                                                    type="button"
                                                                    onClick={() =>
                                                                        setData(
                                                                            'rating',
                                                                            star,
                                                                        )
                                                                    }
                                                                    className="focus:outline-none"
                                                                >
                                                                    <svg
                                                                        className={`h-8 w-8 ${data.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                                                        fill="currentColor"
                                                                        viewBox="0 0 20 20"
                                                                    >
                                                                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                                    </svg>
                                                                </button>
                                                            ))}
                                                        </div>
                                                        {errors.rating && (
                                                            <div className="mt-1 text-sm text-red-500">
                                                                {errors.rating}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="mb-3">
                                                        <label className="mb-1 block text-sm text-gray-700">
                                                            {trans(
                                                                'review_text',
                                                            )}
                                                        </label>
                                                        <textarea
                                                            value={data.comment}
                                                            onChange={(e) =>
                                                                setData(
                                                                    'comment',
                                                                    e.target
                                                                        .value,
                                                                )
                                                            }
                                                            className="w-full rounded-md border border-gray-300 px-3 py-2"
                                                            rows={4}
                                                            placeholder={trans(
                                                                'review_placeholder',
                                                            )}
                                                        ></textarea>
                                                        {errors.comment && (
                                                            <div className="mt-1 text-sm text-red-500">
                                                                {errors.comment}
                                                            </div>
                                                        )}
                                                    </div>

                                                    <div className="flex justify-end space-x-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setIsFormOpen(
                                                                    false,
                                                                )
                                                            }
                                                            className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                        >
                                                            {trans('cancel')}
                                                        </button>
                                                        <button
                                                            type="submit"
                                                            disabled={
                                                                processing
                                                            }
                                                            className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                                        >
                                                            {trans(
                                                                'submit_review',
                                                            )}
                                                        </button>
                                                    </div>
                                                </form>
                                            </div>
                                        )}

                                        <div className="mt-4">
                                            {user.reviews &&
                                            user.reviews.length > 0 ? (
                                                <div className="space-y-4">
                                                    {user.reviews.map(
                                                        (review) => (
                                                            <div
                                                                key={review.id}
                                                                className="rounded-lg border p-4"
                                                            >
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center">
                                                                        <Link
                                                                            href={route(
                                                                                'users.show',
                                                                                review
                                                                                    .reviewer
                                                                                    .id,
                                                                            )}
                                                                            className="flex items-center hover:underline"
                                                                        >
                                                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-center">
                                                                                {review.reviewer.first_name.charAt(
                                                                                    0,
                                                                                )}
                                                                            </div>
                                                                            <span className="ml-2 font-medium">
                                                                                {
                                                                                    review
                                                                                        .reviewer
                                                                                        .full_name
                                                                                }
                                                                            </span>
                                                                        </Link>
                                                                    </div>
                                                                    <div className="flex">
                                                                        {renderStars(
                                                                            review.rating,
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <p className="mt-2 text-gray-700">
                                                                    {
                                                                        review.comment
                                                                    }
                                                                </p>
                                                                <p className="mt-2 text-xs text-gray-500">
                                                                    {new Date(
                                                                        review.created_at,
                                                                    ).toLocaleDateString()}
                                                                </p>
                                                            </div>
                                                        ),
                                                    )}
                                                </div>
                                            ) : (
                                                <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center">
                                                    <p className="text-gray-500">
                                                        {trans('no_reviews')}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
