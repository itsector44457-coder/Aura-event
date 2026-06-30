import { X } from 'lucide-react';
import './Modal.css';

export default function Modal({ isOpen, onClose, data }) {
    if (!isOpen || !data) return null;

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>
                    <X size={24} />
                </button>
                {data.image && <img src={data.image} alt={data.title} className="modal-image" />}
                <div className="modal-body">
                    <h3 className="modal-title">{data.title}</h3>
                    <p className="modal-desc">{data.longDesc || data.shortDesc}</p>
                </div>
            </div>
        </div>
    );
}
