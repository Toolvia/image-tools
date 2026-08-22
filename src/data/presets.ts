import { PresetTool } from '../types';

export const TOOL_PRESETS: PresetTool[] = [
  // ==========================================
  // 1. COMPRESSION TOOLS
  // ==========================================
  {
    id: 'compress-jpg',
    path: '/compress-jpg',
    label: 'Compress JPG / JPEG',
    tool: 'compress',
    category: 'compress',
    badge: 'Popular',
    fromFormat: 'jpg',
    toFormat: 'jpg',
    description: 'Reduce JPG and JPEG file size up to 80% with high quality visual preservation in your browser.',
    metaTitle: 'Compress JPG & JPEG Online Free - Reduce JPG File Size | PicSwift',
    metaDescription: 'Free online JPG compressor. Compress JPEG and JPG images without visual quality loss. 100% private in-browser compression, batch upload support, and instant download.',
    keywords: ['compress jpg', 'reduce jpg size', 'compress jpeg online', 'jpg optimizer', 'shrink jpg file'],
    h1Title: 'Compress JPG & JPEG Images Online',
    h2Subtitle: 'Reduce file size up to 80% without losing visible clarity, all processed securely in your browser.',
    howToSteps: [
      'Upload or drag & drop one or multiple JPG/JPEG photos into the box above.',
      'Adjust the quality slider (recommended 75%–85% for the best quality-to-size ratio).',
      'Preview before and after file sizes instantly, then click "Process All" or download individually.',
    ],
    features: [
      {
        title: 'Smart DCT Chroma Subsampling',
        description: 'Optimizes high-frequency color data that human eyes can rarely perceive, cutting file size dramatically while preserving razor-sharp lines.',
      },
      {
        title: 'Lossless Metadata Stripping',
        description: 'Safely removes bulky camera EXIF tags, GPS geotags, and embedded thumbnails to save an additional 10–25KB per image.',
      },
      {
        title: '100% Browser-Side Privacy',
        description: 'Your sensitive personal photos never touch cloud servers. Everything is calculated in WebAssembly / HTML5 Canvas memory.',
      },
    ],
    faqs: [
      {
        question: 'Will compressing my JPG photos degrade print or visual quality?',
        answer: 'When set between 75% and 85% quality, standard compression yields visually indistinguishable results on 4K displays and social media while reducing bytes by up to 75%.',
      },
      {
        question: 'Can I compress multiple JPG images in batch?',
        answer: 'Yes! PicSwift supports multi-file upload and batch processing. You can download all compressed JPEG files together in a single ZIP file.',
      },
      {
        question: 'Is there any file size or quantity limit?',
        answer: 'Because processing happens on your local device hardware rather than remote servers, you can process dozens of multi-megabyte photos quickly.',
      },
    ],
    deepArticle: {
      heading: 'Why JPEG & JPG Compression Is Essential for Web Performance and SEO',
      paragraphs: [
        'JPEG (Joint Photographic Experts Group) is the most widely adopted image standard on the Internet, powering millions of eCommerce product shots, blogs, and social platforms. However, raw camera JPEGs frequently range between 3MB and 15MB, leading to sluggish webpage loading, high bounce rates, and degraded Google Core Web Vitals rankings (specifically Largest Contentful Paint - LCP).',
        'By utilizing PicSwift’s client-side JPEG optimizer, you can eliminate unnecessary metadata, fine-tune quantization tables, and compress image payloads by up to 80%. This guarantees faster rendering speeds for mobile visitors on cellular connections while preserving vibrant photographic color balances.',
      ],
    },
  },

  {
    id: 'compress-png',
    path: '/compress-png',
    label: 'Compress PNG',
    tool: 'compress',
    category: 'compress',
    badge: 'Popular',
    fromFormat: 'png',
    toFormat: 'png',
    description: 'Optimize transparent PNG images with significantly reduced file size without losing transparent alpha channels.',
    metaTitle: 'Compress PNG Online Free - Shrink PNG File Size with Transparency | PicSwift',
    metaDescription: 'Free PNG image compressor. Reduce PNG file size while preserving crystal-clear alpha transparency and sharp text graphics. Batch support, zero server upload.',
    keywords: ['compress png', 'shrink png', 'png optimizer', 'reduce transparent png size', 'lossless png compress'],
    h1Title: 'Compress PNG Images Online with Transparency',
    h2Subtitle: 'Shrink transparent PNG icons, illustrations, and screenshots while keeping crisp edges and alpha channels.',
    howToSteps: [
      'Drag and drop your transparent or opaque PNG files into the upload area.',
      'Fine-tune the compression balance depending on color depth requirements.',
      'Download your optimized PNGs individually or packaged in a single ZIP archive.',
    ],
    features: [
      {
        title: 'Full Alpha Transparency Preservation',
        description: 'Preserves 8-bit and 32-bit transparent backgrounds without creating ugly dark halos or jagged edge artifacts.',
      },
      {
        title: 'Ideal for UI Elements & Logos',
        description: 'Engineered specifically for vectors, vector exports, UI mockups, charts, and digital brand logos that demand pixel clarity.',
      },
      {
        title: 'Instant Batch Optimization',
        description: 'Process whole folders of icon assets simultaneously without waiting on slow server queues.',
      },
    ],
    faqs: [
      {
        question: 'Does PNG compression remove transparent backgrounds?',
        answer: 'No. PicSwift preserves 100% of the PNG alpha transparency channel, ensuring your logos and icons blend seamlessly over any webpage background.',
      },
      {
        question: 'Why are raw PNG files often larger than JPGs?',
        answer: 'PNG utilizes lossless compression algorithms (DEFLATE), storing every single pixel color value perfectly. Our tool optimizes internal color palettes and line filtering to reduce payload size without visual deterioration.',
      },
    ],
    deepArticle: {
      heading: 'Maximizing Graphic Fidelity with Modern PNG Optimization',
      paragraphs: [
        'Portable Network Graphics (PNG) was created as an improved, non-patented replacement for GIF. While PNG produces razor-sharp graphics for typography and transparent icons, uncompressed screenshots and digital exports can easily bloat web pages with file sizes exceeding 5MB.',
        'PicSwift applies modern palette indexing, filtering passes, and browser-native optimizations to slim down PNG files by 40% to 70%, delivering lightweight UI graphics that load instantaneously across all devices.',
      ],
    },
  },

  {
    id: 'compress-webp',
    path: '/compress-webp',
    label: 'Compress WebP',
    tool: 'compress',
    category: 'compress',
    badge: 'Next-Gen',
    fromFormat: 'webp',
    toFormat: 'webp',
    description: 'Compress modern WebP images to achieve ultra-lightweight website assets for Google PageSpeed 100 scores.',
    metaTitle: 'Compress WebP Online Free - Optimize WebP Images | PicSwift',
    metaDescription: 'Free online WebP compressor. Maximize Google Core Web Vitals speed scores by shrinking WebP files while preserving HDR color accuracy and transparency.',
    keywords: ['compress webp', 'webp optimizer', 'reduce webp file size', 'google pagespeed image compress'],
    h1Title: 'Compress WebP Images Online',
    h2Subtitle: 'Ultra-efficient compression for the next-generation web image format recommended by Google.',
    howToSteps: [
      'Upload your WebP files.',
      'Select your desired compression level.',
      'Save your feather-light WebP photos with 1-click batch download.',
    ],
    features: [
      {
        title: 'Google PageSpeed Optimized',
        description: 'Conforms to strict Web Vitals standards, helping webmasters score 95+ on Google PageSpeed Insights.',
      },
      {
        title: 'Lossy & Lossless Dual Mode',
        description: 'Provides balanced compression algorithms for both complex photographs and simple vector icons.',
      },
      {
        title: 'Ultra-Fast Local Canvas Engine',
        description: 'Compress dozens of WebP assets in milliseconds without transmitting data over the internet.',
      },
    ],
    faqs: [
      {
        question: 'Is WebP better than JPG for websites?',
        answer: 'Yes! WebP images are generally 25% to 35% smaller than comparable JPEGs at equivalent visual quality, and they natively support transparent backgrounds.',
      },
    ],
    deepArticle: {
      heading: 'How WebP Compression Transforms Website Speed and Search Engine Rankings',
      paragraphs: [
        'Developed by Google, WebP uses predictive coding from VP8 video keyframes to compress images far more effectively than legacy JPEG and PNG formats. Search engines prioritize fast-loading websites, making WebP optimization a cornerstone of modern technical SEO.',
      ],
    },
  },

  // ==========================================
  // 2. TARGET KB COMPRESSION (GOVT / EXAM / FORM USE CASES)
  // ==========================================
  {
    id: 'compress-image-to-20kb',
    path: '/compress-image-to-20kb',
    label: 'Compress Image to 20KB',
    tool: 'compress',
    category: 'target-kb',
    badge: 'Govt & Forms',
    targetKB: 20,
    toFormat: 'jpg',
    description: 'Compress and resize photos and signatures to strictly under 20KB for government job portals, UPSC, SSC, and state exams.',
    metaTitle: 'Compress Image to 20KB Online Free (Photo & Signature) | PicSwift',
    metaDescription: 'Easily compress image to 20KB online for free. Ideal for government exam portals, UPSC, SSC, admission forms, and online signatures without blurry text.',
    keywords: ['compress image to 20kb', 'photo compress 20kb', 'reduce image size to 20kb online', 'signature 20kb compress'],
    h1Title: 'Compress Image to Under 20KB Online',
    h2Subtitle: 'Perfect for government exam portals, UPSC, SSC, state jobs, and digital signature uploads.',
    howToSteps: [
      'Upload your passport photo or signature image.',
      'Our intelligent binary-search algorithm automatically tunes compression to hit exactly under 20KB.',
      'Download your compliant 20KB image ready for immediate form submission.',
    ],
    features: [
      {
        title: 'Exact File-Size Targeting',
        description: 'Iteratively computes the highest permissible visual quality that stays strictly within the 20KB threshold.',
      },
      {
        title: 'Signature & Text Crispness',
        description: 'Maintains high contrast on ink signatures and handwriting while discarding background color noise.',
      },
      {
        title: '100% Portal Acceptance Guarantee',
        description: 'Removes hidden metadata tags that often cause portal upload validation errors.',
      },
    ],
    faqs: [
      {
        question: 'Why do government portals mandate 20KB maximum file sizes?',
        answer: 'Many national admission and recruitment portals handle millions of applicants simultaneously and use strict 20KB or 50KB database limits to prevent server bottlenecks.',
      },
      {
        question: 'Will my signature remain legible at 20KB?',
        answer: 'Yes! PicSwift optimizes color depth specifically to preserve black-and-white ink stroke boundaries.',
      },
    ],
    deepArticle: {
      heading: 'Meeting Strict 20KB File Size Limits for Online Applications',
      paragraphs: [
        'Submitting documents for civil service examinations, college admissions, and national ID databases often fails due to strict file size limits (e.g. 10KB to 20KB). Manually resizing photos in general graphics software often results in either oversized files or unreadable blurry images.',
        'PicSwift’s Target KB Engine employs real-time binary search optimization, testing multiple compression coefficients in browser memory within 100 milliseconds to deliver the sharpest possible photo that is guaranteed under 20KB.',
      ],
    },
  },

  {
    id: 'compress-image-to-50kb',
    path: '/compress-image-to-50kb',
    label: 'Compress Image to 50KB',
    tool: 'compress',
    category: 'target-kb',
    badge: 'Visa & Admission',
    targetKB: 50,
    toFormat: 'jpg',
    description: 'Compress photos to under 50KB for university admission forms, bank KYC, visa portals, and job applications.',
    metaTitle: 'Compress Image to 50KB Online Free - Photo Resizer for KYC & Forms | PicSwift',
    metaDescription: 'Reduce image file size to 50KB online. Fast, secure, and free photo compressor for visa applications, KYC verification, passport uploads, and entrance tests.',
    keywords: ['compress image to 50kb', 'reduce photo size to 50kb', 'image resizer 50kb', 'compress jpg to 50kb online free'],
    h1Title: 'Compress Image to Under 50KB Online',
    h2Subtitle: 'Guaranteed compliance with bank KYC, university portals, passport agencies, and visa applications.',
    howToSteps: [
      'Select your document, certificate photo, or portrait.',
      'The engine automatically compresses the file to under 50KB without manual guessing.',
      'Download the processed photo with 1-click.',
    ],
    features: [
      {
        title: 'Auto-Calibrated Quality',
        description: 'Achieves the cleanest visual fidelity while staying safely under 50KB.',
      },
      {
        title: 'Instant In-Browser Processing',
        description: 'Zero wait time and zero data transmitted to third-party servers.',
      },
      {
        title: 'Supports JPG, PNG & WebP',
        description: 'Accepts all standard formats and outputs clean, universally accepted JPEGs.',
      },
    ],
    faqs: [
      {
        question: 'Can I compress a 5MB smartphone photo to 50KB?',
        answer: 'Yes! The tool automatically balances resolution scaling and quantization to cleanly fit under 50KB.',
      },
    ],
    deepArticle: {
      heading: 'Standardizing Photos for 50KB Verification Gateways',
      paragraphs: [
        'Automated KYC (Know Your Customer) systems and e-Visa portals require photos below 50KB to ensure fast server validation. PicSwift makes it easy to convert heavy multi-megabyte camera files into compliant 50KB photos in seconds.',
      ],
    },
  },

  {
    id: 'compress-image-to-100kb',
    path: '/compress-image-to-100kb',
    label: 'Compress Image to 100KB',
    tool: 'compress',
    category: 'target-kb',
    badge: 'KYC & Jobs',
    targetKB: 100,
    toFormat: 'jpg',
    description: 'Reduce image size to under 100KB for resumes, real estate listings, email attachments, and web uploads.',
    metaTitle: 'Compress Image to 100KB Online Free - Reduce Photo Size | PicSwift',
    metaDescription: 'Compress any JPG or PNG image to under 100KB online for free. Ideal for resumes, job boards, real estate photos, and web uploads with zero quality loss.',
    keywords: ['compress image to 100kb', 'reduce photo to 100kb', 'compress picture to 100 kb', 'online photo compressor 100kb'],
    h1Title: 'Compress Image to Under 100KB Online',
    h2Subtitle: 'Optimized for resumes, CVs, real estate listings, and email attachments.',
    howToSteps: [
      'Upload your image.',
      'Let the engine auto-tune compression to under 100KB.',
      'Download your optimized file immediately.',
    ],
    features: [
      {
        title: 'Optimal Balance',
        description: '100KB offers the sweet spot between high resolution clarity and lightweight file size.',
      },
      {
        title: 'Privacy Guaranteed',
        description: 'Safe for confidential IDs, diplomas, and corporate documents.',
      },
      {
        title: 'Batch Ready',
        description: 'Compress multiple files to 100KB simultaneously.',
      },
    ],
    faqs: [
      {
        question: 'Will 100KB photo look good on a printed resume?',
        answer: 'Yes, 100KB is plenty of data to keep a portrait or passport photo sharp when printed at standard CV sizes.',
      },
    ],
    deepArticle: {
      heading: 'The 100KB Standard: Balancing Image Quality and Performance',
      paragraphs: [
        '100KB is universally recognized as the optimal threshold for web email attachments, job board resumes, and mobile-friendly websites. PicSwift delivers the highest optical quality achievable within this target.',
      ],
    },
  },

  {
    id: 'compress-image-to-200kb',
    path: '/compress-image-to-200kb',
    label: 'Compress Image to 200KB',
    tool: 'compress',
    category: 'target-kb',
    badge: 'Web & Blog',
    targetKB: 200,
    toFormat: 'jpg',
    description: 'Compress heavy camera shots and banners to under 200KB for blog articles, Shopify stores, and newsletters.',
    metaTitle: 'Compress Image to 200KB Online Free | PicSwift',
    metaDescription: 'Reduce image file size to under 200KB online for free. Keep high-definition clarity for eCommerce banners, blogs, and Shopify hero images.',
    keywords: ['compress image to 200kb', 'reduce image to 200kb', 'photo compressor 200kb online'],
    h1Title: 'Compress Image to Under 200KB Online',
    h2Subtitle: 'High-definition clarity tailored for blogs, eCommerce banners, and email newsletters.',
    howToSteps: ['Upload images.', 'Automatic 200KB target compression applied.', 'Download your optimized files.'],
    features: [
      { title: 'High-Definition Retention', description: 'Maintains crisp 1080p and 2K resolution while trimming file bulk.' },
      { title: 'Fast Web Delivery', description: 'Speeds up web page loading without sacrificing brand visuals.' },
      { title: 'One-Click Batch ZIP', description: 'Download all processed photos in a single archive.' },
    ],
    faqs: [
      { question: 'Is 200KB suitable for desktop hero banners?', answer: 'Yes, 200KB delivers sharp widescreen visuals with minimal load times.' },
    ],
    deepArticle: {
      heading: 'Optimizing eCommerce and Blog Media at 200KB',
      paragraphs: ['Modern online stores need rich, vibrant imagery that doesn’t slow down checkout pages. Compressing media to under 200KB ensures fast load times and better conversion rates.'],
    },
  },

  // ==========================================
  // 3. CONVERSION TOOLS
  // ==========================================
  {
    id: 'heic-to-jpg',
    path: '/heic-to-jpg',
    label: 'HEIC to JPG',
    tool: 'convert',
    category: 'convert',
    badge: 'iPhone / iOS',
    fromFormat: 'heic',
    toFormat: 'jpg',
    description: 'Convert Apple iPhone HEIC and HEIF photos into universally compatible JPGs directly in your browser.',
    metaTitle: 'Convert HEIC to JPG Online Free (iPhone Photos) | PicSwift',
    metaDescription: 'Free HEIC to JPG converter. Convert iPhone HEIC/HEIF photos to high-quality JPEG images instantly. Batch conversion, 100% private, no file upload to servers.',
    keywords: ['heic to jpg', 'convert heic to jpg', 'iphone photo to jpg', 'heic converter online free', 'heif to jpeg'],
    h1Title: 'Convert HEIC to JPG Online (iPhone Photos)',
    h2Subtitle: 'Turn Apple iPhone .HEIC photos into universally supported JPEG images with zero quality loss.',
    howToSteps: [
      'Select or drag & drop .HEIC or .HEIF photos from your iPhone, Mac, or PC.',
      'PicSwift decodes HEIC color matrices locally in your browser memory.',
      'Download your converted JPG images individually or as a batch ZIP file.',
    ],
    features: [
      {
        title: 'Native Apple HEIC Decoding',
        description: 'Decodes Apple’s proprietary High Efficiency Image Format without requiring iCloud or iTunes.',
      },
      {
        title: 'True Wide Color Gamut (Display P3)',
        description: 'Accurately converts Apple Display P3 color profiles to standard sRGB for consistent colors across all screens.',
      },
      {
        title: 'Complete Private In-Browser Conversion',
        description: 'Your personal photos and family albums remain strictly on your device.',
      },
    ],
    faqs: [
      {
        question: 'Why does my iPhone save photos as .HEIC instead of .JPG?',
        answer: 'Apple uses HEIC (High Efficiency Image Coding) to halve storage usage while supporting 16-bit color depth. However, Windows PC, Android, and many websites cannot open HEIC files natively.',
      },
      {
        question: 'Can I convert multiple HEIC photos at once?',
        answer: 'Yes! PicSwift supports multi-file batch conversion. Upload dozens of iPhone photos and download them all as JPGs in a single ZIP.',
      },
    ],
    deepArticle: {
      heading: 'Understanding HEIC and Why Converting to JPEG is Essential',
      paragraphs: [
        'Starting with iOS 11, Apple introduced High Efficiency Image Coding (HEIC) based on the HEVC video standard. While HEIC excels at conserving internal iPhone storage, compatibility issues frequently arise when transferring files to Windows PCs, uploading to web forms, or sharing with Android users.',
        'PicSwift solves this problem by providing instantaneous in-browser HEIC to JPEG conversion. By performing the decoding directly on your device, you avoid slow upload times and keep your personal photos completely private.',
      ],
    },
  },

  {
    id: 'heic-to-png',
    path: '/heic-to-png',
    label: 'HEIC to PNG',
    tool: 'convert',
    category: 'convert',
    badge: 'iPhone / iOS',
    fromFormat: 'heic',
    toFormat: 'png',
    description: 'Convert iPhone HEIC photos into lossless PNG format with transparent support and crisp edge retention.',
    metaTitle: 'Convert HEIC to PNG Online Free (Lossless Quality) | PicSwift',
    metaDescription: 'Convert Apple HEIC photos to lossless PNG online for free. Ideal for editing iPhone portraits, screenshots, and artwork in Photoshop and graphic design tools.',
    keywords: ['heic to png', 'convert heic to png online', 'iphone heic to lossless png', 'heif to png converter'],
    h1Title: 'Convert HEIC to PNG Online (Lossless)',
    h2Subtitle: 'Transform iPhone photos into uncompressed PNG files for graphic design and photo editing.',
    howToSteps: ['Upload .HEIC files.', 'Local decoding converts to PNG format.', 'Download your lossless PNGs.'],
    features: [
      { title: 'Lossless Visual Precision', description: 'Prevents compression artifacting, perfect for digital art and graphic design workflows.' },
      { title: 'Photoshop & Figma Ready', description: 'Import your iPhone photos directly into design software without compatibility errors.' },
      { title: 'Zero Cloud Uploads', description: 'Processed safely inside your browser memory.' },
    ],
    faqs: [
      { question: 'When should I convert HEIC to PNG instead of JPG?', answer: 'Choose PNG if you plan to edit the image further in Photoshop or Figma, or need maximum uncompressed quality.' },
    ],
    deepArticle: {
      heading: 'Converting Apple HEIC to Lossless PNG for Designers',
      paragraphs: ['Designers working with iPhone photography often need uncompressed PNG files for layering and compositing. PicSwift delivers lossless conversion in seconds.'],
    },
  },

  {
    id: 'png-to-ico',
    path: '/png-to-ico',
    label: 'PNG to ICO (Favicon)',
    tool: 'convert',
    category: 'convert',
    badge: 'Developer',
    fromFormat: 'png',
    toFormat: 'ico',
    description: 'Convert PNG logos into standard multi-size Windows .ICO favicon files (16x16, 32x32, 48x48) for websites.',
    metaTitle: 'PNG to ICO Converter Free - Create Website Favicon.ico | PicSwift',
    metaDescription: 'Convert PNG to ICO favicon online for free. Generates multi-resolution .ico files (16x16, 32x32, 48x48) with alpha transparency for websites and Windows icons.',
    keywords: ['png to ico', 'create favicon ico', 'convert png to ico online', 'favicon generator', 'make favicon.ico'],
    h1Title: 'Convert PNG to ICO Favicon Online',
    h2Subtitle: 'Generate multi-resolution .ICO files for website tab favicons, bookmarks, and Windows desktop apps.',
    howToSteps: [
      'Upload a high-resolution square PNG logo or icon (preferably with a transparent background).',
      'The engine automatically generates 16x16, 32x32, and 48x48 embedded pixel layers.',
      'Download your ready-to-use favicon.ico file and place it in your website root folder.',
    ],
    features: [
      {
        title: 'Multi-Resolution ICO Structure',
        description: 'Embeds 16x16 (browser tabs), 32x32 (taskbar/shortcuts), and 48x48 (desktop icons) into a single binary container.',
      },
      {
        title: 'Full Alpha Transparency',
        description: 'Maintains clean transparent backgrounds without jagged edge pixels or dark borders.',
      },
      {
        title: 'HTML & WordPress Ready',
        description: '100% compliant with standard `<link rel="icon" href="/favicon.ico">` specifications.',
      },
    ],
    faqs: [
      {
        question: 'What is a multi-resolution ICO file?',
        answer: 'A single .ico file contains multiple embedded resolutions so browsers and operating systems can pick the optimal size without blurry auto-scaling.',
      },
    ],
    deepArticle: {
      heading: 'The Importance of a Standard Favicon.ico for Web Branding and SEO',
      paragraphs: [
        'Search engines like Google now display website favicons prominently in mobile and desktop search result snippets. Having a crisp, valid multi-resolution favicon.ico file improves brand recognition, click-through rates, and overall user trust.',
      ],
    },
  },

  {
    id: 'jpg-to-pdf',
    path: '/jpg-to-pdf',
    label: 'JPG / PNG to PDF',
    tool: 'convert',
    category: 'convert',
    badge: 'Document',
    fromFormat: 'jpg',
    toFormat: 'pdf',
    description: 'Convert JPG, PNG, and photo scans into high-quality printable PDF documents in seconds.',
    metaTitle: 'Convert JPG to PDF Online Free - Image to PDF Converter | PicSwift',
    metaDescription: 'Convert JPG and PNG images to PDF document online for free. Combine receipts, photo scans, and certificates into a clean printable PDF. Fast, secure, and private.',
    keywords: ['jpg to pdf', 'convert image to pdf', 'png to pdf', 'combine photos to pdf', 'image to pdf converter free'],
    h1Title: 'Convert JPG & PNG Images to PDF Online',
    h2Subtitle: 'Turn photos, receipts, certificates, and ID scans into clean, shareable PDF documents.',
    howToSteps: [
      'Upload one or more photos (JPG, PNG, WebP).',
      'PicSwift embeds each image at high resolution into an A4/original dimension PDF page.',
      'Download your PDF document ready for printing, emailing, or official submission.',
    ],
    features: [
      {
        title: 'High-Resolution Document Embedding',
        description: 'Renders photos at full pixel resolution without blurry text degradation.',
      },
      {
        title: 'Print-Ready Formatting',
        description: 'Automatically detects portrait vs landscape orientation for optimal page layout.',
      },
      {
        title: 'Zero Server Storage',
        description: 'Documents are assembled entirely in client memory, keeping confidential IDs and invoices 100% private.',
      },
    ],
    faqs: [
      {
        question: 'Is it safe to convert bank statements and ID cards using PicSwift?',
        answer: 'Yes! Because conversion occurs completely in your web browser, no document data is ever transmitted to or stored on external servers.',
      },
    ],
    deepArticle: {
      heading: 'Creating High-Quality PDF Documents from Image Scans',
      paragraphs: [
        'Whether archiving tax receipts, submitting school assignments, or sending signed contract photos, converting loose JPEG files into a standardized PDF ensures universal viewing compatibility on all devices and operating systems.',
      ],
    },
  },

  {
    id: 'image-to-base64',
    path: '/image-to-base64',
    label: 'Image to Base64',
    tool: 'convert',
    category: 'convert',
    badge: 'Developer',
    fromFormat: 'jpg',
    toFormat: 'base64',
    description: 'Convert images to Base64 Data URI strings for direct embedding into HTML, CSS, React, and JSON payloads.',
    metaTitle: 'Image to Base64 Converter Online Free (Data URI) | PicSwift',
    metaDescription: 'Convert JPG, PNG, WebP, and SVG images to Base64 Data URI string online for free. Copy base64 code for HTML img src, CSS background-image, and API requests.',
    keywords: ['image to base64', 'png to base64', 'jpg to base64 data uri', 'convert image to base64 string', 'base64 image encoder'],
    h1Title: 'Convert Image to Base64 Data URI Online',
    h2Subtitle: 'Generate clean Base64 strings to embed images directly into HTML, CSS, emails, and API JSON payloads.',
    howToSteps: [
      'Drop your PNG, JPG, or SVG image into the upload box.',
      'The engine encodes pixel data into a standard `data:image/...;base64,...` string.',
      'Copy the code with 1 click or download the .txt file.',
    ],
    features: [
      { title: '1-Click Clipboard Copy', description: 'Instantly copy formatted Data URI strings ready for `<img src="...">` or CSS `url(...)`.' },
      { title: 'Reduces HTTP Requests', description: 'Inlining small icons and logos reduces roundtrip network requests, boosting Core Web Vitals.' },
      { title: 'Developer-Friendly Output', description: 'Outputs clean, compliant RFC 2397 Data URI strings.' },
    ],
    faqs: [
      { question: 'When should I use Base64 images?', answer: 'Base64 is ideal for small icons (< 10KB), HTML email templates, and offline web apps where external image hosting is impractical.' },
    ],
    deepArticle: {
      heading: 'Maximizing Frontend Speed with Inlined Base64 Image Assets',
      paragraphs: ['Embedding small graphic assets as Base64 strings eliminates DNS lookups and TCP handshakes, speeding up first contentful paint on high-traffic websites.'],
    },
  },

  {
    id: 'svg-to-png',
    path: '/svg-to-png',
    label: 'SVG to PNG',
    tool: 'convert',
    category: 'convert',
    badge: 'Vector',
    fromFormat: 'svg',
    toFormat: 'png',
    description: 'Render scalable vector graphics (SVG) into crisp, high-resolution raster PNG images with transparent backgrounds.',
    metaTitle: 'Convert SVG to PNG Online Free (High Resolution) | PicSwift',
    metaDescription: 'Convert SVG vector files to high-resolution PNG images online for free. Crisp rasterization, alpha transparency support, and instant download.',
    keywords: ['svg to png', 'convert svg to png online', 'vector to png', 'svg to high res png'],
    h1Title: 'Convert SVG Vector to PNG Online',
    h2Subtitle: 'Rasterize scalable vector graphics into crisp, transparent PNG images for apps, presentations, and social media.',
    howToSteps: ['Upload your .SVG vector file.', 'The browser canvas renders the vector at crisp resolution.', 'Download your transparent PNG.'],
    features: [
      { title: 'Crisp Vector Rasterization', description: 'Maintains pixel-perfect lines and curves at any target dimension.' },
      { title: 'Alpha Transparency', description: 'Preserves SVG transparent viewports cleanly.' },
      { title: 'Universal Compatibility', description: 'Use your vector icons in apps that do not support raw SVG files.' },
    ],
    faqs: [
      { question: 'Will rasterizing SVG to PNG cause pixelation?', answer: 'PicSwift renders SVGs using high-DPI canvas contexts, ensuring ultra-crisp results on Retina displays.' },
    ],
    deepArticle: {
      heading: 'Why Rasterizing SVG to PNG Is Needed for Cross-Platform Apps',
      paragraphs: ['While SVG is standard for modern web browsers, many email clients, video editors, and legacy office suites still require standard raster PNG files.'],
    },
  },

  {
    id: 'png-to-svg',
    path: '/png-to-svg',
    label: 'PNG to SVG',
    tool: 'convert',
    category: 'convert',
    badge: 'Vector',
    fromFormat: 'png',
    toFormat: 'svg',
    description: 'Convert raster PNG and JPG images into scalable SVG vector containers for web design and digital art.',
    metaTitle: 'Convert PNG to SVG Online Free (Vector Image) | PicSwift',
    metaDescription: 'Convert PNG and JPG images to SVG vector format online for free. High-resolution vector embedding for web design, Cricut, and graphic projects.',
    keywords: ['png to svg', 'convert png to svg vector', 'image to svg online free', 'jpg to svg'],
    h1Title: 'Convert PNG & JPG Images to SVG Online',
    h2Subtitle: 'Wrap and embed raster graphics into scalable XML-based SVG files for web and design software.',
    howToSteps: ['Upload PNG or JPG image.', 'Engine packages graphic into scalable SVG XML structure.', 'Download your .SVG file.'],
    features: [
      { title: 'Standard SVG XML Output', description: 'Compatible with Illustrator, Figma, Inkscape, and web browsers.' },
      { title: 'Clean Viewport Scaling', description: 'Enables responsive vector scaling in HTML5.' },
      { title: 'Instant In-Browser Assembly', description: 'Zero waiting on remote server queues.' },
    ],
    faqs: [
      { question: 'Can I open the generated SVG in vector design software?', answer: 'Yes! The resulting SVG opens seamlessly in Figma, Adobe Illustrator, Canva, and modern web browsers.' },
    ],
    deepArticle: {
      heading: 'Leveraging SVG Containers in Modern Responsive Web Layouts',
      paragraphs: ['SVG files allow images to scale fluidly within CSS layouts without breaking container boundaries or requiring complex media queries.'],
    },
  },

  {
    id: 'avif-to-jpg',
    path: '/avif-to-jpg',
    label: 'AVIF to JPG',
    tool: 'convert',
    category: 'convert',
    badge: 'Next-Gen',
    fromFormat: 'avif',
    toFormat: 'jpg',
    description: 'Convert next-generation AVIF images into standard JPG files compatible with all image viewers and editors.',
    metaTitle: 'Convert AVIF to JPG Online Free | PicSwift',
    metaDescription: 'Free online AVIF to JPG converter. Convert modern AVIF photos to standard JPEG format instantly. Fast, batch support, and zero quality loss.',
    keywords: ['avif to jpg', 'convert avif to jpg online', 'avif to jpeg converter free', 'avif photo converter'],
    h1Title: 'Convert AVIF to JPG Online',
    h2Subtitle: 'Transform modern AV1-compressed AVIF images into universally compatible JPEG files.',
    howToSteps: ['Upload .AVIF files.', 'In-browser decoding transforms into standard JPEG.', 'Download your converted files.'],
    features: [
      { title: 'Universal Software Compatibility', description: 'Open your web-downloaded AVIF images in legacy Windows Photo Viewer, Photoshop, and mobile galleries.' },
      { title: 'HDR Tone Mapping', description: 'Accurately maps AVIF high dynamic range color data to standard 8-bit JPEG color.' },
      { title: 'Batch Conversion', description: 'Convert entire folders of AVIF assets in seconds.' },
    ],
    faqs: [
      { question: 'Why can’t my photo editor open AVIF files?', answer: 'AVIF uses the newer AV1 video codec. Many older image editing applications lack native AVIF decoders, making conversion to JPG essential.' },
    ],
    deepArticle: {
      heading: 'Overcoming AVIF Compatibility Limitations with Instant JPG Conversion',
      paragraphs: ['While AVIF offers cutting-edge compression efficiency for web delivery, legacy desktop software and print labs still require standard JPEG files.'],
    },
  },

  {
    id: 'jpg-to-avif',
    path: '/jpg-to-avif',
    label: 'JPG to AVIF',
    tool: 'convert',
    category: 'convert',
    badge: 'Next-Gen',
    fromFormat: 'jpg',
    toFormat: 'webp',
    description: 'Convert JPG photos into modern next-generation web images for blazing fast page loading speeds.',
    metaTitle: 'Convert JPG to AVIF & Next-Gen Formats Online Free | PicSwift',
    metaDescription: 'Convert JPG to next-generation image formats online for free. Boost Google Core Web Vitals and slash page payload by up to 60%.',
    keywords: ['jpg to avif', 'convert jpg to next gen image', 'optimize jpg for web'],
    h1Title: 'Convert JPG to Next-Gen Web Format',
    h2Subtitle: 'Upgrade legacy JPEG photos to next-generation compressed web formats to achieve top PageSpeed scores.',
    howToSteps: ['Upload JPG photos.', 'Select next-gen optimization.', 'Download optimized files.'],
    features: [
      { title: 'Up to 60% File Reduction', description: 'Massive bandwidth savings compared to standard JPEGs.' },
      { title: 'Core Web Vitals Booster', description: 'Accelerates Largest Contentful Paint (LCP) metrics.' },
      { title: 'Local Device Compression', description: 'Fast and private processing directly in your browser.' },
    ],
    faqs: [
      { question: 'How much faster will my website load with next-gen formats?', answer: 'Next-gen formats typically reduce image payload by 40%–60%, significantly improving mobile loading speeds.' },
    ],
    deepArticle: {
      heading: 'Adopting Next-Gen Image Formats for Google Search Ranking Advantage',
      paragraphs: ['Google search algorithms evaluate page experience and loading speed as key ranking factors. Upgrading images to modern formats delivers a direct competitive advantage.'],
    },
  },

  {
    id: 'jpg-to-png',
    path: '/jpg-to-png',
    label: 'JPG to PNG',
    tool: 'convert',
    category: 'convert',
    fromFormat: 'jpg',
    toFormat: 'png',
    description: 'Convert JPG photos to PNG format for high-fidelity editing in graphic design software.',
    metaTitle: 'Convert JPG to PNG Online Free - High Quality Image Converter | PicSwift',
    metaDescription: 'Convert JPG and JPEG images to PNG online for free. Preserves maximum color depth and sharp edges for graphic design. Batch upload and instant download.',
    keywords: ['jpg to png', 'convert jpg to png', 'jpeg to png converter', 'turn jpg into png'],
    h1Title: 'Convert JPG to PNG Online',
    h2Subtitle: 'Transform JPEG photographs into uncompressed PNG files for Photoshop, Figma, and graphic design.',
    howToSteps: ['Upload JPG files.', 'Select PNG output format.', 'Download your lossless PNGs.'],
    features: [
      { title: 'No Re-Compression Artifacts', description: 'PNG preserves all decoded pixel values without introducing secondary JPEG block artifacts.' },
      { title: 'Design Software Ready', description: 'Perfect for preparing assets for Canva, Figma, and Adobe Creative Cloud.' },
      { title: 'Unlimited Free Batching', description: 'Convert multiple files at once without waiting.' },
    ],
    faqs: [
      { question: 'Does converting JPG to PNG make the image look better?', answer: 'While it cannot restore data lost during original JPG compression, PNG prevents any further loss during subsequent editing and saves.' },
    ],
    deepArticle: {
      heading: 'When to Convert JPEG Images to PNG Format',
      paragraphs: ['Graphic designers frequently convert JPGs to PNG when preparing layers, adding text overlays, or creating composite artwork.'],
    },
  },

  {
    id: 'png-to-jpg',
    path: '/png-to-jpg',
    label: 'PNG to JPG',
    tool: 'convert',
    category: 'convert',
    fromFormat: 'png',
    toFormat: 'jpg',
    description: 'Convert large PNG images into lightweight JPGs with a clean white background for web sharing.',
    metaTitle: 'Convert PNG to JPG Online Free - Reduce PNG Size | PicSwift',
    metaDescription: 'Convert PNG to JPG online for free. Auto-fills transparent backgrounds with clean white canvas and reduces file size up to 85%. Batch support.',
    keywords: ['png to jpg', 'convert png to jpg', 'png to jpeg online free', 'change png to jpg'],
    h1Title: 'Convert PNG to JPG Online',
    h2Subtitle: 'Turn heavy PNG screenshots and graphics into lightweight, universally supported JPEG files.',
    howToSteps: ['Upload PNG files.', 'PicSwift cleanly replaces transparency with a crisp white background.', 'Download your lightweight JPGs.'],
    features: [
      { title: 'Clean Solid Background', description: 'Automatically maps transparent alpha pixels to a clean white background.' },
      { title: 'Up to 85% Size Reduction', description: 'Dramatically cuts file size for easier email attachment and faster web uploads.' },
      { title: 'Universal Device Support', description: 'Compatible with every phone, tablet, and legacy photo viewer.' },
    ],
    faqs: [
      { question: 'What happens to transparent backgrounds when converting PNG to JPG?', answer: 'Because JPEG does not support transparency, PicSwift cleanly fills transparent areas with a solid white background.' },
    ],
    deepArticle: {
      heading: 'Why Converting Heavy PNG Screenshots to JPG Saves Massive Storage',
      paragraphs: ['Operating system screenshots often save as heavy multi-megabyte PNG files. Converting them to JPG reduces storage usage by up to 85% with zero perceptible quality loss.'],
    },
  },

  {
    id: 'jpg-to-webp',
    path: '/jpg-to-webp',
    label: 'JPG to WebP',
    tool: 'convert',
    category: 'convert',
    badge: 'Popular',
    fromFormat: 'jpg',
    toFormat: 'webp',
    description: 'Convert JPG to WebP to reduce image payload by up to 40% while preserving photographic color richness.',
    metaTitle: 'Convert JPG to WebP Online Free - Modern Image Format | PicSwift',
    metaDescription: 'Convert JPG images to WebP online for free. Speed up your website loading times and achieve top Google Core Web Vitals rankings.',
    keywords: ['jpg to webp', 'convert jpg to webp', 'jpeg to webp online', 'image to webp converter'],
    h1Title: 'Convert JPG to WebP Online',
    h2Subtitle: 'Upgrade your website photos to the Google-recommended WebP format for 35% smaller file sizes.',
    howToSteps: ['Upload JPG images.', 'Convert to WebP format.', 'Download optimized files.'],
    features: [
      { title: 'Google-Recommended Standard', description: 'Delivers smaller file sizes at equivalent visual quality.' },
      { title: 'Faster Page Loads', description: 'Decreases bandwidth consumption for mobile visitors.' },
      { title: 'Full Browser Compatibility', description: 'Supported natively across Chrome, Safari, Edge, and Firefox.' },
    ],
    faqs: [
      { question: 'Do all modern browsers support WebP?', answer: 'Yes, WebP is supported natively by over 97% of active global web browsers, including Chrome, Safari on iOS/macOS, Firefox, and Edge.' },
    ],
    deepArticle: {
      heading: 'The Web Performance Revolution: Migrating from JPEG to WebP',
      paragraphs: ['Modern web performance guidelines recommend serving images in WebP format to minimize server bandwidth and improve user engagement.'],
    },
  },

  {
    id: 'webp-to-jpg',
    path: '/webp-to-jpg',
    label: 'WebP to JPG',
    tool: 'convert',
    category: 'convert',
    fromFormat: 'webp',
    toFormat: 'jpg',
    description: 'Convert WebP images into standard JPG files for easy editing and sharing across all platforms.',
    metaTitle: 'Convert WebP to JPG Online Free - WebP to JPEG Converter | PicSwift',
    metaDescription: 'Convert WebP images to JPG online for free. Universal compatibility for desktop viewers, photo editors, and social media platforms.',
    keywords: ['webp to jpg', 'convert webp to jpg', 'webp to jpeg online free', 'save webp as jpg'],
    h1Title: 'Convert WebP to JPG Online',
    h2Subtitle: 'Save internet WebP images as universally compatible JPEG photos in seconds.',
    howToSteps: ['Upload WebP files.', 'Convert to standard JPEG.', 'Download your JPGs.'],
    features: [
      { title: 'Universal Compatibility', description: 'Open downloaded web images in any desktop photo editor.' },
      { title: 'High-Quality Preservation', description: 'Maintains crisp sharpness and color fidelity.' },
      { title: 'Instant Local Conversion', description: 'Fast processing without server latency.' },
    ],
    faqs: [
      { question: 'Why can’t some older programs open WebP files?', answer: 'Older software versions and legacy OS builds do not include built-in WebP decoders, requiring conversion to JPG.' },
    ],
    deepArticle: {
      heading: 'Overcoming WebP Incompatibilities in Legacy Software',
      paragraphs: ['When downloading images from modern websites, users frequently encounter WebP files that cannot be imported into older design tools. Converting to JPG solves this instantly.'],
    },
  },

  {
    id: 'png-to-webp',
    path: '/png-to-webp',
    label: 'PNG to WebP',
    tool: 'convert',
    category: 'convert',
    fromFormat: 'png',
    toFormat: 'webp',
    description: 'Convert transparent PNG graphics into lightweight WebP format while preserving 100% alpha transparency.',
    metaTitle: 'Convert PNG to WebP Online Free (With Transparency) | PicSwift',
    metaDescription: 'Convert PNG to WebP online for free. Preserve alpha transparency while cutting file size by up to 60%. Ideal for web icons and UI illustrations.',
    keywords: ['png to webp', 'convert png to webp', 'transparent webp converter', 'png to webp free online'],
    h1Title: 'Convert PNG to WebP Online (With Transparency)',
    h2Subtitle: 'Slash PNG icon and illustration file sizes while preserving razor-sharp edges and transparent backgrounds.',
    howToSteps: ['Upload PNG graphics.', 'Convert to transparent WebP.', 'Download optimized files.'],
    features: [
      { title: 'Alpha Channel Support', description: 'Keeps full transparent background support with zero halo effects.' },
      { title: 'Up to 60% File Savings', description: 'Drastically smaller than equivalent PNG files.' },
      { title: 'Crisp Vector Clarity', description: 'Keeps typography and icon lines sharp.' },
    ],
    faqs: [
      { question: 'Does WebP support transparency as well as PNG?', answer: 'Yes! WebP provides full 8-bit and 24-bit alpha transparency with even smaller file sizes than PNG.' },
    ],
    deepArticle: {
      heading: 'Modernizing Web UI Graphics with Transparent WebP',
      paragraphs: ['Web developers are replacing heavy PNG icons with transparent WebP assets to deliver snappy user interfaces and responsive web designs.'],
    },
  },

  {
    id: 'webp-to-png',
    path: '/webp-to-png',
    label: 'WebP to PNG',
    tool: 'convert',
    category: 'convert',
    fromFormat: 'webp',
    toFormat: 'png',
    description: 'Convert WebP images into lossless PNG format with transparent background preservation.',
    metaTitle: 'Convert WebP to PNG Online Free - Lossless Quality | PicSwift',
    metaDescription: 'Convert WebP images to PNG online for free. Extract transparent graphics and high-resolution photos into uncompressed PNG files.',
    keywords: ['webp to png', 'convert webp to png', 'webp to transparent png', 'save webp as png online'],
    h1Title: 'Convert WebP to PNG Online',
    h2Subtitle: 'Extract web images into uncompressed PNG format for design and editing workflows.',
    howToSteps: ['Upload WebP files.', 'Convert to lossless PNG.', 'Download your PNGs.'],
    features: [
      { title: 'Full Transparency Extraction', description: 'Extracts alpha layers cleanly for editing in Photoshop and Illustrator.' },
      { title: 'Lossless Export', description: 'Prevents generation loss during multi-stage editing.' },
      { title: 'Zero Server Uploads', description: 'Processed safely in your browser.' },
    ],
    faqs: [
      { question: 'Can I edit the converted PNG in Photoshop?', answer: 'Yes, the exported PNG files are fully compatible with all versions of Photoshop, GIMP, and Figma.' },
    ],
    deepArticle: {
      heading: 'Extracting High-Quality Assets from WebP to PNG',
      paragraphs: ['Extracting transparent stickers, icons, and product photos from modern web pages into PNG allows designers to repurpose assets effortlessly.'],
    },
  },

  // ==========================================
  // 4. RESIZE TOOLS (PRESET STANDARDS & PURPOSES)
  // ==========================================
  {
    id: 'resize-image',
    path: '/resize-image',
    label: 'Resize Image Dimensions',
    tool: 'resize',
    category: 'resize',
    badge: 'Popular',
    description: 'Resize image dimensions by exact pixels, percentage scaling, or standard passport & social media presets.',
    metaTitle: 'Resize Image Dimensions Online Free (Pixels & Percentage) | PicSwift',
    metaDescription: 'Free online image resizer. Resize photos by width, height, percentage, or social media and passport presets. Lock aspect ratio and download in batch.',
    keywords: ['resize image', 'image resizer online', 'resize photo pixels', 'scale image percentage', 'resize picture online free'],
    h1Title: 'Resize Image Dimensions Online',
    h2Subtitle: 'Resize photos by exact pixel width/height, percentage scale, or standard passport and social media presets.',
    howToSteps: [
      'Upload your image or batch of photos.',
      'Choose between Standard Presets, Custom Pixels, or Percentage scaling.',
      'Toggle aspect ratio lock if desired, then download your resized images.',
    ],
    features: [
      { title: 'Bicubic High-Quality Interpolation', description: 'Smooth, artifact-free pixel resampling for both upscaling and downscaling.' },
      { title: 'Aspect Ratio Lock', description: 'Prevents image stretching or distortion.' },
      { title: 'Instant Live Dimension Feedback', description: 'Preview resulting pixel dimensions and aspect ratio in real time.' },
    ],
    faqs: [
      { question: 'What is aspect ratio locking?', answer: 'When locked, adjusting width automatically updates height proportionally to prevent unnatural distortion or stretching.' },
    ],
    deepArticle: {
      heading: 'Mastering Pixel Resampling for Web, Print, and Mobile Displays',
      paragraphs: ['Proper image dimension scaling is critical for high-resolution displays. Serving correctly sized images avoids client-side layout shifts and improves page responsiveness.'],
    },
  },

  {
    id: 'resize-passport-photo',
    path: '/resize-passport-photo',
    label: 'Passport & Visa Photo Resizer',
    tool: 'resize',
    category: 'resize',
    badge: '300 DPI Official',
    description: 'Resize and crop photos for US Passport 2x2 in, Schengen Visa 35x45 mm, ID 4x6 cm, and 3x4 cm @ 300 DPI.',
    metaTitle: 'Passport & Visa Photo Resizer Online Free (2x2 in, 35x45mm, 300 DPI) | PicSwift',
    metaDescription: 'Free passport photo resizer. Create compliant 2x2 inch US passport photos, 35x45mm Schengen visa photos, and ID cards at 300 DPI print quality.',
    keywords: ['passport photo resizer', '2x2 photo resize', '35x45 mm passport photo', 'us visa photo resize', '4x6 cm id photo'],
    h1Title: 'Passport & Visa Photo Resizer Online (300 DPI)',
    h2Subtitle: 'Official dimensional standards for US Passport 2×2 in, Schengen Visa 35×45 mm, and international ID cards.',
    howToSteps: [
      'Upload a clear, front-facing portrait photo with neutral background.',
      'Select your target standard: US Passport (2x2 in / 600x600 px), Schengen (35x45 mm), 4x6 cm, or 3x4 cm.',
      'Download your high-resolution 300 DPI photo ready for printing on photo paper or online visa submission.',
    ],
    features: [
      { title: '300 DPI Print Resolution', description: 'Engineered to exact millimeter and inch dimensions at 300 dots per inch for crisp photo printing.' },
      { title: 'Global Embassy Standards', description: 'Complies with US Department of State, EU Schengen, UK, Canada, Australia, and India passport guidelines.' },
      { title: '100% Private', description: 'Biometric portraits never leave your computer.' },
    ],
    faqs: [
      { question: 'What are the dimensions for a US Passport photo in pixels?', answer: 'At 300 DPI print resolution, a standard 2×2 inch US passport photo is exactly 600×600 pixels.' },
      { question: 'What is the standard Schengen visa photo size?', answer: 'The Schengen visa standard is 35×45 mm (approximately 413×531 pixels at 300 DPI).' },
    ],
    deepArticle: {
      heading: 'Meeting Strict Biometric Passport and Visa Photo Requirements',
      paragraphs: [
        'Government passport agencies reject thousands of applications each year due to non-compliant photo dimensions, incorrect aspect ratios, and blurry print resolutions.',
        'PicSwift preconfigures exact millimeter and pixel dimensions at 300 DPI print quality, ensuring your passport and visa photos are ready for online submission or photo lab printing.',
      ],
    },
  },

  {
    id: 'resize-image-for-print-a4',
    path: '/resize-image-for-print-a4',
    label: 'Print & Paper Resizer (A4, A5, 300 DPI)',
    tool: 'resize',
    category: 'resize',
    badge: '300 DPI Print',
    description: 'Resize images for international paper sizes: A4 (2480x3508), A5, A3, US Letter, and 4x6 photo prints @ 300 DPI.',
    metaTitle: 'Resize Image for Print A4, A5, A3 & Photo Prints (300 DPI) | PicSwift',
    metaDescription: 'Resize photos to A4 (2480x3508 px), A5, A3, US Letter, and 4x6 in photo prints at 300 DPI print quality. Free, fast, and high-definition.',
    keywords: ['resize image for print a4', 'a4 image size in pixels 300 dpi', 'resize photo 4x6', 'print photo resizer 300 dpi', 'a3 poster resizer'],
    h1Title: 'Resize Images for Print (A4, A5, A3 & Photo Prints @ 300 DPI)',
    h2Subtitle: 'Prepare artwork and photographs for professional printing at exact 300 DPI resolution.',
    howToSteps: [
      'Upload your graphic, artwork, or high-res photo.',
      'Select your print format (A4, A5, A3, US Letter, 4x6 in, 5x7 in, or 8x10 in).',
      'Download your 300 DPI print-ready file.',
    ],
    features: [
      { title: 'Standard 300 DPI Canvas', description: 'Calculated using standard physical print density formulas for sharp paper results.' },
      { title: 'Framing & Wall Art Ready', description: 'Pre-calibrated for popular 4x6, 5x7, and 8x10 picture frame sizes.' },
      { title: 'Commercial Quality', description: 'Avoids pixelation and blurry edges when sent to digital print shops.' },
    ],
    faqs: [
      { question: 'What is the pixel size of A4 paper at 300 DPI?', answer: 'A standard A4 page (210 × 297 mm) is exactly 2480 × 3508 pixels at 300 DPI.' },
    ],
    deepArticle: {
      heading: 'Understanding Dots Per Inch (DPI) and Physical Paper Dimensions',
      paragraphs: ['Printing digital images requires translating screen pixels into physical ink dots. Preparing files at 300 DPI ensures crisp text and vibrant photographic reproduction on paper.'],
    },
  },

  {
    id: 'resize-amazon-product-image',
    path: '/resize-amazon-product-image',
    label: 'E-Commerce Product Resizer (Amazon, Shopify)',
    tool: 'resize',
    category: 'resize',
    badge: 'E-Commerce',
    description: 'Resize product images for Amazon (2000x2000 px zoom), Shopify (2048x2048), Etsy (2700x2025), and eBay.',
    metaTitle: 'E-Commerce Product Image Resizer (Amazon 2000x2000, Shopify, Etsy) | PicSwift',
    metaDescription: 'Resize eCommerce product photos for Amazon (2000x2000 px zoom), Shopify (2048x2048), Etsy, and eBay. 1:1 square canvas, clean white background, and batch export.',
    keywords: ['amazon product image size', 'resize product photo 2000x2000', 'shopify image resizer', 'etsy listing photo size', 'ebay photo resizer'],
    h1Title: 'E-Commerce Product Image Resizer',
    h2Subtitle: 'Optimize product photography for Amazon, Shopify, Etsy, eBay, and Shopee marketplace listings.',
    howToSteps: [
      'Upload product photos.',
      'Select your target marketplace (Amazon 2000x2000, Shopify 2048x2048, Etsy 2700x2025, or eBay 1600x1600).',
      'Download your optimized product images.',
    ],
    features: [
      { title: 'Enables Amazon High-Res Zoom', description: '2000 × 2000 px resolution activates Amazon’s interactive hover-to-zoom feature to boost buyer confidence.' },
      { title: 'Square 1:1 Standardization', description: 'Creates uniform catalog grids across all eCommerce platforms.' },
      { title: 'Fast Batch Processing', description: 'Resize hundreds of SKU photos in minutes.' },
    ],
    faqs: [
      { question: 'Why does Amazon require 2000x2000 pixel images?', answer: 'Amazon’s product zoom tool requires images of at least 1000px on the longest side, with 2000px recommended for the clearest detail.' },
    ],
    deepArticle: {
      heading: 'How High-Resolution Product Imagery Drives Marketplace Conversion Rates',
      paragraphs: ['In online retail, product imagery is the single most important factor influencing purchase decisions. High-resolution zoom-enabled photos increase trust and reduce product return rates.'],
    },
  },

  {
    id: 'resize-facebook-cover',
    path: '/resize-facebook-cover',
    label: 'Facebook Banner & Cover Resizer',
    tool: 'resize',
    category: 'resize',
    badge: 'Social Media',
    aspectRatio: 820 / 312,
    aspectLabel: '820:312 (FB Cover)',
    description: 'Resize banners for Facebook Profile & Page Cover (820x312), Group Cover (1640x856), and Event Banners (1920x1005).',
    metaTitle: 'Facebook Cover Photo Resizer Online Free (820x312, Groups, Events) | PicSwift',
    metaDescription: 'Resize Facebook cover photos (820x312 px), group headers (1640x856), and event banners online for free. Prevent mobile clipping and blurry banners.',
    keywords: ['facebook cover photo size', 'resize facebook banner', 'fb group cover photo size', 'facebook event banner dimensions'],
    h1Title: 'Facebook Cover & Banner Photo Resizer',
    h2Subtitle: 'Standard dimensions for Facebook Page covers, Group banners, and Event headers with zero mobile cropping.',
    howToSteps: ['Upload your banner photo.', 'Select Facebook Cover standard.', 'Download your crisp cover photo.'],
    features: [
      { title: 'Mobile & Desktop Safe Zone', description: 'Formatted to display cleanly across both desktop screens and mobile apps.' },
      { title: 'Crisp HD Resolution', description: 'Prevents compression blurriness on high-density smartphone screens.' },
      { title: 'Fast 1-Click Export', description: 'Ready to upload directly to Facebook.' },
    ],
    faqs: [
      { question: 'What is the best size for a Facebook Page cover photo?', answer: '820 × 312 pixels for standard desktop viewing, or 1640 × 856 pixels for high-definition displays.' },
    ],
    deepArticle: {
      heading: 'Optimizing Facebook Banners for Desktop and Mobile Devices',
      paragraphs: ['Because Facebook renders header banners differently on mobile versus desktop, using standard dimensions prevents critical text and logos from being cropped.'],
    },
  },

  {
    id: 'resize-youtube-banner',
    path: '/resize-youtube-banner',
    label: 'YouTube Channel Banner & Thumbnail',
    tool: 'resize',
    category: 'resize',
    badge: 'Creator',
    aspectRatio: 2560 / 1440,
    aspectLabel: '2560:1440 (Channel Art)',
    description: 'Resize YouTube Channel Art (2560x1440), Video Thumbnails (1280x720 HD), and YouTube Shorts covers (1080x1920).',
    metaTitle: 'YouTube Banner & Thumbnail Resizer Online Free (2560x1440, 1280x720) | PicSwift',
    metaDescription: 'Resize YouTube banner channel art (2560x1440 px) and HD video thumbnails (1280x720) online for free. Boost video click-through rates with sharp artwork.',
    keywords: ['youtube banner size', 'resize youtube thumbnail', 'youtube channel art resizer', '1280x720 thumbnail maker'],
    h1Title: 'YouTube Banner & Thumbnail Resizer Online',
    h2Subtitle: 'Create responsive 2560×1440 Channel Art and crisp 1280×720 HD Video Thumbnails.',
    howToSteps: ['Upload your channel artwork.', 'Select YouTube Banner (2560x1440) or Thumbnail (1280x720).', 'Download and apply to your YouTube Studio.'],
    features: [
      { title: 'Multi-Device Safe Area', description: '2560 × 1440 px canvas with central 1546 × 423 px safe zone for TV, desktop, and mobile.' },
      { title: 'HD 16:9 Thumbnail Standard', description: '1280 × 720 px dimensions recommended by YouTube for maximum CTR.' },
      { title: 'High-Impact Visuals', description: 'Sharp lines and vibrant colors to make your videos stand out.' },
    ],
    faqs: [
      { question: 'What is the recommended YouTube banner size?', answer: '2560 × 1440 pixels with a minimum safe area of 1546 × 423 pixels for text and logos.' },
    ],
    deepArticle: {
      heading: 'Designing High-Converting YouTube Channel Art and Thumbnails',
      paragraphs: ['Your YouTube channel banner and video thumbnails are the primary visual touchpoints that convert casual viewers into subscribers. Correctly sized assets ensure professional presentation across mobile, desktop, and smart TV apps.'],
    },
  },

  {
    id: 'resize-instagram-photo',
    path: '/resize-instagram-photo',
    label: 'Instagram Post & Story Resizer',
    tool: 'resize',
    category: 'resize',
    badge: 'Social Media',
    aspectRatio: 1,
    aspectLabel: '1:1 Square (1080x1080)',
    description: 'Resize photos for Instagram Square (1080x1080), Portrait 4:5 (1080x1350), Stories & Reels (1080x1920).',
    metaTitle: 'Instagram Photo Resizer Online Free (Square 1:1, Portrait 4:5, Story 9:16) | PicSwift',
    metaDescription: 'Resize photos for Instagram online for free. Support for Square (1080x1080), Portrait 4:5 (1080x1350), and Stories/Reels (1080x1920) without unwanted cropping.',
    keywords: ['instagram photo resizer', 'resize photo for instagram without cropping', '1080x1080 square resizer', 'instagram 4 5 portrait size'],
    h1Title: 'Instagram Post & Story Photo Resizer',
    h2Subtitle: 'Fit photos perfectly into Instagram Square (1:1), Portrait (4:5), and Story/Reels (9:16) formats.',
    howToSteps: ['Upload photo.', 'Select 1:1 Square, 4:5 Portrait, or 9:16 Story.', 'Download and post to your Instagram feed.'],
    features: [
      { title: 'Maximum Feed Visibility (4:5)', description: '1080 × 1350 px portrait size takes up maximum vertical screen real estate on mobile feeds.' },
      { title: 'Full-Bleed Story (9:16)', description: '1080 × 1920 px resolution for crisp Stories and Reels.' },
      { title: 'No Blurry Compression', description: 'Pre-sized to prevent Instagram’s aggressive image re-compression algorithm.' },
    ],
    faqs: [
      { question: 'Why does Instagram make my uploaded photos blurry?', answer: 'If an image exceeds Instagram’s maximum dimensions, their server compresses it heavily. Uploading at exact recommended dimensions (e.g. 1080px wide) avoids aggressive re-compression.' },
    ],
    deepArticle: {
      heading: 'Optimizing Instagram Photo Ratios for Maximum Engagement',
      paragraphs: ['Using the 4:5 vertical aspect ratio gives your post 33% more visible screen space on smartphone feeds compared to traditional square photos, resulting in higher engagement rates.'],
    },
  },

  {
    id: 'resize-discord-banner-avatar',
    path: '/resize-discord-banner-avatar',
    label: 'Discord Avatar & Banner Resizer',
    tool: 'resize',
    category: 'resize',
    badge: 'Gaming',
    description: 'Resize Discord Profile Avatars (128x128), Server Banners (960x540), Server Icons (512x512), and custom Emotes.',
    metaTitle: 'Discord Avatar & Server Banner Resizer Online Free | PicSwift',
    metaDescription: 'Resize Discord profile pictures (128x128), Server Banners (960x540), and Server Icons (512x512) online for free. Fast, sharp, and lightweight.',
    keywords: ['discord avatar size', 'discord banner resizer', 'discord server icon size', 'resize emote for discord', 'discord pfp maker'],
    h1Title: 'Discord Avatar, Banner & Emote Resizer',
    h2Subtitle: 'Standard sizes for Discord profile pictures, Nitro server banners, channel icons, and custom stickers.',
    howToSteps: ['Upload avatar or banner artwork.', 'Select Discord Avatar (128x128), Banner (960x540), or Icon (512x512).', 'Download and apply to your Discord server.'],
    features: [
      { title: 'Stays Under Nitro File Limits', description: 'Optimized to stay safely under Discord’s 256KB emote and 10MB banner limits.' },
      { title: 'Crisp Dark Theme Visuals', description: 'Clean edge rendering that looks sharp against Discord’s dark UI.' },
      { title: 'Supports Animated GIF & PNG', description: 'Compatible with all standard gaming graphics.' },
    ],
    faqs: [
      { question: 'What is the optimal size for a Discord server banner?', answer: '960 × 540 pixels (16:9 aspect ratio) at under 10MB.' },
    ],
    deepArticle: {
      heading: 'Customizing Discord Community Servers with Professional Graphics',
      paragraphs: ['A well-designed server icon and banner create a welcoming atmosphere for new members, setting your Discord community apart.'],
    },
  },

  // ==========================================
  // 5. CROPPING & CREATIVE UTILITIES
  // ==========================================
  {
    id: 'crop-image',
    path: '/crop-image',
    label: 'Crop Image',
    tool: 'crop',
    category: 'crop',
    badge: 'Popular',
    description: 'Crop images with interactive corner handles, precision grid overlays, and instant aspect ratio presets.',
    metaTitle: 'Crop Image Online Free - Interactive Photo Cropper | PicSwift',
    metaDescription: 'Free online image cropper. Crop photos freely or lock to standard aspect ratios (1:1, 16:9, 4:5, 3:4). Fast, private, and easy to use.',
    keywords: ['crop image', 'crop photo online', 'image cropper free', 'photo crop tool', 'cut photo online'],
    h1Title: 'Crop Image Online Free',
    h2Subtitle: 'Interactive cropping with precision rule-of-thirds grid overlays and instant aspect ratio locking.',
    howToSteps: ['Upload photo.', 'Drag the crop box or corners to select your area.', 'Click "Apply Crop" and download.'],
    features: [
      { title: 'Rule of Thirds Grid', description: 'Visual overlay grid helps compose balanced photographic framing.' },
      { title: 'Freeform & Locked Ratios', description: 'Switch between freeform free-drag cropping and locked aspect ratios with 1 click.' },
      { title: 'Lossless Crop Output', description: 'Extracts cropped area at native source resolution without blur.' },
    ],
    faqs: [
      { question: 'Does cropping reduce photo resolution?', answer: 'Cropping extracts a specific rectangular sub-region at original pixel quality, discarding the unselected perimeter.' },
    ],
    deepArticle: {
      heading: 'Mastering Visual Composition with the Rule of Thirds Crop',
      paragraphs: ['Cropping is a powerful tool to remove unwanted background distractions, re-center focal subjects, and improve overall photo composition.'],
    },
  },

  {
    id: 'circle-crop-avatar',
    path: '/circle-crop-avatar',
    label: 'Circle Crop Image (Round Avatar)',
    tool: 'crop',
    category: 'utility',
    badge: 'Avatar Tool',
    circleCrop: true,
    toFormat: 'png',
    description: 'Crop photos into a perfect circle with a transparent background for profile pictures, avatars, and badges.',
    metaTitle: 'Circle Crop Image Online Free - Round Avatar Maker (PNG) | PicSwift',
    metaDescription: 'Crop image into circle online for free. Make round profile pictures and circular avatars with transparent PNG background for WhatsApp, Discord, and LinkedIn.',
    keywords: ['circle crop image', 'round photo cropper', 'make circular avatar', 'crop image into circle online free', 'round pfp maker'],
    h1Title: 'Circle Crop Image Online (Round Avatar)',
    h2Subtitle: 'Crop portraits into circular avatars with transparent PNG backgrounds for WhatsApp, LinkedIn, Discord, and Slack.',
    howToSteps: [
      'Upload your portrait or logo photo.',
      'Adjust the circular framing boundary.',
      'Download your transparent circular PNG avatar ready to use.',
    ],
    features: [
      { title: 'Clean Anti-Aliased Curved Edge', description: 'Smooth circular clipping without pixelated or jagged boundaries.' },
      { title: 'Transparent Alpha Background', description: 'Outputs a PNG with a transparent background around the circle.' },
      { title: 'Perfect for Profile Pictures', description: 'Instantly preview how your avatar will appear on social media platforms.' },
    ],
    faqs: [
      { question: 'How do I make a circular avatar for LinkedIn or WhatsApp?', answer: 'Upload your photo, position the circular crop frame over your face, and download the resulting round PNG image.' },
    ],
    deepArticle: {
      heading: 'Creating Professional Round Avatars for Social and Work Platforms',
      paragraphs: ['Most modern communication platforms display user avatars inside circular viewports. Preparing your profile photo with a centered circular crop ensures your face is never awkwardly cut off.'],
    },
  },

  {
    id: 'remove-exif-metadata',
    path: '/remove-exif-metadata',
    label: 'Remove EXIF Metadata (Privacy Cleaner)',
    tool: 'compress',
    category: 'utility',
    badge: 'Privacy',
    toFormat: 'jpg',
    description: 'Strip GPS location geotags, camera model, lens serial number, and capture timestamps for 100% photo privacy.',
    metaTitle: 'Remove EXIF Data Online Free - Photo Privacy Cleaner | PicSwift',
    metaDescription: 'Strip EXIF metadata, GPS location coordinates, camera serial numbers, and timestamps from photos online for free. 100% safe and private.',
    keywords: ['remove exif data online', 'strip gps from photo', 'photo metadata cleaner', 'remove location from image', 'exif stripper free'],
    h1Title: 'Remove EXIF Metadata & GPS Geotags Online',
    h2Subtitle: 'Protect your personal privacy by stripping hidden GPS coordinates, camera models, and timestamps from photos before sharing.',
    howToSteps: [
      'Upload photos taken with your smartphone or digital camera.',
      'PicSwift redraws pixel data onto a clean canvas, permanently stripping all EXIF metadata tags.',
      'Download your privacy-safe photos ready for sharing online.',
    ],
    features: [
      { title: 'Strips GPS Geolocation Data', description: 'Permanently removes exact latitude and longitude coordinates that could reveal your home or work location.' },
      { title: 'Removes Device Fingerprints', description: 'Strips camera serial number, smartphone model, lens info, and exposure settings.' },
      { title: '100% In-Browser Sanitation', description: 'Your photos are scrubbed locally without ever being transmitted to external servers.' },
    ],
    faqs: [
      { question: 'What hidden data is stored inside my smartphone photos?', answer: 'Camera files often contain EXIF headers with exact GPS location, time of capture, phone model, and device settings. PicSwift safely scrubs all of this data.' },
    ],
    deepArticle: {
      heading: 'Why You Should Strip EXIF Geolocation Data Before Posting Photos Online',
      paragraphs: [
        'Every time you take a photo with a modern smartphone, embedded metadata tags record your precise geographic coordinates, camera serial numbers, and capture timestamps.',
        'Sharing these raw images on social media or classified websites can expose sensitive personal locations. PicSwift cleanses this metadata in your browser before you share.'
      ],
    },
  },

  {
    id: 'black-and-white-converter',
    path: '/black-and-white-converter',
    label: 'Black & White Photo Converter',
    tool: 'compress',
    category: 'utility',
    badge: 'Filter',
    filter: 'grayscale',
    description: 'Convert color photos into high-contrast black & white (grayscale) images for printing, document scanning, and artistic photography.',
    metaTitle: 'Convert Color Photo to Black and White Online Free | PicSwift',
    metaDescription: 'Convert color images to high-contrast black and white (grayscale) online for free. Save printer ink and create classic monochrome photography in seconds.',
    keywords: ['black and white photo converter', 'convert image to black and white online free', 'grayscale image converter', 'make photo black and white'],
    h1Title: 'Convert Photos to Black & White Online (Grayscale)',
    h2Subtitle: 'Transform color images into high-contrast monochrome and grayscale photos for printing or artistic projects.',
    howToSteps: ['Upload your color photo.', 'The grayscale filter is applied instantly.', 'Download your black & white image.'],
    features: [
      { title: 'Saves Printer Ink', description: 'Reduces color cartridge consumption when printing forms and documents.' },
      { title: 'Artistic High-Contrast Tone', description: 'Produces clean, balanced monochrome tones suitable for portraiture and street photography.' },
      { title: 'Fast Batch Processing', description: 'Convert multiple photos to black & white simultaneously.' },
    ],
    faqs: [
      { question: 'Does converting to grayscale save printer ink?', answer: 'Yes! Grayscale images use only black ink cartridges, helping conserve expensive color ink when printing documents.' },
    ],
    deepArticle: {
      heading: 'The Utility and Artistry of Grayscale Image Conversion',
      paragraphs: ['Converting color images to monochrome simplifies visual clutter, saves printer ink on physical documents, and gives photographs a timeless, classic feel.'],
    },
  },

  {
    id: 'crop-square',
    path: '/crop-square',
    label: 'Crop Square (1:1 Ratio)',
    tool: 'crop',
    category: 'crop',
    aspectRatio: 1,
    aspectLabel: '1:1 Square',
    description: 'Crop images into a 1:1 square aspect ratio for profile pictures, Instagram posts, and US Visa photos.',
    metaTitle: 'Crop Image to Square 1:1 Online Free | PicSwift',
    metaDescription: 'Crop photos to 1:1 square aspect ratio online for free. Perfect for Instagram feeds, profile pictures, and US Visa photos with interactive framing.',
    keywords: ['crop image square', '1 1 crop online', 'square photo cropper free', 'make image square'],
    h1Title: 'Crop Image to Square 1:1 Ratio Online',
    h2Subtitle: 'Lock crop frames to a 1:1 square ratio for profile pictures, product catalogs, and Instagram feeds.',
    howToSteps: ['Upload photo.', 'Adjust the 1:1 locked box over your subject.', 'Download your square image.'],
    features: [
      { title: 'Strict 1:1 Aspect Ratio', description: 'Guarantees equal width and height dimensions.' },
      { title: 'Retains Native Clarity', description: 'Cropping preserves the original sensor resolution within the selected frame.' },
      { title: 'Instant Download', description: 'Save your cropped photo with a single click.' },
    ],
    faqs: [
      { question: 'Why is 1:1 square cropping widely used?', answer: 'Square 1:1 formatting is the universal standard for social media profile pictures, eCommerce catalog grids, and official visa photos.' },
    ],
    deepArticle: {
      heading: 'The Versatility of the 1:1 Square Image Aspect Ratio',
      paragraphs: ['From eCommerce thumbnails to social media avatars, square 1:1 photos provide balanced visual symmetry across all screen layouts.'],
    },
  },

  {
    id: 'crop-16-9',
    path: '/crop-16-9',
    label: 'Crop 16:9 (Widescreen Landscape)',
    tool: 'crop',
    category: 'crop',
    aspectRatio: 16 / 9,
    aspectLabel: '16:9 Widescreen',
    description: 'Crop photos to 16:9 widescreen landscape for YouTube video thumbnails, TV screens, and website hero banners.',
    metaTitle: 'Crop Image to 16:9 Widescreen Online Free | PicSwift',
    metaDescription: 'Crop photos to 16:9 widescreen aspect ratio online for free. Ideal for YouTube thumbnails, presentation slides, desktop wallpapers, and TV screens.',
    keywords: ['crop image 16 9', '16 9 photo cropper', 'widescreen crop online free', 'crop photo for youtube thumbnail'],
    h1Title: 'Crop Image to 16:9 Widescreen Ratio Online',
    h2Subtitle: 'Standard 16:9 widescreen framing for YouTube thumbnails, desktop monitors, presentation decks, and TV displays.',
    howToSteps: ['Upload image.', 'Position the 16:9 landscape framing frame.', 'Download your cropped widescreen photo.'],
    features: [
      { title: 'Widescreen Standard', description: 'Matches standard 1080p, 1440p, and 4K display proportions.' },
      { title: 'Presentation Ready', description: 'Ideal for PowerPoint, Google Slides, and Keynote presentation slides.' },
      { title: 'Fast & Private', description: 'Processed directly on your device without server latency.' },
    ],
    faqs: [
      { question: 'Why is 16:9 the standard aspect ratio for video?', answer: '16:9 matches modern television, computer monitor, and smartphone landscape display dimensions.' },
    ],
    deepArticle: {
      heading: 'Composing Visuals for 16:9 Widescreen Displays',
      paragraphs: ['Framing photography in 16:9 creates cinematic compositions that display without black letterbox bars on modern screens.'],
    },
  },

  {
    id: 'crop-9-16',
    path: '/crop-9-16',
    label: 'Crop 9:16 (Vertical Story & TikTok)',
    tool: 'crop',
    category: 'crop',
    aspectRatio: 9 / 16,
    aspectLabel: '9:16 Vertical',
    description: 'Crop images to 9:16 vertical full-screen for TikTok videos, Instagram Stories, YouTube Shorts, and phone wallpapers.',
    metaTitle: 'Crop Image to 9:16 Vertical Online Free (TikTok & Stories) | PicSwift',
    metaDescription: 'Crop photos to 9:16 vertical aspect ratio online for free. Perfect for TikTok, Instagram Stories, Reels, YouTube Shorts, and smartphone wallpapers.',
    keywords: ['crop 9 16', 'vertical crop online free', 'crop photo for tiktok', 'crop image for instagram story'],
    h1Title: 'Crop Image to 9:16 Vertical Ratio Online',
    h2Subtitle: 'Full-bleed 9:16 vertical cropping for TikTok, Instagram Stories, YouTube Shorts, and smartphone lock screens.',
    howToSteps: ['Upload photo.', 'Position 9:16 vertical frame.', 'Download your vertical story photo.'],
    features: [
      { title: 'Full Mobile Screen Coverage', description: 'Fills modern smartphone screens completely without borders.' },
      { title: 'Story & Reels Ready', description: 'Optimized for TikTok, Instagram Stories, and YouTube Shorts.' },
      { title: 'Crisp Pixel Alignment', description: 'Ensures sharp visual presentation on high-DPI smartphone displays.' },
    ],
    faqs: [
      { question: 'What is the pixel resolution of a 9:16 image?', answer: 'The standard HD resolution for 9:16 vertical content is 1080 × 1920 pixels.' },
    ],
    deepArticle: {
      heading: 'The Rise of Vertical 9:16 Media in the Mobile-First Era',
      paragraphs: ['With over 70% of digital media consumed on smartphones, 9:16 vertical framing provides an immersive full-screen viewing experience.'],
    },
  },
];

export function getPresetByPath(path: string): PresetTool | undefined {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return TOOL_PRESETS.find((p) => p.path === normalized || p.id === path.replace('/', ''));
}

export function getPresetById(id: string): PresetTool | undefined {
  return TOOL_PRESETS.find((p) => p.id === id);
}
