

export default function Header() {
    return(
        <div className="w-full p-5 ">
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                    <div className="text-2xl font-bold text-blue-500">Maia Developer</div>
                    <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">PROD</span>
                </div>
                <div>
                    <nav className="flex gap-6">
                        <a href="#about" className="text-slate-300 hover:text-blue-400 transition-colors">About</a>
                        <a href="#portifolio" className="text-slate-300 hover:text-blue-400 transition-colors">Portifólio</a>
                        <a href="#contact" className="text-slate-300 hover:text-blue-400 transition-colors">Contato</a>
                    </nav>
                </div>
            </div>
        </div>
    )
}