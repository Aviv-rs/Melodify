
export const OptionsMenu = ({ options, isOpen = false, className = 'options-menu' }) => {

    if (!isOpen) return <></>
    return <div className={className}>
        <ul className="option-list clean-list">
            {options.map((option, idx) => {
                return <li key={idx} onMouseDown={option.action} className="option">{option.name}</li>
            })}
        </ul>
    </div>
}