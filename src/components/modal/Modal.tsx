import './Modal.css'

type ModalType = 'warn' | 'error' | 'success' | 'loading'

interface ModalProps {
    type: ModalType
    message: string
    onClose?: () => void
}

export default function Modal({ type, message, onClose }: ModalProps) {
    const getIcon = () => {
        switch (type) {
            case 'warn':
                return '⚠️'
            case 'error':
                return '❌'
            case 'success':
                return '✅'
            case 'loading':
                return <div className="spinner" />
        }
    }

    return (
        <div className="modal-background">
            <div className="modal-content">
                <div className={`modal-icon ${type}`}>{getIcon()}</div>
                <p>{message}</p>
                {type !== 'loading' && (
                    <button className="modal-ok-button" onClick={onClose}>
                        Ok
                    </button>
                )}
            </div>
        </div>
    )
}
