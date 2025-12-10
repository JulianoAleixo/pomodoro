import { useCallback, useEffect, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import Button from "./Button";
import Timer from "./Timer";
import bellStart from "../sounds/bell-start.mp3";
import bellFinish from "../sounds/bell-finish.mp3";
import { secondsToTime } from "../utils/secondsToTime";
import { Pause, Play, Settings } from "lucide-react";
import Modal from "./Modal";

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

const PomodoroTimer = () => {
    const [pomodoroTime, setPomodoroTime] = useState(25 * 60);
    const [shortRestTime, setShortRestTime] = useState(5 * 60);
    const [longRestTime, setLongRestTime] = useState(15 * 60);
    const [cycles, setCycles] = useState(4);

    const [mainTime, setMainTime] = useState(pomodoroTime);
    const [isTimeCounting, setIsTimeCounting] = useState(false);
    const [isWorking, setIsWorking] = useState(false);
    const [isResting, setIsResting] = useState(false);
    const [cyclesQtdManager, setCyclesQtdManager] = useState(
        new Array(cycles - 1).fill(true)
    );
    const [completedCycles, setCompletedCycles] = useState(0);
    const [fullWorkingTime, setFullWorkingTime] = useState(0);
    const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);
    const [totalTime, setTotalTime] = useState(pomodoroTime);
    const [percentage, setPercentage] = useState(50);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    useInterval(
        () => {
            setMainTime((prev) => prev - 1);
            if (isWorking) setFullWorkingTime((prev) => prev + 1);
        },
        isTimeCounting ? 1000 : null
    );

    useEffect(() => {
        const progress = ((totalTime - mainTime) / totalTime) * 100;
        setPercentage(Math.max(0, Math.min(progress, 100)));
    }, [mainTime, totalTime]);

    const handleConfigureWork = useCallback(() => {
        setIsTimeCounting(true);
        setIsWorking(true);
        setIsResting(false);
        setTotalTime(pomodoroTime);
        setMainTime(pomodoroTime);
        audioStartWorking.play();
    }, [pomodoroTime]);

    const handleConfigureRest = useCallback(
        (long: boolean) => {
            setIsTimeCounting(true);
            setIsWorking(false);
            setIsResting(true);

            const time = long ? longRestTime : shortRestTime;
            setTotalTime(time);
            setMainTime(time);

            audioStopWorking.play();
        },
        [shortRestTime, longRestTime]
    );

    useEffect(() => {
        if (mainTime > 0) return;

        if (isWorking && cyclesQtdManager.length > 0) {
            handleConfigureRest(false);
            setCyclesQtdManager((prev) => {
                const newArray = [...prev];
                newArray.pop();
                return newArray;
            });
        } else if (isWorking && cyclesQtdManager.length === 0) {
            handleConfigureRest(true);
            setCyclesQtdManager(new Array(cycles - 1).fill(true));
            setCompletedCycles((prev) => prev + 1);
        }

        if (isWorking) setNumberOfPomodoros((prev) => prev + 1);
        if (isResting) handleConfigureWork();
    }, [
        isWorking,
        isResting,
        mainTime,
        cyclesQtdManager,
        cycles,
        handleConfigureRest,
        handleConfigureWork,
    ]);

    useEffect(() => {
        const colorsToRemove = [...document.body.classList].filter((c) =>
            c.startsWith("bg-")
        );
        colorsToRemove.forEach((c) => document.body.classList.remove(c));

        const color = isWorking ? "bg-rose-800" : "bg-emerald-800";
        document.body.classList.add(color);
    }, [isWorking]);

    const applySettings = () => {
        setMainTime(pomodoroTime);
        setTotalTime(pomodoroTime);
        setCyclesQtdManager(new Array(cycles - 1).fill(true));
        setIsSettingsOpen(false);
    };

    return (
        <div className="bg-slate-200 mx-12 my-5 p-5 rounded-xl shadow-xl min-w-[80vw] md:min-w-md">
            <h2 className="text-xl md:text-2xl text-center">
                Tempo de {isWorking ? "trabalho" : "descanso"}
            </h2>

            <Timer mainTime={mainTime} />

            <div className="flex items-center justify-center md:justify-evenly">
                <Button
                    text="Trabalhar"
                    onClick={() => handleConfigureWork()}
                    isWorking={isWorking}
                />
                <Button
                    text="Descansar"
                    onClick={() => handleConfigureRest(false)}
                    isWorking={isWorking}
                />
                <button
                    className={`${
                        isWorking
                            ? "bg-rose-800 hover:bg-rose-900"
                            : "bg-emerald-800 hover:bg-emerald-900"
                    } bg-emerald-800 border-none cursor-pointer py-2.5 px-6 text-white transition-colors duration-300 ease-in-out my-5 mx-auto rounded-xl ${
                        !isWorking && !isResting ? "hidden" : ""
                    }`}
                    onClick={() => setIsTimeCounting(!isTimeCounting)}
                >
                    {isTimeCounting ? <Pause className="size-5 md:size-6" /> : <Play className="size-5 md:size-6" />}
                </button>
            </div>

            <div
                className="w-full bg-slate-900 rounded-full h-4 overflow-hidden"
                title={`${Math.round(percentage)}%`}
            >
                <div
                    className="bg-cyan-600 h-4 transition-all duration-500"
                    style={{
                        width: `${percentage}%`,
                    }}
                />
            </div>

            <div className="mt-5 md:my-5 mx-0 flex flex-col md:flex-row">
                <div className="flex-1 flex flex-col text-center md:text-left">
                    <p>Ciclos concluídos: {completedCycles}</p>
                    <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
                    <p>Pomodoros concluídos: {numberOfPomodoros}</p>
                </div>
                <button
                    className="mx-auto md:m-4 cursor-pointer p-2 rounded-full hover:bg-slate-300"
                    onClick={() => setIsSettingsOpen(true)}
                >
                    <Settings size={24} />
                </button>
            </div>

            <Modal
                isOpen={isSettingsOpen}
                onClose={() => setIsSettingsOpen(false)}
                title="Configurações do Pomodoro"
            >
                <div className="flex flex-col gap-4">
                    <label className="flex flex-col">
                        Pomodoro (min):
                        <input
                            type="number"
                            className="border p-2 rounded-md"
                            value={pomodoroTime / 60}
                            onChange={(e) =>
                                setPomodoroTime(Number(e.target.value) * 60)
                            }
                        />
                    </label>

                    <label className="flex flex-col">
                        Descanso curto (min):
                        <input
                            type="number"
                            className="border p-2 rounded-md"
                            value={shortRestTime / 60}
                            onChange={(e) =>
                                setShortRestTime(Number(e.target.value) * 60)
                            }
                        />
                    </label>

                    <label className="flex flex-col">
                        Descanso longo (min):
                        <input
                            type="number"
                            className="border p-2 rounded-md"
                            value={longRestTime / 60}
                            onChange={(e) =>
                                setLongRestTime(Number(e.target.value) * 60)
                            }
                        />
                    </label>

                    <label className="flex flex-col">
                        Ciclos até descanso longo:
                        <input
                            type="number"
                            className="border p-2 rounded-md"
                            value={cycles}
                            onChange={(e) => setCycles(Number(e.target.value))}
                        />
                    </label>

                    <button
                        className="bg-emerald-800 cursor-pointer text-white py-2 rounded-lg mt-4 hover:bg-emerald-900"
                        onClick={applySettings}
                    >
                        Salvar
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default PomodoroTimer;
