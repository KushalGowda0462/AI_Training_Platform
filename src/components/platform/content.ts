/**
 * ─────────────────────────────────────────────────────────────────────────
 * PLATFORM SECTION CONTENT
 *
 * Everything the Experience tiles show lives here, so the engineering team
 * can drop real content in without touching any layout code.
 *
 * What engineering needs to supply:
 *   1. QUIZZES        — 5 quizzes. The tile rotates Quiz 1 → 2 → 3 → 4 → 5
 *                       → back to 1 on each click. Any number of questions
 *                       per quiz works; 5 each is what is here now.
 *   2. SLIDE_DECK     — the interactive slide content.
 *   3. BOARD_STEPS    — the live whiteboarding sequence, one caption per step.
 *   4. CASE_STAGES    — the case study walkthrough.
 *   5. VIDEO_SOURCES  — the three 1 minute clips. Drop the files in /public
 *                       and point each entry at them.
 *
 * The content below is interim material written to keep every tile working.
 * Replace it in place; the components read whatever is exported here.
 * ─────────────────────────────────────────────────────────────────────────
 */

export type QuizQuestion = {
    q: string;
    options: string[];
    /** index into options */
    answer: number;
    /** shown by the instructor agent after the learner answers */
    why: string;
};

export type Quiz = {
    title: string;
    questions: QuizQuestion[];
};

