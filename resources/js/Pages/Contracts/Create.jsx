import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, useForm } from '@inertiajs/react';
import { useState } from 'react';

export default function ContractsCreate({ users, translations }) {
    const { data, setData, post, processing, errors, reset, progress } =
        useForm({
            user_id: '',
            title: '',
            description: '',
            contract_file: null,
        });

    const [fileName, setFileName] = useState('');
    const trans = (key) => translations[key] || key;

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('contracts.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setData('contract_file', file);
        setFileName(file ? file.name : '');
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {trans('upload_contract_header')}
                </h2>
            }
        >
            <Head title="Upload Contract" />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="user_id"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        User
                                    </label>
                                    <select
                                        id="user_id"
                                        value={data.user_id}
                                        onChange={(e) =>
                                            setData('user_id', e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    >
                                        <option value="">
                                            {trans('select_user')}
                                        </option>
                                        {users.map((user) => (
                                            <option
                                                key={user.id}
                                                value={user.id}
                                            >
                                                {user.name}
                                            </option>
                                        ))}
                                    </select>
                                    {errors.user_id && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.user_id}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="title"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {trans('contract_title_label')}
                                    </label>
                                    <input
                                        type="text"
                                        id="title"
                                        value={data.title}
                                        onChange={(e) =>
                                            setData('title', e.target.value)
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                    />
                                    {errors.title && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.title}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="description"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {trans('description_optional')}
                                    </label>
                                    <textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                'description',
                                                e.target.value,
                                            )
                                        }
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                        rows={3}
                                    />
                                    {errors.description && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.description}
                                        </p>
                                    )}
                                </div>

                                <div>
                                    <label
                                        htmlFor="contract_file"
                                        className="block text-sm font-medium text-gray-700"
                                    >
                                        {trans('contract_file_label')}
                                    </label>
                                    <div className="mt-1 flex items-center">
                                        <label className="cursor-pointer rounded-md bg-blue-50 px-4 py-2 text-blue-700 hover:bg-blue-100">
                                            {trans('select_file')}
                                            <input
                                                type="file"
                                                id="contract_file"
                                                onChange={handleFileChange}
                                                className="hidden"
                                                accept=".pdf,.doc,.docx"
                                            />
                                        </label>
                                        <span className="ml-3 text-sm text-gray-500">
                                            {fileName ||
                                                trans('no_file_selected')}
                                        </span>
                                    </div>
                                    {errors.contract_file && (
                                        <p className="mt-1 text-sm text-red-600">
                                            {errors.contract_file}
                                        </p>
                                    )}
                                    {progress && (
                                        <div className="mt-2 h-2.5 w-full rounded-full bg-gray-200">
                                            <div
                                                className="h-2.5 rounded-full bg-blue-600"
                                                style={{
                                                    width: `${progress.percentage}%`,
                                                }}
                                            ></div>
                                        </div>
                                    )}
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="button"
                                        onClick={() => window.history.back()}
                                        className="mr-4 rounded border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50"
                                    >
                                        {trans('cancel')}
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={processing}
                                        className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:opacity-50"
                                    >
                                        {processing
                                            ? trans('uploading')
                                            : trans('upload_contract_button')}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
