export interface ProjectItem {
  tag: string;
  title: string;
  body: string;
  tech: string[];
}

export interface CertificateItem {
  id: string;
  title: string;
  date: string;
  issuer: string;
  image?: string;
  verifyUrl: string;
  label: string;
}

export interface EducationItem {
  id: string;
  title: string;
  name: string;
  subtitle: string;
  meta: string;
  detail: string;
  availability?: string;
  iconName: 'GraduationCap' | 'Briefcase' | 'School';
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    tag: 'Medical AI & Neural Architecture Research',
    title: 'CMKLightUnet: MambaLite-KAN Encoder for Medical Segmentation',
    body: 'Designed a lightweight hybrid architecture combining Selective State Space Mamba-SSM CUDA scanning with tokenized Kolmogorov-Arnold Networks (KAN) in deep encoder stages. Engineered custom Hybrid Multi-Head Attention (HMA) and Wavelet-Based Attention (WBA) gating mechanisms, delivering high-precision organ and lesion segmentation with optimized FLOPs and parameter efficiency.',
    tech: ['PyTorch', 'Mamba-SSM', 'KAN Encoder', 'CUDA', 'Medical Vision', 'Wavelet Attention']
  },
  {
    tag: 'Computer Vision & Document AI',
    title: 'YOLO & PaddleOCR Layout Parsing & Font Detection Pipeline',
    body: 'Built an automated document layout analysis and typography intelligence pipeline. Integrated Ultralytics YOLOv11 for high-speed bounding box text region cropping, PaddleOCR with GPU acceleration for multi-lingual text extraction, and a deep CNN classifier for automated font recognition and layout segmentation.',
    tech: ['YOLOv11', 'PaddleOCR', 'PyTorch', 'OpenCV', 'Font Recognition', 'Document AI']
  },
  {
    tag: 'Green Computing & Data Science',
    title: 'Python vs. R: Energy Efficiency Analysis',
    body: 'Conducted a comprehensive energy consumption analysis comparing Python and R environments across diverse OS architectures (macOS, Linux, Windows). Evaluated the energy footprint and computational efficiency of various machine learning models on multiple datasets to benchmark and promote sustainable computing practices.',
    tech: ['Python', 'R', 'Linux', 'Data Science', 'Green AI']
  },
  {
    tag: 'Deep Learning & CV',
    title: 'Bengali Font Recognition System',
    body: 'Engineered a computer vision pipeline to classify 25 distinct Bengali font families. Built a custom synthetic dataset and benchmarked standard CNNs (ResNet-50, DenseNet-121, MobileNetV3, VGG) against a proposed architecture leveraging ConvNeXt-Tiny combined with Supervised Contrastive Learning.',
    tech: ['PyTorch', 'ConvNeXt', 'Contrastive Learning', 'Computer Vision']
  },
  {
    tag: 'Machine Learning & Computer Vision',
    title: 'Hardware Detection & Analysis',
    body: 'Engineered a custom image dataset spanning 24 distinct hardware classes to train and evaluate object detection models. Conducted an in-depth comparative study between YOLO architectures and various supervised and unsupervised learning algorithms to benchmark accuracy and computational efficiency.',
    tech: ['YOLO', 'Roboflow', 'OpenCV', 'PyTorch']
  },
  {
    tag: 'Software Development',
    title: 'Organet: Smart Task Organizer',
    body: 'Engineered a dynamic daily task management system designed to optimize productivity. The platform features automated priority-based reordering, intuitive status tracking, and a streamlined interface to help users efficiently manage and execute their most critical ongoing tasks.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Node.js']
  },
];