/** ── 1. The five rotating quizzes ───────────────────────────────────── */
export const QUIZZES: Quiz[] = [
    {
        title: "Kubernetes Administration",
        questions: [
            {
                q: "Which control plane component stores all Kubernetes cluster state?",
                options: ["kubelet", "etcd", "kube-proxy", "containerd"],
                answer: 1,
                why: "etcd is the consistent key-value store holding the entire cluster state. The API server is the only component that talks to it directly.",
            },
            {
                q: "What does a Service of type ClusterIP give you?",
                options: [
                    "A public IP reachable from the internet",
                    "A stable internal IP reachable only inside the cluster",
                    "A port opened on every node",
                    "A DNS record with no load balancing",
                ],
                answer: 1,
                why: "ClusterIP is the default type. NodePort and LoadBalancer are the types that expose traffic outside the cluster.",
            },
            {
                q: "A pod is stuck in CrashLoopBackOff. What is happening?",
                options: [
                    "The image cannot be pulled from the registry",
                    "The scheduler cannot find a node with enough resources",
                    "The container starts, exits with an error, and is restarted with growing delays",
                    "The pod is waiting on a PersistentVolume to bind",
                ],
                answer: 2,
                why: "The container is starting and exiting repeatedly, and the kubelet waits a little longer before each restart. Check the previous run's logs with --previous.",
            },
            {
                q: "Which command shows recent events and the current state of one pod?",
                options: [
                    "kubectl get pods -o wide",
                    "kubectl describe pod <name>",
                    "kubectl top pod <name>",
                    "kubectl config view",
                ],
                answer: 1,
                why: "describe prints the spec, the conditions and the recent events attached to the pod — the fastest first look when something will not start.",
            },
            {
                q: "What is a readiness probe for?",
                options: [
                    "Restarting a container that has hung",
                    "Telling the kubelet when a container may start receiving traffic",
                    "Delaying the first start of a container",
                    "Checking that the node itself is healthy",
                ],
                answer: 1,
                why: "Readiness controls whether the pod is in the Service endpoints. Liveness is the probe that restarts a hung container.",
            },
        ],
    },
    {
        title: "Enterprise Networking",
        questions: [
            {
                q: "At which OSI layer does a traditional switch forward traffic?",
                options: ["Layer 1", "Layer 2", "Layer 3", "Layer 4"],
                answer: 1,
                why: "A switch forwards on MAC addresses, which is Layer 2. A router works on IP addresses at Layer 3.",
            },
            {
                q: "What does putting ports into separate VLANs achieve?",
                options: [
                    "It encrypts traffic between those ports",
                    "It splits one physical switch into separate broadcast domains",
                    "It increases the link speed of those ports",
                    "It assigns static IP addresses automatically",
                ],
                answer: 1,
                why: "A VLAN logically separates broadcast domains on shared hardware. Traffic between VLANs has to be routed.",
            },
            {
                q: "Which protocol maps an IP address to a MAC address on a local network?",
                options: ["DNS", "ARP", "DHCP", "ICMP"],
                answer: 1,
                why: "ARP resolves a known IP to the MAC address needed to frame the packet on the local segment.",
            },
            {
                q: "What problem does Spanning Tree Protocol solve?",
                options: [
                    "Slow DNS resolution",
                    "Loops in a switched Layer 2 topology",
                    "IP address exhaustion",
                    "Unencrypted management traffic",
                ],
                answer: 1,
                why: "Redundant links create loops that would broadcast-storm the network. STP blocks ports to leave one active path.",
            },
            {
                q: "What is the default administrative distance of OSPF on Cisco devices?",
                options: ["90", "110", "120", "170"],
                answer: 1,
                why: "OSPF defaults to 110. Internal EIGRP is 90 and RIP is 120, so EIGRP wins over OSPF when both offer the same route.",
            },
        ],
    },
    {
        title: "Storage and Data Management",
        questions: [
            {
                q: "Which RAID level mirrors data across drives with no striping?",
                options: ["RAID 0", "RAID 1", "RAID 5", "RAID 6"],
                answer: 1,
                why: "RAID 1 writes the same data to both drives. RAID 0 stripes with no redundancy, and 5 and 6 use parity.",
            },
            {
                q: "What does thin provisioning do?",
                options: [
                    "Reserves the full volume capacity up front",
                    "Allocates physical capacity only as data is actually written",
                    "Compresses every block before writing it",
                    "Splits a volume across two arrays",
                ],
                answer: 1,
                why: "Thin provisioning presents the full logical size but consumes physical capacity on demand, which is why monitoring real usage matters.",
            },
            {
                q: "What does a storage snapshot normally capture?",
                options: [
                    "A full byte-for-byte copy of the volume",
                    "A point-in-time view, typically using pointers rather than copying data",
                    "Only the files changed in the last hour",
                    "The volume configuration but not its data",
                ],
                answer: 1,
                why: "Most snapshots are pointer based, so they are near instant and cheap until the original blocks start changing.",
            },
            {
                q: "Which of these presents file-level rather than block-level storage?",
                options: ["iSCSI", "NFS", "Fibre Channel", "NVMe over Fabrics"],
                answer: 1,
                why: "NFS serves files and handles the filesystem itself. The others present raw blocks that the host formats.",
            },
            {
                q: "What is deduplication designed to reduce?",
                options: [
                    "Network latency between sites",
                    "Stored capacity consumed by repeated identical blocks",
                    "The number of drives in an aggregate",
                    "CPU load on the storage controller",
                ],
                answer: 1,
                why: "Deduplication stores one copy of a repeated block and references it, which reclaims capacity but does cost controller CPU.",
            },
        ],
    },
    {
        title: "Cloud Foundations",
        questions: [
            {
                q: "Under the shared responsibility model, who secures the physical data centre?",
                options: [
                    "The customer",
                    "The cloud provider",
                    "It is split evenly",
                    "Whichever party holds the compliance certificate",
                ],
                answer: 1,
                why: "The provider owns security of the cloud — facilities and hardware. The customer owns security in the cloud: data, access and configuration.",
            },
            {
                q: "What is an availability zone?",
                options: [
                    "A billing boundary within an account",
                    "An isolated location within a region, with its own power and cooling",
                    "A globally distributed cache",
                    "A network access control list",
                ],
                answer: 1,
                why: "Spreading workloads across zones is what protects you from a single facility failing, while staying close enough for low latency.",
            },
            {
                q: "Which model leaves you responsible for patching the guest operating system?",
                options: ["SaaS", "PaaS", "IaaS", "None of them"],
                answer: 2,
                why: "With IaaS you get the virtual machine, and everything above the hypervisor is yours — including OS patching.",
            },
            {
                q: "What is object storage best suited to?",
                options: [
                    "Low latency transactional databases",
                    "Large volumes of unstructured data accessed over HTTP",
                    "Shared home directories needing file locking",
                    "Boot volumes for virtual machines",
                ],
                answer: 1,
                why: "Object storage scales enormously and is accessed by API, which suits media, backups and logs rather than transactional workloads.",
            },
            {
                q: "What is auto scaling primarily for?",
                options: [
                    "Reducing the blast radius of a security incident",
                    "Matching running capacity to actual demand",
                    "Encrypting data in transit",
                    "Replicating data between regions",
                ],
                answer: 1,
                why: "Auto scaling adds and removes instances as load changes, so you neither pay for idle capacity nor fall over at peak.",
            },
        ],
    },
    {
        title: "Security Operations",
        questions: [
            {
                q: "What does the principle of least privilege require?",
                options: [
                    "Every user gets administrator rights for speed",
                    "Each identity gets only the access its task requires",
                    "All access is granted for a fixed 30 days",
                    "Access is decided by job title alone",
                ],
                answer: 1,
                why: "Least privilege limits what a compromised account can reach, which is what contains an incident rather than preventing it.",
            },
            {
                q: "What makes authentication multi-factor?",
                options: [
                    "Two passwords of different lengths",
                    "Two or more independent factor types, such as something you know and something you have",
                    "A password changed every 30 days",
                    "A password plus a security question",
                ],
                answer: 1,
                why: "The factors must be independent kinds. A password plus a security question is still just two things you know.",
            },
            {
                q: "What is a SIEM chiefly used for?",
                options: [
                    "Encrypting data at rest",
                    "Aggregating and correlating logs so activity can be detected and investigated",
                    "Blocking traffic at the network perimeter",
                    "Managing software licences",
                ],
                answer: 1,
                why: "A SIEM pulls together events from many systems so patterns become visible that no single log would reveal.",
            },
            {
                q: "Encryption at rest protects data primarily against what?",
                options: [
                    "An attacker intercepting traffic between two services",
                    "Someone obtaining the stored media or underlying storage",
                    "A user choosing a weak password",
                    "A denial of service attack",
                ],
                answer: 1,
                why: "At rest covers the stored copy. Traffic between services is protected by encryption in transit instead.",
            },
            {
                q: "Phishing attacks primarily target which weakness?",
                options: [
                    "Unpatched operating systems",
                    "People and their trust decisions",
                    "Weak cipher suites",
                    "Misconfigured firewalls",
                ],
                answer: 1,
                why: "Phishing bypasses technical controls by persuading a person to act, which is why awareness training sits alongside the tooling.",
            },
        ],
    },
];

