/** @param {NS} ns **/
export async function main(ns) {
    const targets = ["lexo-corp", "global-pharm", "zb-institute", "snap-fitness", "zb-def", "solaris", "unitalife", "applied-energetics", "zeus-med", "nova-med", "univ-energy", "titan-labs", "microdyne", "galactic-cyber", "defcomm", "aerocorp", "icarus", "infocomm", "vitalife", "deltaone", "helios", "omnia", "stormtech", "omnitek", "taiyang-digital", "blade"];
    const securityThreshold = 5;
    const moneyThreshold = 0.55;

    while (true) {
        for (const targetServer of targets) {
            const securityLevel = ns.getServerSecurityLevel(targetServer);
            const minSecurityLevel = ns.getServerMinSecurityLevel(targetServer);
            const availableMoney = ns.getServerMoneyAvailable(targetServer);
            const maxMoney = ns.getServerMaxMoney(targetServer);

            if (securityLevel > minSecurityLevel + securityThreshold) {
                ns.print(`Weakening ${targetServer}`);
                await ns.exec("weaken.js", "PBweak1", 1, targetServer);
            } else if (availableMoney < maxMoney * moneyThreshold) {
                ns.print(`Growing ${targetServer}`);
                await ns.exec("grow.js", "PBgrow1", 1, targetServer);
            } else {
                ns.print(`Hacking ${targetServer}`);
                await ns.exec("hack.js", "PBhack1", 1, targetServer);
            }
        }
        await ns.sleep(100); // Short delay to avoid hogging CPU
    }
}
