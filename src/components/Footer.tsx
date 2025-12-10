import { CodeXml, Github, Linkedin } from "lucide-react";

const Footer = () => {
    return (
        <footer className="flex flex-row items-center justify-between px-8 py-2 bg-slate-200 h-20">
            <div>
                <h2 className="text-lg">Feito por Juliano Aleixo</h2>
            </div>
            <div className="flex gap-2 items-center">
                <a
                    href="https://www.linkedin.com/in/dev-juliano-aleixo/"
                    target="_blank"
                    title="Linkedin"
                    className="p-3 rounded-full cursor-pointer hover:bg-slate-300"
                >
                    <Linkedin size={24} />
                </a>
                <a
                    href="https://www.julianoaleixo.dev"
                    target="_blank"
                    title="Website"
                    className="p-3 rounded-full cursor-pointer hover:bg-slate-300"
                >
                    <CodeXml size={24} />
                </a>
                <a
                    href="https://github.com/JulianoAleixo"
                    target="_blank"
                    title="Github"
                    className="p-3 rounded-full cursor-pointer hover:bg-slate-300"
                >
                    <Github size={24} />
                </a>
            </div>
        </footer>
    );
};

export default Footer;
