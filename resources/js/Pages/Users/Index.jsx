import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, Link } from '@inertiajs/react';

export default function UsersIndex({ users, translations }) {
    const trans = (key) => translations[key] || key;
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    {trans('users_header')}
                </h2>
            }
        >
            <Head title="Users" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6">
                            <table className="w-full border-collapse border border-gray-200">
                                <thead>
                                    <tr className="bg-gray-100">
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            {trans('name')}
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            {trans('email')}
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            {trans('role')}
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            {trans('actions')}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.data.map((user) => (
                                        <tr
                                            key={user.id}
                                            className="hover:bg-gray-50"
                                        >
                                            <td className="border border-gray-300 px-4 py-2">
                                                {user.full_name}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {user.email}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                {user.role?.name}
                                            </td>
                                            <td className="border border-gray-300 px-4 py-2">
                                                <div className="flex space-x-2">
                                                    <a
                                                        href={`/users/${user.id}/contract`}
                                                        className="rounded bg-blue-500 px-2 py-1 text-white hover:bg-blue-600"
                                                        target="_blank"
                                                        rel="noreferrer"
                                                    >
                                                        {trans(
                                                            'download_contract',
                                                        )}
                                                    </a>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>

                            <div className="mt-6 flex justify-center">
                                {users.links.map((link, index) => (
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
