/* =====================================================================
   INTERNSHIP DATA — this is the only file you edit to update the site.

   HOW TO ADD AN INTERNSHIP
   1. Copy the TEMPLATE block below.
   2. Paste it inside window.INTERNSHIPS = [ ... ] (or window.TIEUPS).
   3. Fill it in, save, and upload this file to GitHub. Done.

   TEMPLATE (copy from the opening brace to the closing brace + comma)

  {
    id: "short-unique-name",            // letters, numbers and dashes only; never reuse one
    title: "Programme name",
    org: "Organisation name",
    badge: "ORG",                       // up to 6 letters shown on the coloured chip; leave out to use initials
    category: "Company",                // Department tie-up | Government | PSU | Research | Company | Open source
    domains: ["Embedded & IoT"],        // one or more from the DOMAINS list below
    mode: ["On-site"],                  // Remote | On-site | Hybrid   ([] = not stated on the official page)
    location: "City, State",
    duration: "6 weeks",
    years: [3, 4],                      // eligible years of B.E./B.Tech   ([] = not stated on the official page)
    stipend: "Stipend",                 // Stipend | Unpaid | Fee-based | Varies
    stipendNote: "",                    // optional, e.g. "Rs. 10,000 per month"
    deadline: "Rolling",                // "Rolling", a date "2026-12-31", several dates ["2026-10-30","2027-03-31"],
                                        // or any short text such as "Opens in January"
    verified: "2026-10-08",             // the day YOU last opened the link and checked it
    url: "https://official-site.example/apply",
    note: "One or two lines a student needs before clicking."
  },

   A listing with a date in "deadline" disappears from the site by itself
   the day after that date. With several dates, the next upcoming one is used.

   Add the line   auto: false,   to a listing if the daily robot must never
   change its closing date or mark it as closed.
   ===================================================================== */

window.SITE = {
  college: "Sipna College of Engineering & Technology, Amravati",
  department: "Department of Electronics & Telecommunication Engineering",
  shortName: "E&TC Internships",
  logo: "",                             // e.g. "assets/img/logo.png" — leave "" to show the initials badge
  logoInitials: "ET",

  // Optional. Put an email here and every listing's share menu gets a
  // "Report a broken link" button that writes to this address.
  coordinator: {
    email: ""
  },

  // Thin bar at the very top of the page. Set show to false to hide it.
  announcement: {
    show: true,
    text: "VNIT Nagpur internships: register by 22 October 2026.",
    link: "#i-vnit-internship-program"  // "" for no link; "#i-<id>" jumps to a listing on this page
  },

  lastUpdated: "2026-10-08",            // change this whenever you edit the file
  closingSoonDays: 14,                  // listings closing within this many days appear in "Closing soon"

  // What the daily robot is allowed to change on the site (it writes data/status.js).
  auto: {
    hideDeadLinks: true,                // hide a listing when its official page was gone on 2 checks in a row
    readDeadlines: true,                // show a closing date the robot read from the official page,
                                        //   when you have not typed one or the typed one has passed
    closedPages: "label"                // when the official page says applications are closed:
                                        //   "label" = show "May be closed" on the card
                                        //   "hide"  = remove the card until the page changes
                                        //   "ignore" = do nothing
  }
};

/* The filter chips and the domain filter are built from this list. */
window.DOMAINS = [
  "Embedded & IoT",
  "VLSI & Semiconductor",
  "Communication & Networking",
  "Signal & Image Processing",
  "AI/ML & Data Science",
  "Web & App Development",
  "Cloud & DevOps",
  "Core Electronics",
  "Research"
];

/* ---------------------------------------------------------------------
   DEPARTMENT TIE-UPS
   Companies the department has an understanding with. The section stays
   hidden on the site until there is at least one entry here.
   Use the same TEMPLATE as above; "category" is filled in automatically.
   --------------------------------------------------------------------- */
window.TIEUPS = [

];

