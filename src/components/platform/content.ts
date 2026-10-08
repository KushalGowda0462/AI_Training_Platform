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
 *   2. SLIDE_DECK     — the five NVIDIA INFRA simulators shown as slides.
 *   3. BOARD_STEPS    — the live whiteboarding sequence, one caption per step.
 *   4. CASE_STUDIES   — the NVIDIA INFRA case studies and scenarios.
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

/** ── 2. Interactive slides ──────────────────────────────────────────────
 *
 * From the NVIDIA INFRA course: the five experiences recommended for the
 * website, out of 29 across 8 modules. Each one is a working simulator in
 * InteractiveSlides.tsx; the text around it lives here. The order is the
 * order of the deck, so "Why 64 GPUs Don't Give 64x" opens it.
 */
export type SlideKey = "scaling" | "timeslicing" | "bottleneck" | "egress" | "storage";

export type SlideInfo = {
    key: SlideKey;
    title: string;
    /** where it sits in the course */
    where: string;
    /** why it was shortlisted — shown under the simulator */
    why: string;
};

export const SLIDE_DECK: SlideInfo[] = [
    {
        key: "scaling",
        title: "Why 64 GPUs don't give 64x",
        where: "Module 2 · Lesson 5",
        why: "Adding more GPUs does not always mean the same increase in performance.",
    },
    {
        key: "timeslicing",
        title: "GPU time-slicing latency simulator",
        where: "Module 5 · Lesson 2",
        why: "Sharing a GPU can affect application performance.",
    },
    {
        key: "bottleneck",
        title: "Diagnosing GPU bottlenecks",
        where: "Module 2 · Lesson 6",
        why: "Change the key inputs and see where the performance bottleneck moves.",
    },
    {
        key: "egress",
        title: "Data gravity and egress cost",
        where: "Module 8 · Lesson 3",
        why: "Data placement and architecture choices directly raise or cut cost.",
    },
    {
        key: "storage",
        title: "Storage architecture bottlenecks",
        where: "Module 6 · Lesson 1",
        why: "Storage performance can become the bottleneck for GPU workloads.",
    },
];

/** Shown on every slide: what an interactive slide is for. */
export const SLIDE_LOOP = ["Change parameters", "Experiment", "Observe the outcome", "Understand the trade-off"];

/** The full course, for the line under the deck. */
export const SLIDE_COURSE = { experiences: 29, modules: 8 };

/** ── 3. Live whiteboarding sequence ─────────────────────────────────── */
export const BOARD_STEPS = [
    { caption: "Let us draw the request path. Start with the user." },
    { caption: "Traffic hits the Ingress first — TLS ends here." },
    { caption: "The Ingress forwards to a Service on its virtual IP." },
    { caption: "The Service load balances across the ready pods." },
    { caption: "If a pod fails its readiness probe it drops out of the set." },
];

/** ── 4. Case studies ────────────────────────────────────────────────────
 *
 * From the NVIDIA INFRA course: five real-world case studies, each walked
 * through in stages, and four shorter scenarios from the review exercises
 * that set a problem for the learner rather than report an outcome.
 */
export type CasePoint = { lead?: string; text: string };

export type CaseStage = {
    heading: string;
    body?: string;
    points?: CasePoint[];
};

export type CaseStudy = {
    id: string;
    kind: "case" | "scenario";
    /** short label for the picker */
    short: string;
    title: string;
    domain: string;
    stages: CaseStage[];
    tech: string[];
};

