import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, Link, useForm } from '@inertiajs/react';
import axios from 'axios';
import { useState } from 'react';

export default function AdvertisementShow({
    advertisement,
    currentUserId,
    isFavorited,
    hasReviewed,
    averageRating,
    reviewCount,
}) {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [favorited, setFavorited] = useState(isFavorited);
    const isRental = advertisement.type.name === 'rental';
    const [isProcessing, setIsProcessing] = useState(false);
    const [purchaseMessage, setPurchaseMessage] = useState(null);

    const { data, setData, post, processing, errors, reset } = useForm({
        rating: 5,
        comment: '',
        reviewable_id: advertisement.id,
        reviewable_type: 'App\\Models\\Advertisement',
    });

    function handleSubmit(e) {
        e.preventDefault();
        post(
            route('reviews.store', {
                type: 'advertisement',
                id: advertisement.id,
            }),
            {
                onSuccess: () => {
                    reset();
                    setIsFormOpen(false);
                },
            },
        );
    }

    function handleFavoriteToggle() {
        axios
            .post(
                route('advertisements.favorite.toggle', {
                    advertisement: advertisement.id,
                }),
            )
            .then((response) => {
                setFavorited(response.data.favorited);
            })
            .catch((error) => {
                console.error('Error toggling favorite:', error);
            });
    }

    function handlePurchase() {
        setIsProcessing(true);
        setPurchaseMessage(null);

        axios
            .post(
                route('advertisements.purchase', {
                    advertisement: advertisement.id,
                }),
            )
            .then((response) => {
                setPurchaseMessage({
                    type: 'success',
                    text: response.data.message,
                });
            })
            .catch((error) => {
                setPurchaseMessage({
                    type: 'error',
                    text: error.response?.data?.message || 'An error occurred',
                });
                console.error('Error purchasing advertisement:', error);
            })
            .finally(() => {
                setIsProcessing(false);
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
                                        <span
                                            className={`rounded-full px-3 py-1 text-sm font-medium ${isRental ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'}`}
                                        >
                                            {advertisement.type.name}
                                        </span>
                                    </div>
                                </div>
                                <p className="mt-4 text-2xl font-bold text-blue-600">
                                    € {advertisement.price}
                                </p>

                                {isRental && (
                                    <div className="mt-2 flex items-center">
                                        <div className="flex">
                                            {renderStars(averageRating)}
                                        </div>
                                        <span className="ml-2 text-sm text-gray-500">
                                            ({reviewCount}{' '}
                                            {reviewCount === 1
                                                ? 'review'
                                                : 'reviews'}
                                            )
                                        </span>
                                    </div>
                                )}
                            </div>

                            <div className="mb-8">
                                <h2 className="mb-4 text-xl font-semibold text-gray-800">
                                    Description
                                </h2>
                                <p className="whitespace-pre-line text-gray-700">
                                    {advertisement.description}
                                </p>
                                <p className="text-black-500 mt-3 text-sm">
                                    Expires on{' '}
                                    {new Date(
                                        advertisement.end_date,
                                    ).toLocaleDateString()}
                                </p>
                                <img
                                    src={`/qr-code/${advertisement.id}`}
                                    alt="QR Code"
                                    className="mt-3 max-w-[100px]"
                                />
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

                            {isRental && (
                                <div className="mt-8 border-t pt-6">
                                    <div className="flex items-center justify-between">
                                        <h2 className="text-xl font-semibold text-gray-800">
                                            Reviews
                                        </h2>

                                        {!hasReviewed &&
                                            currentUserId !==
                                                advertisement.user.id && (
                                                <button
                                                    onClick={() =>
                                                        setIsFormOpen(true)
                                                    }
                                                    className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                                >
                                                    Write a Review
                                                </button>
                                            )}
                                    </div>

                                    {isFormOpen && (
                                        <div className="mt-4 rounded-lg border bg-gray-50 p-4">
                                            <h3 className="mb-2 font-medium">
                                                Write a Review
                                            </h3>
                                            <form onSubmit={handleSubmit}>
                                                <div className="mb-3">
                                                    <label className="mb-1 block text-sm text-gray-700">
                                                        Rating
                                                    </label>
                                                    <div className="flex">
                                                        {[1, 2, 3, 4, 5].map(
                                                            (star) => (
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
                                                            ),
                                                        )}
                                                    </div>
                                                    {errors.rating && (
                                                        <div className="mt-1 text-sm text-red-500">
                                                            {errors.rating}
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="mb-3">
                                                    <label className="mb-1 block text-sm text-gray-700">
                                                        Review
                                                    </label>
                                                    <textarea
                                                        value={data.comment}
                                                        onChange={(e) =>
                                                            setData(
                                                                'comment',
                                                                e.target.value,
                                                            )
                                                        }
                                                        className="w-full rounded-md border border-gray-300 px-3 py-2"
                                                        rows={4}
                                                        placeholder="Write your review here..."
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
                                                            setIsFormOpen(false)
                                                        }
                                                        className="rounded-md border px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                                                    >
                                                        Cancel
                                                    </button>
                                                    <button
                                                        type="submit"
                                                        disabled={processing}
                                                        className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                                                    >
                                                        Submit Review
                                                    </button>
                                                </div>
                                            </form>
                                        </div>
                                    )}

                                    <div className="mt-4">
                                        {advertisement.reviews &&
                                        advertisement.reviews.length > 0 ? (
                                            <div className="space-y-4">
                                                {advertisement.reviews.map(
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
                                                                {review.comment}
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
                                                    This rental has no reviews
                                                    yet.
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            <div className="mt-8">
                                {purchaseMessage && (
                                    <div
                                        className={`mb-4 rounded-md p-4 ${
                                            purchaseMessage.type === 'success'
                                                ? 'border border-green-200 bg-green-50 text-green-700'
                                                : 'border border-red-200 bg-red-50 text-red-700'
                                        }`}
                                    >
                                        {purchaseMessage.text}
                                    </div>
                                )}

                                {currentUserId !== advertisement.user.id && (
                                    <button
                                        type="button"
                                        onClick={handlePurchase}
                                        disabled={isProcessing}
                                        className="w-full rounded-md bg-blue-600 py-3 text-center font-medium text-white hover:bg-blue-700 disabled:bg-blue-300"
                                    >
                                        {isProcessing ? (
                                            <span>Processing...</span>
                                        ) : (
                                            <span>
                                                {isRental
                                                    ? 'Rent Now'
                                                    : 'Buy Now'}
                                            </span>
                                        )}
                                    </button>
                                )}

                                {currentUserId !== advertisement.user.id && (
                                    <button
                                        onClick={handleFavoriteToggle}
                                        type="button"
                                        className={`mt-3 w-full rounded-md py-3 text-center font-medium ${
                                            favorited
                                                ? 'bg-red-100 text-red-700 hover:bg-red-200'
                                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                        }`}
                                    >
                                        {favorited
                                            ? 'Remove from Favorites'
                                            : 'Add to Favorites'}
                                    </button>
                                )}

                                {currentUserId === advertisement.user.id && (
                                    <div className="rounded-md bg-gray-100 p-4 text-center text-gray-700">
                                        You own this advertisement
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
