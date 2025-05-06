import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';

export default function ContractsShow({ contract, translations }) {
    const trans = (key) => translations[key] || key;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {trans('contract_details')}
                </h2>
            }
        >
            <Head title={`Contract: ${contract.title}`} />

            <div className="py-12">
                <div className="mx-auto max-w-4xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-between">
                        <Link
                            href={route('contracts.index')}
                            className="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
                        >
                            {trans('back_to_contracts')}
                        </Link>
                        <div className="flex space-x-2">
                            <Link
                                href={route('contracts.download', contract.id)}
                                className="rounded bg-green-500 px-4 py-2 text-white hover:bg-green-600"
                            >
                                {trans('download')}
                            </Link>
                            <Link
                                href={route('contracts.destroy', contract.id)}
                                method="delete"
                                as="button"
                                className="rounded bg-red-500 px-4 py-2 text-white hover:bg-red-600"
                                onClick={(e) => {
                                    if (
                                        !confirm(
                                            'Are you sure you want to delete this contract?',
                                        )
                                    ) {
                                        e.preventDefault();
                                    }
                                }}
                            >
                                {trans('delete')}
                            </Link>
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <h1 className="mb-6 text-2xl font-bold">
                                {contract.title}
                            </h1>

                            <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2">
                                <div>
                                    <h3 className="mb-2 text-lg font-semibold">
                                        {trans('contract_details_label')}
                                    </h3>
                                    <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
                                        <p>
                                            <span className="font-medium">
                                                {trans('uploaded_on')}
                                            </span>{' '}
                                            {format(
                                                new Date(contract.created_at),
                                                'MMMM d, yyyy',
                                            )}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="mb-2 text-lg font-semibold">
                                        {trans('user_information')}
                                    </h3>
                                    <div className="space-y-2 rounded-lg border border-gray-200 bg-gray-50 p-4">
                                        <p>
                                            <span className="font-medium">
                                                {trans('user_name')}
                                            </span>{' '}
                                            {contract.user.first_name}{' '}
                                            {contract.user.infix}{' '}
                                            {contract.user.last_name}
                                        </p>
                                        <p>
                                            <span className="font-medium">
                                                {trans('user_email')}
                                            </span>{' '}
                                            {contract.user.email}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            {contract.description && (
                                <div className="mt-6">
                                    <h3 className="mb-2 text-lg font-semibold">
                                        {trans('description_heading')}
                                    </h3>
                                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                                        <p className="whitespace-pre-line">
                                            {contract.description}
                                        </p>
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
