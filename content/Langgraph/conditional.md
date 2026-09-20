## create a global state
class AgentState(TypeDict):
    number1: int 
    operation: str
    number2: int
    finalNumber: int
    number3: int
    operation2: str
    number4: int
    finalNumber2: int

## Define the functions
Since they are not connected,we are just defining function

> [!NOTE] Node
> Every node is a function that return new state 

```
def adder(state:AgentState)->AgentState:
print("adder")
state["finalNumber"]=state["number1"]
+state["number2]
```
similarly,we have for subtractor.
```def decide_next_node(state:AgentState)->string:
if state["operation"]=="+":
return "addition operation"
elif state["operation"]=="-":
return "subtraction_operation"
```

Same for adder 2 and subtractor 2 nodes
Same for decide_next_node1

## Assigning the functions with nodes and making connection

###  initialize graph with StateGraph(AgentState)
### mapping node to its corresponding function
eg:graph.add_node("add_node",adder)

> [!WARNING] router
> We dont map any madeup function to router.We assign just a function that return the same state
> eg:graph.add_node("router",lambda state:state)



### Making connection between nodes
```
graph.add_edge(START,"router")
```
graph.add_conditional_edges("router",decide_next_node,{
"addition_operation":"add_node",
"subtraction_operation":"subtract_node"
}
)


> [!NOTE] Add_conditional_edges
>"node",function that return string,{
>
>"returned string":"next node"} 

Make workflow using same way
At end:
graph.add_edge("add_node2",END)
graph.add_edge("subtract_node2",END)

## Compile the graph
app=graph.compile()


> [!NOTE] View the graph using Ipythom library
> from IPython.display import Image, display
display(Image(app.get_graph().draw_mermaid_png()))

## Prepare the initial state
```
initial_state = AgentState(number1 = 10, operation="-", number2 = 5, number3 = 7, number4=2, operation2="+", finalNumber= 0, finalNumber2 = 0)
```
### invoke the compiled graph
print(app.invoke(initial_state))


[Code Example](https://github.com/iamvaibhavmehra/LangGraph-Course-freeCodeCamp/blob/main/Exercises/Exercise_Graph4.ipynb)