export const CASE_STUDIES: CaseStudy[] = [
    {
        id: "1",
        kind: "case",
        short: "HIPAA platform",
        title: "Building a HIPAA-compliant AI training platform",
        domain: "Healthcare AI (HIPAA-regulated)",
        stages: [
            {
                heading: "The challenge",
                body: "A healthcare AI company needs to train models on around 500 TB of CT scans. All of it is protected health information (PHI) and must be processed in the United States only. Under HIPAA any provider handling PHI must sign a Business Associate Agreement (BAA), and the environment needs encryption at rest and in transit, plus audit controls. The public cloud is the quick route to GPUs, but moving the dataset for each training cycle would cost more than $45K in egress.",
            },
            {
                heading: "The infrastructure decision",
                points: [
                    { lead: "Keep PHI on dedicated hardware.", text: "Training runs on an on-premises H100 cluster in a HIPAA-compliant colocation facility." },
                    { lead: "Use the cloud only where it is safe to.", text: "A BAA is signed with one provider, used for de-identified data only." },
                    { lead: "Draw a clear compliance boundary.", text: "Identified patient data stays inside it; only de-identified data leaves." },
                    { lead: "Model cost after the constraints.", text: "The cost comparison is made once compliance has narrowed the options, egress included." },
                ],
            },
            {
                heading: "What engineers learn",
                points: [
                    { text: "Translating HIPAA requirements (BAA, encryption, audit controls) into infrastructure requirements" },
                    { text: "Separating PHI from de-identified data and placing each in the right environment" },
                    { text: "Including data egress in GPU workload placement decisions" },
                    { text: "Comparing on-premises colocation with cloud using a TCO model" },
                    { text: "Designing a hybrid architecture around a compliance boundary" },
                ],
            },
            {
                heading: "Outcome",
                points: [
                    { lead: "75%", text: "lower training cost than the cloud alternative" },
                    { lead: "100%", text: "of the data kept inside the HIPAA boundary" },
                    { lead: "Passed", text: "the annual HIPAA audit" },
                ],
            },
            {
                heading: "Key takeaway",
                body: "For regulated AI workloads, compliance can determine the infrastructure architecture.",
            },
        ],
        tech: ["H100", "HIPAA", "PHI", "BAA", "HIPAA-compliant colocation", "Hybrid cloud", "Data egress", "TCO"],
    },
    {
        id: "2",
        kind: "case",
        short: "Global media demand",
        title: "Scaling AI infrastructure for global media demand",
        domain: "Global media platform, content recommendation",
        stages: [
            {
                heading: "The challenge",
                body: "A global media platform retrains its recommendation models every six hours. Most of the time the load is steady. During major events, such as sports fixtures and release days, demand climbs to around 10 times the average. Sizing on-premises for those peaks would leave most of the cluster idle for the rest of the year; running everything in the cloud on-demand means paying premium rates for the steady baseline too.",
            },
            {
                heading: "The infrastructure decision",
                points: [
                    { lead: "Own the baseline.", text: "An on-premises cluster is sized for the predictable six-hour retraining cycle, so it stays busy." },
                    { lead: "Rent the peaks.", text: "A cloud Spot fleet absorbs the burst capacity needed for major events." },
                    { lead: "Scale on real demand.", text: "Auto-scaling is triggered by queue depth, so cloud capacity is added only when work is waiting." },
                    { lead: "Treat it as one hybrid system.", text: "On-premises and cloud work together in a hybrid burst pattern, not as two platforms." },
                ],
            },
            {
                heading: "What engineers learn",
                points: [
                    { text: "Separating predictable baseline demand from peak demand" },
                    { text: "Capacity planning for an on-premises GPU baseline" },
                    { text: "Using cloud Spot capacity for burst workloads" },
                    { text: "Configuring Kubernetes auto-scaling to burst to Spot instances" },
                    { text: "Comparing a hybrid model against all-cloud on-demand" },
                ],
            },
            {
                heading: "Outcome",
                points: [
                    { lead: "95%", text: "utilisation on the on-premises baseline cluster" },
                    { lead: "Peaks", text: "handled without permanently owned hardware" },
                    { lead: "60%", text: "lower cost than all-cloud on-demand" },
                ],
            },
            {
                heading: "Key takeaway",
                body: "Don't build permanent infrastructure for temporary demand.",
            },
        ],
        tech: ["Hybrid cloud", "On-prem baseline", "Spot instances", "Queue-depth autoscaling", "Kubernetes", "Capacity planning", "Cost optimisation"],
    },
    {
        id: "3",
        kind: "case",
        short: "1,024-GPU foundation model",
        title: "Training a foundation model with 1,024 GPUs",
        domain: "Autonomous vehicle startup",
        stages: [
            {
                heading: "The challenge",
                body: "An autonomous vehicle startup needs to train a foundation model on 1,024 H100 GPUs for six weeks. Buying a cluster that size would mean more than $50M in capital expenditure, for a one-time run with no workload to keep the hardware busy afterwards. The run still needs high-performance networking and protection against interruptions.",
            },
            {
                heading: "The infrastructure decision",
                points: [
                    { lead: "Go cloud-native.", text: "A fleet of AWS p5.48xlarge instances bought on Spot." },
                    { lead: "Use EFA networking.", text: "To support distributed training across the full cluster." },
                    { lead: "Reserve nothing.", text: "The cluster is transient and exists for the six-week run only." },
                    { lead: "Tear it down afterwards.", text: "Checkpointing is built in because Spot capacity can be interrupted." },
                ],
            },
            {
                heading: "What engineers learn",
                points: [
                    { text: "Comparing CapEx and OpEx for a transient workload" },
                    { text: "Evaluating purchase, on-demand, 3-year reserved and Spot for one large run" },
                    { text: "Using Spot with checkpointing every 500 steps for fault tolerance" },
                    { text: "Using EFA networking for large-scale distributed training" },
                    { text: "Using workload duration as a deciding factor in infrastructure choice" },
                ],
            },
            {
                heading: "Outcome",
                points: [
                    { lead: "60%", text: "discount against on-demand pricing by using Spot" },
                    { lead: "Dissolved", text: "the cluster once the run completed" },
                    { lead: "$0", text: "ongoing hardware maintenance or staffing cost" },
                ],
            },
            {
                heading: "Key takeaway",
                body: "The right infrastructure model depends on workload characteristics and duration. For one-time or infrequent large-scale runs, cloud is almost always correct: CapEx for transient capacity is not justified.",
            },
        ],
        tech: ["H100", "AWS p5.48xlarge", "Spot instances", "EFA", "Checkpointing", "CapEx vs OpEx", "Distributed training", "Transient clusters"],
    },
    {
        id: "4",
        kind: "case",
        short: "GDPR residency",
        title: "Designing GDPR-compliant AI infrastructure",
        domain: "EU financial services, AI fraud detection",
        stages: [
            {
                heading: "The challenge",
                body: "An EU financial services firm trains fraud detection models on personal data that GDPR requires to stay within the EU. The firm is headquartered in the US and runs on AWS. Choosing an EU region is only a start: the team must make sure the data cannot be read, decrypted or processed outside the EU, and prove it to an auditor. Fines can reach 4% of global annual turnover.",
            },
            {
                heading: "The infrastructure decision",
                points: [
                    { lead: "EU region for all training.", text: "Workloads run in AWS eu-west-1." },
                    { lead: "Isolation and keys.", text: "AWS-native regional and access controls with dedicated KMS keys." },
                    { lead: "Contractual guarantee.", text: "The Data Processing Agreement includes an EU data residency clause." },
                    { lead: "Enforced across four layers.", text: "Classification at ingest, region-locked storage, OPA Gatekeeper admission control that rejects EU-data pods without an EU node selector, and immutable audit logs." },
                ],
            },
            {
                heading: "What engineers learn",
                points: [
                    { text: "Mapping GDPR requirements to specific technical controls" },
                    { text: "Locking data to a region with bucket policies and KMS key locality" },
                    { text: "Enforcing GPU workload placement with node affinity and OPA Gatekeeper" },
                    { text: "Restricting data paths with Kubernetes network policy" },
                    { text: "Where contractual controls (the DPA) fit alongside technical ones" },
                ],
            },
            {
                heading: "Outcome",
                points: [
                    { lead: "Maintained", text: "GDPR compliance" },
                    { lead: "0", text: "data transfers outside the EU in the annual audit" },
                    { lead: "EU only", text: "every training run" },
                ],
            },
            {
                heading: "Key takeaway",
                body: "Data residency must be enforced throughout the AI infrastructure stack, not simply by selecting an EU cloud region.",
            },
        ],
        tech: ["GDPR", "EU data residency", "AWS eu-west-1", "KMS", "VPC Service Controls", "Node affinity", "Network policy", "OPA Gatekeeper", "Audit logging", "DPA"],
    },
    {
        id: "5",
        kind: "case",
        short: "70B run recovery",
        title: "Recovering a 70B LLM training run after failure",
        domain: "Large language model training",
        stages: [
            {
                heading: "The challenge",
                body: "A team is training a 70B parameter LLM with FSDP (ZeRO-3) across 64 GPUs. At step 8,000 MLflow shows the loss diverging. They need to return to the last good checkpoint at step 7,500 and carry on without restarting. A full checkpoint is about 700 GB (140 GB of BF16 weights plus 560 GB of optimizer state), sharded across 64 ranks. A traditional torch.save gathers it to one rank and stalls every GPU for about 28 seconds.",
            },
            {
                heading: "The infrastructure decision",
                points: [
                    { lead: "Checkpoint in parallel.", text: "torch.distributed.checkpoint has each rank save its own ~10.9 GB shard: 2.2 seconds instead of 28, 12.7x faster." },
                    { lead: "Tier the storage.", text: "Write to NVMe-oF synchronously, upload to S3 (MinIO or StorageGRID) asynchronously, keep the last three locally." },
                    { lead: "Track lineage in MLflow.", text: "Parameters, metrics, git commit and checkpoint URI, referenced rather than uploaded." },
                    { lead: "Recover by lookup, not by search.", text: "Query MLflow for the URI; DCP restores state across all 64 ranks." },
                    { lead: "Choose frequency deliberately.", text: "Every 500 to 2,000 steps. At 500 steps and 2 s a step, a failure costs about 17 minutes." },
                ],
            },
            {
                heading: "What engineers learn",
                points: [
                    { text: "Sizing checkpoints for large models (weights plus optimizer state)" },
                    { text: "Shard-per-rank saving and loading with torch.distributed.checkpoint" },
                    { text: "Balancing checkpoint frequency against recovery cost" },
                    { text: "Tiered checkpoint storage with NVMe-oF and S3" },
                    { text: "Making runs reproducible by logging parameters and git commits" },
                ],
            },
            {
                heading: "Outcome",
                points: [
                    { lead: "~2.2 s", text: "to restore all 64 ranks once MLflow gives the checkpoint URI" },
                    { lead: "Seconds", text: "to resume from the last good checkpoint, not a multi-hour restart" },
                    { lead: "~22 min", text: "of GPU time saved per checkpoint cycle at a 500-step frequency" },
                ],
            },
            {
                heading: "Key takeaway",
                body: "Production AI infrastructure must be designed not only to run workloads, but also to recover them quickly when things go wrong.",
            },
        ],
        tech: ["70B LLM", "FSDP / ZeRO-3", "torch.distributed.checkpoint", "MLflow", "Artifact lineage", "S3 / MinIO / StorageGRID", "NVMe-oF", "Checkpointing"],
    },
    {
        id: "A",
        kind: "scenario",
        short: "GPU bottleneck",
        title: "GPU performance bottleneck",
        domain: "Review exercise",
        stages: [
            {
                heading: "Engineering challenge",
                body: "A 64-GPU training cluster is I/O-bound. GPU utilisation sits at 45% because the DataLoader keeps stalling. The team is choosing between VAST Data (all-NVMe, higher CAPEX), Weka.io (NVMe-oF native, mid CAPEX) and a NAS/NFS system with SSD cache (lower CAPEX).",
            },
            {
                heading: "You must determine",
                body: "How much the idle GPU hours cost each month, and whether that waste justifies the extra CAPEX of faster storage.",
            },
        ],
        tech: ["GPU utilisation", "DataLoader stalls", "I/O-bound training", "NVMe-oF", "Storage TCO"],
    },
    {
        id: "B",
        kind: "scenario",
        short: "256-GPU storage",
        title: "Storage architecture for a 256-GPU AI cluster",
        domain: "Review exercise",
        stages: [
            {
                heading: "Engineering challenge",
                body: "A team is designing storage for a 256-GPU H100 training cluster. Each GPU processes batches at an effective 20 GB/s, so the cluster needs about 5.1 TB/s of aggregate storage bandwidth. A traditional NAS filer delivers 25 GB/s.",
            },
            {
                heading: "You must determine",
                body: "The minimum aggregate bandwidth required, why the NAS filer is inadequate, and the three bottlenecks beyond raw bandwidth that make NAS unsuitable.",
            },
        ],
        tech: ["Aggregate bandwidth", "NAS limitations", "High-performance storage", "H100 clusters"],
    },
    {
        id: "C",
        kind: "scenario",
        short: "$180K/month bill",
        title: "Reducing a $180K/month GPU bill",
        domain: "Review exercise",
        stages: [
            {
                heading: "Engineering challenge",
                body: "An NLP team spends $180K a month on cloud GPU instances, against a quota of 64 H100s, while average GPU utilisation is only 35%.",
            },
            {
                heading: "You must determine",
                points: [
                    { lead: "1.", text: "Diagnose the waste pattern with PromQL queries" },
                    { lead: "2.", text: "Recommend right-sizing" },
                    { lead: "3.", text: "Set the right reservation commitment" },
                    { lead: "4.", text: "Identify which jobs can move to Spot, and at what checkpoint frequency" },
                ],
            },
        ],
        tech: ["FinOps", "PromQL", "GPU utilisation", "Right-sizing", "Reserved instances", "Spot", "Checkpointing"],
    },
    {
        id: "D",
        kind: "scenario",
        short: "800 TB medical AI",
        title: "800 TB medical AI training infrastructure",
        domain: "Review exercise",
        stages: [
            {
                heading: "Engineering challenge",
                body: "A healthcare AI company wants to train a diagnostic imaging model on 800 TB of de-identified X-ray images (no PHI) in AWS S3 us-east-1. Training needs 64 H100 GPUs running continuously for four months, then idle for eight months each year.",
            },
            {
                heading: "You must determine",
                body: "The best deployment model, justified with a TCO comparison of cloud on-demand, a 3-year cloud reservation and buying on-premises hardware.",
            },
        ],
        tech: ["TCO modelling", "CapEx vs OpEx", "Utilisation", "Data gravity", "H100"],
    },
];

/** ── 5. The three 1 minute clips ────────────────────────────────────────
 *
 * The player is built and ready. Each entry is empty until the real clip
 * exists; an empty string makes the tile show the waiting state instead of
 * playing anything. Deliberately NOT pointed at the hero demo video — these
 * tiles must not show a clip that is not theirs.
 *
 * To go live: drop the file into /public and put its path here, e.g.
 *   labmentorship: "/lab-mentorship.mp4",
 * Spaces in a filename must be written as %20. Nothing else changes.
 */
export const VIDEO_SOURCES: Record<"labmentorship" | "interactive" | "contentgen", string> = {
    labmentorship: "",
    interactive: "",
    contentgen: "",
};

export const VIDEO_CAPTIONS = {
    labmentorship:
        "A lab exercise with the lab agent assisting, including the agent answering a learner question mid-task.",
    interactive:
        "The instructor delivering training while the student asks three questions in a row, each one followed up.",
    contentgen:
        "How content generation works, what it produces, and how long it takes end to end.",
} as const;
