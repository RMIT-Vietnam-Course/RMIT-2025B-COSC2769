export default function CalcButton({ label, color, col, onClick }) {
    return (
        <div className={`col-${col}`}>
            <button className={`btn btn-${color} w-100`} onClick={onClick}>{label}</button>
        </div>
    );
}