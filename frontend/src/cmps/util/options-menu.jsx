
export const OptionsMenu = ({ options, isOpen = false, className = 'options-menu', setIsOpen }) => {

    if (!isOpen) return <></>
    return <div tabIndex={0} onBlur={() => setIsOpen(false)} className={className}>
        <ul className="option-list clean-list">
            {options.map((option, idx) => {
                return <li key={idx} onMouseDown={option.action} className="option">{option.name}</li>
            })}
        </ul>
    </div>
}

// An external state hook to control the open state of the cmp is required
// const [isMenuOpen, setIsMenuOpen] = useState(false)
// const toggleMenuOpen = () => {
//     setIsMenuOpen((prevIsMenuOpen => !prevIsMenuOpen))
// }