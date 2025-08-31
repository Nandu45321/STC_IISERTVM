/*
Welcome to the content hub for your website!

To update the content on your website, you only need to edit this file.
This approach keeps all your data in one place, making it easy to manage without having to edit any HTML files directly.

Instructions:
- To change text, simply replace the text inside the quotes (e.g., "Your Name").
- To change an image, replace the image URL (e.g., "https://picsum.photos/seed/your-seed/200/200").
- To add a new item (like a team member or an event), copy one of the existing blocks (everything from the opening `{` to the closing `}`), paste it at the end of the list, and update the content. Make sure to add a comma after the closing `}` of the item before it.

*/

// --- LEADERSHIP DATA ---
const leadershipData = {
    director: {
        name: "Professor Jarugu Narasimha Moorthy",
        title: "Director, IISER TVM",
        message: "A message from the director can be placed here.", // Placeholder message
        imageUrl: "images/members/Faculty Advisors/dr_j_n_moorthy.jpg"
    },
    dosa: {
        name: "Prof Rajeev N Kini",
        title: "Dean of Student Affairs",
        message: "A message from the Dean of Student Affairs can be placed here.", // Placeholder message
        imageUrl: "images/members/Faculty Advisors/Prof. Rajeev N Kini.jpg"
    },
    currentAdvisors: [
        {
            name: "Dr. Sanu Shameer",
            title: "Faculty Advisor, STC",
            message: "A message from the faculty advisor can be placed here.",
            imageUrl: "images/members/Faculty Advisors/Dr. Sanu Shameer.jpg"
        },
        {
            name: "Dr. Krishnendu Gope",
            title: "Faculty Advisor, STC",
            message: "A message from the faculty advisor can be placed here.",
            imageUrl: "images/members/Faculty Advisors/Dr. Krishnendu Gope.jpg"
        }
    ],
    formerAdvisors: [
        { 
            name: "Prof Utpal Manna", 
            imageUrl: "images/members/Faculty Advisors/Former/Prof. Utpal Manna.jpg",
            period: "2018-2020"
        },
        { 
            name: "Dr. Jishy Varghese", 
            imageUrl: "images/members/Faculty Advisors/Former/Dr. Jishy Varghese.jpg",
            period: "2020-2022"
        },
        { 
            name: "Dr. Nisha N Kannan", 
            imageUrl: "images/members/Faculty Advisors/Former/Dr Nisha_N_Kannan.jpg",
            period: "2022-2023"
        }
    ]
};

const councilMembers = [
    { name: "Ishaani R Kamath", position: "Secretary (BS-MS 21)", imageUrl: "https://raw.githubusercontent.com/Coding-Club-of-IISER-Thiruvananthapuram/STC_IISERTVM/cc5730f3d080ea80ed9700f98799362d62e2a883/images/members/24-25/Secretary_Ishaani_R_Kamath_BSMS%20_21.jpg" },
    { name: "Pearl", position: "Member", imageUrl: "https://raw.githubusercontent.com/Coding-Club-of-IISER-Thiruvananthapuram/STC_IISERTVM/refs/heads/main/images/members/24-25/Pearl_23.jpg" },
    { name: "Arvind Lomrore", position: "Member", imageUrl: "https://raw.githubusercontent.com/Coding-Club-of-IISER-Thiruvananthapuram/STC_IISERTVM/refs/heads/main/images/members/24-25/Arvind%20Lomrore%20BSMS%2023.jpg" },
    { name: "Alan Varghese Jophy", position: "Member", imageUrl: "https://picsum.photos/seed/mem3/200/200" },
    { name: "Adheena Lakshmi", position: "Member", imageUrl: "https://raw.githubusercontent.com/Coding-Club-of-IISER-Thiruvananthapuram/STC_IISERTVM/refs/heads/main/images/members/24-25/Adheena%20Lakshmi_BSMS21.jpg" },
    { name: "Abhiram Mahesh", position: "Member", imageUrl: "https://raw.githubusercontent.com/Coding-Club-of-IISER-Thiruvananthapuram/STC_IISERTVM/refs/heads/main/images/members/24-25/Abhiram%20Mahesh_21.jpg" },
    { name: "Aashlesha Chavan", position: "Member", imageUrl: "https://raw.githubusercontent.com/Coding-Club-of-IISER-Thiruvananthapuram/STC_IISERTVM/refs/heads/main/images/members/24-25/Aashlesha_Chavan_BSMS22.jpeg" },
    { name: "A J Nithin", position: "Member", imageUrl: "https://raw.githubusercontent.com/Coding-Club-of-IISER-Thiruvananthapuram/STC_IISERTVM/refs/heads/main/images/members/24-25/A%20J%20Nithin%20Batch23.jpg" }
];