/* ---------------------------------------------------------------------
   ALL INTERNSHIPS
   Every URL below was opened and read on the "verified" date.
   --------------------------------------------------------------------- */
window.INTERNSHIPS = [
  {
    id: "vnit-internship-program",
    title: "Internship Program at VNIT",
    org: "Visvesvaraya National Institute of Technology, Nagpur",
    badge: "VNIT",
    category: "Research",
    domains: ["Research", "Core Electronics"],
    mode: ["On-site"],
    location: "Nagpur, Maharashtra",
    duration: "About 5 months (semester) or 6 weeks (summer)",
    years: [],
    stipend: "Varies",
    stipendNote: "The page mentions neither a fee nor a stipend. Ask before you commit.",
    deadline: "2026-10-22",
    verified: "2026-10-08",
    url: "https://vnit.ac.in/ip/",
    note: "Work on a research or consultancy project under a VNIT faculty member. Open to students of other colleges. This round is for January to May 2027; you register with a Google Form and then list the faculty you prefer."
  },
  {
    id: "science-academies-srfp-2027",
    title: "Summer Research Fellowship 2027",
    org: "Indian Academy of Sciences, INSA and NASI",
    badge: "IASc",
    category: "Research",
    domains: ["Research"],
    mode: ["On-site"],
    location: "Research institutes across India",
    duration: "2 months",
    years: [2, 3],
    stipend: "Stipend",
    stipendNote: "Monthly fellowship plus return train fare; the page does not state the amount.",
    deadline: "2026-11-30",
    verified: "2026-10-08",
    url: "https://webjapps.ias.ac.in/fellowship2027/",
    note: "For second and third-year B.E./B.Tech students with 65% or more in core subjects since Class X. You need scanned mark sheets, a 150 to 250 word write-up and a teacher who will send a recommendation."
  },
  {
    id: "ursc-student-internship",
    title: "Student Internships and Projects",
    org: "U R Rao Satellite Centre (ISRO), Bengaluru",
    badge: "URSC",
    category: "Research",
    domains: ["Communication & Networking", "Embedded & IoT", "Research"],
    mode: ["On-site"],
    location: "Bengaluru, Karnataka",
    duration: "15 to 45 days (internship); 30 to 120 days (project)",
    years: [3, 4],
    stipend: "Unpaid",
    stipendNote: "No stipend.",
    deadline: "Portal reopens on 2 Nov 2026 for January to March 2027",
    verified: "2026-10-08",
    url: "https://www.ursc.gov.in/hrd/students.jsp",
    note: "ISRO's satellite-building centre. From the 5th semester onward with 60% or 6.32 CGPA. Keep your mark sheets, résumé and a signed letter from the Principal or HOD ready before the portal opens."
  },
  {
    id: "sdsc-shar-internship",
    title: "Student Internship and Project Work",
    org: "Satish Dhawan Space Centre SHAR (ISRO), Sriharikota",
    badge: "SHAR",
    category: "Research",
    domains: ["Core Electronics", "Communication & Networking", "Research"],
    mode: ["On-site"],
    location: "Sriharikota, Andhra Pradesh",
    duration: "Decided by the centre",
    years: [],
    stipend: "Unpaid",
    stipendNote: "No stipend at any ISRO centre.",
    deadline: "Rolling",
    verified: "2026-10-08",
    url: "https://www.shar.gov.in/sdscshar/internship.jsp",
    note: "India's launch centre. Email one PDF with a bonafide letter on college letterhead signed by the Principal or HOD, your mark sheet and ID. It must reach them at least a month before your start date."
  },
  {
    id: "rri-visiting-students",
    title: "Visiting Student Programme",
    org: "Raman Research Institute, Bengaluru",
    badge: "RRI",
    category: "Research",
    domains: ["Signal & Image Processing", "Core Electronics", "Research"],
    mode: ["On-site"],
    location: "Bengaluru, Karnataka",
    duration: "4 weeks to 6 months",
    years: [3, 4],
    stipend: "Stipend",
    stipendNote: "Rs. 15,000 per month plus sleeper-class train fare for full-time students from outside Bengaluru.",
    deadline: "Rolling",
    verified: "2026-10-08",
    url: "https://www.rri.res.in/careers/visiting-students",
    note: "Open all year to students in the last one or two years of an engineering degree. Pick an RRI staff member whose work interests you and email them at least two months before you want to visit."
  },
  {
    id: "fossee-internships",
    title: "FOSSEE Internships and Summer Fellowship",
    org: "FOSSEE, IIT Bombay",
    badge: "FOSSEE",
    category: "Open source",
    domains: ["Embedded & IoT", "Core Electronics", "Signal & Image Processing"],
    mode: ["Remote", "Hybrid", "On-site"],
    location: "Online, or IIT Bombay, Mumbai",
    duration: "1.5 to 3 months",
    years: [1, 2, 3, 4],
    stipend: "Unpaid",
    stipendNote: "FOSSEE says it cannot pay an honorarium.",
    deadline: "Semester round opens in Jan/Feb; summer round in March",
    verified: "2026-10-08",
    url: "https://fossee.in/fossee-internships",
    note: "Work on open-source tools such as eSim, Scilab, Arduino and OpenModelica. Students of any college and any year can apply. Selection is by screening tasks that take two to four weeks."
  },
  {
    id: "google-summer-of-code",
    title: "Google Summer of Code",
    org: "Google",
    badge: "GSoC",
    category: "Open source",
    domains: ["Web & App Development", "AI/ML & Data Science", "Cloud & DevOps"],
    mode: ["Remote"],
    location: "Remote",
    duration: "12 weeks or longer",
    years: [],
    stipend: "Stipend",
    stipendNote: "Google pays a stipend to contributors who pass their evaluations.",
    deadline: "Applications open in March (16 to 31 March in 2026)",
    verified: "2026-10-08",
    url: "https://summerofcode.withgoogle.com/",
    note: "Write code for an open-source organisation with a mentor, entirely online. You must be 18 or older and a student or a beginner in open source. Start contributing to a project months before applications open."
  },
  {
    id: "mlh-fellowship",
    title: "MLH Fellowship, Open Source Track",
    org: "Major League Hacking",
    badge: "MLH",
    category: "Open source",
    domains: ["Web & App Development", "Cloud & DevOps"],
    mode: ["Remote"],
    location: "Remote",
    duration: "12 weeks",
    years: [],
    stipend: "Varies",
    stipendNote: "A stipend is offered only for some programmes.",
    deadline: "Rolling",
    verified: "2026-10-08",
    url: "https://fellowship.mlh.com/programs/open-source",
    note: "A remote alternative to an internship: you contribute to widely used open-source projects in a small team with a mentor. Needs 20 or more hours a week; Indian working hours are accepted. You must be 18 or older."
  },
  {
    id: "lfx-mentorship",
    title: "LFX Mentorship",
    org: "The Linux Foundation",
    badge: "LFX",
    category: "Open source",
    domains: ["Cloud & DevOps", "Embedded & IoT", "Web & App Development"],
    mode: [],
    location: "See the official page",
    duration: "One term (spring, summer or fall)",
    years: [],
    stipend: "Varies",
    stipendNote: "",
    deadline: "3 rounds a year; each opens about a month before the term",
    verified: "2026-10-08",
    url: "https://www.linuxfoundation.org/about/mentorship-programs/",
    note: "Mentored work on Linux Foundation projects such as the Linux kernel and cloud-native tools. Terms start in mid-January, mid-April and mid-July. Use Apply as a Mentee on the page."
  },
  {
    id: "outreachy",
    title: "Outreachy Internships",
    org: "Outreachy",
    badge: "OUTR",
    category: "Open source",
    domains: ["Web & App Development", "Cloud & DevOps", "AI/ML & Data Science"],
    mode: ["Remote"],
    location: "Remote",
    duration: "About 3 months",
    years: [],
    stipend: "Stipend",
    stipendNote: "US$7,000 in total.",
    deadline: "Two rounds a year, opening around February and August",
    verified: "2026-10-08",
    url: "https://www.outreachy.org/",
    note: "Paid remote open-source internships for people who face under-representation or bias in their country's technology industry. Read the eligibility rules on the site before applying."
  },
  {
    id: "mathworks-virtual-internship-aicte",
    title: "MATLAB and Simulink Virtual Internship",
    org: "MathWorks, through the AICTE portal",
    badge: "MATLAB",
    category: "Company",
    domains: ["Signal & Image Processing", "AI/ML & Data Science", "Core Electronics"],
    mode: ["Remote"],
    location: "Online",
    duration: "About 4 months",
    years: [],
    stipend: "Varies",
    stipendNote: "Free to join. The page mentions no stipend.",
    deadline: "Next cohort opens shortly",
    verified: "2026-10-08",
    url: "https://internship.aicte-india.org/internships/mathworks",
    note: "Fully online on MATLAB Online, for electronics, electrical and other engineering branches that use MATLAB. Register on the AICTE portal now so you can apply the day the cohort opens."
  },
  {
    id: "mathworks-internships",
    title: "Internships at MathWorks",
    org: "MathWorks",
    badge: "MW",
    category: "Company",
    domains: ["Signal & Image Processing", "AI/ML & Data Science"],
    mode: [],
    location: "Bengaluru and Hyderabad offices",
    duration: "See each role",
    years: [],
    stipend: "Varies",
    stipendNote: "",
    deadline: "Roles are posted for spring, summer and fall",
    verified: "2026-10-08",
    url: "https://www.mathworks.com/company/jobs/students/internships.html",
    note: "The makers of MATLAB. Use the technical internship job search on the page and filter by India."
  },
  {
    id: "maharashtra-govt-internships",
    title: "Government of Maharashtra Internships",
    org: "Higher & Technical Education Dept, through the AICTE portal",
    badge: "MAHA",
    category: "Government",
    domains: ["Web & App Development", "Core Electronics"],
    mode: [],
    location: "Maharashtra",
    duration: "Varies by posting",
    years: [],
    stipend: "Varies",
    stipendNote: "Each posting states its stipend.",
    deadline: "Varies by posting",
    verified: "2026-10-08",
    url: "https://internship.aicte-india.org/dashboards/maharashtra",
    note: "State government internship postings in departments, collectorates and municipal bodies. Use Apply Openings and sign in with your AICTE portal student account."
  },
  {
    id: "aicte-national-internship-portal",
    title: "National Internship Portal",
    org: "AICTE, Ministry of Education",
    badge: "AICTE",
    category: "Government",
    domains: ["Embedded & IoT", "VLSI & Semiconductor", "Communication & Networking", "AI/ML & Data Science", "Web & App Development", "Core Electronics"],
    mode: ["Remote", "On-site", "Hybrid"],
    location: "All India, searchable by district",
    duration: "1 week to 6 months",
    years: [1, 2, 3, 4],
    stipend: "Varies",
    stipendNote: "Each posting states its stipend. Registration and applying are free.",
    deadline: "Rolling",
    verified: "2026-10-08",
    url: "https://internship.aicte-india.org/",
    note: "The government's own portal with postings from ministries, PSUs and companies. Register once with your college details, then apply to any posting."
  },
  {
    id: "iirs-external-internship",
    title: "External Student Internship",
    org: "Indian Institute of Remote Sensing (ISRO), Dehradun",
    badge: "IIRS",
    category: "Research",
    domains: ["Signal & Image Processing", "AI/ML & Data Science", "Research"],
    mode: ["On-site"],
    location: "Dehradun, Uttarakhand",
    duration: "45 days to 1 year",
    years: [1, 2, 3, 4],
    stipend: "Unpaid",
    stipendNote: "No stipend and no accommodation.",
    deadline: ["2026-10-30", "2027-03-31"],
    verified: "2026-10-08",
    url: "https://www.iirs.gov.in/content/external-student-internship",
    note: "Needs 60% or 6.32 CGPA and an NOC or recommendation letter from the college, uploaded with the online form. Project work is open after the 6th semester."
  },
  {
    id: "isro-internship-project-trainee",
    title: "Internship and Student Project Trainee Schemes",
    org: "ISRO / Department of Space",
    badge: "ISRO",
    category: "Research",
    domains: ["Communication & Networking", "Core Electronics", "Research"],
    mode: ["On-site"],
    location: "ISRO centres across India",
    duration: "Up to 45 days (internship); 45 days or more (project)",
    years: [1, 2, 3, 4],
    stipend: "Unpaid",
    stipendNote: "No stipend at any ISRO centre.",
    deadline: "Varies by centre",
    verified: "2026-10-08",
    url: "https://www.isro.gov.in/InternshipAndProjects.html",
    note: "Needs 60% or 6.32 CGPA. Project work is open after the 6th semester. This page lists every centre's own application page; you apply to the centre, not to ISRO headquarters."
  },
  {
    id: "nrsc-student-projects",
    title: "Student Projects and Internships",
    org: "National Remote Sensing Centre (ISRO), Hyderabad",
    badge: "NRSC",
    category: "Research",
    domains: ["Signal & Image Processing", "Research"],
    mode: ["On-site"],
    location: "Hyderabad, Telangana",
    duration: "About 45 days (internship); 90 days or more (project)",
    years: [4],
    stipend: "Unpaid",
    stipendNote: "No stipend at any ISRO centre.",
    deadline: "Rolling",
    verified: "2026-10-08",
    url: "https://www.nrsc.gov.in/nrscnew/Training_Student_Eligibility.php",
    note: "For students who have completed the 6th semester with 60% or 6.32 CGPA. Apply by email at least 30 days ahead with a college request letter, CV and mark sheets. Seats are limited."
  },
  {
    id: "drdo-internship-scheme",
    title: "Internship for Project Training at DRDO Labs",
    org: "Defence Research & Development Organisation",
    badge: "DRDO",
    category: "Government",
    domains: ["Core Electronics", "Communication & Networking", "Research"],
    mode: ["On-site"],
    location: "DRDO labs across India",
    duration: "4 weeks to 6 months",
    years: [],
    stipend: "Varies",
    stipendNote: "The scheme page does not mention a stipend. Ask the lab.",
    deadline: "Rolling",
    verified: "2026-10-08",
    url: "https://www.drdo.gov.in/scheme-internship-students",
    note: "You do not apply online. The college writes to the lab that matches your branch, and the lab director decides based on vacancies. Start with a request letter from the department."
  },
  {
    id: "nptel-internship",
    title: "NPTEL Summer and Winter Internship",
    org: "NPTEL (IITs and IISc)",
    badge: "NPTEL",
    category: "Research",
    domains: ["Research"],
    mode: ["On-site"],
    location: "IITs, IISc and other course-offering institutes",
    duration: "2 to 12 weeks",
    years: [1, 2, 3, 4],
    stipend: "Stipend",
    stipendNote: "Rs. 7,500 for 2 weeks up to Rs. 45,000 for 12 weeks, paid on completion.",
    deadline: "By invitation: emails go out in October and April",
    verified: "2026-10-08",
    url: "https://nptel.ac.in/internship",
    note: "Only for NPTEL course toppers and Elite-Gold certificate holders. Score well in an NPTEL course and NPTEL emails you the application link if the instructor is taking interns."
  },
  {
    id: "ncra-vsrp",
    title: "Visiting Students' Research Programme",
    org: "National Centre for Radio Astrophysics (TIFR), Pune",
    badge: "NCRA",
    category: "Research",
    domains: ["Signal & Image Processing", "Core Electronics", "Research"],
    mode: ["On-site"],
    location: "Pune, Maharashtra",
    duration: "May to July",
    years: [3],
    stipend: "Stipend",
    stipendNote: "Paid by NCRA; the page does not state the amount.",
    deadline: "Opens mid-January, closes mid-February",
    verified: "2026-10-08",
    url: "https://www.ncra.tifr.res.in/students/external-students/vsrp",
    note: "For B.E./B.Tech students about to enter their final year. The centre runs the GMRT radio telescope, so electronics and signal-processing students fit well."
  },
  {
    id: "iitk-surge",
    title: "SURGE Summer Research Programme",
    org: "IIT Kanpur",
    badge: "IITK",
    category: "Research",
    domains: ["Research"],
    mode: ["On-site"],
    location: "Kanpur, Uttar Pradesh",
    duration: "About 8 weeks, May to July",
    years: [],
    stipend: "Varies",
    stipendNote: "See the SURGE site for this year's stipend.",
    deadline: "Dates for the next summer are not announced yet",
    verified: "2026-10-08",
    url: "https://surge.iitk.ac.in/about",
    note: "Open to undergraduates from other institutes. You work on a research project with an IIT Kanpur faculty member; check the Important Dates page when it is updated."
  },
  {
    id: "bsnl-alttc-training",
    title: "Vocational Training and Internship",
    org: "BSNL ALTTC, Ghaziabad",
    badge: "BSNL",
    category: "PSU",
    domains: ["Communication & Networking"],
    mode: ["Remote", "On-site"],
    location: "Ghaziabad, Uttar Pradesh, or online",
    duration: "2, 4 or 6 weeks; projects of 3 or 6 months",
    years: [],
    stipend: "Fee-based",
    stipendNote: "You pay a course fee. The fee for each batch is on the linked training pages.",
    deadline: "Batch dates are on the page",
    verified: "2026-10-08",
    url: "https://alttc.bsnl.co.in/students_trg/maintrg.php",
    note: "Telecom, networking and IT training from BSNL's apex training institute, for B.E./B.Tech students. Check the fee before you register."
  },
  {
    id: "qualcomm-india-internships",
    title: "Internships and Early-Career Roles, India",
    org: "Qualcomm",
    badge: "QCOM",
    category: "Company",
    domains: ["VLSI & Semiconductor", "Communication & Networking", "Embedded & IoT"],
    mode: [],
    location: "India",
    duration: "See the page",
    years: [],
    stipend: "Varies",
    stipendNote: "",
    deadline: "See the page",
    verified: "2026-10-08",
    url: "https://www.qualcomm.com/company/careers/internships-and-early-in-career-opportunities/india",
    note: "Qualcomm's own page for student roles in India. Open roles and their requirements are listed there."
  },
  {
    id: "synopsys-early-careers",
    title: "Early Careers and Internships",
    org: "Synopsys",
    badge: "SNPS",
    category: "Company",
    domains: ["VLSI & Semiconductor"],
    mode: [],
    location: "India roles are listed on the page",
    duration: "See each role",
    years: [],
    stipend: "Varies",
    stipendNote: "",
    deadline: "Summer roles usually open in November",
    verified: "2026-10-08",
    url: "https://careers.synopsys.com/early-careers",
    note: "Chip-design software company. Use Find an Internship and filter by India; few India roles are open at a time, so check again in November."
  },
  {
    id: "bosch-india-internships",
    title: "Internships at Bosch India",
    org: "Bosch",
    badge: "BOSCH",
    category: "Company",
    domains: ["Embedded & IoT", "Core Electronics"],
    mode: ["On-site"],
    location: "Bosch locations in India",
    duration: "Up to 1 year",
    years: [],
    stipend: "Stipend",
    stipendNote: "The page promises remuneration but gives no amount.",
    deadline: "Rolling",
    verified: "2026-10-08",
    url: "https://bosch.in/careers/students-and-graduates/internships/",
    note: "Apply through the online jobs portal linked on the page or through the placement office. Selection has a written test and an interview."
  },
  {
    id: "nokia-india-students",
    title: "Student and Graduate Opportunities, India",
    org: "Nokia",
    badge: "NOKIA",
    category: "Company",
    domains: ["Communication & Networking", "AI/ML & Data Science", "Cloud & DevOps"],
    mode: [],
    location: "India",
    duration: "See the page",
    years: [],
    stipend: "Varies",
    stipendNote: "",
    deadline: "Through the college placement office",
    verified: "2026-10-08",
    url: "https://www.nokia.com/about-us/careers/student-and-graduate-opportunities/india",
    note: "Nokia hires students only through college Training and Placement offices, not by direct application. Read the page, then speak to the Internship Coordinator."
  },
  {
    id: "c4gt-code-for-govtech",
    title: "Code for GovTech (C4GT)",
    org: "C4GT open-source community",
    badge: "C4GT",
    category: "Open source",
    domains: ["Web & App Development", "Cloud & DevOps"],
    mode: ["Remote"],
    location: "Remote",
    duration: "About 3 months (mentoring programme)",
    years: [],
    stipend: "Stipend",
    stipendNote: "Paid to contributors selected for the Dedicated Mentoring Programme; the amount is not stated.",
    deadline: "See the page",
    verified: "2026-10-08",
    url: "https://github.com/Code4GovTech/C4GT/wiki",
    note: "Contribute code to open-source software used by Indian government services, with a mentor. You need a GitHub account and working knowledge of Git."
  }
];

