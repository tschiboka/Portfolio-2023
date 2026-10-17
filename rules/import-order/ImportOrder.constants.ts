/** The six statement shapes, in the order a file must present them. */
export const ImportStyleRanks = {
    Namespace: 1,
    Default: 2,
    Mixed: 3,
    Named: 4,
    Type: 5,
    SideEffect: 6,
}

/**
 * The path ranks. A bare package comes before a scoped one, which comes before ours.
 * Parent-relative is a base rather than a fixed rank: each further `../` adds one, so the
 * rank a specifier carries is `ParentRelative + depth - 1`. Assets sit beyond every depth.
 */
export const PathRanks = {
    External: 1,
    ExternalScoped: 2,
    Aliased: 3,
    SameDirectory: 4,
    ParentRelative: 5,
    Assets: 100,
}

/**
 * Every alias the project declares. The three files that declare them — `tsconfig.json`,
 * `vite.config.ts` and `jest.config.cjs` — each warn that a new one belongs here too.
 */
export const AliasPrefixes = [
    '@app',
    '@common-mocks',
    '@common-types',
    '@common-utils',
    '@common-ux',
    '@portfolio',
    '@projects',
    '@public',
    '@shared-assets',
    '@shared-components',
    '@shared-context',
    '@shared-queries',
    '@shared-styles',
]

/** What an alias opens with — a package may open with it too, which is why the list above decides. */
export const AliasMarker = '@'

/** The suffixes that make an import a render rather than a module — every file type an asset can be. */
export const AssetExtensions = [
    '.aac',
    '.aiff',
    '.apng',
    '.avi',
    '.avif',
    '.bmp',
    '.css',
    '.csv',
    '.cur',
    '.dae',
    '.docx',
    '.eot',
    '.fbx',
    '.flac',
    '.frag',
    '.gif',
    '.glb',
    '.glsl',
    '.gltf',
    '.gz',
    '.ico',
    '.jfif',
    '.jpeg',
    '.jpg',
    '.jxl',
    '.less',
    '.m4a',
    '.m4v',
    '.md',
    '.mid',
    '.mkv',
    '.mov',
    '.mp3',
    '.mp4',
    '.mpeg',
    '.obj',
    '.oga',
    '.ogg',
    '.ogv',
    '.opus',
    '.otf',
    '.pcss',
    '.pdf',
    '.png',
    '.rar',
    '.rtf',
    '.sass',
    '.scss',
    '.stl',
    '.styl',
    '.svg',
    '.svgz',
    '.tar',
    '.tif',
    '.tiff',
    '.tsv',
    '.ttc',
    '.ttf',
    '.txt',
    '.vert',
    '.wav',
    '.webm',
    '.webp',
    '.wgsl',
    '.wmv',
    '.woff',
    '.woff2',
    '.xlsx',
    '.zip',
]

export const ErrorMessage = "A file's imports must be ordered by style, then by path."
