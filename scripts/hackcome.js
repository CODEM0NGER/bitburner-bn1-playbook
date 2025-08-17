/** @param {NS} ns **/
export async function main(ns) {
    ns.disableLog("ALL");

    const moneyReserve = 1_000; // Keep this much money for yourself
    const upgradeLimit = Infinity;    // Max level / RAM / cores early game

    while (true) {
        let playerMoney = ns.getServerMoneyAvailable("home") - moneyReserve;

        // Try to buy a new node if possible
        if (ns.hacknet.numNodes() < 15) { // Adjust for your early game limit
            const cost = ns.hacknet.getPurchaseNodeCost();
            if (playerMoney > cost) {
                ns.hacknet.purchaseNode();
                ns.print(`Bought new Hacknet Node!`);
            }
        }

        // Upgrade each node as efficiently as possible
        for (let i = 0; i < ns.hacknet.numNodes(); i++) {
            let node = ns.hacknet.getNodeStats(i);

            // Upgrade Level
            if (node.level < upgradeLimit) {
                let cost = ns.hacknet.getLevelUpgradeCost(i, 1);
                if (playerMoney > cost) {
                    ns.hacknet.upgradeLevel(i, 1);
                    playerMoney -= cost;
                }
            }

            // Upgrade RAM
            if (node.ram < upgradeLimit) {
                let cost = ns.hacknet.getRamUpgradeCost(i, 1);
                if (playerMoney > cost) {
                    ns.hacknet.upgradeRam(i, 1);
                    playerMoney -= cost;
                }
            }

            // Upgrade Cores
            if (node.cores < upgradeLimit) {
                let cost = ns.hacknet.getCoreUpgradeCost(i, 1);
                if (playerMoney > cost) {
                    ns.hacknet.upgradeCore(i, 1);
                    playerMoney -= cost;
                }
            }
        }

        await ns.sleep(2000); // Check every 2 seconds
    }
}
