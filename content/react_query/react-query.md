[[query vs mutation]]
[[reactquery|React Query Lifecycle]]
# Wrap your app with QueryClientProvider
```javascript
  <QueryClientProvider client={queryClient}>
      <YourComponent />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
```
# use useQuery
```javascript
const fetchPosts = async () => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts')
  return data
}
//to use
 const { data, isLoading, isError, error } = useQuery(['posts'], fetchPosts)
```

| Term                   | Meaning                                                                      |
| ---------------------- | ---------------------------------------------------------------------------- |
| `cacheTime`            | How long unused data stays in memory after the component unmounts            |
| `staleTime`            | How long data is considered **fresh** before triggering a background refetch |
| `refetchOnWindowFocus` | Automatically refetch when the user focuses the window                       |
These are passed as options after key and function ie.
```javascript
(['posts'],fetchPosts,{cacheTime:100})
```

# **add, delete, or update data** on the server with React Query using `useMutation`.
| Term                | Meaning                                                        |
| ------------------- | -------------------------------------------------------------- |
| `useMutation`       | Hook to create/update/delete data                              |
| `mutate()`          | Function to **trigger the mutation**                           |
| `onSuccess`         | Callback after mutation success — great for cache invalidation |
| `invalidateQueries` | Forces a refetch of a query after a mutation                   |
```javascript
const addTodo = async (title) => {
  const { data } = await axios.post('https://jsonplaceholder.typicode.com/todos', {
    title,
    completed: false,
  })
  return data
}
 const mutation = useMutation({
    mutationFn: addTodo,
    onSuccess: () => {
      queryClient.invalidateQueries(['todos']) // Refetch after add
    },
  })
    const handleAdd = () => {
    if (input.trim()) { //if input isnt empty
      mutation.mutate(input)
      setInput('')
    }
  }
```
