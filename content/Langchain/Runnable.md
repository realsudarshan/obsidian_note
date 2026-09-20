---
title: Runnable
---

# Runnable in LangChain

In LangChain, a **Runnable** is a core interface that allows different components (like PromptTemplates, LLMs, and OutputParsers) to be easily chained together. 

By implementing the `Runnable` interface, components can be invoked sequentially using the pipe operator (`|`). This makes building complex LLM workflows much more intuitive and modular.

## Key Methods
- `invoke()`: Run the component on a single input.
- `batch()`: Run the component on a list of inputs.
- `stream()`: Stream the output back as it is generated.

Example:
```python
chain = prompt | model | output_parser
result = chain.invoke({"input": "Hello!"})
```
