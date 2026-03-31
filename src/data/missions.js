export const missions = [
    {
        id: "images_pixels",
        title: "Images & Pixels",
        xpReward: 100,
        difficulty: "Easy",
        estimatedTime: "5 min",
        theory: {
            goal: "Master how images are represented numerically as matrices and how OpenCV interacts with them.",
            algorithm: "Pixels & Intensity Mapping.",
            code: "import cv2\nimage = cv2.imread('data.png')\n# img[y, x] gives BGR values\nprint(f'Pixel at (0,0): {image[0, 0]}')",
            details: [
                "An image is fundamentally a NumPy array (matrix of numbers)",
                "Shape convention is height (rows) × width (columns) × depth (BGR channels)",
                "Intensity ranges from 0 (total darkness) to 255 (full saturation)",
                "OpenCV swaps the standard RGB order to BGR (Blue-Green-Red)",
                "Coordinate (0,0) is located at the top-left corner of the image display"
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
            },
            {
                id: "pixels_4",
                type: "mcq",
                question: "Which color channel comes first in OpenCV's default format?",
                options: ["Red", "Green", "Blue", "Alpha"],
                correctAnswer: "Blue",
                hint: "OpenCV uses BGR, not RGB."
            },
            {
                id: "pixels_5",
                type: "fill",
                question: "Property to get height and width: image.____",
                answer: "shape",
                hint: "Returns a tuple of dimensions."
            }
        ],
        nextModules: ["color_spaces"]
    },
    {
        id: "color_spaces",
        title: "Color Spaces",
        xpReward: 150,
        difficulty: "Easy",
        estimatedTime: "7 min",
        prerequisites: ["images_pixels"],
        theory: {
            goal: "Learn to navigate between different mathematical representations of color.",
            algorithm: "Color Conversion Logic.",
            code: "gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)\nhsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)",
            details: [
                "Grayscale reduces computation by merging Red, Green, and Blue into one intensity channel",
                "HSV (Hue, Saturation, Value) is superior for isolating specific colors regardless of lighting",
                "Conversion is handled by the cvtColor() function using specific flags",
                "OpenCV defaults to BGR, so RGB images often look blue if not converted"
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
            },
            {
                id: "color_3",
                type: "fill",
                question: "Function for color conversion: cv2.____(img, flag)",
                answer: "cvtColor",
                hint: "Short for 'convert color'."
            },
            {
                id: "color_4",
                type: "mcq",
                question: "Which color space is best for tracking a specific colored ball?",
                options: ["Grayscale", "BGR", "HSV", "LAB"],
                correctAnswer: "HSV",
                hint: "Hue represents the color itself, isolated from brightness."
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
            goal: "Clean sensor noise and smooth edges using convolution kernels.",
            algorithm: "Spatial Filtering & Blurring.",
            code: "blur = cv2.GaussianBlur(img, (5, 5), 0)",
            details: [
                "Kernels act as sliding windows that average pixel values with their neighbors",
                "Gaussian Blur uses a weighted average (pixels closer to center have more weight)",
                "Median Blur is the primary defense against 'Salt and Pepper' electronic noise",
                "Kernel sizes MUST be odd positive integers (1, 3, 5, 7...) to have a central pixel"
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
            },
            {
                id: "blur_3",
                type: "bug",
                question: "Fix the illegal kernel size:",
                code: "blur = cv2.blur(img, (4, 4))",
                correctCode: "cv2.blur(img, (5, 5))",
                hint: "Use the next available odd number for the kernel."
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
            goal: "Extract structural features by detecting high gradients in pixel intensity.",
            algorithm: "Canny Multi-Stage Detection.",
            code: "edges = cv2.Canny(img, 100, 200)",
            details: [
                "Noise reduction is performed first to avoid detecting 'fake' edges from noise",
                "Gradient calculation identifies the direction and strength of intensity changes",
                "Non-maximum suppression thins out the edges to 1-pixel width",
                "Hysteresis uses two thresholds to decide which edges are strong enough to keep",
                "Lower and Upper thresholds define the sensitivity to gray gradients"
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
            },
            {
                id: "edge_3",
                type: "mcq",
                question: "What does a high gradient in an image indicate?",
                options: ["Uniform color", "Low noise", "An edge or boundary", "Image corruption"],
                correctAnswer: "An edge or boundary",
                hint: "Gradient measures the 'steepness' of color change."
            }
        ],
        nextModules: ["thresholding"]
    },
    {
        id: "thresholding",
        title: "Thresholding",
        xpReward: 180,
        difficulty: "Medium",
        estimatedTime: "6 min",
        prerequisites: ["edge_detection"],
        theory: {
            goal: "Convert complex grayscale images into binary (Black/White) maps for easier segmentation.",
            algorithm: "Binary Pixel Segmentation.",
            code: "ret, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)",
            details: [
                "Binary thresholding replaces every pixel with either 0 or a Maximum value (255)",
                "Otsu's Binarization automatically calculates the 'best' threshold value for the image",
                "Adaptive thresholding calculates different thresholds for small regions to handle shadows",
                "Thresholding is the precursor to contour detection and shape analysis"
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
            goal: "Isolate and identify the shapes and hierarchies within detected boundaries.",
            algorithm: "Topological Shape Analysis.",
            code: "cnts, h = cv2.findContours(thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)",
            details: [
                "Contours connect continuous points having the same color/intensity",
                "RETR_EXTERNAL only finds the outer-most shapes, ignoring holes",
                "RETR_TREE creates a parent-child relationship for nested shapes",
                "CHAIN_APPROX_SIMPLE saves memory by using only 4 points for a rectangle instead of hundreds"
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
            },
            {
                id: "cont_3",
                type: "fill",
                question: "Function to visualize contours: cv2.____(img, cnts, -1, (0,255,0), 2)",
                answer: "drawContours",
                hint: "Inverse of finding them, it places them on canvas."
            }
        ]
    }
];
