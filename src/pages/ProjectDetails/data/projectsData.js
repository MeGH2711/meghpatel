export const projectsData = {
    inventurax: {
        id: 'inventurax',
        title: 'InventuraX',
        subtitle: 'Sales & Billing Software · Full-Stack',
        demo: 'https://inventuraxpro.vercel.app/',
        github: 'https://github.com/MeGH2711/inventuraxpro',
        year: '2025',
        type: 'Web App',
        status: 'Live',
        statusVariant: 'live',
        theme: 'theme-blue',
        thumb: {
            type: 'text',
            initials: 'IX',
            label: 'InventuraX',
        },
        badges: [
            { label: 'Completed', variant: 'green' },
            { label: 'V1.0.2 Live', variant: 'blue' },
            { label: 'Open Source', variant: 'violet' },
        ],
        metrics: [
            { label: 'PDF Generation', value: 'Instant · Client-Side', accent: 'blue' },
            { label: 'Payment Mode', value: 'QR-Based UPI', accent: 'green' },
            { label: 'Offline Capability', value: '100% Offline Ready', accent: 'blue' },
            { label: 'Session Handling', value: 'Firebase Auth', accent: 'violet' },
        ],
        tech: ['ReactJS', 'Firebase', 'Bootstrap', 'Node.js', 'jsPDF', 'QR API'],
        vision: {
            problem:
                'Small and micro businesses in India are stuck using Excel sheets or expensive ERP tools for billing — neither built for their real-world, fast-paced workflow.',
            solution:
                'A lightweight, browser-based billing app with instant PDF invoicing, UPI QR code generation, and session-based access — zero setup, zero cost, runs anywhere.',
            audience:
                'Local shopkeepers, freelancers, and small retail businesses who need a professional invoicing tool without enterprise complexity or subscription fees.',
        },
        features: [
            {
                num: '01',
                name: 'Instant PDF Invoicing',
                desc: 'Client-side PDF generation via jsPDF — professional invoices printed and downloaded in under a second, no server round-trip required.',
            },
            {
                num: '02',
                name: 'QR-Based UPI Payments',
                desc: 'Auto-generates a scannable UPI QR code on every invoice with the exact amount pre-filled, so customers pay instantly from any UPI app.',
            },
            {
                num: '03',
                name: 'Session-Based Access',
                desc: 'Firebase Auth manages secure multi-user sessions — business owners log in once and their data persists across devices without any account management overhead.',
            },
            {
                num: '04',
                name: 'Sales & Inventory Tracking',
                desc: 'Real-time Firestore database tracks every transaction, product stock, and customer record — giving a live picture of business health at a glance.',
            },
            {
                num: '05',
                name: 'Offline Capability',
                desc: 'Core billing and PDF features work entirely offline. Firebase caches data locally so invoices can be created even without an internet connection.',
            },
            {
                num: '06',
                name: 'Clean Dashboard UI',
                desc: 'Minimal Bootstrap-based interface designed for speed — zero onboarding friction, keyboard-friendly, and accessible from mobile and desktop alike.',
            },
        ],
        challenges: [
            {
                type: 'challenge',
                title: 'PDF Layout Consistency Across Browsers',
                desc: 'Different browsers render HTML differently, causing jsPDF to produce inconsistent invoice layouts — fonts shifted, tables broke, and logo positions drifted between Chrome and Safari.',
            },
            {
                type: 'learning',
                title: 'Canvas-Based PDF Rendering',
                desc: 'Switched to a canvas-capture approach using html2canvas + jsPDF — rendering the invoice DOM element as a pixel-perfect image before embedding it in the PDF, eliminating all cross-browser inconsistencies.',
            },
            {
                type: 'challenge',
                title: 'UPI QR Deep-Link Formatting',
                desc: "India's UPI specification requires a precise URI format for QR codes to pre-fill merchant ID, name, and amount — any deviation causes payment apps to reject the QR entirely.",
            },
            {
                type: 'learning',
                title: 'UPI URI Spec & Dynamic QR Generation',
                desc: 'Studied the NPCI UPI deep-link specification thoroughly and built a URI composer that correctly encodes merchant VPA, name, and transaction amount — validated against PhonePe, GPay, and Paytm.',
            },
            {
                type: 'challenge',
                title: 'Firebase Firestore Cost & Read Efficiency',
                desc: 'Naively structured Firestore queries triggered unnecessary reads on every UI re-render, which could spiral costs at scale for a free-tier app.',
            },
            {
                type: 'learning',
                title: 'Optimistic UI + Batched Writes',
                desc: 'Implemented local state as the source of truth with React context, using Firebase as a sync layer — batch writes reduced round-trips and onSnapshot listeners replaced polling, keeping reads minimal.',
            },
        ],
    },

    birdspeciesdetection: {
        id: 'birdspeciesdetection',
        title: 'Bird Species Detection',
        subtitle: 'Deep Learning · Fine-Grained Visual Classification',
        demo: '',
        github: 'https://github.com/MeGH2711/birdspeciesrecognition',
        year: '2025',
        type: 'ML Research',
        status: 'Research Phase',
        statusVariant: 'research',
        theme: 'theme-amber',
        thumb: {
            type: 'bird',
            label: 'Bird Species AI',
        },
        badges: [
            { label: 'Completed', variant: 'green' },
            { label: 'Research Phase', variant: 'amber' },
            { label: 'Open Source', variant: 'violet' },
        ],
        metrics: [
            { label: 'Final Accuracy', value: '87.12% Test Set', accent: 'green' },
            { label: 'Classes Supported', value: '200 Bird Species', accent: 'blue' },
            { label: 'Architecture', value: 'ViT-B/16 Transformer', accent: 'violet' },
            { label: 'Dataset Size', value: '11,788 Images', accent: 'amber' },
        ],
        tech: ['Python', 'PyTorch', 'ViT-B/16', 'CUB-200-2011', 'NumPy', 'Matplotlib', 'scikit-learn', 'FP16/AMP'],
        contributors: [
            {
                name: 'Konark Karia',
                handle: '@konarkk12',
                url: 'https://github.com/konarkk12',
            },
        ],
        vision: {
            problem:
                'Manual bird species identification demands expert ornithologists — a resource that is scarce, slow, and inaccessible for large-scale biodiversity monitoring and citizen science.',
            solution:
                'A fine-tuned Vision Transformer (ViT-B/16) trained on a meticulously cleaned CUB-200-2011 dataset, with custom stratified splits, advanced augmentation, and thorough misclassification analysis — achieving 87.12% accuracy on 200 species.',
            audience:
                'Ornithologists, AI researchers, wildlife conservation bodies, birdwatchers, and citizen scientists who need scalable, automated species recognition without expert dependency.',
        },
        progression: {
            title: 'Accuracy Progression',
            iconColor: 'amber',
            metricSuffix: '%',
            milestones: [
                { label: 'ResNet18 Baseline', val: 55, color: 'neutral' },
                { label: 'ViT · Min. Augmentation', val: 84, color: 'blue' },
                { label: 'ViT · Stronger Augmentation', val: 86, color: 'blue' },
                { label: 'Custom 80:10:10 Split', val: 88, color: 'violet' },
                { label: 'External Images Added', val: 89.4, color: 'green' },
                { label: 'After Mislabel Removal', val: 87.12, color: 'amber' },
            ],
            note: '⬆ Cleaning mislabeled images reduced accuracy from 89.4% → 87.12%, but produced a more <em>reliable</em> evaluation environment — a deliberate, principled trade-off.',
        },
        features: [
            {
                num: '01',
                name: 'Vision Transformer (ViT-B/16) Backbone',
                desc: 'Leverages self-attention across 196 image patches for global receptive field — far superior to CNNs for fine-grained recognition where subtle inter-class differences matter most.',
            },
            {
                num: '02',
                name: 'Custom Stratified Dataset Split',
                desc: 'Replaced the default 50:50 train/test split with a stratified 80:10:10 split — ensuring minority classes are proportionally represented in validation and test sets for reliable evaluation.',
            },
            {
                num: '03',
                name: 'Manual Data Cleaning Pipeline',
                desc: 'Identified and removed 60+ mislabeled or corrupted images using t-SNE/PCA outlier detection, manual verification, and bounding box consistency checks — improving evaluation integrity.',
            },
            {
                num: '04',
                name: 'Advanced Data Augmentation',
                desc: 'Applied RandomResizedCrop, horizontal & vertical flips, small-angle rotations, color jitter, and ImageNet normalization — simulating real-world lighting, pose, and background variation.',
            },
            {
                num: '05',
                name: 'Misclassification Clustering Analysis',
                desc: 'Deep-dived into 70.2% of errors occurring within the same bird family — identifying systematic confusion patterns among Warblers, Sparrows, and Thrushes to guide future improvements.',
            },
            {
                num: '06',
                name: 'Mixed Precision Training (FP16/AMP)',
                desc: 'AdamW optimizer with cosine annealing, gradient clipping, and FP16 Automatic Mixed Precision — enabling stable 50-epoch training with early stopping and minimal overfitting.',
            },
        ],
        challenges: [
            {
                type: 'challenge',
                title: 'Severe Dataset Imbalance & Label Noise',
                desc: 'CUB-200-2011 contains classes ranging from 30 to 60+ images, and ~4% of images are mislabeled or ambiguous — creating a noisy evaluation environment that inflates apparent accuracy.',
            },
            {
                type: 'learning',
                title: 'Stratified Splitting + Outlier-Based Cleaning',
                desc: 'Built a custom stratified splitter preserving class proportions across all three sets, combined with t-SNE and PCA anomaly detection to systematically surface and remove mislabeled images.',
            },
            {
                type: 'challenge',
                title: 'Fine-Grained Confusion Within Bird Families',
                desc: '70.2% of misclassifications occur within the same family — species like Brewer\'s vs. Clay-colored Sparrows differ only by faint plumage tones, causing the model to collapse on superficial cues.',
            },
            {
                type: 'learning',
                title: 'Misclassification Clustering for Targeted Improvement',
                desc: 'Categorized all errors into same-family vs. cross-family buckets and visualised confusion hotspots — informing future directions like part-based attention (head, wings, tail) and hierarchical classification.',
            },
            {
                type: 'challenge',
                title: 'Accuracy–Quality Trade-off After Cleaning',
                desc: 'Removing 60+ mislabeled images slightly reduced overall accuracy from 89.4% to 87.12% — counterintuitive at first, since the model previously benefited from memorising noisy labels.',
            },
            {
                type: 'learning',
                title: 'Reliability Over Raw Accuracy',
                desc: 'Learned that a clean evaluation set is more scientifically valid than a high number on a noisy benchmark. 87.12% on verified data is a stronger claim than 89.4% on a mislabeled set.',
            },
        ],
    },

    hiedetection: {
        id: 'hiedetection',
        title: 'Neonatal HIE',
        titleSub: ' Lesion Segmentation',
        subtitle: 'Medical AI · Deep Learning · Image Segmentation',
        demo: '',
        github: 'https://github.com/MeGH2711/hiedetection',
        year: '2025',
        type: 'Research · AI/ML',
        status: 'In Development',
        statusVariant: 'dev',
        theme: 'theme-teal',
        thumb: {
            type: 'brain',
            label: '2.5D Swin-UNet',
        },
        badges: [
            { label: 'Research Phase', variant: 'amber' },
            { label: 'Deep Learning', variant: 'teal' },
            { label: 'Medical AI', variant: 'violet' },
        ],
        metrics: [
            { label: 'Test Dice Score', value: '0.542 Dice', accent: 'teal' },
            { label: 'Test Mean IoU', value: '0.421 IoU', accent: 'violet' },
            { label: 'vs. ADC Baseline', value: '+0.28 Dice Gain', accent: 'green' },
            { label: 'Dataset Size', value: '133 Neonates', accent: 'amber' },
        ],
        tech: ['PyTorch', 'MONAI', 'Swin-UNet', 'SimpleITK', 'NumPy', 'OpenCV', 'NIfTI', 'Google Colab'],
        modelConfig: [
            { label: 'Model', value: '2.5D Swin-UNet' },
            { label: 'Params', value: '~28M Parameters' },
            { label: 'Input', value: '6-channel (3 ADC + 3 Z-ADC slices)' },
            { label: 'Img Size', value: '224 × 224 px' },
            { label: 'Loss', value: '0.5 × Dice + 0.5 × BCE' },
            { label: 'Optimizer', value: 'AdamW (LR=1e-4)' },
        ],
        contributors: [
            {
                name: 'Dharmi Vekariya',
                handle: '@Dharmi01',
                url: 'https://github.com/Dharmi01',
            },
            {
                name: 'Devanshi Pathak',
                handle: '@devanshi523',
                url: 'https://github.com/devanshi523',
            },
        ],
        vision: {
            problem:
                'Neonatal Hypoxic-Ischemic Encephalopathy (HIE) affects 1–5 per 1,000 live births worldwide — 750,000 cases annually. Despite treatment, ~1/3 of infants still die or develop neurocognitive deficits. Current best DL segmentation achieves only ~0.5 Dice, far below the 0.8+ seen in brain tumor benchmarks.',
            solution:
                'A 2.5D Swin-UNet architecture with 6-channel input (ADC + Z-ADC triplet stacks) that gives the transformer volumetric spatial context without full 3D overhead. Combined Dice+BCE loss with pos_weight=30 addresses extreme class imbalance where over 55% of patients have lesions occupying less than 1% of brain volume.',
            audience:
                'Neonatal neurologists, neuroradiologists, and clinical AI researchers working on early brain injury diagnosis. The BONBID-HIE public dataset (133 patients, 5 expert consensus annotations) makes this directly reproducible for medical imaging researchers.',
        },
        pipeline: {
            title: 'Architecture Overview',
            iconColor: 'teal',
            steps: [
                { label: 'Input', sub: '6×224×224', desc: 'ADC+ZADC 2.5D Stack', color: 'teal' },
                { label: 'Patch Partition', sub: '4×4 patches', desc: '→ Token Embeddings', color: 'violet' },
                { label: 'Swin Encoder', sub: '4 Stages', desc: 'W-MSA + SW-MSA', color: 'violet' },
                { label: 'Bottleneck', sub: 'Embed 768', desc: 'Global Context', color: 'amber' },
                { label: 'Swin Decoder', sub: '4 Stages', desc: 'Skip Connections', color: 'violet' },
                { label: 'Output', sub: '1×224×224', desc: 'Binary Lesion Mask', color: 'green' },
            ],
            results: [
                { label: 'Test Mean Dice', value: '0.542', note: 'slice-level avg' },
                { label: 'Test Mean IoU', value: '0.421', note: 'Jaccard index' },
                { label: 'Best Val Dice', value: '0.561', note: 'peak checkpoint' },
                { label: 'vs ZADC@−2.0', value: '≈ Matches', note: 'published baseline' },
            ],
        },
        features: [
            {
                num: '01',
                name: '2.5D Transformer Architecture',
                desc: 'Stacks adjacent MRI slices (i−1, i, i+1) from both ADC and Z-ADC maps into a 6-channel input, giving the Swin-UNet volumetric 3D context without the compute cost of full 3D attention.',
            },
            {
                num: '02',
                name: 'Swin-UNet with Skip Connections',
                desc: 'Pure transformer encoder-decoder with Window Multi-Head Self-Attention (W-MSA) and Shifted Window Attention (SW-MSA). ~28M parameters capturing long-range anatomical dependencies across the neonatal brain.',
            },
            {
                num: '03',
                name: 'Extreme Class Imbalance Handling',
                desc: 'Combined Dice + BCE loss (0.5:0.5) with BCE pos_weight=30 specifically addresses the severe imbalance where lesion voxels may represent <1% of total brain volume in the majority of patients.',
            },
            {
                num: '04',
                name: 'Z-ADC Dual-Channel Input',
                desc: 'Z-score normalized ADC maps (ZADC) quantify voxel-wise deviations from a healthy neonatal atlas — ZADC@−2 alone achieves 0.54 Dice, and combining it with raw ADC as a 6-channel input enriches feature representation.',
            },
            {
                num: '05',
                name: 'BONBID-HIE Dataset Integration',
                desc: 'Trained on the first public neonatal HIE MRI dataset — 133 patients across GE 1.5T and Siemens 3T scanners with multi-expert consensus annotations from 5 neuroradiologists, split 89/44 train/test.',
            },
            {
                num: '06',
                name: 'Preprocessing & Augmentation Pipeline',
                desc: 'End-to-end pipeline: skull stripping, percentile clipping [p1, p99], volume normalization, .mha → NIfTI conversion, and augmentations (random flips, 90° rotations, brightness jitter ±15%) for robust generalization.',
            },
        ],
        challenges: [
            {
                type: 'challenge',
                title: 'Severe Class Imbalance (<1% Lesion Voxels)',
                desc: 'Over 55% of patients have lesions occupying less than 1% of total brain volume — naive cross-entropy loss caused the model to predict "no lesion" everywhere and still achieve 99%+ pixel accuracy while Dice remained near zero.',
            },
            {
                type: 'learning',
                title: 'Dice + BCE Combined Loss with pos_weight=30',
                desc: 'Replaced standard loss with a 0.5×DiceLoss + 0.5×BCEWithLogitsLoss combination; the BCE pos_weight=30 aggressively penalizes missed lesion voxels, forcing the model to locate even tiny focal abnormalities.',
            },
            {
                type: 'challenge',
                title: 'Multi-Scanner Domain Gap (GE 1.5T vs Siemens 3T)',
                desc: 'The dataset spans two scanner types with different field strengths and signal characteristics. Without careful normalization, the model learns scanner-specific artifacts rather than lesion features, causing poor generalization.',
            },
            {
                type: 'learning',
                title: 'Z-ADC Maps as Scanner-Invariant Features',
                desc: 'Z-score normalized ADC maps (ZADC) express each voxel as deviation from a healthy neonatal atlas, effectively normalizing away scanner-specific intensity ranges and providing a physically meaningful lesion signal.',
            },
            {
                type: 'challenge',
                title: 'Boundary Slice Artifacts in 2.5D Stacking',
                desc: 'Slices at the start/end of each MRI volume have no valid neighboring slices, creating undefined channels in the 2.5D triplet input and causing erratic predictions at volume boundaries during inference.',
            },
            {
                type: 'learning',
                title: 'Boundary Padding with Slice Repetition',
                desc: 'Implemented boundary repeat padding — the first slice is replicated for the "i−1" channel and the last slice for the "i+1" channel at volume edges. This ensures all slices receive valid 6-channel input consistently.',
            },
        ],
    },

    roadmarkingsegmentation: {
        id: 'roadmarkingsegmentation',
        title: 'Road Marking Segmentation',
        subtitle: 'Semantic Segmentation · Ensemble Deep Learning · Domain Adaptation',
        demo: '',
        github: 'https://github.com/MeGH2711/roadmarkingsegmentation',
        year: '2025',
        type: 'CV Research',
        status: 'Research Phase',
        statusVariant: 'research',
        theme: 'theme-amber',
        thumb: {
            type: 'road',
            label: 'Road Marking Segmentation',
        },
        badges: [
            { label: 'Completed', variant: 'green' },
            { label: 'Research Phase', variant: 'amber' },
            { label: 'Open Source', variant: 'violet' },
        ],
        metrics: [
            { label: 'Best mIoU', value: 'Ensemble Soft Vote', accent: 'green' },
            { label: 'Architectures', value: 'DeepLabV3+ & SegFormer', accent: 'blue' },
            { label: 'Loss Function', value: 'Dice + CrossEntropy', accent: 'violet' },
            { label: 'Dataset', value: 'CeyMo', accent: 'amber' },
        ],
        tech: [
            'Python',
            'PyTorch',
            'DeepLabV3+',
            'SegFormer',
            'ResNet-101',
            'MiT-B2',
            'Albumentations',
            'HuggingFace Transformers',
            'FP16/AMP',
            'YOLO Polygon Masks',
            'OpenCV',
        ],
        contributors: [
            {
                name: 'Devanshi Pathak',
                handle: '@devanshi523',
                url: 'https://github.com/devanshi523',
            },
            {
                name: 'Dharmi Vekariya',
                handle: '@Dharmi01',
                url: 'https://github.com/Dharmi01',
            },
            {
                name: 'Konark Karia',
                handle: '@konarkk12',
                url: 'https://github.com/konarkk12',
            },
        ],
        vision: {
            problem:
                'Road marking detection in autonomous driving and drone-based infrastructure inspection is an unsolved precision problem — existing single-model segmenters trained on one domain fail catastrophically when deployed on footage from different camera angles, resolutions, or geographies. Labels like lane lines, arrows, crosswalks, and stop lines require pixel-perfect delineation that standard classifiers cannot deliver.',
            solution:
                'A two-stage ensemble pipeline: DeepLabV3+ (ResNet-101 backbone with ASPP) and SegFormer (MiT-B2 transformer) are independently trained on CeyMo road marking data, then domain-adapted via fine-tuning on AU drone footage. Their predictions are fused via Soft Voting (probability averaging) and Hard Voting (per-pixel majority), with Test-Time Augmentation — consistently outperforming any single model on mIoU.',
            audience:
                'Autonomous vehicle researchers, smart city infrastructure teams, drone-based road inspection agencies, and transportation authorities that need scalable, high-accuracy road marking analysis across diverse geographies.',
        },
        progression: {
            title: 'mIoU Progression',
            iconColor: 'amber',
            metricSuffix: '%',
            milestones: [
                { label: 'DeepLabV3+ — Pre-train (CeyMo)', val: 61, color: 'neutral' },
                { label: 'SegFormer — Pre-train (CeyMo)', val: 65, color: 'blue' },
                { label: 'DeepLabV3+ — Fine-tuned (AU Drone)', val: 72, color: 'blue' },
                { label: 'SegFormer — Fine-tuned (AU Drone)', val: 75, color: 'violet' },
                { label: 'Hard Vote Ensemble', val: 77, color: 'green' },
                { label: 'Soft Vote Ensemble + TTA', val: 80, color: 'amber' },
            ],
            note: '⬆ Ensemble Soft Vote + TTA achieves the highest mIoU — outperforming both individual models by fusing DeepLabV3+\'s local precision with SegFormer\'s <em>global spatial coherence</em>.',
        },
        archGrid: {
            title: 'Ensemble Architecture',
            iconColor: 'blue',
            cards: [
                {
                    label: 'DeepLabV3+',
                    sub: 'ResNet-101 · ASPP',
                    accent: 'blue',
                    desc: 'CNN-based local feature extractor with multi-scale dilated convolutions. Strong on fine boundaries and small-scale road markings.',
                },
                {
                    label: 'SegFormer',
                    sub: 'MiT-B2 · Transformer',
                    accent: 'violet',
                    desc: 'Hierarchical attention-based encoder. Captures long-range spatial relationships — superior for large continuous lane lines.',
                },
                {
                    label: 'Soft Vote',
                    sub: 'Probability Averaging',
                    accent: 'green',
                    desc: 'Averages calibrated softmax probabilities per pixel. Best ensemble strategy — reduces boundary artefacts and uncertain regions.',
                },
                {
                    label: 'Hard Vote',
                    sub: 'Per-Pixel Majority',
                    accent: 'amber',
                    desc: 'Each model casts a class vote per pixel, majority wins. Fast and interpretable, but loses calibration on uncertain boundaries.',
                },
            ],
        },
        features: [
            {
                num: '01',
                name: 'DeepLabV3+ with ASPP (ResNet-101)',
                desc: 'Atrous Spatial Pyramid Pooling with dilated convolutions at rates [6, 12, 18] captures multi-scale context — critical for detecting road markings at varying distances and camera heights in drone footage.',
            },
            {
                num: '02',
                name: 'SegFormer Transformer (MiT-B2)',
                desc: 'HuggingFace SegFormerForSemanticSegmentation with Mix Transformer B2 backbone — self-attention across patch hierarchies captures long-range spatial dependencies that CNNs miss, especially for large continuous markings.',
            },
            {
                num: '03',
                name: 'Soft Vote + Hard Vote Ensemble',
                desc: 'Soft voting averages calibrated softmax probabilities per pixel; hard voting applies per-pixel majority class. Both strategies are benchmarked against individual models — with soft vote consistently winning on mIoU.',
            },
            {
                num: '04',
                name: 'YOLO Polygon → Semantic Mask Pipeline',
                desc: 'Custom converter transforms YOLO-format normalised polygon coordinates into pixel-level semantic masks — enabling seamless use of YOLO-annotated datasets for dense prediction tasks without re-labelling.',
            },
            {
                num: '05',
                name: 'Domain Adaptation: CeyMo → AU Drone',
                desc: 'Phase-1 pre-training on CeyMo road marking dataset establishes rich segmentation priors; Phase-2 fine-tuning on AU Drone frames adapts the model to aerial perspective, reducing domain shift without catastrophic forgetting.',
            },
            {
                num: '06',
                name: 'Dice + Cross-Entropy Hybrid Loss',
                desc: 'Combined loss (0.6× CrossEntropy + 0.4× Dice) with FP16 AMP, gradient clipping, and cosine annealing — stabilises training on imbalanced road marking classes where background pixels dominate.',
            },
            {
                num: '07',
                name: 'Test-Time Augmentation (TTA)',
                desc: 'Horizontal flip TTA applied at inference on both models before ensembling — averaging predictions across augmented views to reduce boundary artifacts and boost consistency on asymmetric markings.',
            },
            {
                num: '08',
                name: 'Per-Class IoU Analysis & CSV Export',
                desc: 'Full per-class IoU breakdown across all road marking categories (lanes, arrows, crosswalks, stop lines) exported as CSV and visualised as grouped bar charts — enabling systematic identification of weak classes.',
            },
        ],
        challenges: [
            {
                type: 'challenge',
                title: 'Extreme Class Imbalance in Road Markings',
                desc: 'Background pixels dominate road marking datasets by a factor of 50:1 — standard CrossEntropy training collapses to predicting background, making rare classes like stop lines and directional arrows near-invisible to the model.',
            },
            {
                type: 'learning',
                title: 'Hybrid Dice + CrossEntropy Loss Stabilises Rare Classes',
                desc: 'Combining Dice loss (class-balanced by design) with weighted CrossEntropy forces the model to attend to rare markings. The 60:40 CE–Dice ratio was tuned empirically to balance overall accuracy with per-class fairness.',
            },
            {
                type: 'challenge',
                title: 'Domain Shift Between Ground-Level and Drone Footage',
                desc: 'Models pre-trained on ground-level CeyMo images failed on AU Drone aerial data — perspective distortion, vanishing point shifts, and scale differences caused mIoU to drop dramatically without adaptation.',
            },
            {
                type: 'learning',
                title: 'Two-Phase Training with Pseudo-Label Bootstrapping',
                desc: 'Phase-1 CeyMo pre-training provides generalised road marking priors; Phase-2 fine-tuning on AU Drone data adapts geometry. Pseudo-labels generated from unlabelled drone frames further bootstrapped the fine-tuning set.',
            },
            {
                type: 'challenge',
                title: 'Ensemble Calibration: When Do Two Models Disagree?',
                desc: 'DeepLabV3+ excels at fine-grained local boundaries while SegFormer captures long-range coherence — their disagreements on thin markings (lane dashes, painted arrows) required careful calibration to avoid soft-vote blurring.',
            },
            {
                type: 'learning',
                title: 'Soft Vote Beats Hard Vote on Boundary Pixels',
                desc: 'Quantitative evaluation showed soft voting consistently outperformed hard voting, especially on boundary pixels where models had high entropy. Hard voting introduced artefacts when both models were equally uncertain.',
            },
            {
                type: 'challenge',
                title: 'YOLO Polygon Format Not Native to Segmentation Pipelines',
                desc: 'AU Drone dataset annotations used YOLO normalised polygon format — incompatible with standard semantic segmentation loaders that expect per-pixel label masks, requiring a custom polygon rasterisation converter.',
            },
            {
                type: 'learning',
                title: 'Custom YOLO → Mask Converter with OpenCV Rasterisation',
                desc: 'Built a converter using OpenCV fillPoly on normalised polygon coordinates to generate 512×512 semantic masks — enabling reuse of YOLO-annotated datasets for dense segmentation without any re-annotation overhead.',
            },
        ],
    },
};
