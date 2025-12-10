import { useState } from "react";
import Navbar from "./components/Navbar";
import PomodoroTimer from "./components/PomodoroTimer";
import Footer from "./components/Footer";

function App() {
    const [activeTab, setActiveTab] = useState<"timer" | "info">("timer");

    return (
        <div className="absolute w-full">
            <Navbar setActiveTab={setActiveTab} />
            {activeTab === "timer" && (
                <div className="h-screen flex justify-center items-center">
                    <PomodoroTimer />
                </div>
            )}
            {activeTab === "info" && (
                <div className="h-screen flex justify-center items-center">
                    ...
                </div>
            )}
            <Footer />
        </div>
    );
}

export default App;
