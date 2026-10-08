/**
 * ─────────────────────────────────────────────────────────────────────────
 * PLATFORM SECTION CONTENT
 *
 * Everything the Experience tiles show lives here, so the engineering team
 * can drop real content in without touching any layout code.
 *
 * What engineering needs to supply:
 *   1. QUIZZES        — 5 NVIDIA INFRA quizzes. The tile rotates Quiz 1 → 2 → 3 → 4 → 5
 *                       → back to 1 on each click. Any number of questions
 *                       per quiz works; 5 each is what is here now.
 *   2. SLIDE_DECK     — the five NVIDIA INFRA simulators shown as slides.
 *   3. BOARD / BOARD_STEPS — the live whiteboarding sequence, one caption per step.
 *   4. CASE_STUDIES   — the NVIDIA INFRA case studies and scenarios.
 *   5. VIDEO_SOURCES  — the three 1 minute clips. Drop the files in /public
 *                       and point each entry at them.
 *
 * The quizzes, slides and case studies come from the NVIDIA INFRA course
 * material. Replace any of it in place; the components read whatever is
 * exported here.
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

/** ── 1. The five rotating quizzes ──────────────────────────────────────
 *
 * From the NVIDIA INFRA course (GPU-Accelerated AI Infrastructure). Each
 * quiz follows one part of the course, and every answer comes from the
 * course material: the case studies, the review scenarios and the lessons
 * behind the interactive experiences.
 */
export const QUIZ_COURSE = "NVIDIA INFRA";

