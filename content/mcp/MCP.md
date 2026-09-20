Standardalize communication of how application provide context to LLM/modal.
**connect AI modal to tools and sources.**
Build agents and workflow on top of LLM
MCP provides:
pre-built integration my LLM can be directly integrated
Flexibility to switch LLM and vendors
securing your data inside your infrastructure


[[MCP host]]
[[MCP client]]
[[MCP server]]
[[Local Data sources]]
[[Remote Services]]
MCP server provide three capability:
Resources:File-like data that can be read by clients (like API responses or file contents)
Tools:Functions that can be called by the LLM (with user approval)
Prompt:: Pre-written templates that help users accomplish specific tasks

MCP work on stdio .(Simply the terminal where user input and got some output in terminal locally) 
It also work on [[SSE(server sent events)]] for online communication.



