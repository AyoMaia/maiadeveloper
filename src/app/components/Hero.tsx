
import Image from "next/image"

export default function Hero() {
    return(
        <section className="flex gap-10 px-20 md:flex-row flex-col">
            <div className="w-1/2 text-slate-200 text-2xl gap-2 h-full items-center justify-center flex">

                <div className="flex flex-col gap-5">
                    <h1>Hello, it's Me <span className="text-slime-600 font-bold text-4xl">Diogo Maia</span> <br/> and i'm a <span className="font-bold text-3xl">Frontend Developer </span></h1>
                    <p className="text-base">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad blanditiis nulla ducimus magnam non tenetur dicta alias ab nobis, fugiat dolore illum voluptatem perferendis magni officia pariatur libero eligendi molestiae?</p>
                    <button className="bg-lime-600 text-slate-200 py-2 px-4 rounded-md text-lg">contact</button>
                </div>
               
            </div>

            <div className="w-1/2 h-full flex items-center justify-center">
                <div className="w-72 h-72 rounded-full bg-slate-500">

                </div>
            </div>
        
        </section>
    )
}