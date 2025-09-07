/** @param {NS} ns **/
export async function main(ns) {
    if (!ns.fileExists("Formulas.exe", "home")) {
        ns.tprint("ERROR: Formulas.exe not found. This script requires it.");
        return;
    }

    const player = ns.getPlayer();
    const targets = [
        "4sigma", "fulcrumtech", "clarkinc", "b-and-a", "powerhouse-fitness",
         "nwo", "blade", "ecorp", "megacorp", "fulcrumassets"
    ];

    while (true) {
        let bestTarget = null;
        let bestValue = 0;

        for (const serverName of targets) {
            const server = ns.getServer(serverName);
            const hackChance = ns.formulas.hacking.hackChance(server, player);
            const hackPercent = ns.formulas.hacking.hackPercent(server, player);
            const hackTime = ns.formulas.hacking.hackTime(server, player);
            const growTime = ns.formulas.hacking.growTime(server, player);
            const weakenTime = ns.formulas.hacking.weakenTime(server, player);

            const money = ns.getServerMoneyAvailable(serverName) || 1;
            const maxMoney = ns.getServerMaxMoney(serverName) || 1;
            const secLevel = ns.getServerSecurityLevel(serverName);
            const minSec = ns.getServerMinSecurityLevel(serverName);

            const growRatio = maxMoney / money;
            const weakenNeed = secLevel - minSec;

            // Simple value metric: prioritize fast, reliable, profitable hacks
            const value = (hackChance * hackPercent * maxMoney) / hackTime;

            if (value > bestValue) {
                bestValue = value;
                bestTarget = {
                    name: serverName,
                    growRatio,
                    weakenNeed,
                    hackChance,
                    hackTime,
                    weakenTime,
                    growTime
                };
            }
        }

        if (bestTarget) {
            const { name, growRatio, weakenNeed } = bestTarget;

            if (weakenNeed > 5) {
                ns.print(`🔻 Weakening ${name}`);
                await ns.exec("weaken.js", "PBweak2", 1, name);
            } else if (growRatio > 1.2) {
                ns.print(`🌱 Growing ${name}`);
                await ns.exec("grow.js", "PBgrow2", 1, name);
            } else {
                ns.print(`💸 Hacking ${name}`);
                await ns.exec("hack.js", "PBhack2", 1, name);
            }
        }

        await ns.sleep(100); // Small delay
    }
}
