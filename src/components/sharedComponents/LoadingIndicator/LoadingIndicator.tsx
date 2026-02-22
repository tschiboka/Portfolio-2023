import './LoadingIndicator.scss'

type LoadingIndicatorProps = {
    show: boolean
    color?: string
}

const LoadingIndicator = ({ show, color }: LoadingIndicatorProps) => {
    return (
        show && (
            <div className="LoadingIndicator" style={{ color }}>
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    )
}

export default LoadingIndicator
