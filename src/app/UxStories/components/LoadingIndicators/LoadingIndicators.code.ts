export const Code = {
    Basic: {
        show: `<LoadingIndicator show={isLoading} />`,
        conditional: `const [loading, setLoading] = useState(true)

useEffect(() => {
    fetchData().then(() => setLoading(false))
}, [])

return (
    <>
        <LoadingIndicator show={loading} />
        {!loading && <Content />}
    </>
)`,
    },
    Color: {
        custom: `<LoadingIndicator show color="var(--accent)" />
<LoadingIndicator show color="#ff6b6b" />
<LoadingIndicator show color="white" />`,
    },
    Accessibility: {
        ariaLabel: `<LoadingIndicator show ariaLabel="Fetching user data" />
{/* Default ariaLabel is "Loading" */}`,
    },
}
