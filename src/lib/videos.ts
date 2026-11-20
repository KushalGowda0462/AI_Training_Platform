/**
 * The videos shown on the /videos page.
 *
 * The first entry is the large featured video; the rest are listed beside
 * it in this order. To add a video, add an entry here — nothing else needs
 * changing. YouTube is preferred: the video streams from YouTube rather
 * than from our hosting, and new uploads to the channel can be added by ID.
 */

export type Video = {
    /** stable key, also used in the page markup */
    id: string;
    title: string;
    /** one short line under the title */
    description: string;
    /** small label above the title, e.g. "Class experience" */
    tag: string;
    /** shown on the thumbnail, as m:ss */
    duration: string;
    source:
        /** the ID in https://www.youtube.com/watch?v=<ID> */
        | { kind: "youtube"; id: string }
        /** a file in /public; write spaces as %20 */
        | { kind: "file"; src: string };
};

export const YOUTUBE_CHANNEL_URL = "https://www.youtube.com/@Aurilearnai";

export const VIDEOS: Video[] = [
    {
        id: "class-delivery",
        title: "AuriLearn class delivery experience",
        description: "A complete AuriLearn class, as a student experiences it.",
        tag: "Class experience",
        duration: "6:25",
        source: { kind: "youtube", id: "_BNz0LMvnMk" },
    },
    {
        id: "gpu-infrastructure",
        title: "Master AI GPU Infrastructure",
        description: "Hands-on NVIDIA GPU architecture and high-performance networking.",
        tag: "Course preview",
        duration: "1:12",
        source: { kind: "youtube", id: "9JRlaYCPHZ8" },
    },
    {
        id: "overcoming-obstacles",
        title: "AuriLearn demo: Overcoming Obstacles",
        description: "A short introduction to AuriLearn.",
        tag: "Product demo",
        duration: "1:25",
        source: { kind: "file", src: "/Demo%20Video.mp4" },
    },
];
