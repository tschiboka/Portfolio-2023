import './LoadingIndicator.scss'

type LoadingIndicatorProps = {
    show: boolean
}

const LoadingIndicator = ({ show }: LoadingIndicatorProps) => {
    return (
        show && (
            <div className="LoadingIndicator">
                <div></div>
                <div></div>
                <div></div>
            </div>
        )
    )
}

export default LoadingIndicator
