import Image from 'next/image'
import React from 'react'
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-color-espe py-2 text-white shadow ml-0 mp-5">
        <div className="w-full max-w-screen-xl mx-auto py-2 px-4 md:py-1">
          <div className="flex flex-col items-center justify-center lg:justify-end lg:flex-row gap-3 lg:gap-0 mt-2 mb-3">

            <ul className="flex flex-wrap items-center mb-2 text-sm font-medium text-white sm:mb-0 dark:text-gray-400">
              <li>
                <Link href="/filosofia" className="mr-3 hover:underline md:mr-4 text-white">Filosofía</Link>
              </li>
              <li>
                <Link href="/equipo" className="mr-3 hover:underline md:mr-4 text-white">Nuestro Equipo</Link>
              </li>
              <li>
                <Link href="/reports" className="mr-3 hover:underline md:mr-4 text-white">Reportes</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline text-white">Contacto</Link>
              </li>
            </ul>
          </div>
          <hr className="my-2 border-white sm:mx-auto lg:my-1" />
          <div className='flex flex-col lg:flex-row justify-between gap-3 my-2'>
            <div className='flex gap-3'>
              <Link href="https://espe.edu.ec" className="flex items-center">
                <Image width={200} height={40} src="https://res.cloudinary.com/dfitq38dk/image/upload/v1698103279/espe_img_blanco.png" className="mr-3" alt="ESPE Logo" />
              </Link>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <ul className="text-xs text-white">
                <li><i className="fas fa-map text-lg" style={{ fontSize: '11px' }}></i> Vía Santo Domingo - Vía Quevedo Km. 24</li>
                <li><i className="fas fa-map-marker text-lg" style={{ fontSize: '11px' }}></i> Hda. Zoila Luz Avenida Quevedo 3-703-914, Santo Domingo 230153</li>
                <li><i className="fas fa-phone text-lg" style={{ fontSize: '11px' }}></i> Teléfono: (+593) 22722-246</li>
              </ul>
            </div>
            <div className="flex flex-col items-center lg:items-start">
              <Image
                src="https://res.cloudinary.com/dfitq38dk/image/upload/v1698102910/EspoLogo_Blanco.png"
                width={200}
                height={40}
                alt="logo"
                className="mb-2"
              />
            </div>
            <div className="flex flex-col items-center lg:items-start justify-center">
              <span className="block text-xs text-white" style={{ fontSize: '11px' }}>Powered by ESPE-SS | Vinculación Fase II</span>
              <span className="block text-xs text-white" style={{ fontSize: '11px' }}>© 2023 Todos los derechos reservados.</span>
            </div>
          </div>
          <hr className="my-2 border-white lg:hidden" />
        </div>
      </footer>



    </>
  )
}

export default Footer
