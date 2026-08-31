export const Code = {
    Basic: {
        inactive: `<Toggle handleClick={handleClick} active={false}>
    <BsSun className="theme-icon" />
</Toggle>`,
        active: `<Toggle handleClick={handleClick} active>
    <BsSun className="theme-icon" />
</Toggle>`,
    },
    NoIcon: {
        bare: `<Toggle handleClick={handleClick} active={false} />`,
    },
    States: {
        controlled: `const [active, setActive] = useState(false)

<Toggle handleClick={() => setActive(!active)} active={active}>
    <BsSun className="theme-icon" />
</Toggle>`,
    },
    Colors: {
        activeColor: `<Toggle handleClick={handleClick} active activeColor="#00ff00" />`,
    },
    Accessible: {
        keyboard: `{/* Toggle is keyboard accessible — Enter/Space toggle it */}
<div role="switch" aria-checked={active} tabIndex={0} />`,
    },
}
