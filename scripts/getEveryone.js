/** @param {NS} ns **/
export async function main(ns) {
    const maxRam = 1048576; // Maximum RAM you can purchase (1PB)
    const serverNames = ["PBweak1", "PBgrow1", "PBhack1", "PBhack2", "PBgrow2", "PBweak2"]; // List of server names
    let playerMoney = ns.getServerMoneyAvailable("home");

    for (let i = 0; i < serverNames.length; i++) {
        let cost = ns.getPurchasedServerCost(maxRam);
        if (playerMoney >= cost) {
            // Purchase the server
            let hostname = ns.purchaseServer(serverNames[i], maxRam);
            if (hostname) {
                ns.tprint(`Purchased server '${hostname}' with ${maxRam}GB RAM for $${cost}`);
            } else {
                ns.tprint(`Failed to purchase server '${serverNames[i]}' with ${maxRam}GB RAM`);
            }
        } else {
            ns.tprint("Not enough money to purchase a server.");
            break;
        }
        playerMoney = ns.getServerMoneyAvailable("home"); // Update the player's money after each purchase
    }

    ns.tprint("Purchased 6 servers, terminating script.");
    ns.exit(); // Exit the script after the loop
}
