# Server Access & Backdoors

This section covers how to gain root access on servers and manually backdoor them.  
It includes two helper scripts: `openSesame.js` for port opening and nuking, and `tree.js` for scanning the network.  

---

## Script: `openSesame.js`
**Purpose:** Opens all available ports on a target and runs `NUKE.exe`.  
This is used before manually connecting and backdooring servers.  

## Usage:
```javascript
run openSesame.js [target]
```

## Example:
```javascript
run openSesame.js n00dles
```
## Script: tree.js

**Purpose:** Scans the entire network and lists servers you do not yet have root access to, showing their requirements and parent connections.

Usage:
```javascript
run tree.js
```
### Example Output
```
Server: n00dles
  - Connected to: home
  - Required hacking skill: 1
  - Number of open ports required: 0
  - Has root access: false
```
## Workflow

Run tree.js to identify unrooted servers and their requirements.

Use openSesame.js on eligible servers to open ports and nuke them.
```javascript
run openSesame.js [target]
```

After rooting, manually connect and backdoor each key server:
```javascript
connect [target]
backdoor
home
```
## Key Backdoor Targets

- CSEC
- avmnite-02h
- I.I.I.I
- run4theh111z
- w0r1d_d43m0n (final)

## Notes

Always run openSesame.js before attempting a backdoor.

Use tree.js to plan your progression and prioritize which Dark Web programs to buy next.

Backdooring is required to unlock factions and advance the storyline.

## TODO

Add a table of servers ≤200 with port requirements.

Document connection paths for key backdoor servers.