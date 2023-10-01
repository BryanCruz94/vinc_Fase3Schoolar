import Image from 'next/image'
import React from 'react'
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="w-full bg-color-espe py-1 text-white shadow ">
        <div className="w-full max-w-screen-xl mx-auto py-2 px-4 md:py-1">
          <div className="flex flex-col items-center justify-center lg:justify-end lg:flex-row gap-6 lg:gap-0 mt-2 mb-3">
            {/* <div className='flex gap-6'>             
              <Link href="https://espe.edu.ec" className="flex items-center sm:mb-0">
                <Image width={250} height={10} src="/seguridadVinculaciontwo/images/ESPEtransp.png" className="mr-3" alt="ESPE Logo"/>
              </Link>
            </div> */}
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-white sm:mb-0 dark:text-gray-400">
              {/* <Link href="/" className="flex items-center mb-4 sm:mb-0">
                <Image width={50} height={50} src="/seguridadVinculaciontwo/images/SE SURVEY.svg" className="mr-5 rounded-full" alt="ESPE Logo" />
              </Link> */}
              <li>
                <Link href="/filosofia" className="mr-4 hover:underline md:mr-6 text-white">Filosofía</Link>
              </li>
              <li>
                <Link href="/equipo" className="mr-4 hover:underline md:mr-6 text-white">Nuestro Equipo</Link>
              </li>
              <li>
                <Link href="/reports" className="mr-4 hover:underline md:mr-6 text-white ">Reportes</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:underline text-white">Contacto</Link>
              </li>
            </ul>
          </div>

          <hr className="my-1 border-white sm:mx-auto  lg:my-1" />
          <div className='flex justify-between gap-x-5 my-2'>
            <div >
              <Image
                src="/seguridadVinculaciontwo/images/ESPEtransp.png"
                width={200}
                height={40}
                alt="logo"

              />
            </div>

            <div className="flex flex-col items-center lg:items-start">
              <ul className="text-sm text-white">
                <li><i className="fas fa-map text-2xl" style={{ fontSize: '11px' }}></i> Vía Santo Domingo - Via Quevedo Km. 24</li>
                <li>
                  <i className="fas fa-map-marker text-2xl"style={{ fontSize: '11px' }}></i> Hda. Zoila Luz Avenida Quevedo 3-703-914, Santo Domingo 230153</li>
                <li><i className="fas fa-phone text-2xl"style={{ fontSize: '11px' }}></i> Teléfono: (+593) 22722-246</li>
              </ul>
            </div>
            
            <div className="flex flex-col items-center lg:items-start">
            <br/>
            <Image
                src="/seguridadVinculaciontwo/images/logo_web_blanco.png"
                width={150}
                height={30}
                alt="logo"
                className="mb- rounded-full"
              />
          
            <span className="block text-sm text-white  "style={{ fontSize: '13px' }}>Powered by ESPE-SS | Vinculación Fase II</span>
              <span className="block text-sm text-white"style={{ fontSize: '13px' }}>© 2023 Todos los derechos reservados.</span>
            </div>
           
          </div>
          <hr className="my-4 border-white lg:hidden" />
         
        </div>
      </footer>


    </>
  )
}

export default Footer
