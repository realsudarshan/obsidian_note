[[Boot disk]]
[[Attached disk]]
[[Ephempheral disk]]

## **Image size vs. Disk size** 🖼️

- The base **OS image** (like Ubuntu 22.04 or Windows Server) itself has a minimum size (e.g., 10 GB).
    
- If you set a **boot disk smaller than the image size**, you’ll get an error.
    
	- Example: Windows Server requires > 50 GB, while Ubuntu is fine with 10 GB. 

Real life example:
- Boot disk: 30 GB (OS + DB software).
    
- Attached disk: 200 GB (to store actual database data).
    
- Local SSD: 50 GB (for caching queries).