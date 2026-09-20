Chat mode :questions,answer and single file edits(Ai pair programmer for discusiion )
Composter mode:implementation of new feature,large refactoring operation(AI contracter who add features)
# @symbol
@files
@folder
@code
@Docs eg:@Docs react query (pull react query docs)
@Codebase(entire project)
@Web(Search the web for info)
@Git(refrence git history and diffs)

# Tab completion
Clear comment before functions ,use discriptive variable name
 tab/esc
 partially accept ctrl+right arrow
## Never Do This
   - Don't use any for TypeScript types
   - Don't create god objects/classes
   - Don't bypass validation layers
   - Don't use inline styles in React


---

## 🔍 Part 2: Codebase-Wide Understanding

Cursor indexes your entire codebase. Here's how to leverage it:

### **The @Codebase Power Moves**

**1. Architecture Questions**
```
@Codebase How is authentication implemented across the app?
```

**2. Find Patterns**
```
@Codebase Show me all API endpoints that don't have error handling
```

**3. Dependency Tracking**
```
@Codebase What files import or use the User type?
```

**4. Refactoring Discovery**
```
@Codebase Find all places where we directly manipulate the database instead of using the repository pattern
```

### **Advanced Search Techniques**

Use Composer with @Codebase for large refactors:
@Codebase Find all React components using class-based syntax and convert them to functional components with hooks. Update:
- State management to useState
- Lifecycle methods to useEffect
- Keep the same functionality
 
# Inline editing patterns
Comment driven
Type first development
eg:
```typescript
interface CreateTaskType{
name:string;
description:string;
priority:'low'|'medium'|'high';
}
function createtask(req:CreateTaskType){
//press tab here
}
```
# Advanced error:
Race condition
Memory leak
Performance lack



