/** @param {NS} ns **/
export async function main(ns) {
    let allServers = [];
    let serverConnections = {};

    async function scanServer(server) {
        let connectedServers = ns.scan(server);
        for (let connectedServer of connectedServers) {
            if (!allServers.includes(connectedServer)) {
                allServers.push(connectedServer);
                serverConnections[connectedServer] = server;
                await scanServer(connectedServer);
            }
        }
    }

    await scanServer("home");

    let serversNoRoot = [];

    for (let server of allServers) {
        let serverInfo = ns.getServer(server);
        if (!serverInfo.hasAdminRights) {
            serversNoRoot.push({
                name: server,
                parent: serverConnections[server],
                requiredHackingSkill: serverInfo.requiredHackingSkill,
                numOpenPortsRequired: serverInfo.numOpenPortsRequired
            });
        }
    }

    // Sort by required hacking skill
    serversNoRoot.sort((a, b) => b.requiredHackingSkill - a.requiredHackingSkill);

    // Display
    for (let s of serversNoRoot) {
        ns.tprint(`Server: ${s.name}`);
        ns.tprint(`  - Connected to: ${s.parent}`);
        ns.tprint(`  - Required hacking skill: ${s.requiredHackingSkill}`);
        ns.tprint(`  - Number of open ports required: ${s.numOpenPortsRequired}`);
        ns.tprint(`  - Has root access: false`);
    }
}