/* ---------------------------------------------------------------------
   WHERE TO SEARCH MORE
   Every link below was opened and read on 8 Oct 2026.

   To add a link: { name: "Name", url: "https://...", note: "What students find there" },
   --------------------------------------------------------------------- */
window.PORTALS = [
  {
    group: "Internshala",
    source: "A free internship portal. These pages showed live postings on 8 Oct 2026.",
    links: [
      { name: "Electronics internships", url: "https://internshala.com/internships/electronics-internship/", note: "About 80 postings" },
      { name: "Work from home", url: "https://internshala.com/internships/work-from-home-internships/", note: "About 2,300 postings" },
      { name: "Internships in Nagpur", url: "https://internshala.com/internships/internship-in-nagpur/", note: "The nearest large city" },
      { name: "Internships in Pune", url: "https://internshala.com/internships/internship-in-pune/", note: "About 2,500 postings" },
      { name: "All internships", url: "https://internshala.com/internships/", note: "About 7,400 postings across India" }
    ]
  },
  {
    group: "More ISRO centres that take students",
    source: "Each centre has its own rules and dates. You apply to the centre directly.",
    links: [
      { name: "Vikram Sarabhai Space Centre, Thiruvananthapuram", url: "https://www.vssc.gov.in/STUDENTS/", note: "Internships of 21 to 45 days" },
      { name: "Master Control Facility, Hassan and Bhopal", url: "https://www.mcf.gov.in/website/Internship", note: "Internships usually run August to October" },
      { name: "ISTRAC, Bengaluru", url: "https://www.istrac.gov.in/Student_Internship.html", note: "Guidelines are in a PDF on the page" }
    ]
  },
  {
    group: "Company student pages",
    source: "Official worldwide pages. They do not list India separately, so search each site's job list for India.",
    links: [
      { name: "Texas Instruments", url: "https://careers.ti.com/students/", note: "Analog and embedded chips" },
      { name: "NXP Semiconductors", url: "https://www.nxp.com/company/about-nxp/our-team-members/future-talent:FUTURE-TALENT", note: "Automotive and IoT chips" },
      { name: "STMicroelectronics", url: "https://www.st.com/content/st_com/en/about/careers/intern_thesis.htgy.html", note: "Internships and thesis projects" },
      { name: "Analog Devices", url: "https://www.analog.com/en/about-adi/careers/students-and-graduates.html", note: "Summer internships and co-ops" },
      { name: "Microsoft", url: "https://careers.microsoft.com/v2/global/en/students", note: "University internships" },
      { name: "Google", url: "https://www.google.com/about/careers/applications/students/", note: "Internships and student programmes" }
    ]
  }
];
