const codeSnippets = { 
    useState: `const [fullName, setFullName] = useState<string>("")
const handleOnButtonClick = () => setFullName(firstName + lastName)
`, 
    useEffect: `useEffect(() => {})
useEffect(() => { console.log('1. Mount') }, [])                    // Run once on mount
useEffect(() => { console.log('2. Mount and every state change') }) // Run on every state change
useEffect(() => { console.log('3. Update') }, [value])              // Run if dependency state change
useEffect(() => () => console.log('4. Before unmount')              // Run on before component is removed
useEffect(() => () => console.log('5. Update or unmount'), [value]) // Run both on dependency change before component is removed`,
    useContext: `interface ThemeContextType {
    theme: string
    setTheme: (theme: string) => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
export const ThemeContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [theme, setTheme] = useState<string>('dark')
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useThemeContext = () => {
    const context = useContext(ThemeContext)
    if (!context) throw new Error('Must be used within an ThemeContextProvider')
    return context
}`,
    useRef: `const count = useRef(0)
return <button onclick={() => count.current++}</button>`,
    customHook: `const useFetchUser = (userId) => {            // Your custom fetch user hook
    const [user, setUser] = useState(null);   // Use state hook here

    useEffect(() => {                         // Use effect hook here
      fetch("my_api_url/" + userId)
        .then((res) => res.json())
        .then((data) => setData(data));
    }, [userId]);
  
    return user;
  };
  
const MyComponent = () => {
  const user = useFetch(1);                    // Use the hook in your component`,
    exampleComponent: `const { data: albums, isLoading } = useFetchAlbums()

const onSubmit = () => {
    const { data } = useFetchComments()
}

const displayAlbumsTable = (albums: Album[] | undefined) => (
    <table>
        <tbody>
            {Maybe.fromNull(albums)
                .map(R.pipe(R.take(10), R.map((album: Album) => (
                    <tr key={album.id}>
                        <td>{album.id}</td>
                        <td>{album.userId}</td>
                        <td>{album.title}</td>
                    </tr>
                )),),
                ).orUndefined()}
        </tbody>
    </table>
)

return (
    <div>
        {displayAlbumsTable(albums)}
        <button onClick={onSubmitError}>Trigger</button>
    </div>
)`,
    exampleHooks: `export type Album = {
    userId: number,
    id: number,
    title: string
}

export const useFetchAlbums = (): UseQueryResult<Album[], AxiosError> =>
  useQuery<Album[], AxiosError>({
    queryKey: ["albums"],
    queryFn: () => axios.get("https://jsonplaceholder.typicode.com/albums").then(data => data.data)
  });

export type Comments = {
  postId: number,
  id: number,
  name: string,
  email: string,
  body: string,
}

export const useFetchComments = (): UseQueryResult<Comment[], AxiosError> =>
  useQuery<Comment[], AxiosError>({
    queryKey: ["comments"],
    queryFn: () => axios.get("https://jsonplaceholder.typicode.com/comments").then(data => data.data)
  });`,
  errorLine: `const { data: albums, isLoading } = useAlbums()

const onSubmit = () => {
    const { data } = useFetchComments()  // I called a React hook within a regular JS function
}`,
    wrappedHook: `export const useComments = () => {
    const { data } = useFetchComments()
    // ... Here you can define any comment related hooks as well
    return {
        getComments: () => data
        // You can return other funtionality here that uses the comments hook
    }
}`,
    fetch: `const { getComments } = useComments() // Object destruction to get function
const onSubmit = () => {
    const comments = getComments()    // Use the function returned from the hook
}`
}

export default codeSnippets
