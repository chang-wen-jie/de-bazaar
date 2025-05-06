import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';
import { format } from 'date-fns';

export default function ContractsIndex({ contracts, translations }) {
    const trans = (key) => translations[key] || key;

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {trans('contracts_header')}
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
                            {trans('upload_new_contract')}
                        </Link>
                    </div>

                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            {contracts.data.length > 0 ? (
                                <table className="w-full border-collapse border border-gray-200">
                                    <thead>
                                        <tr className="bg-gray-100">
                                            <th className="border border-gray-300 px-4 py-2 text-left">
                                                {trans('contract_title')}
                                            </th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">
                                                {trans('contract_user')}
                                            </th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">
                                                {trans('upload_date')}
                                            </th>
                                            <th className="border border-gray-300 px-4 py-2 text-left">
                                                {trans('actions')}
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
                                                            {trans('download')}
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
                                                                        trans(
                                                                            'delete_confirmation',
                                                                        ),
                                                                    )
                                                                ) {
                                                                    e.preventDefault();
                                                                }
                                                            }}
                                                        >
                                                            {trans('delete')}
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
                                        {trans('no_contracts')}
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
