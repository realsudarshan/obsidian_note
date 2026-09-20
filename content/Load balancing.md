# Load Balancing: The Complete Guide

## What is Load Balancing?

Load balancing is the process of distributing network traffic across multiple servers to ensure no single server bears too much load. Think of it like a traffic cop directing cars to different lanes to prevent congestion.

**Why Load Balancing?**

- **High Availability**: If one server fails, traffic routes to healthy servers
- **Scalability**: Handle more users by adding more servers
- **Performance**: Faster response times by distributing workload
- **Reliability**: Prevents server overload and crashes

---

## Load Balancing Algorithms

### 1. **Round Robin** (Most Common)

Requests are distributed sequentially across all servers in rotation.

```
Request 1 → Server A
Request 2 → Server B
Request 3 → Server C
Request 4 → Server A (cycle repeats)
```

**Pros**: Simple, fair distribution  
**Cons**: Doesn't consider server load or capacity  
**Best for**: Servers with similar capacity

### 2. **Weighted Round Robin**

Similar to Round Robin, but servers with higher capacity receive more requests.

```
Server A (weight: 3) gets 3 requests
Server B (weight: 2) gets 2 requests
Server C (weight: 1) gets 1 request
```

**Pros**: Accounts for different server capacities  
**Cons**: Static weights don't adapt to real-time load  
**Best for**: Heterogeneous server environments

### 3. **Least Connections**

Routes traffic to the server with the fewest active connections.

```
Server A: 10 connections
Server B: 5 connections  ← New request goes here
Server C: 8 connections
```

**Pros**: Better for varying request processing times  
**Cons**: Requires tracking connection state  
**Best for**: Applications with long-lived connections

### 4. **Weighted Least Connections**

Combines Least Connections with server capacity weights.

**Pros**: Dynamic and capacity-aware  
**Cons**: More complex to implement  
**Best for**: Mixed workloads with varying server specs

### 5. **IP Hash (Source IP Hash)**

Uses client IP address to determine which server receives the request.

```
hash(Client_IP) % number_of_servers = Server
```

**Pros**: Same client always goes to same server (session persistence)  
**Cons**: Uneven distribution if clients are behind NAT  
**Best for**: Applications requiring session affinity

### 6. **Least Response Time**

Routes to the server with the fastest response time and fewest connections.

**Pros**: Optimizes for performance  
**Cons**: Requires constant health monitoring  
**Best for**: Performance-critical applications

### 7. **Random**

Selects a random server for each request.

**Pros**: Simple, stateless  
**Cons**: Can create uneven distribution  
**Best for**: Simple scenarios with uniform servers

---

## Types of Load Balancers

### By Network Layer

#### **Layer 4 (Transport Layer) - TCP/UDP**

- Operates at the transport layer
- Makes decisions based on IP address and TCP/UDP port
- Fast and efficient (no content inspection)
- Cannot make decisions based on HTTP headers or content

```
Client → [L4 Load Balancer] → Server
         (Looks at: IP, Port)
```

**Examples**: HAProxy (L4 mode), AWS NLB, NGINX (stream mode)

#### **Layer 7 (Application Layer) - HTTP/HTTPS**

- Operates at the application layer
- Makes decisions based on HTTP headers, cookies, URL paths
- Can route based on content (path-based, host-based routing)
- Slower but more intelligent

```
Client → [L7 Load Balancer] → Server
         (Looks at: URL, headers, cookies, content)
```

**Examples**: HAProxy (HTTP mode), NGINX, AWS ALB, Traefik

**Comparison**:

| Feature         | Layer 4        | Layer 7          |
| --------------- | -------------- | ---------------- |
| Speed           | Faster         | Slower           |
| Intelligence    | Basic          | Advanced         |
| SSL Termination | Limited        | Yes              |
| Content Routing | No             | Yes              |
| Use Case        | Simple TCP/UDP | Web applications |

---

## Load Balancer Deployment Patterns

### 1. **Hardware Load Balancers**

Physical devices (F5, Citrix NetScaler)

- **Pros**: High performance, dedicated
- **Cons**: Expensive, inflexible

### 2. **Software Load Balancers**

Software running on standard servers (NGINX, HAProxy)

- **Pros**: Flexible, cost-effective
- **Cons**: Requires management

### 3. **Cloud Load Balancers**

Managed services (AWS ELB, Google Cloud Load Balancing, Azure Load Balancer)

- **Pros**: Fully managed, scalable
- **Cons**: Cloud vendor lock-in

### 4. **DNS Load Balancing**

Uses DNS to distribute traffic across servers

- **Pros**: Geographic distribution, simple
- **Cons**: No health checks, DNS caching issues

---

## Advanced Load Balancing Concepts

### **Session Persistence (Sticky Sessions)**

Ensures a user's requests always go to the same server.

**Methods**:

- **Cookie-based**: Load balancer sets a cookie identifying the server
- **IP-based**: Uses client IP for routing
- **Session ID**: Application-level session tracking

**Use Cases**: Shopping carts, user sessions without shared storage

### **Health Checks**

Load balancers periodically check if servers are healthy.

**Types**:

- **Active**: Load balancer sends requests (HTTP GET, TCP connection)
- **Passive**: Monitors actual traffic for errors

