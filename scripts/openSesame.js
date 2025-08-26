/** @param {NS} ns **/
export async function main(ns) {
    const target = ns.args[0]; // Get the target server from script arguments

    if (!target) {
        ns.tprint("Please specify a target server.");
        return;
    }

    ns.tprint(`Attempting to gain root access on ${target}...`);

    // Array of port-opening programs and their functions
    const portPrograms = [
        { name: "BruteSSH.exe", func: ns.brutessh },
        { name: "FTPCrack.exe", func: ns.ftpcrack },
        { name: "relaySMTP.exe", func: ns.relaysmtp },
        { name: "HTTPWorm.exe", func: ns.httpworm },
        { name: "SQLInject.exe", func: ns.sqlinject}
    ];

    // Open ports using available programs
    for (const program of portPrograms) {
        if (ns.fileExists(program.name, "home")) {
            ns.tprint(`Running ${program.name} on ${target}...`);
            program.func(target);
        }
    }

    // Attempt to run NUKE after opening ports
    if (ns.fileExists("NUKE.exe", "home")) {
        ns.tprint(`Attempting to run NUKE on ${target}...`);
        ns.nuke(target);

        if (ns.hasRootAccess(target)) {
            ns.tprint(`NUKE has been activated on ${target} after opening ports!`);
            ns.tprint(`Please manually connect to ${target} and install the backdoor by running 'backdoor'.`);
        } else {
            ns.tprint(`Failed to activate NUKE on ${target}. Not enough ports are open.`);
        }
    } else {
        ns.tprint(`NUKE.exe not found on home server!`);
    }

    /*
    // Backdoor installation script (commented out)
    ns.tprint(`Installing backdoor on ${target}...`);
    ns.connect(target);
    await ns.installBackdoor();
    ns.tprint(`Backdoor installed on ${target}!`);
    */
}
