import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.jsx';
import { Head, Link } from '@inertiajs/react';

export default function UsersIndex({ users }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Users
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
                                            Name
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Email
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Role
                                        </th>
                                        <th className="border border-gray-300 px-4 py-2 text-left">
                                            Administrator
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
                                                {user.is_admin}
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
