export type Difficulty = "Beginner" | "Intermediate" | "Advanced";
export type Role = "DevOps" | "SRE" | "SecOps" | "Network" | "Storage" | "Cloud";

export type Certification = {
    id: string;
    title: string;
    vendorSlug: string;
    difficulty: Difficulty;
    role: Role;
    duration: string;
    tagline: string;
    summary: string;
    learnBullets: string[];
    relatedLabs: string[];
};

export const certifications: Certification[] = [
    {
        id: "cka",
        title: "Certified Kubernetes Administrator (CKA)",
        vendorSlug: "kubernetes",
        difficulty: "Advanced",
        role: "DevOps",
        duration: "8 hours",
        tagline: "Master cluster administration, scheduling, and storage.",
        summary: "The CKA certification validates your ability to perform core Kubernetes administrator responsibilities. Aurentis labs provide live cluster access with AI-guided troubleshooting.",
        learnBullets: [
            "Cluster installation and configuration",
            "Workload and scheduling management",
            "Services, networking, and ingress",
            "Storage classes, PVs, and PVCs",
            "Troubleshooting real cluster failures",
        ],
        relatedLabs: ["Cluster Setup & Kubeadm", "RBAC Deep Dive", "Network Policy Lab"],
    },
    {
        id: "ckad",
        title: "Certified Kubernetes Application Developer (CKAD)",
        vendorSlug: "kubernetes",
        difficulty: "Intermediate",
        role: "DevOps",
        duration: "6 hours",
        tagline: "Design, build, and deploy cloud-native applications.",
        summary: "CKAD validates your ability to design and deploy applications in Kubernetes. Labs cover multi-container pods, ConfigMaps, and CI/CD pipeline integration.",
        learnBullets: [
            "Pod design patterns and multi-container pods",
            "Configuration and secrets management",
            "Deployments, rollouts, and rollbacks",
            "Services and networking for app developers",
            "Observability and debugging running apps",
        ],
        relatedLabs: ["Sidecar Pattern Lab", "ConfigMap & Secrets Lab", "Rolling Update Lab"],
    },
    {
        id: "ccna",
        title: "Cisco CCNA",
        vendorSlug: "cisco",
        difficulty: "Beginner",
        role: "Network",
        duration: "10 hours",
        tagline: "Foundation in IP networking, routing, and switching.",
        summary: "The CCNA covers foundational networking including IP services, security fundamentals, automation, and routing & switching. Aurentis delivers simulated Cisco environments for hands-on practice.",
        learnBullets: [
            "OSI and TCP/IP models",
            "IP addressing and subnetting",
            "Static and dynamic routing (OSPF)",
            "VLANs, STP, and inter-VLAN routing",
            "Network automation with Python & REST APIs",
        ],
        relatedLabs: ["OSPF Configuration Lab", "VLAN Segmentation Lab", "Network Automation Lab"],
    },
    {
        id: "ccnp-enterprise",
        title: "Cisco CCNP Enterprise",
        vendorSlug: "cisco",
        difficulty: "Advanced",
        role: "Network",
        duration: "14 hours",
        tagline: "Advanced enterprise networking and SD-WAN solutions.",
        summary: "CCNP Enterprise validates advanced skills in enterprise network design, implementation, and troubleshooting including SD-WAN, SD-Access, and dual-stack solutions.",
        learnBullets: [
            "Advanced OSPF, EIGRP, and BGP",
            "SD-WAN vEdge and vManage configuration",
            "SD-Access with DNA Center",
            "Network assurance and analytics",
            "Dual-stack IPv4/IPv6 implementation",
        ],
        relatedLabs: ["BGP Policy Lab", "SD-WAN Bring-Up Lab", "DNA Center Automation"],
    },
    {
        id: "az-104",
        title: "Microsoft Azure Administrator (AZ-104)",
        vendorSlug: "microsoft-azure",
        difficulty: "Intermediate",
        role: "Cloud",
        duration: "9 hours",
        tagline: "Manage Azure subscriptions, compute, storage, and identity.",
        summary: "AZ-104 validates skills in implementing, managing, and monitoring Azure identity, governance, storage, compute, and virtual networks in a cloud environment.",
        learnBullets: [
            "Azure Active Directory and RBAC",
            "Virtual machines and availability sets",
            "Azure Storage accounts and blob lifecycle",
            "Virtual networks, NSGs, and VPN Gateways",
            "Monitoring with Azure Monitor and Log Analytics",
        ],
        relatedLabs: ["Azure RBAC Lab", "VM Scale Set Lab", "VNet Peering Lab"],
    },
    {
        id: "aws-saa",
        title: "AWS Solutions Architect – Associate",
        vendorSlug: "aws",
        difficulty: "Intermediate",
        role: "Cloud",
        duration: "10 hours",
        tagline: "Design resilient, cost-efficient AWS architectures.",
        summary: "The SAA-C03 exam validates expertise in designing distributed systems on AWS. Aurentis delivers scenario-based labs covering multi-tier architectures, data lakes, and disaster recovery patterns.",
        learnBullets: [
            "EC2, Auto Scaling, and Load Balancing",
            "S3 storage classes and lifecycle policies",
            "RDS, DynamoDB, and Aurora design patterns",
            "VPC design, subnets, and security groups",
            "Cost optimization strategies and Well-Architected Review",
        ],
        relatedLabs: ["Multi-AZ RDS Lab", "S3 Lifecycle Lab", "VPC Architecture Lab"],
    },
    {
        id: "vcf",
        title: "VMware Cloud Foundation (VCF) Specialist",
        vendorSlug: "vmware",
        difficulty: "Advanced",
        role: "Cloud",
        duration: "12 hours",
        tagline: "Deploy and manage full-stack SDDC with VMware VCF.",
        summary: "VCF Specialist validates expertise in deploying VMware Cloud Foundation — the integrated SDDC stack including vSphere, vSAN, NSX-T, and vRealize Suite.",
        learnBullets: [
            "VCF architecture and Bill of Materials",
            "vSAN stretched clusters and erasure coding",
            "NSX-T micro-segmentation and Tier-0/Tier-1 routing",
            "vRealize Automation and lifecycle management",
            "Workload domain provisioning and scaling",
        ],
        relatedLabs: ["vSAN Config Lab", "NSX-T Micro-seg Lab", "vRA Blueprint Lab"],
    },
    {
        id: "netapp-ncse",
        title: "NetApp Certified Storage Engineer (NCSE)",
        vendorSlug: "netapp",
        difficulty: "Intermediate",
        role: "Storage",
        duration: "8 hours",
        tagline: "Master ONTAP, data protection, and hybrid cloud storage.",
        summary: "NCSE validates deep knowledge of NetApp ONTAP administration, including data protection, performance tuning, SAN/NAS protocols, and Cloud Volumes ONTAP integration.",
        learnBullets: [
            "ONTAP cluster setup and node management",
            "SAN (iSCSI, FC) and NAS (NFS, SMB) configuration",
            "SnapMirror, SnapVault, and SVM DR",
            "ONTAP performance analysis with Unified Manager",
            "Cloud Volumes ONTAP on AWS and Azure",
        ],
        relatedLabs: ["SnapMirror Config Lab", "SAN Protocol Lab", "Cloud Volumes Deployment"],
    },
];

export const getCertificationsByVendor = (vendorSlug: string): Certification[] =>
    certifications.filter((c) => c.vendorSlug === vendorSlug);
