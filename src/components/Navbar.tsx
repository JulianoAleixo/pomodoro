import { Info, Timer } from "lucide-react";

interface NavbarProps {
    setActiveTab: (tab: "timer" | "info") => void;
}

const Navbar = ({ setActiveTab }: NavbarProps) => {
    return (
        <div className="flex px-4 py-2 items-center justify-between bg-slate-200 fixed w-full shadow-xl">
            <button
                className="flex items-center gap-2 text-xl font-semibold px-4 py-2 rounded-full cursor-pointer hover:bg-slate-300"
                onClick={() => setActiveTab("timer")}
            >
                <Timer size={24} /> Pomodoro
            </button>

            <button
                className="flex items-center gap-2 text-xl font-semibold px-4 py-2 rounded-full cursor-pointer hover:bg-slate-300"
                onClick={() => setActiveTab("info")}
            >
                <Info size={24} />
            </button>
        </div>
    );
};

export default Navbar;
