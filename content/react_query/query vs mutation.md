---
title: Query vs Mutation
---

# Query vs Mutation

In tools like React Query, Apollo, and GraphQL, data operations are generally split into two categories:

- **Query**: Used for fetching or reading data from the server. Queries are generally idempotent (they don't change the server state). Examples include `GET` requests, fetching a list of users, etc. In React Query, you handle this with the `useQuery` hook.
- **Mutation**: Used for modifying data on the server (creating, updating, or deleting). Examples include `POST`, `PUT`, `PATCH`, and `DELETE` requests. In React Query, you handle this with the `useMutation` hook.
