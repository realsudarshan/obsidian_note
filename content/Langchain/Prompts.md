Prompts are input to LLM
Handling Prompts:
1)Dynamic and reusable Prompts
2)Role based Prompts
3)[[Few shot prompting]]


1. **Definition and Importance of Prompts:**
    
    - A prompt is essentially the input message or request to an LLM.
    - This input can be text, images, sound, or even video (though current focus is on text-based prompts).
    - Prompts have a significant impact on output quality; small changes in prompts can drastically alter LLM responses.
    - Designing effective prompts is considered crucial and has spawned the emerging role of “Prompt Engineering.”
2. **Static vs. Dynamic Prompts:**
    
    - Static prompts are fixed, unchanging inputs written directly by the developer or user.
    - Dynamic prompts utilize templates with placeholders that are filled during runtime with user input or other data.
    - Static prompts give full control but have drawbacks such as errors from typos, inconsistent user experience, and reduced control over output format.
    - Dynamic prompts allow more flexibility, better user experience, and consistent output by controlling the prompt structure programmatically.
3. **Building a Research Assistant with Streamlit:**
    
    - A small web UI is created where users can enter research prompts.
    - Streamlit, a Python library for UI development, is used to build a simple interface with input boxes and buttons for interaction.
    - The user input is fetched and sent to the LLM as a prompt, demonstrating interaction flow.
    - This example showcases how static prompts are problematic in real-world apps and the need for dynamic prompt templates.
4. **Prompt Templates in LangChain:**
    
    - LangChain provides a [[`PromptTemplate` class]] to build prompts with placeholders.
    - Templates are more maintainable, reusable, and provide automatic validation for placeholders.
    - Template validation ensures errors are caught during development (missing or extra placeholders).
    - Templates can be saved to external JSON files, allowing them to be reused across multiple projects or pages.
5. **Use of Chains for Efficient Invocation:**
    
    - Chains in LangChain allow combining prompt creation and model invocation into a single step.
    - Instead of manually creating a prompt then calling the model, a chain automates this process.
    - This reduces code complexity and improves modularity.
6. **Building a Simple Console Chatbot:**
    
    - Demonstrated creating a chatbot that interacts with the LLM by sending user inputs as prompts.
    - Initial chatbot lacked conversation context as each input was treated as standalone.
    - This limitation caused issues with context retention, leading to incorrect or irrelevant responses.
7. **Maintaining Conversation Context with Chat History:**
    
    - To solve context loss, chat history is maintained as a list of exchanged messages.
    - Entire chat history is sent with every new query to provide context to the LLM.
    - This enables multi-turn conversations where the bot “remembers” the earlier discussion.
8. **Introduction of [[Message Types]] in LangChain:**
    
    - LangChain divides messages into three types: System messages (bot instructions), Human messages (user inputs), and AI messages (model outputs).
    - Managing message types improves chat history clarity and supports complex interactions.
    - Properly labeled messages help in distinguishing who sent what and maintaining context.
9. **Using ChatPromptTemplate and [[MessagePlaceholder]]:**
    
    - For multi-turn conversations, LangChain offers `ChatPromptTemplate` to dynamically create chat prompts involving system, human, and possibly AI messages.
    - `MessagePlaceholder` is introduced to handle inserting entire chat histories dynamically.
    - This enables advanced chat flows like customer support bots that utilize past chat context to generate accurate and relevant responses.
10. **Handling Real-World Scenario — Customer Support Chatbot:**
    
    - An example is given of a refund request scenario where the chatbot tracks the prior conversation.
    - Chat history is stored (e.g., in a database or file), loaded during chat, and injected into prompts using message placeholders.
    - This technique ensures the bot can answer queries based on historical chat data, enhancing user experience and response relevance.
11. **Summary of LangChain Usage Patterns for Prompts:**
    
    - [[Single-turn]] vs. [[multi-turn]] querying.
    - Static messages vs. dynamic templates.
    - Templates enable validation, reusability, and ecosystem integration.
    - Message types and placeholders offer clean chat history management and context preservation.
    - Chains combine prompt generation and model invocation for streamlined coding.
- # Key Conclusions

1. **Prompt design is central to successful LLM applications:**
    
    - The output quality of LLMs depends heavily on how prompts are structured and implemented.
    - Effective prompt engineering can drastically improve reliability, clarity, and utility.
2. **Dynamic prompts are preferred over static prompts for real-world applications:**
    
    - Static prompts expose the system to user errors and inconsistencies.
    - Dynamic templates ensure consistent output formats and controlled variations, improving user experience.
