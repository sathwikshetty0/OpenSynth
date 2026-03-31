export const missions = [
    {
        id: "images_pixels",
        title: "Images & Pixels",
        xpReward: 100,
        difficulty: "Easy",
        estimatedTime: "5 min",
        theory: {
            goal: "Find boundaries where pixel intensity changes.",
            algorithm: "Representing visuals as numerical arrays.",
            code: "import cv2\nimg = cv2.imread('image.jpg')\nprint(img.shape)",
            details: [
                "An image is a NumPy array",
                "Shape = height × width × channels",
                "Pixel values range 0–255",
                "OpenCV loads images as BGR",
                "cv2.imread() loads an image"
            ]
        },
        challenges: [
            {
                id: "pixels_1",
                type: "mcq",
                question: "What does cv2.imread() return?",
                options: ["PIL Image", "NumPy Array", "File path", "List of pixels"],
                correctAnswer: "NumPy Array",
                hint: "Images are processed as matrices of numbers."
            },
            {
                id: "pixels_2",
                type: "fill",
                question: "Complete the code to read an image:",
                code: "img = cv2.____('photo.jpg')",
                answer: "imread",
                hint: "Short for 'image read'."
            },
            {
                id: "pixels_3",
                type: "bug",
                question: "Fix the argument order error:",
                code: "cv2.imshow(img, 'window')",
                correctCode: "cv2.imshow('window', img)",
                hint: "The window name comes before the image data."
            }
        ],
        nextModules: ["color_spaces", "transformations"]
    },
    {
        id: "color_spaces",
        title: "Color Spaces",
        xpReward: 150,
        difficulty: "Easy",
        estimatedTime: "7 min",
        prerequisites: ["images_pixels"],
        theory: {
            goal: "Understanding how colors are represented.",
            algorithm: "BGR vs RGB vs Gray.",
            code: "gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)",
            details: [
                "Red, Green, Blue channels",
                "Grayscale = single channel (0-255)",
                "HSV is better for color isolation",
                "cv2.cvtColor handles conversions"
            ]
        },
        challenges: [
            {
                id: "color_1",
                type: "mcq",
                question: "What is the default color order in OpenCV?",
                options: ["RGB", "BGR", "CMYK", "HSV"],
                correctAnswer: "BGR",
                hint: "Remember: B-G-R, not R-G-B."
            },
            {
                id: "color_2",
                type: "bug",
                question: "Fix the conversion constant for Grayscale:",
                code: "gray = cv2.cvtColor(img, cv2.COLOR_RGB2GRAY)",
                correctCode: "cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)",
                hint: "OpenCV's default input is BGR."
            }
        ],
        nextModules: ["blurring_filters"]
    },
    {
        id: "blurring_filters",
        title: "Blurring & Filters",
        xpReward: 150,
        difficulty: "Medium",
        estimatedTime: "8 min",
        prerequisites: ["color_spaces"],
        theory: {
            goal: "Reducing noise and smoothing images.",
            algorithm: "Gaussian Blur.",
            code: "blur = cv2.GaussianBlur(img, (5, 5), 0)",
            details: [
                "Kernels define area of influence",
                "Gaussian distribution for smoothing",
                "Median filter for salt & pepper noise",
                "Bilateral filtering preserves edges"
            ]
        },
        challenges: [
            {
                id: "blur_1",
                type: "slider",
                question: "Adjust the kernel size to blur the image correctly.",
                param: "ksize",
                min: 1,
                max: 21,
                step: 2,
                initial: 1,
                target: 7,
                hint: "The ksize must be an odd number (1, 3, 5, 7...)."
            },
            {
                id: "blur_2",
                type: "mcq",
                question: "Which filter is best for 'salt and pepper' noise?",
                options: ["Gaussian", "Median", "Bilateral", "Box Filter"],
                correctAnswer: "Median",
                hint: "It replaces pixel values with the median of neighbors."
            }
        ],
        nextModules: ["edge_detection"]
    },
    {
        id: "edge_detection",
        title: "Edge Detection",
        xpReward: 200,
        difficulty: "Hard",
        estimatedTime: "10 min",
        prerequisites: ["blurring_filters"],
        theory: {
            goal: "Detecting sudden changes in intensity.",
            algorithm: "Canny Edge Detector.",
            code: "edges = cv2.Canny(img, 100, 200)",
            details: [
                "Gradient calculation using Sobel",
                "Non-maximum suppression for thin lines",
                "Hysteresis thresholding",
                "Lower and Upper thresholds"
            ]
        },
        challenges: [
            {
                id: "edge_1",
                type: "mcq",
                question: "Which algorithm is famous for edge detection?",
                options: ["Canny", "Gaussian", "Sobel", "Haar Cascade"],
                correctAnswer: "Canny",
                hint: "It uses double thresholding to detect strong and weak edges."
            },
            {
                id: "edge_2",
                type: "fill",
                question: "Complete the Canny function call:",
                code: "edges = cv2.____(gray, 50, 150)",
                answer: "Canny",
                hint: "Named after John F. Canny."
            }
        ],
        nextModules: ["thresholding", "contours"]
    },
    {
        id: "thresholding",
        title: "Thresholding",
        xpReward: 180,
        difficulty: "Medium",
        estimatedTime: "6 min",
        prerequisites: ["edge_detection"],
        theory: {
            goal: "Segmenting images based on intensity.",
            algorithm: "Simple & Adaptive Thresholding.",
            code: "ret, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)",
            details: [
                "Converts gray to binary (black/white)",
                "Otsu's method for automatic thresholding",
                "Adaptive thresholding for uneven lighting",
                "Foreground vs Background separation"
            ]
        },
        challenges: [
            {
                id: "thresh_1",
                type: "mcq",
                question: "Which constant is used for simple binary thresholding?",
                options: ["THRESH_GRAY", "THRESH_BINARY", "THRESH_OTSU", "THRESH_MEAN"],
                correctAnswer: "THRESH_BINARY",
                hint: "Binary results in only two values: zero or maximum."
            },
            {
                id: "thresh_2",
                type: "bug",
                question: "Correct the threshold function signature:",
                code: "thresh = cv2.threshold(gray, 127, 255, 'binary')",
                correctCode: "cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)",
                hint: "OpenCV uses specific constants starting with cv2.THRESH_"
            }
        ],
        nextModules: ["contours"]
    },
    {
        id: "contours",
        title: "Contours",
        xpReward: 250,
        difficulty: "Hard",
        estimatedTime: "12 min",
        prerequisites: ["thresholding"],
        theory: {
            goal: "Finding outlines of objects.",
            algorithm: "cv2.findContours().",
            code: "contours, hire = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)",
            details: [
                "Input binary image",
                "Hierarchy defines relationship between shapes",
                "Approximation saves memory",
                "Useful for object tracking"
            ]
        },
        challenges: [
            {
                id: "cont_1",
                type: "fill",
                question: "Function to find outlines:",
                code: "cnts, h = cv2.____(binary, cv2.RETR_LIST, cv2.CHAIN_APPROX_NONE)",
                answer: "findContours",
                hint: "Used to detect the curves joining all continuous points."
            },
            {
                id: "cont_2",
                type: "mcq",
                question: "Which flag is used to approximate and save memory?",
                options: ["CHAIN_APPROX_NONE", "CHAIN_APPROX_SIMPLE", "RETR_EXTERNAL", "RETR_TREE"],
                correctAnswer: "CHAIN_APPROX_SIMPLE",
                hint: "It removes redundant points and compresses the contour."
            }
        ]
    }
];
