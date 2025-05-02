import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';

export default function ContractsIndex({ contracts }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Contracts
                </h2>
            }
        >
            <Head title="Contracts" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="mb-6 flex justify-end">
                        <Link
                            href={route('contracts.create')}
                            className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                        >
                            Upload New Contract
                        </Link>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {contracts.data.length > 0 ? (
                                <table className="w-full border-collapse border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border border-gray-300 px-4 py-2 text-left">
                                                Title
                                            </th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">
                                                User
                                            </th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">
                                                Upload Date
                                            </th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {contracts.data.map((contract) => (
                                            <tr
                                                key={contract.id}
                                                className="hover:bg-gray-50"
                                            >
                                                <td className="border border-gray-300 px-4 py-2">
                                                    <Link
                                                        href={route(
                                                            'contracts.show',
                                                            contract.id,
                                                        )}
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        {contract.title}
                                                    </Link>
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    {contract.user.first_name}{' '}
                                                    {contract.user.infix}{' '}
                                                    {contract.user.last_name}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    {format(
                                                        new Date(
                                                            contract.created_at,
                                                        ),
                                                        'MMM d, yyyy',
                                                    )}
                                                </td>
                                                <td className="border border-gray-300 px-4 py-2">
                                                    <div className="flex space-x-2">
                                                        <Link
                                                            href={route(
                                                                'contracts.download',
                                                                contract.id,
                                                            )}
                                                            className="rounded bg-green-500 px-2 py-1 text-xs text-white hover:bg-green-600"
                                                        >
                                                            Download
                                                        </Link>
                                                        <Link
                                                            href={route(
                                                                'contracts.destroy',
                                                                contract.id,
                                                            )}
                                                            method="delete"
                                                            as="button"
                                                            className="rounded bg-red-500 px-2 py-1 text-xs text-white hover:bg-red-600"
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
                                                            Delete
                                                        </Link>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <div className="py-4 text-center">
                                    <p className="text-gray-500">
                                        No contracts found.
                                    </p>
                                </div>
                            )}

                            <div className="mt-6 flex justify-center">
                                {contracts.links &&
                                    contracts.links.map((link, index) => (
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
            </div>
        </AuthenticatedLayout>
    );
}
