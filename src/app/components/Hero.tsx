

export default function Hero() {
    return(
        <section className="flex gap-10 px-20 md:flex-row flex-col">
            <div className="w-1/2 text-slate-200 text-2xl gap-2 h-full items-center justify-center flex">

                <div className="flex flex-col gap-5">
                    <div className="inline-block mb-4">
                        <span className="bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">VERSÃO PRODUÇÃO</span>
                    </div>
                    <h1>Hello, it's Me <span className="text-blue-500 font-bold text-4xl">Diogo Maia</span> <br/> and i'm a <span className="font-bold text-3xl text-blue-400">Full Stack Developer </span></h1>
                    <p className="text-base">Esta é a versão de produção do site. Aqui você encontra o conteúdo oficial e estável, pronto para ser visualizado por todos os usuários. Todo o código passou por testes rigorosos antes de ser publicado.</p>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-md text-lg font-semibold transition-colors">Entrar em Contato</button>
                </div>

            </div>

            <div className="w-1/2 h-full flex items-center justify-center">
                <div className="w-72 h-72 rounded-full bg-blue-500 flex items-center justify-center">
                    <span className="text-white text-6xl font-bold">DM</span>
                </div>
            </div>

        </section>
    )
}
