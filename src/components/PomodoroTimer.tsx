import { useCallback, useEffect, useState } from "react";
import { useInterval } from "../hooks/useInterval";
import Button from "./Button";
import Timer from "./Timer";
import bellStart from "../sounds/bell-start.mp3";
import bellFinish from "../sounds/bell-finish.mp3";
import { secondsToTime } from "../utils/secondsToTime";

const audioStartWorking = new Audio(bellStart);
const audioStopWorking = new Audio(bellFinish);

interface PomodoroTimerProps {
    pomodoroTime: number;
    shortRestTime: number;
    longRestTime: number;
    cycles: number;
}

const PomodoroTimer = (props: PomodoroTimerProps) => {
    const [mainTime, setMainTime] = useState(props.pomodoroTime);
    const [isTimeCounting, setIsTimeCounting] = useState(false);
    const [isWorking, setIsWorking] = useState(false);
    const [isResting, setIsResting] = useState(false);
    const [cyclesQtdManager, setCyclesQtdManager] = useState(
        new Array(props.cycles - 1).fill(true)
    );
    const [completedCycles, setCompletedCycles] = useState(0);
    const [fullWorkingTime, setFullWorkingTime] = useState(0);
    const [numberOfPomodoros, setNumberOfPomodoros] = useState(0);

    useInterval(
        () => {
            setMainTime(mainTime - 1);
            if (isWorking) setFullWorkingTime(fullWorkingTime + 1);
        },
        isTimeCounting ? 1000 : null
    );

    const handleConfigureWork = useCallback(() => {
        setIsTimeCounting(true);
        setIsWorking(true);
        setIsResting(false);
        setMainTime(props.pomodoroTime);
        audioStartWorking.play();
    }, [
        setIsTimeCounting,
        setIsWorking,
        setIsResting,
        setMainTime,
        props.pomodoroTime,
    ]);

    const handleConfigureRest = useCallback(
        (long: boolean) => {
            setIsTimeCounting(true);
            setIsWorking(false);
            setIsResting(true);

            if (long) {
                setMainTime(props.longRestTime);
            } else {
                setMainTime(props.shortRestTime);
            }

            audioStopWorking.play();
        },
        [
            setIsTimeCounting,
            setIsWorking,
            setIsResting,
            setMainTime,
            props.longRestTime,
            props.shortRestTime,
        ]
    );

    useEffect(() => {
        if (isWorking) document.body.classList.add("working");
        if (isResting) document.body.classList.remove("working");

        if (mainTime > 0) return;

        if (isWorking && cyclesQtdManager.length > 0) {
            handleConfigureRest(false);
            cyclesQtdManager.pop();
        } else if (isWorking && cyclesQtdManager.length <= 0) {
            handleConfigureRest(true);
            setCyclesQtdManager(new Array(props.cycles - 1).fill(true));
            setCompletedCycles(completedCycles + 1);
        }

        if (isWorking) setNumberOfPomodoros(numberOfPomodoros + 1);
        if (isResting) handleConfigureWork();
    }, [
        isWorking,
        isResting,
        cyclesQtdManager,
        numberOfPomodoros,
        mainTime,
        completedCycles,
        handleConfigureRest,
        setCyclesQtdManager,
        handleConfigureWork,
        props.cycles,
    ]);

    return (
        <div className="pomodoro">
            <h2>Tempo de {isWorking ? "trabalho" : "descanso"}</h2>
            <Timer mainTime={mainTime} />
            <div className="controls">
                <Button text="Work" onClick={() => handleConfigureWork()} />
                <Button
                    text="Rest"
                    onClick={() => handleConfigureRest(false)}
                />
                <Button
                    className={!isWorking && !isResting ? "hidden" : ""}
                    text={isTimeCounting ? "Pause" : "Play"}
                    onClick={() => setIsTimeCounting(!isTimeCounting)}
                />
            </div>
            <div className="details">
                <p>Ciclos concluídos: {completedCycles}</p>
                <p>Horas trabalhadas: {secondsToTime(fullWorkingTime)}</p>
                <p>Pomodoros concluídos: {numberOfPomodoros}</p>
            </div>
        </div>
    );
};

export default PomodoroTimer;
