Thry can use other hook inside them
They start with use
They are used inside component
```javascript
export default function useCustom(defaultValue){
const [value,setValue]=useState(defaultValue)
useEffect(()=>{
setValue('updated')
});
return value
}
```
Now this will be lifecycle of component it is used in .
Value is returned whicih is a state and can be used anywhere.
