# Create global state
Same as [[conditional]]


# Create functions

> [!NOTE] 
> The game is like
 >User choose number but can be failed and the
 >upper and lower bounds will keep shrinking but user will also get hint

 
eg:setup_node
Initialize the game with random target number
guess_node
Generate a smarter guess based on previous hints
hint_node
provide a hint based on last guess and update the bounds
shoudcontinue(returns string):
Determine if we should continue guessing or end the game
There are 2 end conditions - either 7 is reached or the correct number is guessed
return "end" or continue

# Create nodes
## Initialize graph with global state
graph = StateGraph(GameState)
## Map nodes to its functions
graph.add_node("setup", setup_node)
graph.add_node("guess", guess_node)
graph.add_node("hint_node", hint_node)
## Making connection with nodes
graph.add_edge("setup", "guess")
graph.add_edge("guess", "hint_node")
graph.add_conditional_edges(
    "hint_node", 
    should_continue,
    {
        "continue": "guess",
        "end": END
    }
)
> [!NOTE] Add_conditional_edges
>"node",function that return string,{
>
>"returned string":"next node"} 
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


[Code Example](https://github.com/iamvaibhavmehra/LangGraph-Course-freeCodeCamp/blob/main/Exercises/Exercise_Graph5.ipynb)
