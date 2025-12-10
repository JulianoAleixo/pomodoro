interface ButtonProps {
    onClick?: () => void;
    text: string;
    className?: string;
}

const Button = (props: ButtonProps) => {
    return (
        <button
            onClick={props.onClick}
            className={`bg-emerald-800 border-none cursor-pointer py-2.5 px-6 text-white transition-colors duration-300 ease-in-out my-5 mx-auto ${props.className}`}
        >
            {props.text}
        </button>
    );
};

export default Button;
