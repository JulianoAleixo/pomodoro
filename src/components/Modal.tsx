import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    title?: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md relative">
                <button
                    className="absolute cursor-pointer top-3 right-3 p-1 hover:bg-slate-200 rounded-full"
                    onClick={onClose}
                >
                    <X size={20} />
                </button>

                {title && (
                    <h2 className="text-xl font-semibold mb-4">{title}</h2>
                )}

                {children}
            </div>
        </div>
    );
};

export default Modal;
