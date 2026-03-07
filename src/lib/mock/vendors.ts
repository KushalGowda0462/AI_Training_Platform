export type Vendor = {
    slug: string;
    name: string;
    category: string;
    description: string;
    longDescription: string;
    certCount: number;
    labCount: number;
};

export const vendors: Vendor[] = [
    {
        slug: "netapp",
        name: "NetApp",
        category: "Storage",
        description: "Enterprise storage, data management, and cloud services.",
        longDescription:
            "NetApp delivers unified data storage, integrated data services, and cloud operations to solve enterprise data management challenges. Our Aurentis-powered labs cover ONTAP, StorageGRID, and hybrid cloud architectures.",
        certCount: 8,
        labCount: 14,
    },
    {
        slug: "cisco",
        name: "Cisco",
        category: "Networking",
        description: "Networking, security, and collaboration solutions.",
        longDescription:
            "Cisco certifications are the gold standard in enterprise networking. Aurentis AI agents guide learners through hands-on labs for CCNA, CCNP, CyberOps, DevNet, and beyond — with instant, line-by-line feedback.",
        certCount: 12,
        labCount: 22,
    },
    {
        slug: "vmware",
        name: "VMware",
        category: "Virtualization",
        description: "Virtualization, cloud infrastructure, and modern apps.",
        longDescription:
            "VMware's platform powers the world's most demanding workloads. Aurentis delivers vSphere, NSX-T, vSAN, and Tanzu labs with automated validation and real-environment simulation.",
        certCount: 9,
        labCount: 16,
    },
    {
        slug: "kubernetes",
        name: "Kubernetes",
        category: "Cloud Native",
        description: "Container orchestration and cloud-native ecosystems.",
        longDescription:
            "Kubernetes is the backbone of modern infrastructure. Aurentis labs walk engineers through CKA, CKAD, and CKS prep with live cluster access, self-healing environments, and AI-validated task completion.",
        certCount: 6,
        labCount: 18,
    },
    {
        slug: "microsoft-azure",
        name: "Microsoft Azure",
        category: "Cloud",
        description: "Cloud computing, AI services, and enterprise solutions.",
        longDescription:
            "Azure certifications span from fundamentals to expert-level architecture. Aurentis agents provide context-aware tutoring across AZ-104, AZ-305, SC-100, and more with integrated Azure sandbox environments.",
        certCount: 15,
        labCount: 26,
    },
    {
        slug: "aws",
        name: "AWS",
        category: "Cloud",
        description: "Cloud infrastructure, AI/ML, and developer services.",
        longDescription:
            "AWS is the world's leading cloud platform. Aurentis delivers immersive labs for Solutions Architect, DevOps Engineer, Security Specialty, and more — powered by AI agents that adapt to each learner's pace.",
        certCount: 14,
        labCount: 24,
    },
];

export const getVendorBySlug = (slug: string): Vendor | undefined =>
    vendors.find((v) => v.slug === slug);
