import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';

export default function Create({ types, errors: pageErrors }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        price: '',
        type_id: '',
        start_date: '',
        end_date: '',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('advertisements.store'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Create Advertisement
                </h2>
            }
        >
            <Head title="Create Advertisement" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white p-6 shadow-sm sm:rounded-lg">
                        {/* Add display for the limit error */}
                        {pageErrors?.limit && (
                            <div className="mb-4 rounded-md bg-red-50 p-4">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <svg
                                            className="h-5 w-5 text-red-400"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-sm font-medium text-red-800">
                                            Limit Reached
                                        </h3>
                                        <div className="mt-2 text-sm text-red-700">
                                            {pageErrors.limit}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label
                                    htmlFor="title"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Title*
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    value={data.title}
                                    onChange={(e) =>
                                        setData('title', e.target.value)
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                    required
                                />
                                {errors.title && (
                                    <div className="mt-1 text-sm text-red-600">
                                        {errors.title}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="description"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Description*
                                </label>
                                <textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) =>
                                        setData('description', e.target.value)
                                    }
                                    rows="4"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                    required
                                ></textarea>
                                {errors.description && (
                                    <div className="mt-1 text-sm text-red-600">
                                        {errors.description}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="price"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Price*
                                </label>
                                <input
                                    type="number"
                                    id="price"
                                    value={data.price}
                                    onChange={(e) =>
                                        setData('price', e.target.value)
                                    }
                                    step="0.01"
                                    min="0"
                                    max="1000000"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                    required
                                />
                                {errors.price && (
                                    <div className="mt-1 text-sm text-red-600">
                                        {errors.price}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="type_id"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Advertisement Type*
                                </label>
                                <select
                                    id="type_id"
                                    value={data.type_id}
                                    onChange={(e) =>
                                        setData('type_id', e.target.value)
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                    required
                                >
                                    <option value="">Select Type</option>
                                    {types.map((type) => (
                                        <option key={type.id} value={type.id}>
                                            {type.name.charAt(0).toUpperCase() +
                                                type.name.slice(1)}
                                        </option>
                                    ))}
                                </select>
                                {errors.type_id && (
                                    <div className="mt-1 text-sm text-red-600">
                                        {errors.type_id}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="start_date"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    Start Date*
                                </label>
                                <input
                                    type="date"
                                    id="start_date"
                                    value={data.start_date}
                                    onChange={(e) =>
                                        setData('start_date', e.target.value)
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                    required
                                />
                                {errors.start_date && (
                                    <div className="mt-1 text-sm text-red-600">
                                        {errors.start_date}
                                    </div>
                                )}
                            </div>

                            <div className="mb-4">
                                <label
                                    htmlFor="end_date"
                                    className="mb-2 block text-sm font-medium text-gray-700"
                                >
                                    End Date*
                                </label>
                                <input
                                    type="date"
                                    id="end_date"
                                    value={data.end_date}
                                    onChange={(e) =>
                                        setData('end_date', e.target.value)
                                    }
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500"
                                    required
                                />
                                {errors.end_date && (
                                    <div className="mt-1 text-sm text-red-600">
                                        {errors.end_date}
                                    </div>
                                )}
                            </div>

                            <div className="flex justify-end">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                                >
                                    {processing
                                        ? 'Creating...'
                                        : 'Create Advertisement'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
