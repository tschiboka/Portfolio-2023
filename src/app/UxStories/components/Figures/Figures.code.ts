export const Code = {
    Basic: {
        simple: `<Figure src={placeholder_image} alt="Mountain landscape" />`,
        withCaption: `<Figure
    src={placeholder_image}
    alt="Mountain landscape"
    caption="View from the summit at sunrise"
/>`,
    },
    Sizes: {
        all: `<Figure src={placeholder_image} alt="Photo" size="sm" />   {/* max 400px */}
<Figure src={placeholder_image} alt="Photo" size="md" />   {/* max 800px */}
<Figure src={placeholder_image} alt="Photo" size="lg" />   {/* max 1000px */}
<Figure src={placeholder_image} alt="Photo" size="full" /> {/* 100% (default) */}`,
    },
    Zoom: {
        onZoom: `<Figure
    src={placeholder_image}
    alt="Click to enlarge"
    onZoom={() => setZoomed(true)}
/>`,
    },
    Responsive: {
        sources: `<Figure
    src={placeholder_image}
    alt="Responsive image"
    sources={[
        { src: '/images/large.webp', minWidth: '1200px', type: 'image/webp' },
        { src: '/images/medium.webp', minWidth: '768px', type: 'image/webp' },
        { src: '/images/small.jpg', maxWidth: '767px' },
    ]}
/>`,
    },
    Accessibility: {
        ariaLabel: `<Figure
    src={placeholder_image}
    alt="Sales chart"
    ariaLabel="Quarterly sales comparison chart"
    caption="Q1–Q4 2025"
/>`,
    },
    BgColor: {
        example: `<Figure
    src={placeholder_image}
    alt="Diagram with white background"
    bgColor="white"
    caption="White background applied to the image wrapper and zoom overlay"
/>

<Figure
    src={placeholder_image}
    alt="No background"
    caption="No bgColor \u2014 transparent by default"
/>`,
    },
} as const
