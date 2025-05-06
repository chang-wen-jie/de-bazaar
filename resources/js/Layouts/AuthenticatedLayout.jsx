import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const { auth, locale, translations } = usePage().props;
    const user = auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    const roleLabels = {
        1: 'Guest',
        2: 'Private',
        3: 'Business',
    };

    const roleColors = {
        1: 'bg-gray-200 text-gray-800',
        2: 'bg-green-200 text-green-800',
        3: 'bg-blue-200 text-blue-800',
    };

    const roleName = roleLabels[user.role_id];
    const roleStyle = roleColors[user.role_id];

    // Translation helper function
    const trans = (key) => translations?.[key] || key;

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="border-b border-gray-100 bg-white">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 justify-between">
                        <div className="flex">
                            <div className="flex shrink-0 items-center">
                                <Link href="/">
                                    <ApplicationLogo className="block h-9 w-auto fill-current text-gray-800" />
                                </Link>
                            </div>

                            <div className="hidden space-x-8 sm:-my-px sm:ms-10 sm:flex">
                                <NavLink
                                    href={route('dashboard')}
                                    active={route().current('dashboard')}
                                >
                                    {trans('dashboard')}
                                </NavLink>

                                <NavLink
                                    href={route('advertisements.index')}
                                    active={route().current(
                                        'advertisements.index',
                                    )}
                                >
                                    {trans('advertisements')}
                                </NavLink>

                                <NavLink
                                    href={route('favorites.index')}
                                    active={route().current('favorites.index')}
                                >
                                    {trans('favorites')}
                                </NavLink>

                                <NavLink
                                    href={route('rentals.index')}
                                    active={route().current('rentals.index')}
                                >
                                    {trans('rentals')}
                                </NavLink>

                                {user.is_admin ? (
                                    <NavLink
                                        href={route('users.index')}
                                        active={route().current('users.index')}
                                    >
                                        {trans('users')}
                                    </NavLink>
                                ) : null}

                                <NavLink
                                    href={route('contracts.index')}
                                    active={route().current('contracts.index')}
                                >
                                    {trans('contracts')}
                                </NavLink>
                            </div>
                        </div>

                        <div className="hidden sm:ms-6 sm:flex sm:items-center">
                            {/* Language Switcher */}
                            <div className="mr-4 flex items-center">
                                <Link
                                    href={route(
                                        'language.switch',
                                        locale === 'en' ? 'nl' : 'en'
                                    )}
                                    className="flex items-center space-x-1 rounded-md bg-gray-100 px-3 py-1 text-sm font-medium text-gray-700 hover:bg-gray-200"
                                    data={{ preserveScroll: false, preserveState: false, only: [] }}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                    </svg>
                                    <span>{locale === 'en' ? trans('switch_to_dutch') : trans('switch_to_english')}</span>
                                </Link>
                            </div>

                            <div className="relative ms-3">
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <span className="inline-flex rounded-md">
                                            <button
                                                type="button"
                                                className="inline-flex items-center rounded-md border border-transparent bg-white px-3 py-2 text-sm font-medium leading-4 text-gray-500 transition duration-150 ease-in-out hover:text-gray-700 focus:outline-none"
                                            >
                                                {user.email}
                                                <span
                                                    className={`ml-2 rounded-full px-2 py-0.5 text-xs font-semibold ${roleStyle}`}
                                                >
                                                    {trans(roleName?.toLowerCase())}
                                                </span>

                                                <svg
                                                    className="-me-0.5 ms-2 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </Dropdown.Trigger>

                                    <Dropdown.Content>
                                        <Dropdown.Link
                                            href={route('users.show', user.id)}
                                        >
                                            {trans('profile')}
                                        </Dropdown.Link>
                                        <Dropdown.Link
                                            href={route('logout')}
                                            method="post"
                                            as="button"
                                        >
                                            {trans('log_out')}
                                        </Dropdown.Link>
                                    </Dropdown.Content>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="-me-2 flex items-center sm:hidden">
                            {/* Mobile Language Switcher */}
                            <Link
                                href={route(
                                    'language.switch',
                                    locale === 'en' ? 'nl' : 'en'
                                )}
                                className="mr-2 rounded-md bg-gray-100 p-2 text-gray-700"
                                data={{ preserveScroll: false, preserveState: false, only: [] }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                                </svg>
                            </Link>

                            <button
                                onClick={() =>
                                    setShowingNavigationDropdown(
                                        (previousState) => !previousState,
                                    )
                                }
                                className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 transition duration-150 ease-in-out hover:bg-gray-100 hover:text-gray-500 focus:bg-gray-100 focus:text-gray-500 focus:outline-none"
                            >
                                <svg
                                    className="h-6 w-6"
                                    stroke="currentColor"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        className={
                                            !showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h16M4 18h16"
                                    />
                                    <path
                                        className={
                                            showingNavigationDropdown
                                                ? 'inline-flex'
                                                : 'hidden'
                                        }
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                <div
                    className={
                        (showingNavigationDropdown ? 'block' : 'hidden') +
                        ' sm:hidden'
                    }
                >
                    <div className="space-y-1 pb-3 pt-2">
                        <ResponsiveNavLink
                            href={route('dashboard')}
                            active={route().current('dashboard')}
                        >
                            {trans('dashboard')}
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('advertisements.index')}
                            active={route().current('advertisements.index')}
                        >
                            {trans('advertisements')}
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('favorites.index')}
                            active={route().current('favorites.index')}
                        >
                            {trans('favorites')}
                        </ResponsiveNavLink>

                        <ResponsiveNavLink
                            href={route('rentals.index')}
                            active={route().current('rentals.index')}
                        >
                            {trans('rentals')}
                        </ResponsiveNavLink>

                        {user.is_admin && (
                            <ResponsiveNavLink
                                href={route('users.index')}
                                active={route().current('users.index')}
                            >
                                {trans('users')}
                            </ResponsiveNavLink>
                        )}

                        <ResponsiveNavLink
                            href={route('contracts.index')}
                            active={route().current('contracts.index')}
                        >
                            {trans('contracts')}
                        </ResponsiveNavLink>
                    </div>

                    <div className="border-t border-gray-200 pb-1 pt-4">
                        <div className="px-4">
                            <div className="text-base font-medium text-gray-800">
                                {user.name}
                            </div>
                            <div className="text-sm font-medium text-gray-500">
                                {user.email}
                            </div>
                        </div>

                        <div className="mt-3 space-y-1">
                            <ResponsiveNavLink
                                href={route('users.show', user.id)}
                            >
                                {trans('profile')}
                            </ResponsiveNavLink>
                            <ResponsiveNavLink
                                method="post"
                                href={route('logout')}
                                as="button"
                            >
                                {trans('log_out')}
                            </ResponsiveNavLink>
                        </div>
                    </div>
                </div>
            </nav>

            {header && (
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
        </div>
    );
}
