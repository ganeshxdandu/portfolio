export const sections = [
    {
        id: "business",
        number: "01",
        title: "Business Information",
        description:
            "Basic details about your clinic and how patients can reach you.",
        questions: [
            {
                id: "clinicName",
                label: "Clinic Name",
                type: "text",
            },
            {
                id: "tagline",
                label: "Tagline",
                type: "text",
            },
            {
                id: "address",
                label: "Clinic Address",
                type: "textarea",
            },
            {
                id: "phone",
                label: "Phone Number(s)",
                type: "text",
            },
            {
                id: "email",
                label: "Email Address",
                type: "email",
            },
            {
                id: "socials",
                label: "Social Media Links",
                type: "textarea",
            },
        ],
    },

    {
        id: "about",
        number: "02",
        title: "About Your Clinic",
        description:
            "Help us understand your clinic, story, and positioning.",
        questions: [
            {
                id: "clinicDescription",
                label: "Tell us about your clinic in a few sentences.",
                type: "textarea",
            },
            {
                id: "uniqueDifference",
                label: "What makes your clinic different from other clinics?",
                type: "textarea",
            },
            {
                id: "brandValues",
                label: "What values or qualities do you want patients to associate with your clinic?",
                type: "textarea",
            },
        ],
    },

    {
        id: "patients",
        number: "03",
        title: "Your Patients",
        description:
            "Information about the people you currently serve and those you'd like to attract.",
        questions: [
            {
                id: "commonPatients",
                label: "Who are your most common patients?",
                type: "textarea",
            },
            {
                id: "commonConcerns",
                label: "What are the most common concerns or problems patients visit your clinic for?",
                type: "textarea",
            },
            {
                id: "popularTreatments",
                label: "Which services or treatments are most popular?",
                type: "textarea",
            },
            {
                id: "targetPatients",
                label: "Which type of patients would you like to attract more of?",
                type: "textarea",
            },
            {
                id: "patientFeedback",
                label: "What do patients usually appreciate most about your clinic?",
                type: "textarea",
            },
        ],
    },

    {
        id: "services",
        number: "04",
        title: "Services & Treatments",
        description:
            "Details about the services you currently offer and plan to offer.",
        questions: [
            {
                id: "allServices",
                label: "List all services and treatments you offer.",
                type: "textarea",
            },
            {
                id: "featuredServices",
                label: "Which services would you like to highlight prominently on the website?",
                type: "textarea",
            },
            {
                id: "upcomingServices",
                label: "Are there any upcoming services or treatments you plan to introduce?",
                type: "textarea",
            },
        ],
    },

    {
        id: "products",
        number: "05",
        title: "Products",
        description:
            "Information about products you sell or plan to sell online.",
        questions: [
            {
                id: "sellProducts",
                label: "Do you sell skincare, wellness, or other products?",
                type: "textarea",
            },
            {
                id: "productList",
                label: "Please provide a list of products you would like to sell online.",
                type: "textarea",
            },
            {
                id: "productAssets",
                label: "Do you have product photos, descriptions, and pricing available?",
                type: "textarea",
            },
        ],
    },

    {
        id: "goals",
        number: "06",
        title: "Website Goals",
        description:
            "Understanding what success looks like for your website.",
        questions: [
            {
                id: "primaryGoal",
                label: "What is the primary goal of your website?",
                type: "checkbox-group",
                options: [
                    "Appointment Bookings",
                    "Product Sales",
                    "Lead Generation",
                    "Brand Awareness",
                    "Other",
                ],
            },
            {
                id: "onlineBooking",
                label: "Do you want patients to book appointments online?",
                type: "textarea",
            },
            {
                id: "appointmentManagement",
                label: "How do you currently manage appointments?",
                type: "textarea",
            },
            {
                id: "bookingInformation",
                label: "What information would you like to collect from patients during booking?",
                type: "textarea",
            },
        ],
    },

    {
        id: "design",
        number: "07",
        title: "Design Preferences",
        description:
            "Help us understand your visual preferences and brand direction.",
        questions: [
            {
                id: "inspirationWebsites",
                label: "Please share 2–3 websites whose design you like.",
                type: "textarea",
            },
            {
                id: "brandPerception",
                label: "Choose words that best describe how you want your clinic to be perceived.",
                type: "multi-select-pills",
                options: [
                    "Professional",
                    "Luxury",
                    "Premium",
                    "Modern",
                    "Trustworthy",
                    "Friendly",
                    "Scientific",
                    "Minimal",
                ],
            },
            {
                id: "colorPreferences",
                label: "Are there any colors you would like us to use or avoid?",
                type: "textarea",
            },
        ],
    },

    {
        id: "assets",
        number: "08",
        title: "Content & Assets",
        description:
            "Assets that may be needed during design and development.",
        questions: [
            {
                id: "logo",
                label: "Do you have a logo?",
                type: "textarea",
            },
            {
                id: "clinicPhotos",
                label: "Do you have clinic photos?",
                type: "textarea",
            },
            {
                id: "teamPhotos",
                label: "Do you have doctor/team photos and profiles?",
                type: "textarea",
            },
            {
                id: "testimonials",
                label: "Do you have testimonials or patient reviews?",
                type: "textarea",
            },
            {
                id: "beforeAfter",
                label: "Do you have before-and-after images that can be used on the website?",
                type: "textarea",
            },
        ],
    },

    {
        id: "additional",
        number: "09",
        title: "Additional Information",
        description:
            "Anything else you'd like us to know before we begin.",
        questions: [
            {
                id: "additionalNotes",
                label: "Is there anything else you would like us to know before we begin?",
                type: "textarea",
            },
        ],
    },
];
