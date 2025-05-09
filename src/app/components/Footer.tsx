
export default function Footer(){
    return(
        <section>
            

            <footer className="bg-white rounded-lg shadow-sm m-4 dark:bg-gray-800">
                <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
                    <li>
                        <a href="#about" className="hover:underline me-4 md:me-6">Sobre</a>
                    </li>
                    <li>
                        <a href="#portifolio" className="hover:underline me-4 md:me-6">Portifólio</a>
                    </li>
                    <li>
                        <a href="#skills" className="hover:underline me-4 md:me-6">Skills</a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:underline">Contato</a>
                    </li>
                </ul>
                </div>
            </footer>

        </section>
    )
}