/** ── 2. Interactive slides ──────────────────────────────────────────── */
export const SLIDE_DECK = [
    {
        title: "How a request reaches your pod",
        body: "Traffic does not go straight to a container. It passes through three hops, each of which can be the thing that is broken.",
        hotspots: [
            { label: "Ingress", detail: "Terminates TLS and matches the host and path, then forwards to a Service." },
            { label: "Service", detail: "Holds a stable virtual IP and load balances across whichever pods are currently ready." },
            { label: "Pod", detail: "Your container. If its readiness probe fails it is quietly removed from the Service." },
        ],
    },
    {
        title: "Where deployments usually go wrong",
        body: "Click each item to see what the symptom looks like in practice.",
        hotspots: [
            { label: "Image pull", detail: "ErrImagePull or ImagePullBackOff — wrong tag, private registry, or a missing pull secret." },
            { label: "Resources", detail: "The pod stays Pending because no node has enough CPU or memory left to fit the request." },
            { label: "Probes", detail: "The pod runs but never goes Ready, so the Service has no endpoints and traffic 503s." },
        ],
    },
    {
        title: "Rolling updates in one picture",
        body: "A rolling update replaces pods gradually. maxUnavailable and maxSurge decide how gradually.",
        hotspots: [
            { label: "maxSurge", detail: "How many extra pods may exist above the desired count during the rollout." },
            { label: "maxUnavailable", detail: "How many pods may be missing at once. Set it to 0 for a zero-downtime rollout." },
            { label: "Rollback", detail: "kubectl rollout undo returns to the previous ReplicaSet if the new pods never become ready." },
        ],
    },
];

/** ── 3. Live whiteboarding sequence ─────────────────────────────────── */
export const BOARD_STEPS = [
    { caption: "Let us draw the request path. Start with the user." },
    { caption: "Traffic hits the Ingress first — TLS ends here." },
    { caption: "The Ingress forwards to a Service on its virtual IP." },
    { caption: "The Service load balances across the ready pods." },
    { caption: "If a pod fails its readiness probe it drops out of the set." },
];

/** ── 4. Case study walkthrough ──────────────────────────────────────── */
export const CASE_STAGES = [
    {
        heading: "The situation",
        body: "A retailer rolls out a new version of its checkout service at 09:40 on a Friday. The rollout reports success. Within four minutes the support queue fills with customers seeing errors at payment.",
    },
    {
        heading: "What you can see",
        body: "All pods show Running. CPU and memory look normal. The Service has endpoints. The only odd signal is that the error rate climbed the moment the new ReplicaSet scaled up.",
    },
    {
        heading: "The question put to you",
        body: "Everything reports healthy and yet customers are failing at payment. Where do you look next, and why would a passing health check still let broken traffic through?",
    },
    {
        heading: "How the agent works it through with you",
        body: "A liveness probe only proves the process is alive. This deployment had no readiness probe, so pods joined the Service before the payment provider connection pool had warmed. Traffic arrived a few seconds too early and failed. The fix is a readiness probe on a real dependency check plus maxUnavailable set to 0.",
    },
    {
        heading: "What you take away",
        body: "Healthy is not the same as ready. You will be asked to apply the same reasoning to a different service in the next lab, and the agent will not give you the answer until you have tried.",
    },
];

/** ── 5. The three 1 minute clips ────────────────────────────────────────
 *
 * INTERIM: all three point at the existing demo video so the players work
 * today. Drop the real clips into /public and change the three paths below —
 * nothing else needs to change. Spaces in filenames must be written as %20.
 */
export const VIDEO_SOURCES = {
    labmentorship: "/Demo%20Video.mp4",
    interactive: "/Demo%20Video.mp4",
    contentgen: "/Demo%20Video.mp4",
} as const;

export const VIDEO_CAPTIONS = {
    labmentorship:
        "A lab exercise with the lab agent assisting, including the agent answering a learner question mid-task.",
    interactive:
        "The instructor delivering training while the student asks three questions in a row, each one followed up.",
    contentgen:
        "How content generation works, what it produces, and how long it takes end to end.",
} as const;
