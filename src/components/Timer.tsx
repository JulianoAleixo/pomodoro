import { secondsToMinutes } from "../utils/secondsToMinutes";

interface TimerProps {
    mainTime: number;
}

const Timer = (props: TimerProps) => {
    return <div className="timer">{secondsToMinutes(props.mainTime)}</div>;
};

export default Timer;
