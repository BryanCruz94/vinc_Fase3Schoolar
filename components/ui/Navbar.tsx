/* eslint-disable react/jsx-filename-extension */
/* eslint-disable @next/next/no-img-element */
// import Image from "next/image";
import Link from "next/link";
import Image from "next/image";
import React, { Fragment, useContext, useState } from "react";
import { Dialog, Popover, Transition } from "@headlessui/react";
import {
  UsersIcon,
  AcademicCapIcon,
  Bars3Icon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { AuthContext } from "@/context/auth";
import { useRouter } from "next/router";

const products = [
  {
    name: "Filosofía Institucional ",
    href: "/filosofia.html",
    icon: AcademicCapIcon,
  },
  { name: "Nuestro Equipo", href: "/equipo.html", icon: UsersIcon },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const { isLoggedIn,logoutUser } = useContext(AuthContext);

  const router = useRouter();
  const currentPath = router.pathname;
  console.log(currentPath);
  

  return (
    <>
      <header className="header bg-color-terciario fixed top-0 z-10 w-full title">
        <nav
          className="mx-auto flex max-w-7xl items-center lg:justify-between md:justify-between sm:justify-between px-6 py-4 lg:px-0 lg:relative"
          aria-label="Global"
        >
          <div className="hidden lg:flex">
            <Link href={"/"} className="-m-1.5 p-1.5">
              <span className="flex text-white justify-center items-center">
                {/* <img className="h-8 w-auto mx-1" src="/seguridadVinculaciontwo/images/logo_blanco.png" alt="" /> */}
                <Image
                  src="/seguridadVinculaciontwo/images/SEcolores.svg"
                  width={200}
                  height={35}
                  alt="logo"
                  className="mr-3 rounded-full"
                />
              </span>
            </Link>
          </div>
          <div className="flex lg:hidden mx-2">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6 text-black" aria-hidden="true" />
            </button>
          </div>
          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Link href={"/"} className="text-sm leading-6 text-color-primario">
              Inicio
            </Link>
            <Popover
              className="relative"
              onMouseOver={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
            >
              <Popover.Button
                onClick={() => setOpen(!open)}
                className="flex items-center text-sm leading-6"
              >
                Quiénes somos
                <ChevronDownIcon
                  className="h-5 w-5 flex-none text-color-primario"
                  aria-hidden="true"
                />
              </Popover.Button>
              <Transition
                show={open}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {products.map((item) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-200"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <item.icon
                            className="h-6 w-6 text-gray-600 group-hover:text-green-600"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-auto">
                          <Link
                            href={item.href}
                            className="block text-gray-900 group-hover:text-green-600"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            {isLoggedIn && currentPath === "/reports" ? (
              <span 
                onClick={() => logoutUser()}
              className="text-sm leading-6 text-red-500 cursor-pointer">
                Cerrar Sesión
              </span>
            ) : (
              <Link
                href={"/reports.html"}
                className="text-sm leading-6 text-color-primario"
              >
                Reportes
              </Link>
            )}

            <Link
              href={"/contact.html"}
              className="text-sm leading-6 text-color-primario"
            >
              Contacto
            </Link>
          </Popover.Group>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href={"/"} className="-m-1.5 p-1.5">
                <span className="sr-only">Seguridad ESPE</span>
                <img
                  className="h-8 w-auto"
                  src="/seguridadVinculaciontwo/images/logo_preview_rev_1.png"
                  alt=""
                />
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link
                    href={"/"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Inicio
                  </Link>
                  <Link
                    href={"/equipo.html"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Nuestro Equipo
                  </Link>
                  <Link
                    href={"/filosofia.html"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Filosofia
                  </Link>
                  <Link
                    href={"/reports.html"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Reportes
                  </Link>
                  <Link
                    href={"/contact.html"}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Contacto
                  </Link>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
};

export default Navbar;