const pastSecretaries = [
    { 
        year: "BS-MS 20", 
        name: "Devashish Kalmegh",
        imageUrl: "images/members/Prev Secretaries/_23-_24_Devashish Kalmegh_BSMS _20.jpg",
        period: "2023-2024"
    },
    { 
        year: "BS-MS 19", 
        name: "Ravikiran Hegde",
        imageUrl: "images/members/Prev Secretaries/_22-_23_Ravikiran_Hegde_BSMS _19.jpg",
        period: "2022-2023"
    },
    { 
        year: "BS-MS 18", 
        name: "Sharang Rajesh Iyer",
        imageUrl: "images/members/Prev Secretaries/_20-_22_Sharang Rajesh Iyer_BSMS _18.jpg",
        period: "2021-2022"
    }
];


// --- EVENTS DATA ---
const upcomingEvents = [
    {
        date: "15 JAN",
        title: "Workshop on Quantum Computing",
        description: "Hosted by Parsec Club. A deep dive into the future of computing."
    },
    {
        date: "02 FEB",
        title: "Web Dev Bootcamp Kick-off",
        description: "Hosted by CCIT Club. The start of our 4-week intensive bootcamp."
    }
];

const pastEvents = [
    {
        date: "20 DEC",
        title: "Introduction to Astrophotography",
        description: "Hosted by Parsec Club. A session on capturing the cosmos."
    },
    {
        date: "05 NOV",
        title: "Bio-inspired Robotics Seminar",
        description: "Hosted by Proteus Club. Exploring robotics inspired by nature."
    }
];


// --- UPDATES DATA ---
const latestUpdates = [
    {
        date: "Jan 10, 2024",
        title: "New STC Council Elected",
        excerpt: "The results for the student council elections are out. We are excited to welcome the new team who will be leading the STC for the next academic year. Read on to meet the new secretaries and learn about their vision for the council.",
        link: "#",
        imageUrl: "https://picsum.photos/seed/update1/400/250"
    },
    {
        date: "Dec 28, 2023",
        title: "Anvesha '24 Post-Event Report",
        excerpt: "Anvesha '24 was a massive success, with over 1000 participants from across the country...",
        link: "#",
        imageUrl: "https://picsum.photos/seed/update2/400/250"
    },
    {
        date: "Nov 15, 2023",
        title: "Club Registrations for Spring Semester are Open",
        excerpt: "Want to be a part of the STC family? Registrations for all our affiliated clubs are now open...",
        link: "#",
        imageUrl: "https://picsum.photos/seed/update3/400/250"
    }
];


// --- CLUB SPECIFIC DATA ---
// You can add team members for each club here.
const clubTeams = {
    ccit: [
        { name: "Saurab Mishra", position: "President", imageUrl: "https://picsum.photos/seed/member1/200/200" },
        { name: "Satyam", position: "Vice President", imageUrl: "https://picsum.photos/seed/member2/200/200" },
        { name: "ABC", position: "Events Coordinator", imageUrl: "https://picsum.photos/seed/member3/200/200" }
    ],
    psit: [
        // Add PSIT team members here
    ],
    // ... add other clubs
};
