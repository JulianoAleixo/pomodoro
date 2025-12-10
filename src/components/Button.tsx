interface ButtonProps {
    onClick?: () => void;
    text: string;
    className?: string;
}

const Button = (props: ButtonProps) => {
    return (
        <button onClick={props.onClick} className={props.className}>
            {props.text}
        </button>
    );
};

export default Button;
