interface ButtonProps {
    onClick?: () => void;
    text: string;
    className?: string;
    isWorking: boolean;
}

const Button = (props: ButtonProps) => {
    return (
        <button
            onClick={props.onClick}
            className={`${
                props.isWorking
                    ? "bg-rose-800 hover:bg-rose-900"
                    : "bg-emerald-800 hover:bg-emerald-900"
            } border-none cursor-pointer py-2.5 px-3 md:px-6 text-white text-sm md:text-md transition-colors duration-300 ease-in-out my-5 mx-auto rounded-xl ${
                props.className
            }`}
        >
            {props.text}
        </button>
    );
};

export default Button;
