# Server Access & Backdoors

**Script:** `openSesame.js`  
**Purpose:** Opens all available ports on a target and runs `NUKE.exe`.  
Used before manually connecting and backdooring servers.  

---

## Workflow
1. Run the script:
   ```javascript
   run openSesame.js [target]

Example: 

run openSesame.js n00dles

After rooting, manually connect and backdoor:

connect [target] backdoor home
