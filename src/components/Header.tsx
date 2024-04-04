import Image from 'next/image'
import logoImage from '../assets/logo.svg';

import Link from 'next/link';

export function Header() {
  return (
    <header className="border-b border-zinc-800">
      <nav className="mx-auto flex max-w-7xl items-center justify-between w-full py-8 px-10 xl:px-0" aria-label="Global">
        <div className="flex lg:flex-1">
        <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Logo Ipsum Camisetas</span>
            <Image 
                title="Logo Ipsum Camisetas"
                src={logoImage} 
                alt="Statamic"
                width={158}
                height={48}
                className="col-span-2 col-start-2 max-h-12 w-full object-contain sm:col-start-auto lg:col-span-1"
            />
        </Link>  
        </div>
      </nav>    
    </header>
  )
}