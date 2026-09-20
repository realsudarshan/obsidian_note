### 🔁 React Query Data Lifecycle with `staleTime`:

1. **Data is fetched**  
    → React Query stores it in the cache and marks it as **fresh** ✅
    
2. **During `staleTime` period**  
    → The data stays **fresh**  
    → No automatic re-fetching happens even on tab focus or remount
    
3. **After `staleTime` passes**  
    → The data becomes **stale** ⚠️  
    → Now React Query **may trigger a background re-fetch** when:
    
    - You refocus the window
        
    - You re-mount the component
        
    - Network reconnects
        
4. **Manual refetching always works**  
    → You can still manually call `refetch()` anytime, even when data is fresh
# Query Key

```javascript
useQuery({
  queryKey: ['user'],         // Unique identity
  queryFn: fetchUser,         // The function to run
});
```

If you use this elsewhere with the same key, React Query:

- will reuse cached data if it's still fresh
- will refetch if it's stale



