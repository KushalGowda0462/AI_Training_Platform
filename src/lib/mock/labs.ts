export type Lab = {
    id: string;
    vendorSlug: string;
    title: string;
    level: "Beginner" | "Intermediate" | "Advanced";
    description: string;
    duration: string;
};

export const labs: Lab[] = [
    // Kubernetes
    { id: "k8s-01", vendorSlug: "kubernetes", title: "Cluster Setup & Kubeadm", level: "Intermediate", description: "Bootstrap a multi-node Kubernetes cluster using kubeadm from scratch.", duration: "90 min" },
    { id: "k8s-02", vendorSlug: "kubernetes", title: "RBAC Deep Dive", level: "Advanced", description: "Configure Roles, ClusterRoles, and bindings to enforce least-privilege access.", duration: "60 min" },
    { id: "k8s-03", vendorSlug: "kubernetes", title: "Network Policy Lab", level: "Advanced", description: "Create and validate ingress/egress network policies across namespaces.", duration: "75 min" },
    { id: "k8s-04", vendorSlug: "kubernetes", title: "Sidecar Pattern Lab", level: "Intermediate", description: "Deploy multi-container pods with logging sidecars using shared volumes.", duration: "45 min" },
    { id: "k8s-05", vendorSlug: "kubernetes", title: "Rolling Update & Rollback", level: "Beginner", description: "Manage deployment rollouts and perform controlled rollbacks safely.", duration: "30 min" },
    { id: "k8s-06", vendorSlug: "kubernetes", title: "Persistent Storage with PVCs", level: "Intermediate", description: "Provision PersistentVolumes and bind them to StatefulSet workloads.", duration: "60 min" },
    // Cisco
    { id: "cisco-01", vendorSlug: "cisco", title: "OSPF Multi-Area Configuration", level: "Intermediate", description: "Design and configure OSPF areas with ABRs and external route redistribution.", duration: "90 min" },
    { id: "cisco-02", vendorSlug: "cisco", title: "VLAN Segmentation & Trunking", level: "Beginner", description: "Create VLANs, configure trunk ports, and implement inter-VLAN routing with SVIs.", duration: "60 min" },
    { id: "cisco-03", vendorSlug: "cisco", title: "BGP Policy & Route Filtering", level: "Advanced", description: "Apply BGP route maps, prefix lists, and communities for traffic engineering.", duration: "120 min" },
    { id: "cisco-04", vendorSlug: "cisco", title: "ACL & Zone-Based Firewall", level: "Intermediate", description: "Implement extended ACLs and zone-based firewall policies on IOS", duration: "75 min" },
    { id: "cisco-05", vendorSlug: "cisco", title: "SD-WAN Bring-Up Lab", level: "Advanced", description: "Onboard vEdge routers to vManage and configure centralized data policies.", duration: "120 min" },
    { id: "cisco-06", vendorSlug: "cisco", title: "Network Automation with Python", level: "Intermediate", description: "Use Netmiko and RESTCONF to automate Cisco device configuration at scale.", duration: "90 min" },
    // VMware
    { id: "vmw-01", vendorSlug: "vmware", title: "vSphere HA & DRS Config", level: "Intermediate", description: "Configure vSphere HA, DRS rules, and resource pools in a clustered environment.", duration: "90 min" },
    { id: "vmw-02", vendorSlug: "vmware", title: "vSAN Cluster Configuration", level: "Advanced", description: "Deploy an all-flash vSAN cluster with deduplication and erasure coding.", duration: "120 min" },
    { id: "vmw-03", vendorSlug: "vmware", title: "NSX-T Micro-segmentation", level: "Advanced", description: "Create distributed firewall rules and security groups using NSX-T.", duration: "90 min" },
    { id: "vmw-04", vendorSlug: "vmware", title: "vRealize Automation Blueprint", level: "Intermediate", description: "Build self-service VM blueprints with approval workflows in vRA.", duration: "75 min" },
    // Azure
    { id: "az-01", vendorSlug: "microsoft-azure", title: "Azure RBAC & Policy Lab", level: "Beginner", description: "Assign built-in roles, create custom RBAC roles, and enforce Azure Policy.", duration: "60 min" },
    { id: "az-02", vendorSlug: "microsoft-azure", title: "VM Scale Set Deployment", level: "Intermediate", description: "Deploy and auto-scale Azure VMs behind a load balancer using scale sets.", duration: "75 min" },
    { id: "az-03", vendorSlug: "microsoft-azure", title: "VNet Peering & Connectivity", level: "Intermediate", description: "Connect Azure VNets across regions with peering and VPN Gateway.", duration: "90 min" },
    { id: "az-04", vendorSlug: "microsoft-azure", title: "AKS Cluster Operations", level: "Advanced", description: "Deploy AKS, configure node pools, and integrate with Azure Container Registry.", duration: "90 min" },
    // AWS
    { id: "aws-01", vendorSlug: "aws", title: "Multi-AZ RDS Architecture", level: "Intermediate", description: "Deploy a highly available RDS PostgreSQL instance with standby failover.", duration: "75 min" },
    { id: "aws-02", vendorSlug: "aws", title: "S3 Lifecycle Policy Lab", level: "Beginner", description: "Configure S3 lifecycle rules to tier data to Glacier and manage costs.", duration: "45 min" },
    { id: "aws-03", vendorSlug: "aws", title: "VPC Design & Security Groups", level: "Intermediate", description: "Build a multi-tier VPC with public/private subnets, NAT, and security groups.", duration: "90 min" },
    { id: "aws-04", vendorSlug: "aws", title: "EKS with Fargate Profiles", level: "Advanced", description: "Run serverless Kubernetes workloads on EKS using Fargate pod scheduling.", duration: "120 min" },
    // NetApp
    { id: "ntap-01", vendorSlug: "netapp", title: "ONTAP Cluster Initialization", level: "Beginner", description: "Bootstrap a new ONTAP cluster and configure node management interfaces.", duration: "60 min" },
    { id: "ntap-02", vendorSlug: "netapp", title: "SnapMirror Replication Setup", level: "Intermediate", description: "Configure async SnapMirror relationships for disaster recovery between clusters.", duration: "75 min" },
    { id: "ntap-03", vendorSlug: "netapp", title: "iSCSI SAN Protocol Lab", level: "Advanced", description: "Create iSCSI LUNs, iGroups, and map volumes to ESXi hosts.", duration: "90 min" },
];

export const getLabsByVendor = (vendorSlug: string): Lab[] =>
    labs.filter((l) => l.vendorSlug === vendorSlug);