export const CERTIFICATES_DATA: CertificateItem[] = [
  {
    id: 'cert-1',
    title: 'Pandas for Data Analysis',
    issuer: 'Kaggle',
    date: '2025',
    image: 'assets/Kaggle_Logo.png',
    verifyUrl: 'https://www.kaggle.com/learn/certification/markprotikmondol/pandas',
    label: 'Pandas',
  },
  {
    id: 'cert-2',
    title: 'Data Visualization with Python',
    issuer: 'Kaggle',
    date: '2025',
    image: 'assets/Kaggle_Logo.png',
    verifyUrl: 'https://www.kaggle.com/learn/certification/markprotikmondol/data-visualization',
    label: 'Data Visualization',
  },
  {
    id: 'cert-3',
    title: 'LinkedIn 101',
    issuer: 'Grameenphone Academy',
    date: '2026',
    image: 'assets/gp-academy.png',
    verifyUrl: 'https://www.grameenphone.academy/cert/3e29b6fd7f13',
    label: 'LinkedIn Optimization',
  },
  {
    id: 'cert-4',
    title: 'Corporate Presentation Skills',
    issuer: 'Grameenphone Academy',
    date: '2026',
    image: 'assets/gp-academy.png',
    verifyUrl: 'https://www.grameenphone.academy/cert/045694b6a7e8',
    label: 'Presentation Skills',
  },
  {
    id: 'cert-5',
    title: 'Art of Communication',
    issuer: 'Grameenphone Academy',
    date: '2026',
    image: 'assets/gp-academy.png',
    verifyUrl: 'https://www.grameenphone.academy/cert/44d271bcde47',
    label: 'Communication Skills',
  },
  {
    id: 'cert-6',
    title: 'Smart CV',
    issuer: 'Grameenphone Academy',
    date: '2026',
    image: 'assets/gp-academy.png',
    verifyUrl: 'https://www.grameenphone.academy/cert/08e358f5cffa',
    label: 'CV & Branding',
  },
  {
    id: 'cert-7',
    title: 'Tips & Techniques on Interview & Assessment',
    issuer: 'Grameenphone Academy',
    date: '2026',
    image: 'assets/gp-academy.png',
    verifyUrl: 'https://www.grameenphone.academy/cert/6e80a84e8c45',
    label: 'Interview Skills',
  },
  {
    id: 'cert-8',
    title: 'Cybersecurity Essentials',
    issuer: 'Cisco Networking Academy',
    date: '2026',
    image: 'assets/cisco-junior-cybersecurity.png',
    verifyUrl: 'https://www.credly.com/badges/d75a9273-c64a-4c8f-8298-d0c7308de556/public_url',
    label: 'Cisco NetAcad',
  },
  {
    id: 'cert-9',
    title: 'Introduction to Cybersecurity',
    issuer: 'Cisco Networking Academy',
    date: '2026',
    image: 'assets/cisco-introduction-to-cybersecurity.png',
    verifyUrl: 'https://www.credly.com/badges/cedb36fd-b26d-448a-b5dc-bb4f7dc48049/public_url',
    label: 'Cisco NetAcad',
  },
  {
    id: 'cert-10',
    title: 'COVID-19 Healthcare Special Course',
    issuer: 'Muktopaath',
    date: '2020',
    image: 'assets/muktopath.png',
    verifyUrl: 'https://muktopaath.gov.bd/certificate/check/MC-L563031I887626V242Q',
    label: 'Public Health',
  },
  {
    id: 'cert-11',
    title: 'Big Data Analysis',
    issuer: 'Muktopaath',
    date: '2026',
    image: 'assets/muktopath.png',
    verifyUrl: 'https://muktopaath.gov.bd/certificate/check/MC-V1M9194430F1669I',
    label: 'Big Data',
  },
  {
    id: 'cert-12',
    title: "HerWILL's AI Workshop",
    issuer: 'AI4OPT / HerWILL',
    date: '2026',
    verifyUrl: 'https://www.herwill.org/verify?code=HWAIWS2026-11',
    label: 'AI Workshop',
  },
];

export const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'edu-university',
    title: 'University',
    name: 'United International University',
    subtitle: 'BSc in Computer Science & Engineering',
    meta: 'Academic Focus',
    detail: '2021 - 2025',
    iconName: 'GraduationCap',
  },
  {
    id: 'edu-status',
    title: 'Current Status',
    name: 'Open to Work',
    subtitle: 'AI / ML / Software Engineering',
    meta: 'Working Status',
    detail: 'Available for full-time roles, internships, and collaborative research opportunities.',
    availability: 'ready',
    iconName: 'Briefcase',
  },
  {
    id: 'edu-college',
    title: 'College',
    name: 'Notre Dame College',
    subtitle: 'Science',
    meta: 'Academic Foundation',
    detail: '2018 - 2020',
    iconName: 'School',
  },
];