export const QUIZZES: Quiz[] = [
    {
        title: "GPU Architecture and Accelerated Compute",
        questions: [
            {
                q: "Why does training on 64 GPUs not give a 64x speedup?",
                options: [
                    "Each GPU runs at a lower clock when more are installed",
                    "Every step also has to exchange gradients between GPUs, and that communication grows with the cluster",
                    "The framework only uses half of the GPUs at a time",
                    "Larger clusters always use a smaller batch size",
                ],
                answer: 1,
                why: "Compute per GPU stays the same, but every step ends with a gradient exchange across all of them. The slower the interconnect, the bigger that share of the step, and the further the real speedup falls below the ideal line.",
            },
            {
                q: "Which interconnect lets a multi-GPU training job scale closest to linear?",
                options: ["PCIe Gen5 / Ethernet", "InfiniBand NDR 400", "They all scale the same way", "NVLink / NVSwitch"],
                answer: 3,
                why: "NVLink / NVSwitch has by far the most bandwidth between GPUs, so the gradient exchange takes the smallest share of each step. On PCIe or Ethernet, communication can take longer than the compute itself.",
            },
            {
                q: "A 70B-parameter model's BF16 weights alone take about how much memory?",
                options: ["140 GB", "35 GB", "70 GB", "560 GB"],
                answer: 0,
                why: "BF16 uses 2 bytes per parameter, so 70B parameters is about 140 GB. That alone is more than one 80 GB GPU holds, before any optimizer state, which is another 560 GB in the course's 70B case.",
            },
            {
                q: "A 64-GPU cluster sits at 45% GPU utilisation because the DataLoader keeps stalling. Where is the bottleneck?",
                options: [
                    "In GPU compute, so a faster precision such as FP8 will fix it",
                    "In the GPU interconnect",
                    "In the data path feeding the GPUs: the job is I/O-bound",
                    "In the scheduler",
                ],
                answer: 2,
                why: "The GPUs are waiting for data. Making them compute faster only makes them wait longer. The fix is on the input side: loader throughput or faster storage.",
            },
            {
                q: "What does MIG (Multi-Instance GPU) do?",
                options: [
                    "Splits one GPU into isolated instances, each with its own memory and compute",
                    "Joins several GPUs into one larger logical GPU",
                    "Lets pods take turns on the whole GPU",
                    "Moves GPU memory pages to host memory when full",
                ],
                answer: 0,
                why: "MIG partitions the GPU in hardware, so each instance gets dedicated memory and compute and one tenant cannot slow down or crash another. Taking turns on the whole GPU is time-slicing.",
            },
        ],
    },
    {
        title: "GPU Resource Sharing and Multi-Tenant Clusters",
        questions: [
            {
                q: "How does GPU time-slicing share one GPU between several pods?",
                options: [
                    "Each pod gets a fixed slice of GPU memory and SMs",
                    "Each pod is moved to a different GPU when it is idle",
                    "Pods take turns on the whole GPU, with no memory or fault isolation between them",
                    "Only one pod may be scheduled; the others wait in a queue",
                ],
                answer: 2,
                why: "Time-slicing interleaves the pods on the full GPU. It is cheap and flexible, but every active neighbour adds latency and there is no isolation, which is the trade-off against MIG.",
            },
            {
                q: "As more replicas share one GPU through time-slicing, what happens to per-pod latency?",
                options: [
                    "It stays flat until the GPU memory is full",
                    "It rises with every active neighbour, plus context-switching overhead",
                    "It falls, because the GPU is busier",
                    "It only changes for bursty workloads",
                ],
                answer: 1,
                why: "Each pod waits for the others' turns and pays for the switch between them. Steady batch work suffers most, because every replica is busy at once; bursty notebooks share better because they are mostly idle.",
            },
            {
                q: "What does enabling MPS change when several processes share a GPU?",
                options: [
                    "It gives each process isolated memory, like MIG",
                    "It turns off the GPU between requests to save power",
                    "It moves the workload to the CPU when the GPU is busy",
                    "It lets kernels from different processes run on the GPU at the same time, cutting context-switch overhead",
                ],
                answer: 3,
                why: "MPS lets work from several clients run concurrently instead of taking turns. Latency drops, but the clients share one memory space, so a fault in one can affect the others.",
            },
            {
                q: "Why does distributed training need gang scheduling?",
                options: [
                    "So all pods of a job start together; partial placement leaves GPUs held idle and can deadlock the cluster",
                    "To run every pod of a job on the same node",
                    "To give training jobs priority over inference",
                    "To restart failed pods automatically",
                ],
                answer: 0,
                why: "A distributed job cannot make progress until every worker is running. If two jobs each grab part of what they need, both hold GPUs and wait forever. Gang scheduling places all or nothing.",
            },
            {
                q: "What does backfill scheduling do on a busy GPU cluster?",
                options: [
                    "Pre-empts running jobs to start larger ones sooner",
                    "Duplicates jobs on spare GPUs in case one fails",
                    "Runs smaller jobs in the idle gaps while a large job waits for its resources, without delaying it",
                    "Moves finished jobs' data back to storage",
                ],
                answer: 2,
                why: "While a large job waits for enough GPUs to free up, those GPUs would otherwise sit idle. Backfill uses the gap for work that will finish in time, raising utilisation.",
            },
        ],
    },
    {
        title: "Storage for AI Workloads",
        questions: [
            {
                q: "A 256-GPU H100 cluster processes batches at an effective 20 GB/s per GPU. Roughly what aggregate storage bandwidth does it need?",
                options: ["25 GB/s", "256 GB/s", "About 20 TB/s", "About 5.1 TB/s"],
                answer: 3,
                why: "256 GPUs × 20 GB/s is about 5,120 GB/s, or 5.1 TB/s. A traditional NAS filer delivering 25 GB/s supplies around half a percent of that.",
            },
            {
                q: "As you add concurrent workers to a legacy NAS, what happens to aggregate throughput?",
                options: [
                    "It flattens at the filer's limit, so each extra GPU spends more time idle",
                    "It keeps scaling linearly with the workers",
                    "It drops to zero once a threshold is passed",
                    "It only changes for sequential reads",
                ],
                answer: 0,
                why: "A single filer has a fixed ceiling, and random small reads hit it sooner. Distributed storage spreads the load across many nodes, so throughput keeps following the ideal line much further.",
            },
            {
                q: "A cluster is I/O-bound at 45% GPU utilisation. How do you decide whether faster storage is worth its extra CAPEX?",
                options: [
                    "Buy the fastest option; storage is always the bottleneck",
                    "Work out what the idle GPU hours cost each month and compare that waste with the extra CAPEX",
                    "Compare only the raw capacity of each option",
                    "Choose the option with the lowest CAPEX",
                ],
                answer: 1,
                why: "Idle GPUs are expensive. Putting a monthly figure on the wasted hours turns a storage choice into a TCO comparison you can defend.",
            },
            {
                q: "In the 70B training case, where are checkpoints written first?",
                options: [
                    "Straight to S3, synchronously",
                    "Into MLflow as uploaded artifacts",
                    "To a fast NVMe-oF tier synchronously, then uploaded to S3 asynchronously",
                    "Only to the local disk of rank 0",
                ],
                answer: 2,
                why: "The fast tier keeps the training stall short; the S3 upload happens in the background without blocking training. The last three checkpoints stay local, and MLflow only records the checkpoint's URI.",
            },
            {
                q: "With torch.distributed.checkpoint, how long does a 70B checkpoint write take compared with a traditional torch.save?",
                options: [
                    "About the same, 28 seconds",
                    "About 2.2 seconds instead of 28, because each rank writes only its own shard",
                    "About 14 seconds, because the work is split in two",
                    "Longer, because 64 files are written",
                ],
                answer: 1,
                why: "torch.save first gathers everything to one rank. DCP has each of the 64 ranks save its own ~10.9 GB shard with no AllGather, so the write is 12.7 times faster.",
            },
        ],
    },
    {
        title: "Compliance and Data Residency",
        questions: [
            {
                q: "Under HIPAA, what must a provider that handles protected health information (PHI) sign?",
                options: [
                    "A Business Associate Agreement (BAA)",
                    "A Data Processing Agreement (DPA)",
                    "A Service Level Agreement (SLA)",
                    "A Non-Disclosure Agreement (NDA)",
                ],
                answer: 0,
                why: "The BAA is the HIPAA requirement. The environment also needs encryption at rest and in transit, plus audit controls. A DPA is the GDPR-side contract.",
            },
            {
                q: "In the HIPAA case study, where does training on identified patient data run?",
                options: [
                    "In any US cloud region",
                    "On cloud Spot instances with encryption turned on",
                    "On an on-premises H100 cluster in a HIPAA-compliant colocation facility",
                    "Anywhere, once the data is encrypted",
                ],
                answer: 2,
                why: "PHI never leaves a controlled environment. The cloud provider, under a BAA, is used for de-identified data only. Training cost came out 75% lower than the cloud alternative.",
            },
            {
                q: "GDPR fines can reach what share of a company's global annual turnover?",
                options: ["1%", "2%", "10%", "4%"],
                answer: 3,
                why: "Up to 4% of global annual turnover, which is why the firm in the case has to prove residency to an auditor rather than assume it.",
            },
            {
                q: "In the GDPR case, what does OPA Gatekeeper do?",
                options: [
                    "Encrypts training data with KMS keys",
                    "Rejects any pod that requests EU-resident data without an EU node selector",
                    "Writes the immutable audit log",
                    "Tags data with its classification at ingest",
                ],
                answer: 1,
                why: "It is the Kubernetes admission-control layer of the four-layer design. The others are classification at ingest, region-locked storage with KMS key locality, and audit logging.",
            },
            {
                q: "What is the key lesson of the GDPR case study?",
                options: [
                    "Residency must be enforced throughout the stack: storage, keys, scheduling and audit, not just the region",
                    "Choosing an EU cloud region is enough to comply",
                    "Personal data should never be used for training",
                    "Compliance is handled by the cloud provider's contract alone",
                ],
                answer: 0,
                why: "The region is only a start. Data must not be readable, decryptable or processable outside the EU, and the firm must be able to show that. The annual audit found zero transfers outside the EU.",
            },
        ],
    },
    {
        title: "Hybrid Scaling and Cost Optimisation",
        questions: [
            {
                q: "A platform retrains every six hours but sees 10x demand during major events. What architecture does the case study choose?",
                options: [
                    "An on-premises cluster sized for the peaks",
                    "Everything in the cloud on-demand",
                    "Own the baseline on-premises and burst the peaks to a cloud Spot fleet",
                    "Reserved cloud instances for three years",
                ],
                answer: 2,
                why: "Sizing on-premises for peaks leaves it idle most of the year; all-cloud on-demand pays premium rates for the baseline too. The hybrid burst ran the baseline at 95% utilisation and cut cost by 60%.",
            },
            {
                q: "In that hybrid design, what triggers scaling out to the cloud?",
                options: ["CPU utilisation", "Queue depth", "Time of day", "Manual approval"],
                answer: 1,
                why: "Scaling on queue depth means cloud capacity is added only when work is actually waiting, so you pay for the burst and nothing more.",
            },
            {
                q: "Why does a one-time, six-week run on 1,024 H100s go to cloud Spot instead of bought hardware?",
                options: [
                    "Cloud GPUs are always faster",
                    "H100s cannot be bought outright",
                    "Spot capacity is never interrupted",
                    "The run is transient, so more than $50M of CapEx is not justified once it ends",
                ],
                answer: 3,
                why: "There is no workload to keep the hardware busy afterwards. Spot with checkpointing gave a 60% discount against on-demand, and the cluster was dissolved after the run.",
            },
            {
                q: "Moving a 500 TB dataset out of the cloud for every training cycle costs more than $45K each time. What is the architectural answer?",
                options: [
                    "Anchor the data and move the compute to it",
                    "Compress the dataset before every transfer",
                    "Split each run across two clouds",
                    "Move the data again whenever a cheaper region appears",
                ],
                answer: 0,
                why: "Data has gravity. Naive cross-cloud mobility pays egress on every run, so the cost grows with each one. Keeping the data in place means only results and checkpoints move.",
            },
            {
                q: "An NLP team spends $180K a month on 64 H100s at 35% average utilisation. What is the first step?",
                options: [
                    "Buy the GPUs outright",
                    "Move every job to Spot",
                    "Diagnose the waste pattern with PromQL queries",
                    "Cut the GPU quota in half",
                ],
                answer: 2,
                why: "You size the fix from the data. The exercise then works through right-sizing, the right reservation commitment, and which jobs can move to Spot at what checkpoint frequency.",
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

/** ── 3. Live whiteboarding ─────────────────────────────────────────────
 *
 * The learner asks the agent to explain something on the whiteboard and it
 * draws the diagram one piece at a time, narrating each step. The diagram
 * itself is drawn in WhiteboardDemo; each step here reveals one more part.
 *
 * Each step's voiceover is a recorded clip in /public/whiteboard. The clips
 * were generated with the Kokoro text-to-speech model (voice am_michael) from
 * the captions below. If a caption changes, regenerate its clip so the two
 * still match. Step 1's clip also speaks BOARD.reply first.
 */
export const BOARD = {
    title: "Logical Storage Hierarchy",
    question: "Can you explain that using the whiteboard?",
    reply: "Let me draw that out so you can see it.",
};

export const BOARD_STEPS = [
    {
        caption:
            "We start at the top, with the application servers. These are the hosts that need storage, but they never touch a disk directly.",
        audio: "/whiteboard/step-1.m4a",
    },
    {
        caption:
            "The servers access a Storage Virtual Machine. The SVM is what serves their data over NFS, SMB or iSCSI, and it keeps each tenant's data separate.",
        audio: "/whiteboard/step-2.m4a",
    },
    {
        caption:
            "Down at the hardware level are the physical disks. They are grouped into an aggregate, which is simply a pool of raw capacity.",
        audio: "/whiteboard/step-3.m4a",
    },
    {
        caption:
            "On top of the aggregate we create FlexVol volumes. These are the logical containers the SVM manages, and they can grow or shrink without touching the disks.",
        audio: "/whiteboard/step-4.m4a",
    },
    {
        caption:
            "Inside each volume your data is stored as data blocks. So servers access the SVM, the SVM manages volumes, and volumes live on aggregates built from disks.",
        audio: "/whiteboard/step-5.m4a",
    },
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
