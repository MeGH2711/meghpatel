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

    isleschallenge: {
        id: 'isleschallenge',
        title: "MICCAI ISLES'26",
        titleSub: ' Challenge & Benchmark Analysis',
        subtitle: 'Ischemic Stroke Lesion Segmentation · Dual MICCAI Research Papers',
        demo: '',
        github: 'https://github.com/MeGH2711',
        year: '2026',
        type: 'Research · MICCAI Benchmark',
        status: 'Published Baselines',
        statusVariant: 'research',
        theme: 'theme-teal',
        thumb: {
            type: 'brain',
            label: "ISLES'26 Dual Baselines",
        },
        badges: [
            { label: "MICCAI 2026", variant: 'violet' },
            { label: 'Dual Research Papers', variant: 'teal' },
            { label: 'nnU-Net v2 & Mamba SSM', variant: 'blue' },
            { label: '1,453 Stroke MRIs', variant: 'amber' },
        ],
        metrics: [
            { label: "nnU-Net 5-Fold Dice", value: '0.6465 Dice', accent: 'teal' },
            { label: 'Large Lesion Dice', value: '0.7384 Dice', accent: 'green' },
            { label: 'Bottleneck-Mamba', value: '0.5010 Dice', accent: 'blue' },
            { label: 'Dataset Diversity', value: '60+ Global Centers', accent: 'amber' },
        ],
        tech: [
            'PyTorch',
            'nnU-Net v2',
            'Mamba SSM',
            '3D U-Net',
            'MONAI',
            'SimpleITK',
            'NumPy',
            'NIfTI',
            'Automatic Mixed Precision',
            'CUDA',
        ],
        modelConfig: [
            { label: 'Paper #32 Architecture', value: '3D Fullres nnU-Net v2 + ResEnc-M' },
            { label: 'Paper #38 Architecture', value: 'Bottleneck-Mamba 3D U-Net (18.3M params)' },
            { label: 'Dataset Cohort', value: '1,453 T1 MRI Scans across 60+ Centers' },
            { label: 'Voxel Spacing', value: 'Standardized ~1×1×1 mm³ Isotropic' },
            { label: 'Patch Dimensions', value: '128³ (nnU-Net) / 96³ (Mamba)' },
            { label: 'Multifocal Disease', value: '66% of cases contain 2+ lesion components' },
            { label: 'Loss Formulations', value: 'Dice + BCE, Tversky Proposed' },
            { label: 'Hardware Constraint', value: 'Trained on single 8GB GPU memory budget' },
        ],
        contributors: [
            {
                name: 'Megh Patel',
                handle: 'Lead Author (#32) · Co-Author (#38)',
                url: 'https://github.com/MeGH2711',
            },
            {
                name: 'Konark Karia',
                handle: 'Lead Author (#38) · Co-Author (#32)',
                url: 'https://github.com/konarkkaria',
            },
            {
                name: 'Dr. Jayendra Bhalodiya',
                handle: 'Faculty Guide & Mentor (SEAS, Ahmedabad University)',
                url: 'https://ahduni.edu.in',
            },
        ],
        papers: [
            {
                paperNumber: '32',
                tag: "MICCAI ISLES'26 Baseline",
                title: "Investigating Small-Lesion Segmentation Failures in Acute Ischemic Stroke: An nnU-Net Baseline Analysis for ISLES'26",
                shortTitle: 'Small-Lesion Failures in ISLES’26',
                authors: 'Megh Patel and Konark Karia',
                affiliation: 'School of Engineering and Applied Science, Ahmedabad University',
                mentor: 'Dr. Jayendra Bhalodiya Sir',
                file: '/documents/32_Investigating_Small_Lesion_.pdf',
                score: '0.6465 Dice (Overall) · 0.7384 (Large) vs 0.3988 (Small)',
                abstract:
                    'Automated segmentation of ischemic stroke lesions from MRI is a critical step toward scalable clinical decision support, yet performance on small and multifocal lesions remains a persistent bottleneck for existing deep-learning approaches. In this work, we present a baseline nnU-Net-based solution for the ISLES’26 challenge and conduct a size-stratified analysis of its failure modes. Using a 5-fold cross-validation protocol on the ISLES’26 training set (1453 cases), our baseline 3D full-resolution nnU-Net achieves an overall Dice score of 0.6465 (HD95 = 19.92 mm), but performance degrades substantially on small lesions (Dice = 0.3988) relative to large lesions (Dice = 0.7384). We characterize this bottleneck through a size-stratified evaluation and a dataset-level analysis showing that 66% of cases present with multiple, spatially distinct lesion components. We further report a preliminary architectural exploration using a residual-encoder U-Net variant, which improves large- and medium-lesion Dice but does not resolve the small-lesion deficit, suggesting that representational capacity alone is not the limiting factor. We conclude by outlining biologically motivated directions — including contralateral hemispheric symmetry features and vascular territory priors — as promising avenues for future work.',
                keyMetrics: [
                    { label: '5-Fold CV Dice', value: '0.6465 ± 0.28', variant: 'teal' },
                    { label: 'Large Lesions', value: '0.7384 (HD95: 13.1mm)', variant: 'green' },
                    { label: 'Small Lesions', value: '0.3988 (HD95: 38.1mm)', variant: 'amber' },
                    { label: 'ResEnc-M Delta', value: '+0.011 Large / -0.016 Small', variant: 'blue' },
                ],
                keyInsights: [
                    'Built official 5-fold cross-validation benchmark on 1,453 subjects using self-configuring 3D fullres nnU-Net v2 across 60+ global centers.',
                    'Quantified severe size-stratified performance cliff: Dice score collapses from 0.7384 on large infarcts to 0.3988 on small lesions.',
                    'Connected-component analysis revealed 66% of cases present with multiple, spatially distinct lesion components, heavily right-skewed in volume.',
                    'Tested ResEnc-M (residual-encoder U-Net): gains on large (+0.011) and medium (+0.016) lesions did not resolve small-lesion degradation (-0.016), proving model capacity is not the bottleneck.',
                    'Found Largest Connected Component (LCC) post-processing systematically eliminates genuine clinical satellite lesions due to multifocality.',
                    'Identified two physiological priors for future work: Contralateral Hemispheric Asymmetry features and Vascular Territory anatomical priors.',
                ],
            },
            {
                paperNumber: '38',
                tag: "MICCAI ISLES'26 Baseline",
                title: "Bottleneck-Mamba 3D U-Net Baseline for Lesion Segmentation in ISLES'26 Ischemic Stroke: Limited by Precision in Segmenting Small and Multifocal Lesions",
                shortTitle: 'Bottleneck-Mamba 3D U-Net',
                authors: 'Konark Karia and Megh Patel',
                affiliation: 'MTech CSE, SEAS, Ahmedabad University',
                mentor: 'Dr. Jayendra Bhalodiya Sir',
                file: '/documents/38_Bottleneck_Mamba_3D_U_Net_B.pdf',
                score: '0.5010 Val Dice · 0.613 Recall vs 0.433 Precision',
                abstract:
                    'Here, we introduce our first baseline method for the ISLES’26 competition, which requires participants to segment ischemic stroke lesions in native space using T1-weighted MRIs in acute, sub-acute, and chronic phases. Instead of employing the state-of-the-art global context transformer block used by most current segmentation networks, we use a standard encoder-decoder architecture that incorporates a bidirectional state-space (Mamba) layer at the bottleneck in place of the global context block, an approach that scales linearly with sequence length as opposed to quadratic scaling. Trained on a single train/validation split (1235 train / 218 validation out of 1453 cases) with combined Dice and cross-entropy loss, the network achieves a validation Dice of 0.5010. Per-case performance analysis shows that while the network seldom misses lesions, it tends to over-segment them: mean recall is 0.613 vs mean precision of 0.433, widening to 0.214 precision vs 0.478 recall on below-median lesions. In close to a third of lesion-positive cases, the volume is overestimated at least threefold.',
                keyMetrics: [
                    { label: 'Validation Dice', value: '0.5010 Dice', variant: 'blue' },
                    { label: 'Recall vs Precision', value: '0.613 Rec. / 0.433 Prec.', variant: 'teal' },
                    { label: 'Below-Median Precision', value: '0.214 Prec. (3× Drop)', variant: 'amber' },
                    { label: 'Severe Over-prediction', value: '31% cases > 3× volume', variant: 'violet' },
                ],
                keyInsights: [
                    'Engineered linear-time O(N) selective state-space (Mamba SSM) layers at the 3D U-Net bottleneck (18.3M parameters), replacing quadratic-complexity self-attention.',
                    'Engineered custom PyTorch float32 selective scan recurrence for numerical stability under mixed precision in the absence of CUDA kernels.',
                    'Trained within an 8GB GPU memory budget using gradient accumulation across 5 steps (effective batch size 10).',
                    'Discovered the Precision-Recall Paradox: the network reliably captures lesions (0.613 recall) but aggressively over-segments (0.433 precision).',
                    'On below-median lesion sizes, precision plunges 3× to 0.214 (vs 0.478 recall), causing median over-prediction of 1.53× and mean ratio of 17.4×.',
                    'Pinpointed mathematical failure mode of combined Dice+CE on small lesions: tiny denominators fail to penalize proximity false-positive blobs, motivating Tversky loss.',
                ],
            },
        ],
        evaluationTables: {
            title: "MICCAI ISLES'26 Benchmark & Evaluation Matrix",
            description:
                'Quantitative size-stratified evaluation, capacity comparison, and precision-recall trade-off directly extracted from the experimental results in Paper #32 and Paper #38.',
            tables: [
                {
                    id: 'paper32-stratified',
                    paperTag: 'Paper #32',
                    shortTitle: '5-Fold Size Stratification',
                    title: 'Table 1: Baseline 5-Fold Cross-Validation Performance Stratified by Lesion Size (n=1,453)',
                    subtitle: 'Pooled across all 5 folds on the ISLES’26 training cohort. Small lesions suffer a ~34% Dice deficit.',
                    headers: ['Stratum', 'Cases (n)', 'Dice Score (DSC)', 'HD95 (mm)', 'Diagnostic Behavior'],
                    rows: [
                        { cells: ['Overall Cohort', '1453', '0.6465 ± 0.2762', '19.92 mm', 'Strong, stable multi-center baseline across 60+ hospitals'], highlight: true },
                        { cells: ['Large (≥3,016 voxels)', '882', '0.7384 ± 0.2114', '13.11 mm', 'Accurate territorial delineation; loss-dominating component'] },
                        { cells: ['Medium (505–2,993 voxels)', '380', '0.5604 ± 0.2759', '27.10 mm', 'Moderate overlap; partial boundary bleed'] },
                        { cells: ['Small (10–498 voxels)', '186', '0.3988 ± 0.3210', '38.09 mm', 'Severe failure mode; heavily penalized by voxel-wise loss'], highlight: true },
                        { cells: ['Empty (0 voxels)', '5', '0.2000 ± 0.4472', '0.00 mm', 'True negative case evaluation (standardized convention)'] },
                    ],
                    note: 'Fold-wise analysis shows consistency: Small lesion Dice stays between 0.3129 and 0.4401 across all 5 folds, while Large lesion Dice remains steady at 0.7067–0.7548.',
                },
                {
                    id: 'paper32-capacity',
                    paperTag: 'Paper #32',
                    shortTitle: 'Baseline vs. ResEnc-M',
                    title: 'Table 3: Architectural Capacity Exploration — Baseline Plain Conv vs. Residual-Encoder (ResEnc-M)',
                    subtitle: 'Evaluating whether representational capacity per stage resolves the small-lesion bottleneck.',
                    headers: ['Stratum', 'Plain Conv Baseline', 'ResEnc-M (Residual)', 'Delta (Δ)', 'Diagnostic Finding'],
                    rows: [
                        { cells: ['Overall', '0.6644', '0.6734', '+0.009', 'Slight overall gain across the fold'] },
                        { cells: ['Large', '0.7511', '0.7621', '+0.011', 'Benefits from higher representation capacity per stage'] },
                        { cells: ['Medium', '0.5994', '0.6154', '+0.016', 'Benefits from increased encoder depth'] },
                        { cells: ['Small', '0.4277', '0.4117', '-0.016', 'Capacity scaling fails; degrades small lesion segmentation'], highlight: true },
                    ],
                    note: 'Key Insight: Small lesions occupy negligible space at bottleneck scale; increasing stage capacity cannot overcome downsampling loss and voxel-level pooling domination.',
                },
                {
                    id: 'paper38-precision-recall',
                    paperTag: 'Paper #38',
                    shortTitle: 'Precision vs. Recall Gap',
                    title: 'Table 1 (Mamba): Validation-Set Precision & Recall Stratified by Lesion Size (n=218)',
                    subtitle: 'Revealing the Precision-Recall Paradox in Bottleneck-Mamba 3D U-Net.',
                    headers: ['Group', 'Cases (n)', 'Mean Dice', 'Mean Precision', 'Mean Recall', 'Error Mechanism'],
                    rows: [
                        { cells: ['All cases', '218', '0.459', '0.433', '0.613', 'High recall confirms lesions found; precision deficit reflects over-segmentation'], highlight: true },
                        { cells: ['Below-median size', '108', '0.258', '0.214', '0.478', 'Precision drops 3×; small satellite lesions trigger wide false-positive halos'], highlight: true },
                        { cells: ['Above-median size', '108', '0.668', '0.658', '0.748', 'High, balanced segmentation on large territorial infarcts'] },
                    ],
                    note: 'Volume Skew: Median predicted/true ratio is 1.53×, but mean is 17.4×. 31% of cases are over-segmented > 3×, while under-prediction (< 0.5×) occurred in only 5.6%.',
                },
            ],
        },
        vision: {
            problem:
                'Acute ischemic stroke is one of the leading causes of permanent disability worldwide. The MICCAI ISLES’26 challenge pushes medical AI to native-space T1-weighted MRI across 1,453 training cases from 60+ global centers. However, 66% of cases feature multifocal lesions, and standard voxel-wise losses (Dice + CE) cause deep networks to fail on small satellite and lacunar infarcts.',
            solution:
                'A rigorous dual-baseline investigation featuring: (1) an nnU-Net v2 3D fullres baseline with size-stratified failure mode and ResEnc-M capacity exploration (Paper #32), and (2) a linear-complexity Bottleneck-Mamba 3D U-Net (18.3M params) trained on an 8GB GPU memory budget with custom float32 PyTorch selective scan recurrence, uncovering the precision-recall trade-off (Paper #38).',
            audience:
                'Neuroradiologists, medical AI researchers, and clinical decision support engineers aiming to deploy automated stroke segmentation models that generalize robustly across international scanner hardware without missing or ballooning small satellite infarcts.',
        },
        pipeline: {
            title: "ISLES'26 Dual Baseline Architecture Overview",
            iconColor: 'teal',
            steps: [
                { label: 'Multicenter MRI', sub: '1,453 Cases', desc: '60+ Global Centers · ~1mm³', color: 'teal' },
                { label: 'Patch Sampling', sub: '128³ / 96³', desc: 'Foreground-Weighted Sampling', color: 'blue' },
                { label: 'Encoder Stages', sub: '6 vs 5 Stages', desc: 'Plain Conv, ResEnc & Conv-Mamba', color: 'violet' },
                { label: 'Bottleneck', sub: 'Linear SSM', desc: 'Deep Superv. vs Bidirectional Mamba', color: 'amber' },
                { label: 'Decoder & Skips', sub: 'Full Resolution', desc: 'Transposed Convs + Skip Links', color: 'violet' },
                { label: 'Segmentation', sub: 'Binary Mask', desc: 'Size-Stratified Evaluation', color: 'green' },
            ],
            results: [
                { label: 'nnU-Net 5-Fold Dice', value: '0.6465', note: '1,453 subjects' },
                { label: 'Large Lesion Dice', value: '0.7384', note: '≥3016 voxels' },
                { label: 'Bottleneck-Mamba', value: '0.5010', note: '18.3M params' },
                { label: 'Mamba Mean Recall', value: '0.6130', note: 'lesion sensitivity' },
            ],
        },
        archGrid: {
            title: 'Dual Architectural Systems Compared',
            cards: [
                {
                    label: '3D Fullres nnU-Net v2',
                    sub: 'Paper #32 · Plain Convolutional',
                    accent: 'teal',
                    desc: '6 encoder stages (32 to 320 channels), instance normalization, leaky ReLU, deep supervision across resolution scales, 128³ patch size, 500 epochs per fold across 5 stratified folds.',
                },
                {
                    label: 'ResEnc-M Capacity Scaling',
                    sub: 'Paper #32 · Residual Encoder Preset',
                    accent: 'blue',
                    desc: 'Replaces plain convolutional layers with residual blocks at matched compute budget. Achieves +0.011 on Large and +0.016 on Medium, but drops -0.016 on Small lesions.',
                },
                {
                    label: 'Bottleneck-Mamba 3D U-Net',
                    sub: 'Paper #38 · Linear SSM Bottleneck',
                    accent: 'violet',
                    desc: '5-layer 3D U-Net with channels 32–320 (18.3M params). Replaces quadratic attention with 2 stacked bidirectional Mamba layers on the 6³ flattened bottleneck (216 tokens).',
                },
                {
                    label: 'Custom PyTorch Selective Scan',
                    sub: 'Paper #38 · 8GB GPU Implementation',
                    accent: 'amber',
                    desc: 'Custom manual selective scan recurrence in float32 for numerical stability in mixed precision training, paired with 5-step gradient accumulation on 8GB GPU hardware.',
                },
            ],
        },
        features: [
            {
                num: '01',
                name: '3D Full-Resolution nnU-Net v2 Baseline',
                desc: 'Self-configuring biomedical segmentation framework achieving an overall pooled 5-fold cross-validation Dice score of 0.6465 and HD95 of 19.92 mm across 1,453 multi-center stroke cases.',
            },
            {
                num: '02',
                name: 'Size-Stratified Failure Mode Analysis',
                desc: 'Rigorous stratification into Large (0.7384 Dice), Medium (0.5604 Dice), and Small (0.3988 Dice) categories, uncovering the severe clinical vulnerability on small satellite lesions.',
            },
            {
                num: '03',
                name: '66% Multifocal Dataset Characterization',
                desc: 'Connected-component analysis on the ISLES’26 cohort revealed two-thirds of cases harbor multiple distinct lesion components with extreme right-skewed volume distributions up to 120,000 mm³.',
            },
            {
                num: '04',
                name: 'ResEnc-M Capacity Experiment',
                desc: 'Proved that scaling representational capacity via residual encoder blocks improves large (+0.011) and medium (+0.016) lesions but fails on small lesions (-0.016), isolating the downsampling bottleneck.',
            },
            {
                num: '05',
                name: 'Linear-Complexity Bottleneck-Mamba 3D U-Net',
                desc: 'Replaced quadratic-scaling transformers with bidirectional state space models (Mamba SSM) at the bottleneck, delivering global context at linear O(N) complexity with 18.3M parameters.',
            },
            {
                num: '06',
                name: 'Precision-Recall Paradox Discovery',
                desc: 'Per-case evaluation proved the network rarely misses infarcts (Recall = 0.613) but aggressively over-segments (Precision = 0.433), which plummets to 0.214 precision on below-median lesions.',
            },
            {
                num: '07',
                name: 'Mathematical Loss Domination Diagnostic',
                desc: 'Demonstrated why Dice + Cross-Entropy fails on multifocal small lesions: tiny true lesion denominators fail to sufficiently penalize false-positive blobs in proximity to small infarcts.',
            },
            {
                num: '08',
                name: 'Pathophysiological Prior Formulations',
                desc: 'Proposed Contralateral Hemispheric Asymmetry features (leveraging healthy contralateral tissue) and Vascular Territory anatomical priors (basal ganglia, internal capsule) to guide small lesion detection.',
            },
        ],
        challenges: [
            {
                type: 'challenge',
                title: 'Small Lesion Segmentation Degradation (0.3988 Dice)',
                desc: 'In Paper #32, 5-fold cross-validation demonstrated that while large lesions segment accurately at 0.7384 Dice, small lesions plummet to 0.3988 with an HD95 of 38.09 mm across all folds.',
            },
            {
                type: 'learning',
                title: 'Model Capacity Alone Does Not Solve Small Lesions',
                desc: 'Evaluating ResEnc-M demonstrated that higher encoder capacity gained +0.011 on large and +0.016 on medium lesions, but dropped -0.016 on small lesions due to bottleneck downsampling and voxel-wise loss pooling.',
            },
            {
                type: 'challenge',
                title: 'Multifocal Disease (66% Cases) Breaks LCC Post-Processing',
                desc: 'Standard post-processing of keeping only the Largest Connected Component (LCC) failed completely, as it systematically eliminated genuine small satellite lesions present in two-thirds of stroke patients.',
            },
            {
                type: 'learning',
                title: 'Biologically Motivated Hemispheric & Vascular Priors',
                desc: 'Rather than algorithmic brute-forcing, future work is targeted at contralateral hemispheric asymmetry features (unilateral stroke baseline) and vascular territory anatomical atlases for lacunar infarcts.',
            },
            {
                type: 'challenge',
                title: 'Aggressive Over-Segmentation & 3× Volume Skew in Mamba',
                desc: 'In Paper #38, Bottleneck-Mamba achieved 0.613 recall but only 0.433 precision (collapsing to 0.214 precision on below-median lesions). 31% of cases had predicted volumes exceeding 3× ground truth.',
            },
            {
                type: 'learning',
                title: 'Denominator Failure in Dice Loss & Tversky Re-weighting',
                desc: 'Because true small lesions have small denominators in Dice loss, false-positive blobs are under-penalized. This directly motivates shifting to Tversky loss (high α, low β) and tri-directional SegMamba before downsampling.',
            },
            {
                type: 'challenge',
                title: '8GB GPU Budget & Missing Fused Mamba CUDA Kernels',
                desc: 'Volumetric 3D medical data easily exhausts GPU VRAM, and the lack of fused Mamba selective scan CUDA kernels risked numerical instability and memory crashes in PyTorch mixed precision.',
            },
            {
                type: 'learning',
                title: 'Float32 PyTorch Recurrence with Gradient Accumulation',
                desc: 'Implemented manual selective scan recurrence executed in float32 for numerical stability, combined with 5-step gradient accumulation to achieve effective batch size of 10 on a single 8GB GPU.',
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

    shikshaams: {
        id: 'shikshaams',
        title: 'ShikshaAMS',
        subtitle: 'Anti-Proxy Dynamic QR Attendance System · Full-Stack & Security',
        demo: '',
        github: 'https://github.com/MeGH2711/ShikshaAMS',
        year: '2026',
        type: 'Web App · EdTech',
        status: 'Completed',
        statusVariant: 'live',
        theme: 'theme-blue',
        thumb: {
            type: 'text',
            initials: 'SA',
            label: 'ShikshaAMS',
        },
        badges: [
            { label: 'Completed', variant: 'green' },
            { label: 'Anti-Proxy Engine', variant: 'blue' },
            { label: 'Open Source', variant: 'violet' },
        ],
        metrics: [
            { label: 'QR Nonce Cycle', value: '8–10s Rotation', accent: 'blue' },
            { label: 'Device Binding', value: '1-Device-1-Student', accent: 'green' },
            { label: 'Geofence Engine', value: 'Multi-Sample GPS', accent: 'violet' },
            { label: 'Storage Sync', value: 'Dual Cloud & Offline', accent: 'amber' },
        ],
        tech: [
            'React',
            'Vite',
            'Firebase Firestore',
            'Web Crypto (SHA-256)',
            'Canvas & WebGL Fingerprinting',
            'HTML5 QR Code',
            'Geolocation API',
            'Leaflet.js',
            'SheetJS (XLSX)',
            'Canvas Confetti',
        ],
        vision: {
            problem:
                'Traditional college attendance is slow and easily manipulated: calling out roll numbers wastes 15–20 minutes of lecture time, paper sign-in sheets invite forged signatures, and static QR codes get photographed and forwarded to absent classmates on WhatsApp.',
            solution:
                'A multi-layered anti-proxy platform featuring high-contrast projector countdowns with dynamic cryptographic QR codes that rotate every few seconds, hybrid device hardware fingerprinting, indoor GPS geofencing, campus Wi-Fi verification, and automated analytics.',
            audience:
                'Professors, department heads, and academic institutions who need fast, fraud-proof classroom attendance without purchasing expensive biometric scanners or proprietary hardware.',
        },
        archGrid: {
            title: '4-Layer Anti-Proxy Shield',
            iconColor: 'blue',
            cards: [
                {
                    label: 'Dynamic Rotating QR',
                    sub: '8–10s Cryptographic Nonce',
                    accent: 'blue',
                    desc: 'Projector generates dynamic SHA-256 tokens on a live countdown timer. WhatsApp screenshot forwarding is rendered obsolete because tokens expire before they can be sent.',
                },
                {
                    label: 'Device Fingerprinting',
                    sub: '1-Device-1-Student Constraint',
                    accent: 'green',
                    desc: 'Combines Canvas rendering, WebGL GPU parameters, and screen traits. Prevents present students from using Incognito or multiple tabs to mark attendance for absent friends.',
                },
                {
                    label: 'Indoor GPS Geofence',
                    sub: 'Multi-Sample Position Averaging',
                    accent: 'violet',
                    desc: 'Averages 3–6 satellite fixes over 2.5 seconds with adaptive accuracy buffers, eliminating indoor GPS drift while strictly blocking remote scans from dorms.',
                },
                {
                    label: 'Campus Wi-Fi Shield',
                    sub: 'SSID & Subnet Verification',
                    accent: 'amber',
                    desc: 'Verifies connection to the campus network and blocks mobile cellular hotspots, ensuring students are connected directly from inside the institutional perimeter.',
                },
            ],
        },
        features: [
            {
                num: '01',
                name: 'Live Projector Mode with Arrival Ticker',
                desc: 'Classroom projector view featuring dynamic QR code rotation, animated countdown rings, live turnout gauges, audio chimes, and confetti celebration as students scan.',
            },
            {
                num: '02',
                name: 'Zero-Install Mobile Scanner & Digital Pass',
                desc: 'Students access a responsive web scanner directly on their mobile browser without installing any app, receiving an instant cryptographically hashed digital attendance receipt.',
            },
            {
                num: '03',
                name: 'Anti-Proxy Security Audit Log',
                desc: 'Real-time security log that flags, blocks, and categorizes unauthorized attempts (expired tokens, duplicate device usage, and out-of-boundary scans) with student details.',
            },
            {
                num: '04',
                name: 'Interactive Map Geofencing with Leaflet',
                desc: 'Instructors can pin their exact lecture hall coordinates on an interactive Leaflet map and customize the allowed geofence radius (50m to 150m) in one click.',
            },
            {
                num: '05',
                name: 'Bulk Roster Importer & Export Suite',
                desc: 'Drag-and-drop support for Excel (.xlsx, .xls), CSV, and JSON student rosters with automatic column mapping, manual overrides, and one-click audit report exports.',
            },
            {
                num: '06',
                name: 'Turnout Analytics & 75% Defaulter Warning',
                desc: 'Real-time course analytics dashboard calculating per-subject attendance percentages, turnout progress bars, and automated alert rosters for students falling below 75%.',
            },
            {
                num: '07',
                name: 'Dual Cloud & Offline Storage Engine',
                desc: 'Supports live Firebase Firestore cloud synchronization with real-time listeners, alongside an instant offline demo mode synced across browser tabs via BroadcastChannel.',
            },
            {
                num: '08',
                name: 'Role-Based Access (Instructor & Student Scopes)',
                desc: 'Google OAuth authentication with automated role scoping — faculty instructors only view and manage their assigned courses, while students access their personal history.',
            },
        ],
        challenges: [
            {
                type: 'challenge',
                title: 'Eliminating Screenshot Forwarding on Chat Apps',
                desc: 'In standard QR attendance setups, a student in the hall photographs the screen and sends it on WhatsApp, allowing absent classmates to scan from their dorms.',
            },
            {
                type: 'learning',
                title: 'Time-Synchronized Rotating Cryptographic Nonces',
                desc: 'Implemented rolling SHA-256 tokens that regenerate every 8–10 seconds with timestamp and salt validation. Expired tokens are immediately rejected by the verification engine.',
            },
            {
                type: 'challenge',
                title: 'Preventing Multi-Proxy Marking on a Single Phone',
                desc: 'A student physically present in class could attempt to log out, switch to Incognito, or use multiple browser tabs to scan on behalf of 5 absent friends.',
            },
            {
                type: 'learning',
                title: 'Hybrid Hardware & WebGL GPU Fingerprinting',
                desc: 'Constructed a deterministic device fingerprint combining WebGL GPU vendor/renderer strings, Canvas 2D rasterization, screen depth, and CPU concurrency — enforcing a strict 1-device-per-session rule that persists across Incognito tabs.',
            },
            {
                type: 'challenge',
                title: 'Indoor GPS Inaccuracy Causing False Rejections',
                desc: 'Thick concrete walls and indoor lecture halls cause GPS signal bouncing (multipath errors) of ±30m to ±80m, which could incorrectly flag legitimate attendees as out of bounds.',
            },
            {
                type: 'learning',
                title: 'Multi-Sample Averaging with Adaptive Tolerance',
                desc: 'Built an inverse-variance weighted GPS engine that collects 3–6 fixes over 2.5 seconds, discards coarse outlier fixes, and applies an accuracy-scaled tolerance buffer so valid students are never blocked while remote proxies (>250m) are reliably caught.',
            },
            {
                type: 'challenge',
                title: 'Seamless Multi-Tab Sync Without Cloud Lock-in',
                desc: 'Demonstrations across separate browser windows (Instructor screen, Projector screen, and Student phone) required real-time state synchronization even without active Firebase credentials.',
            },
            {
                type: 'learning',
                title: 'Dual Engine with BroadcastChannel Cross-Tab Bus',
                desc: 'Architected a unified storage adapter that transparently switches between Firebase Firestore onSnapshot listeners and a browser BroadcastChannel event bus, ensuring instantaneous live updates in all environments.',
            },
        ],
    },
};

// Aliases for flexible routing
projectsData.isles = projectsData.isleschallenge;
projectsData.isles26 = projectsData.isleschallenge;