```yaml
Health Check Example:
- Protocol: HTTP
- Path: /health
- Interval: 10 seconds
- Timeout: 5 seconds
- Healthy threshold: 2 consecutive successes
- Unhealthy threshold: 3 consecutive failures
```

### **SSL/TLS Termination**

Load balancer handles SSL decryption, forwarding plain HTTP to backend servers.

**Benefits**:

- Reduces CPU load on backend servers
- Centralized certificate management
- Easier security updates

### **Connection Draining (Graceful Shutdown)**

When removing a server, load balancer stops sending new requests but allows existing connections to complete.

### **Rate Limiting**

Limits the number of requests from a client in a time period.

**Benefits**: Prevents DDoS, API abuse, ensures fair usage

---

## Load Balancing in Different Contexts

### **In Kubernetes**

- **Service Types**: ClusterIP, NodePort, LoadBalancer
- **Ingress Controllers**: NGINX, Traefik, Istio
- **Service Mesh**: Envoy, Linkerd (L7 load balancing between microservices)

### **In Microservices**

- **Client-side Load Balancing**: Service discovery + client-side LB (Ribbon, Spring Cloud LoadBalancer)
- **Server-side Load Balancing**: API Gateway or Service Mesh
- **Service Mesh**: Istio, Linkerd for intelligent traffic management

### **Global Load Balancing (GSLB)**

Distributes traffic across data centers/regions.

- **DNS-based**: Route53, Cloudflare
- **Anycast**: Same IP advertised from multiple locations
- **GeoDNS**: Routes based on user location

---

## Common Load Balancing Tools

| Tool                | Type      | Layer | Best For                             |
| ------------------- | --------- | ----- | ------------------------------------ |
| **NGINX**           | Software  | L4/L7 | Web applications, reverse proxy      |
| **HAProxy**         | Software  | L4/L7 | High performance, TCP/HTTP           |
| **Traefik**         | Software  | L7    | Microservices, Kubernetes            |
| **Envoy**           | Software  | L7    | Service mesh, modern apps            |
| **AWS ELB/ALB/NLB** | Cloud     | L4/L7 | AWS workloads                        |
| **F5 BIG-IP**       | Hardware  | L4/L7 | Enterprise, high volume              |
| **Cloudflare**      | CDN/Cloud | L7    | Global distribution, DDoS protection |

---

## Load Balancing Metrics

**Key Metrics to Monitor**:

- **Request Rate**: Requests per second
- **Response Time**: Average/P95/P99 latency
- **Error Rate**: 4xx/5xx errors
- **Connection Count**: Active connections per server
- **Server Health**: Up/down status
- **Throughput**: Data transfer rate

---

## Real-World Example Architecture

```
                    Internet
                       |
                [Global DNS LB]
                    /     \
                   /       \
        [Region 1 LB]    [Region 2 LB]
            /    \           /    \
    [L7 LB]  [L7 LB]   [L7 LB]  [L7 LB]
       |         |         |         |
   [Servers] [Servers] [Servers] [Servers]
```

**Traffic Flow**:

1. User request → DNS returns nearest region IP
2. Regional load balancer → Application load balancer
3. L7 load balancer routes based on URL path
4. Request reaches backend server

---

## Practical Decision Guide

**Choose Layer 4 if**:

- Need maximum performance
- Simple TCP/UDP traffic
- No content-based routing needed

**Choose Layer 7 if**:

- Need content-based routing
- Want SSL termination
- Require advanced features (rate limiting, authentication)

**Algorithm Selection**:

- **Similar servers, simple**: Round Robin
- **Different capacities**: Weighted Round Robin
- **Long connections**: Least Connections
- **Session persistence needed**: IP Hash or Sticky Sessions
- **Performance critical**: Least Response Time

---

## Best Practices

1. **Always use health checks** - Don't send traffic to dead servers
2. **Enable connection draining** - Graceful deployments
3. **Monitor metrics** - Response times, error rates, server health
4. **Use SSL termination** - Offload crypto from backend servers
5. **Implement rate limiting** - Protect against abuse
6. **Plan for failure** - Load balancer itself should be redundant
7. **Test failover scenarios** - Regularly verify HA works
8. **Right-size backends** - Load balancer can't fix undersized infrastructure

---

## Common Pitfalls

❌ **Single point of failure** - Load balancer itself needs redundancy  
❌ **No health checks** - Traffic to dead servers  
❌ **Wrong algorithm** - IP Hash with NAT causes hotspots  
❌ **Sticky sessions everywhere** - Limits scalability  
❌ **Ignoring connection limits** - Servers can be overwhelmed  
❌ **No monitoring** - Can't detect issues

---

## Summary

Load balancing is essential for building scalable, highly available systems. The key is choosing the right algorithm, layer, and deployment pattern for your specific needs. Start simple (Round Robin, L7 HTTP load balancing), monitor everything, and add complexity only when needed.

**Quick Reference**:

- **High traffic web app**: L7 load balancer with Least Connections
- **Database connections**: L4 with IP Hash for session affinity
- **Microservices**: Service mesh (Envoy/Istio) for L7 routing
- **Global app**: GeoDNS + Regional load balancers
- **Static content**: CDN with load balancing

Main loadbalancing software is [[nginx]]