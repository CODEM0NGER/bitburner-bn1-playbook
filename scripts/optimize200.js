/** @param {NS} ns **/
export async function main(ns) {
    const targets = ["n00dles", "foodnstuff","sigma-cosmetics", "joesguns", "hong-fang-tea", /*"iron-gym", */"max-hardware", "harakiri-sushi", "zer0", "nectar-net", "neo-net", /*"phantasy", "silver-helix", "omega-net"*/];
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
                await ns.exec("weaken.js", "home", 1, targetServer);
            } else if (availableMoney < maxMoney * moneyThreshold) {
                ns.print(`Growing ${targetServer}`);
                await ns.exec("grow.js", "home", 1, targetServer);
            } else {
                ns.print(`Hacking ${targetServer}`);
                await ns.exec("/hack.js", "home", 1, targetServer);
            }
        }
        await ns.sleep(100); // Short delay to avoid hogging CPU
    }
}