3. **PromptTemplate class in LangChain provides essential benefits:**
    
    - Automatic runtime validation reduces bugs.
    - Facilitates code reusability by separating prompt logic from application logic.
    - Enables prompt template persistence and easy sharing.
4. **Chains unify prompt creation and model execution, simplifying workflows:**
    
    - Using chains reduces boilerplate code.
    - Encourages modular, maintainable project architecture.
5. **Maintaining conversational context is crucial in building chatbots:**
    
    - Passing entire chat history as context solves the issue of context loss.
    - Differentiating message roles (system, human, AI) is fundamental for proper interaction.
6. **LangChain provides structured abstractions (message types, templates, placeholders) to manage complex prompt interactions:**
    
    - These abstractions improve developer productivity and make applications scalable.
    - Using `ChatPromptTemplate` and `MessagePlaceholder` allows advanced, dynamic, and context-aware chatbots.
7. **There remain challenges and weird behaviors, as LangChain is maturing:**
    
    - Some inconsistencies and unexpected behaviors were highlighted (e.g., direct printing issues).
    - The ecosystem will evolve, but current tools already provide strong foundational approaches.
    -
    # Important Details

8. **Temperature Explanation and Demo:**
    
    - Using temperature=0 gives deterministic output; repeated runs give same results.
    - Temperature around 1.5 produces varied creative outputs.
    - Python code illustrates running openAI.generate with different temperature values and viewing changed poem outputs.
9. **Prompt as User Input:**
    
    - In practical apps, the prompt usually comes from user input, not hard-coded.
    - Example: Research assistant tool where users type paper summary prompts with style and length preferences.
10. **Streamlit for UI Creation:**
    
    - UI elements: header, text input box, button.
    - Button click triggers getting user prompt, passing to LLM, displaying result.
    - Demonstrates initial integration without prompt templating (static prompts).
11. **PromptTemplate Class:**
    
    - Placeholders like `{paper_input}`, `{style_input}`, `{length_input}` enable flexible prompting.
    - Template validation ensures placeholder names match in code and template.
    - Templates can be saved/loaded as JSON for reuse.
12. **Chain Invocation:**
    
    - Chain object created by combining PromptTemplate and Model.
    - Chain’s `invoke()` accepts placeholder values dict, creates prompt, calls model, returns output.
    - Code optimization vs. manually invoking prompt and then model separately.
13. **Simple Console Chatbot Implementation:**
    
    - Loop awaiting user input.
    - Sends user input to model’s `invoke()`.
    - Prints AI response.
    - Initial issue: no context of previous messages.
14. **Maintaining Chat History:**
    
    - Keep ordered list of past messages.
    - Append user and AI messages on each turn.
    - Pass entire chat history on every `invoke()` call.
    - Provides multi-turn conversation with context retention.
15. **Message Types Detailed:**
    
    - `SystemMessage`: Instructions or persona setup; sent once at conversation start.
    - `HumanMessage`: User input.
    - `AIMessage`: Model response.
    - These help manage and organize conversation flow for consistent interaction.
16. **Implementing Chat Prompt Templates:**
    
    - Multi-message templates combine system and user messages with placeholders.
    - Placeholders filled with runtime values and chat history.
    - Enables dynamic, structured chat prompts crucial for customer support and conversational AI apps.
17. **MessagePlaceholder Usage:**
    
    - Placeholders that represent entire message lists.
    - Used for inserting prior chat messages into templates dynamically.
    - Essential for maintaining conversation context when loading past dialogues from storage.
18. **Example Chatbot Refund Scenario:**
    
    - Chat history loaded from file or database.
    - Inserted into prompt template via `MessagePlaceholder`.
    - New user queries combined with history to generate context-rich answers.
    - Enhances bot’s ability to provide follow-up answers.
19. **LangChain Ecosystem Integration:**
    
    - PromptTemplate and ChatPromptTemplate couple naturally with Chains and Models.
    - This modular design supports scalable and maintainable applications.
    - Encourages separation of concerns: prompt design, model invocation, and UI logic.
20. **Code Practices and Tips:**
    
    - Use `st.write()` (Streamlit) to properly display UI elements and avoid console print confusion.
    - Wrap long strings with word wrap for readability.
    - Prefer using LangChain’s classes over raw string formatting for robustness.
    - Separate prompt templates and load from external JSON to ease maintenance.
21. **Current Limitations and Recommendations:**
    
    - LangChain’s multi-message templates can behave inconsistently.
    - Developers might need to manually specify message roles as tuples.
    - Documentation and library are evolving; staying updated is advised.