import { secondsToMinutes } from "../utils/secondsToMinutes";

interface TimerProps {
    mainTime: number;
}

const Timer = (props: TimerProps) => {
    return <div className="text-8xl text-center">{secondsToMinutes(props.mainTime)}</div>;
};

export default Timer;
