const chatContainer = document.getElementById('chatContainer');
const userInput = document.getElementById('userInput');
const chatForm = document.getElementById('chatForm');
const menuButton = document.getElementById('menuButton');
const navbar = document.getElementById('navbar');
const closeNavButton = document.getElementById('closeNavButton');
const reportDialog = document.getElementById('reportDialog');
const submitReportButton = document.getElementById('submitReport');
const cancelReportButton = document.getElementById('cancelReport');
const navButtons = document.querySelectorAll('.nav-button');
const sections = {
    home: document.getElementById('homeSection'),
    about: document.getElementById('aboutSection'),
    contact: document.getElementById('contactSection')
};
const notificationsContainer = document.getElementById('notifications');
const contactForm = document.getElementById('contactForm');
const welcomeMessage = document.getElementById('welcomeMessage');
const sendButton = document.getElementById('sendButton');
const sendIcon = document.getElementById('sendIcon');
const sendText = document.getElementById('sendText');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const clearHistoryModal = document.getElementById('clearHistoryModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalCancelBtn = document.getElementById('modalCancelBtn');
const modalClearBtn = document.getElementById('modalClearBtn');

let messages = [];
let conversationHistory = [];
let schoolData = `
You are a personalized chatbot created for Dharam Hinduja Matriculation Higher Secondary School, committed to providing smart, specific, and user-friendly responses. You will answer questions related to the school while ensuring your replies are concise and relevant, avoiding unnecessary details or answering unrelated questions. You are here to help and will strive to continuously improve your performance based on user feedback.Our School Located at No. 19, Poonthottam Street, Tiruvottiyur, Chennai - 600 019, our school can be reached at dharam_hinduja@yahoo.com or by phone at (044) 2572-7553 and +91 9025218724.
Our History and Vision
Established in 1994 by Ashok Leyland, our school was founded with the goal of providing quality education to the children of its employees and the local community. Today, we have grown into one of the best schools in Thiruvottiyur, focusing on academic excellence and extracurricular activities. Our director, N R Sarala, believes that teachers play a vital role in shaping young minds and that they are a bundle of talent who know how to work more with less.
Infrastructure and Facilities
Our school boasts state-of-the-art infrastructure, including smart classes, fully equipped laboratories, a playground, and a basketball court. We strive to provide a conducive learning environment that fosters growth and development.
Mission and Vision
Our mission is to empower learners in thinking, questioning, and problem-solving, while our vision is to cultivate young minds. We aim to equip our students with the necessary knowledge, skills, and values to succeed in life.
About Us
Our school's about us section includes a message from our director, highlighting the challenges of teaching in today's information age. We also have a section dedicated to our infrastructure, showcasing our natural surroundings, green lung, open lawns, and colorful floral bounty.
Mission and Vision Statement
Our mission is to empower learners in thinking, questioning, problem-solving, and helping them to be their best versions. We aim to give precise directions to lead a disciplined child and adolescent life, take off in the direction of their careers, nourish the hopes of the future, and help students imbibe moral values. Our vision motto is "Where the vision is one year, cultivate flowers, Where the vision is ten years, cultivate trees, Where the vision is eternity, cultivate young minds."
Toppers List
We take pride in our students' academic achievements, and our toppers list includes:
2017-2018: ARUN SHANKAR R (554/600), AATHITHAN R S (547/600), and KEERTHANA P (542/600) in XI standard.
2018-2019: FAUSAL HAMEETHA NASREEN S (479/500), KUMARI S (468/500), and DEVIPRIYA R (465/500) in X standard, MAHALAKSHMI S (527/600), KISHORE P (507/600), and MADHUMITHA J (502/600) in XI standard, and ARUN SHANKAR R (564/600), ASHWIN J J (564/600), and KEERTHANA P (547/600) in XII standard.
2019-2020: MAHAVIGNESH S (477/500), VARSHA U (468/500), and REVATA R (460/500) in X standard, MEENAKSHI A (554/600), FAUSAL HAMEETHA NASREEN S (552/600), and DEVI PRIYA R (551/600) in XI standard, and AYESHA SIDDHIKA M (560/600), KIRUTHIGA U (552/600), and SUMANTA KUMAR SIYA S (547/600) in XII standard.
2020-2021: FAUSAL HAMEETHA NASREEN S (581/600), MOHSIN L (575/600), and DEVI PRIYA R (573/600) in XII standard.
2021-2022: JANANI PRIYA V (484/500), BRINDHA A S (480/500), and DAPHNE GEORGIA S (476/500) in X standard, MADHUMITHA R (581/600), APARNA N (581/600), and SARIGA T (573/600) in XI standard, and VARSHA U (591/600), RADHIKA M (584/600), and RAGHU J V (577/600) in XII standard.
2022-2023: DEVISREE K (484/500), NISHALINI K (472/500), and PRAGATHESHWAR Y (470/500) in X standard, DAPHNE GEORGIA S (572/600), MRUTHULA K (569/600), and SWATHI R (568/600) in XI standard, and APARNA N (590/600), MADHUMITHA R (590/600), and G AYATHRI B (576/600) in XII standard.
2023-2024: PRIYADHARSHINI P (481/500), HARENI T (480/500), and HARITHA P (475/500) in X standard, DEVI SREE K (589/600), KOWSALYA S (551/600), and KARTHICK R (532/600) in XI standard, and DAPHNE GEORGIA S (586/600), NEELAVENI S (584/600), SANJANA A (576/600), and MRUTHULA K (576/600) in XII standard.
Faculty Details
Our faculty consists of 32 dedicated teachers, including:
Mrs. Malarvizhi S (M.Com., B.A., B.Ed.)
Mrs. Kavitha K (M.Sc., B.Ed.)
Mrs. Muthusuji C (M.Sc., B.Ed.)
Ms. Revathy S (M.Sc., M.Phil., B.Ed.)
Mrs. Bhavani K (B.A., B.Ed.)
Ms. Jansi Rani S (M.Sc., B.Ed.)
Mrs. Jisha P A (B.A., B.Ed.)
Mr. Elumalai K (B.A., B.Ph.Ed.)
Mrs. Neelavathy K (M.A., M.Phil., B.Ed.)
Mrs. Manjula S (M.A., B.Ed.)
Mrs. Mary Murray (B.A., B.Ed.)
Mr. Samuel Durai Kamalashan P (M.Sc., M.Phil., B.Ed.)
Mrs. Rama R (M.Com., B.Ed.)
Mr. Raju K R (M.Sc., B.Ed.)
Mr. Gnnaiya E (M.Com., M.A., B.Ed.)
Mr. Paramasivam E (M.Sc., B.Ed.)
Mrs. Jayasheela D (M.A., B.Ed.)
Mrs. Priya M (M.Sc., M.Phil., B.Ed.)
Mrs. Sumithra T (M.Sc., B.Ed.)
Mrs. Sasikala P (B.Sc., B.Ed.)
Mrs. Jasmine P (M.A., B.Ed.)
Mrs. Bhuvaneshwari A (M.Sc., B.Ed.)
Mrs. Victoria Mary V (M.A., B.Ed., B.Lit.)
Mrs. Kalaiselvi A (B.Sc., B.Ed.)
Mrs. Priyadharshini B V (B.A., B.Ed.)
Mrs. Latha G (B.Sc., B.Ed.)
Mrs. Ramamani G (M.A., B.Ed.)
Mrs. Prince S (M.A., B.Lit., D.T.E., B.Ed.)
Easwari M (B.com., D.T.ED)
Manimegalai A (B.A, B.Ed)
Praseetha P (M.Com, B.Ed)
Jenith M (Montessori)
Career Guidance
We provide education and career guidance to equip our students with the necessary knowledge, skills, and values to make informed decisions at each key education stage for successful transition from school to further education or work.

INTER SCHOOL COMPETITION 2024-25: HARINI D from VIII A won the consolation prize in Tamil Elocution, OVIYA S from X B secured III position in Painting, RITHIKA S from XI B2 won the consolation prize in Tamil Elocution, YAMINI R from XII B2 secured II position in Title Hunt, VAISHNAVI M from IX A won I position in Drawing, OVIYA S from X B won I position in Drawing, MOHAMMED YUSUF M from XI C secured II position in Drawing, KISHORE V from XI B2 secured III position in Drawing, RADHANA G from VI C secured II position in Craft, KEERTHIVASAN J from VII A won I position in Craft, HIROSHINI R from VIII B secured III position in Tamil Elocution, ROSHINI P from IX C secured II position in Tamil Elocution, KARTHICKRAM S from VII B secured II position in Speed Math's, DHARSHANASRI S from VI B secured III position in Fancy Dress, HASWANTH SAI SB from V A secured II position in Singing, SHREEMATHI M from X A won I position in Handwriting, RATCHAKA M from VIII B secured III position in Carrom, UDHAYANITHI K from XII B2 secured II position in Quiz , and PANDIYA RAJAN V from XII B2 secured II position in Quiz.
ZONAL LEVEL GAMES & SPORTS - 2023-24: AAKASH M from VIII A won the Kho-Kho competition, PRITHIV RAJ C from VIII B won the Kho-Kho competition, NAVEEN KUMAR P from XI D won the Kho-Kho competition, NAVEEN KUMAR P from XI D won the Tennikoit(S) competition, NAVEEN KUMAR P from XI D secured runner position in Tennikoit(D), SOURISH S from VII C won the Table Tennis(S) competition, SUJITH from X B won the Badminton(D) competition, RANJAN L from IX won the Gold medal in Boxing, RANJAN L from IX secured first position in Boxing, NAVEEN KUMAR P from XI D secured third position in Tennikoit, AAKASH M from VIII A secured first position in State Level Yoga Championship, THANUSHA V from VII secured second position in State Level Yoga Championship, and TAMILARASAN S from VI secured second position in State Level Yoga Championship.


INTER SCHOOL COMPETITION 2023-24: ROSHINI from VIII won I position in Tamil Kavithai Potti, HARINI D from VIII won I position in Tamil Oratorical, MYTHILI G from XII D won I position in English Oratorical, and THARANIE P from X B secured II position in English Oratorical.
SPORTS REPORT (ZONAL LEVEL GAME) 2019-2020: The school participated in various games and secured several positions.
SPORTS REPORT (DISTRICT LEVEL GAME) 2019-2020: The school participated in various games and secured several positions.
SPORTS REPORT (STATE LEVEL GAME) 2019-2020: The school participated in Chess and secured I position.
ZONAL ATHLETE EVENT BOYS (07-09-2019): JASWANTH KUMAR from IX C won I position in High Jump, HABIBUM RAHMAN Y from XII A secured II position in 200 Mts, DEERAJ N from IX B secured II position in Discuss, VISHNU D from IX C secured II position in Long Jump, MUTHUVEL KANNAN from X won I position in 4 X 100 Mts, JASHWANTH KUMAR from IX won I position in 4 X 100 Mts, VISHNU D from IX won I position in 4 X 100 Mts, and EL ANGO from IX won I position in 4 X 100 Mts.
ZONAL ATHLETE EVENT GIRLS (06-09-2019): KAVIYA SHREE from IX A secured II position in 400 Mts, SRIMATHI from IX B secured III position in 400 Mts, YOGITHA from IX C secured III position in 800 Mts, KAVIYA SHREE from IX A secured III position in High Jump, YOGALAKSHMI from XI D won II position in 4X100 Mts, KAVIYA SHREE from IX C won II position in 4X100 Mts, KOWSH IKA SRI from IX C won II position in 4X100 Mts, and YOGITHA from IX A won II position in 4X100 Mts.


ZONAL GAMES: 
PRIYANKA R from VII A won I position in Chess, JACKSON V from X secured II position in Chess, GOWTHAM M from VIII C secured III position in Chess, BARATH KUMAR M from X A secured III position in Chess, NARESH R from IX D won the Carrom: Boys & Girls competition, ABDUL FAIAZ A from IX A secured runner position in Carrom: Boys & Girls, GOKUL NADHAN R from XII B secured runner position in Carrom: Boys & Girls, SARATH R from XII D secured runner position in Carrom: Boys & Girls, MYTHILI S from IX A secured runner position in Carrom: Boys & Girls, ABISHA B from X B secured runner position in Carrom: Boys & Girls, VIGNESH S from IX C won the Tennikoit: Boys competition, GOPALA KRISHNAN I from IX A won the Tennikoit: Boys competition, VIGNESH S from IX C won the Tennikoit: Boys competition, SATHISH KUMAR from X A won the Tennikoit: Boys competition, RAGHU J V from X A won the Tennikoit: Boys competition, SATHISH R from XII A secured runner position in Tennikoit: Boys, RAJEESH from X B secured runner position in Tennikoit: Boys, NIVEDHA from IX A won the Tennikoit: Girls competition, MAHALAKSHMI from IX A won the Tennikoit: Girls competition, NIVEDHA from IX A won the Tennikoit: Girls competition, PRIYANKA S from IX A secured runner position in Tennikoit: Girls, KEERTHANA E from VIII A secured runner position in Table Tennis - Girls, RITHIKA D from VIII B won the Table Tennis - Girls competition, KEERTHANA E from VIII A won the Table Tennis - Girls competition, RAJALAKSHMI G from VIII A won the Table Tennis - Girls competition, YESHMITHA SRI R S from VIII C won the Table Tennis - Girls competition, RAJALAKSHMI G from VIII A won the Table Tennis - Girls competition, SANJEEVA DHANUSRI V from VI A won the Table Tennis - Girls competition, SUSIKSHA S from IX B won the Table Tennis - Girls competition, SANJEEVA DHANUSRI V from VI A won the Table Tennis - Girls competition, PRAVEEN GANDHI T from VIII C won the Table Tennis - Boys competition, ROSAN B from VIII C won the Table Tennis - Boys competition, PRAVEEN GANDHI T from VIII C secured runner position in Table Tennis - Boys, VETRI SELVAN K from XI C secured runner position in Table Tennis - Boys, ASHOK GOWTHAM E from XI D secured runner position in Table Tennis - Boys, VETRI SELVAN K from XI C secured runner position in Table Tennis - Boys,
 KOWSHIKA SHREE S from IX C won the Kho-Kho (U-17 Girls) competition, KAVIYA SRI S from IX C won the Kho-Kho (U-17 Girls) competition, YOGITHA S C from IX A won the Kho-Kho (U-17 Girls) competition, YOGALAKSHMI M from XI A won the Kho-Kho (U-17 Girls) competition, YUGANDHIYA R from XI B won the Kho-Kho (U-17 Girls) competition, PRISILLA J from XI B won the Kho-Kho (U-17 Girls) competition, SRIMATHI R from IX C won the Kho-Kho (U-17 Girls) competition, JEEVALALITHA R from XI C won the Kho-Kho (U-17 Girls) competition, PAVITHRA S from IX C won the Kho-Kho (U-17 Girls) competition, RITHIKA S from IX C won the Kho-Kho (U-17 Girls) competition , KAVIBARATHI D from IX B won the Kho-Kho (U-17 Girls) competition, HARINI T from IX B won the Kho-Kho (U-17 Girls) competition, KAVIYA K from VIII B secured runner position in Kho-Kho (U-14 Girls), SAJEETHA S from VIII C secured runner position in Kho-Kho (U-14 Girls), POOJA R from VIII C secured runner position in Kho-Kho (U-14 Girls), SHARMILA S from VIII C secured runner position in Kho-Kho (U-14 Girls), VAISHNAVI S from VIII B secured runner position in Kho-Kho (U-14 Girls), VINITHA J from VIII A secured runner position in Kho-Kho (U-14 Girls), DHARSHINI R from VIIIA secured runner position in Kho-Kho (U-14 Girls), HARSHINI K from VI A secured runner position in Kho-Kho (U-14 Girls), GRACE GNANA SUNDARI from VII A secured runner position in Kho-Kho (U-14 Girls),
ANITHA M from VII A secured runner position in Kho-Kho (U-14 Girls), DEEPIKA M from VII B secured runner position in Kho-Kho (U-14 Girls), and HEMALATHA K from IX C secured runner position in Kho-Kho (U-14 Girls).
and In INTER SCHOOL COMPETITIONS -2017-18: YOGA KEERTHIGAN from XII B secured II position in Face Painting, AISHWARYA U from XI A won I position in English Elocution, KASTHURI PRIYA from XI E won I position in Bridal Makeup, VARSHA U & KAVITHA SREE S from VIII A won I position in Rangoli, APARNA N from VII A secured II position in English Elocution, DEVI SREE K from V won I position in English Elocution, SAKTHI SARATHY G R from II won I position in Dance, JOYSON PAUL V from II won I position in Dance, SHERLYN JERUSHA J from II won I position in Dance, JANANI R from II won I position in Dance, DHARSHANASRI S from II won I position in Dance, SANJANA V from II won I position in Dance, ASHWIN R from II won I position in Dance, LAKSHAYASHREE H from II won I position in Dance, SHIVANI M R from secured I position in Drawing & Colouring, MUHSIN AHAMED M H from secured II position in Drawing & Colouring, KESHAV RAO L K G from secured II position in Rhymes, KAVINESH K from U K G won I position in Story Telling, YOGA KEERTHIGAN from XII B won I position in Pencil Shading, RAGAVI from II secured II position in Story Telling, SRI ESWAR & MOHAMMED SIRAJ FAZIL from IX B won I position in Modern Puppetry, GOKUL & RAJEESH from VIII B won I position in Modern Puppetry, YUGANTHIYA from X won I position in Folk Dance, MADHUMITA from X won I position in Folk Dance, PREETHA from XI won I position in Folk Dance, and ES WARI from XI won I position in Folk Dance
.
INTRA SCHOOL COMPETITIONS - TALENT SEARCH CONTEST-2017: M.SATHISH from IX B won I position in English Essay, B.MOHAMMED SIRAJ FAZIL from IX B secured II position in English Essay, S.JOSEPH EMMANUEL from IX C secured III position in English Essay, U VARSHA from VIII A won I position in English Essay, V. JANANI PRIYA from VI A secured II position in English Essay, R. V INDHRA GANDHI from VII A secured III position in English Essay, V.CHRISTOPER PAUL from IX C won I position in English Elocution, A.GOKUL from IX B secured II position in English Elocution, R. MADUMITHA from VII C won I position in English Elocution, N.APARNA from VII A secured II position in English Elocution, J. DEVI SRI from VII C secured III position in English Elocution, K.R. ARCHANA from VII C won I position in Tamil Poetry, K.MIRTHULA from VI A secured II position in Tamil Poetry, S.RAKSHITHA from VII C secured III position in Tamil Poetry, V. JANANI PRIYA from VI A won I position in Tamil Essay, V. VARSHA from VIII A secured II position in Tamil Essay, R.MUTHUKUTTY from VI C secured III position in Tamil Essay, N.APARNA from VII A won I position in Tamil Elocution, R. MADHUMITHA from VII C secured II position in Tamil Elocution, G.KARTHICK from VI B secured III position in Tamil Elocution, R.MADHUMITHA from XI A won I position in Tamil Essay, S. AGNES SWETHA from XI E secured II position in Tamil Essay, M.NAVEEN from XI A secured III position in Tamil Essay, S. AGNES SWETHA from XI E won I position in Tamil Poetry, K.SENTHIL KUMARAN from XI B secured II position in Tamil Poetry, M.GOPINATH from XI D secured III position in Tamil Poetry, S.VASANTHI from XI E won I position in Tamil Elocution, I. VAISHNAVI from XI E secured II position in Tamil Elocution, K.KISHORE KUMAR from XI C secured III position in Tamil Elocution, and M.HARINI from XI E secured III position in Tamil Elocution.

Intra School Competitions for Krishna Jayanthi Celebration in 2017: AKSHAY A from class V won I position in Poem Recitation, while HARINI D also from class I secured II position in the same event. PRAGTHIESWAR V Y from class V achieved II position in Poem Recitation. SRI SANJANA S from class I secured III position in Poem Recitation. In the Slogan event, JYOTHSANA from class V won I position, and THEEKSHITHA R from class V obtained II position. The Quiz competition saw JANANI PRIYA V from VI A take I position, NISHANTHI S from VII A earn II, and KOWSHIKA SRI S from VII A secure III position. In the Speech category, APARNA N from VII A won I, while KARTHICK G from VI B achieved II position. APARNA N also excelled in Poem Recitation again, winning I position. In the Song event, TRISHALI from VIII A secured I, APARNA N from VII A won II, and DEVI SREE J from VII C achieved II position, with GAYATHRI B from VII A taking III. For Drawing, NISHANTHI S from VII A won I, VIGNESH B from VII B and VARSHINI K from VII C both secured II, while JAI RAGAVENDAR from VII B, KAVITHA SRI S from VIII C, and MOWUNDHA from VII A all took III position. In the Quiz for higher classes, RITHICK PRIYA M from XI B won I, CHARULATHA from XII A secured II, and KEERTHIGA from IX achieved III. ABHI from IX C also secured III in Quiz. In the Speech category, RAGHUL M from IX B won I position. Lastly, in the Song event for higher classes, VAISHALI from XII C won I, SUBHASREE from XII A secured II, and DHARSHINI from XII C achieved III.

The news section contains dates for various events, including the 30th Annual Primary Sports Meet on 16.02.2024, 30th Annual Day Celebration on 27.01.2024, 75th Republic Day on 26.01.2024, Smokeless Bhogi Awareness on 12.01.2024, 30th Annual Sports Meet on 11.01.2024, Marathon on 24.12.2023, Motivational Session for Teachers on 16.12.2023, and Online Registration for 2024-2025 on 14.12.2023. The achievements section lists various awards and prizes won by students, including Thiruvalluvar Day Competition where M. John Marcus III won 3rd prize, D. Mohammed Thariq won 2nd prize, P. Priyadharshini won 3rd prize, and R. G. Sai charan won 1st prize, Vivekananda Jayanthi Competition with multiple winners, 38th National Art Festival where Rithika won 2nd place in oratorical competition, Inter School Chess Tournament where Nikhilesh R won 2nd prize and Jackson V X won 1st prize, Tamilnadu State Level Chess Tournament where Jackson V X won 1st prize, International Open Fide Rapid Chess Tournament where Jackson V X won 2nd prize, Tamilnadu State Open Fide Chess Championship where Jackson V X won 3rd prize, Chennai Open Selection Tournament where Jackson V X won 6th place, Tamil Oratorical Competition where Aparna N won 3rd prize, Discus Throw in Zonal Level Games and Sports where Deeraj N won 1st prize, Tamil Elocution where Aparna N won 1st prize, Debate in PRJI Rolling Trophy Championship where Aparna N won 2nd prize, and Sketch Master Drawing Competition where Yusuf V won 1st prize and Tamizharasan S won 3rd prize. The older news section contains past achievements and events, including DHS Artist in Dec-2019, State Level Chess Champion V X Jackson in Nov-2019, 47th Jawaharlal Nehru National Science, Mathematics and Environment Exhibition by Tharun Kumar in Oct-2019, Selected for State Level Chess V X Jackson in Oct-2019, Overall Championship in Tamil Elocution in Aug-2019, Avvai Kalai Kalagam Competitions Winners in Aug-2019, Chess Champion in Aug-2019, Silambam Champion in Aug-2019, Thaiboxing Champion in Aug-2019, Dancing Queen of DHS in Jul-2018, Chess Championship in Jul-2018, District Level (under 11) Chess winner in Jul-2018, Ball Badminton (Singles) in Jul-2018, and Bharathanatiyam Sword Dance Natya Kala Kirana Award in Jun-2018. The forms section includes a student admission form stating Admission 2024-2025: Sorry, Admission Application is Closed!, a teacher application form with a website URL https://dharamhindujaschool.org/application/application/applicationform/career.php?sid=APPLICATION, required information including Post Applied for, Subject Preference 1, and Subject Preference 2, personal information including Name of the Applicant, Gender, Date of Birth, Present Residence Address, Mobile No., Residence Telephone No., Email ID, AADHAR NO., PAN CARD NO., Nationality, Religion, Community, Blood Group, Marital Status, and Date of Marriage, academic/professional qualifications including Academic/Professional Qualification Details, Highest Qualification in Subject Applied as Preference-1, and B.Ed, work experience with three entries for Name of Organisation, From, To, Subjects taught, Class taught, and Other Responsibilities, name and occupation of parents including Father Name, Father Occupation, Mother Name, and Mother Occupation, spouse details including Spouse Name, Spouse Qualification, Spouse Profession, Specify whether spouse job is transferrable, Spouse Organization, and Spouse Designation, children information with three entries for Name of the Child, Gender, School Studiying In & Class, and If Working? Name of the Institution & Designation, all documents to be uploaded including Document 1, Document 2, and Document 3, and a declaration stating I, the applicant, state that all information given above is true and correct, I understand that submission of the Application Form is a preliminary step in the selection of teachers at DHARAM HINDUJA MATRIC. HR. SEC. SCHOOL and does not guarantee a job, I agree to abide by all decisions taken by the school management, and I agree to the terms and conditions. The pay fee section includes a web URL https://dharamhindujaschool.org/pay

Dharam Hinduja Matriculation Higher Secondary School offers various facilities to ensure a comprehensive learning experience. The school library, a treasure trove of knowledge, has state-of-the-art infrastructure. Classrooms are bright, well-ventilated, and spacious, equipped with Smartclass technology for effective and enriching learning experiences. The regularly updated inputs and a wide range of video clippings from the knowledge center make it easier for students to understand difficult and abstract concepts through interactive digital boards. Additionally, the school has full-equipped Physics, Chemistry, Biology, and Computer Science laboratories to encourage students to learn through practice. The school infrastructure is designed to support the students' growth, and RO Water HUB is available to ensure clean drinking water. A Security Room is also present to ensure the safety of the students and staff.

School Timing:-
Sunday	Closed
Monday	8:30 am–4:30 pm
Tuesday	8:30 am–4:30 pm
Wednesday	8:30 am–4:30 pm
Thursday	8:30 am–4:30 pm
Friday	8:30 am–4:30 pm
Saturday	8:30 am–4:30 pm


your school website have lots of images about ur school infrastructure, achivements, celebrations etc but you doesnt have that data even your school website have seperate section called Gallery To View these photos/gifs https://dharamhindujaschool.org/gallery.php


Don't give unwanted big replies which user does'nt asked, if you have data which user ask try to give it fully even though it was big, don't always say them to visit website untill you don't have acces to the data
`;
let isGenerating = false;
let activeSection = 'home';
let showWelcome = true;
let currentRequest = null;

function switchSection(sectionName) {
    Object.values(sections).forEach(section => section.classList.add('hidden'));
    sections[sectionName].classList.remove('hidden');
    activeSection = sectionName;
    navbar.classList.add('hidden');
    window.location.hash = sectionName;
}

function updateClearHistoryButton() {
    if (messages.length > 0) {
        clearHistoryBtn.style.display = 'block';
    } else {
        clearHistoryBtn.style.display = 'none';
        showWelcomeMessage();
    }
}

function showWelcomeMessage() {
    welcomeMessage.classList.remove('hidden');
    chatContainer.classList.add('hidden');
    showWelcome = true;
}

function scrollToBottom() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function showModal() {
    clearHistoryModal.classList.add('show');
}

function hideModal() {
    clearHistoryModal.classList.remove('show');
}

function clearHistory() {
    messages = [];
    conversationHistory = [];
    localStorage.removeItem('chatHistory');
    chatContainer.innerHTML = '';
    hideModal();
    addNotification('info', 'Chat history has been cleared.');
    updateClearHistoryButton();
    showWelcomeMessage();
}

function addMessage(role, content) {
    if (showWelcome) {
        welcomeMessage.classList.add('hidden');
        chatContainer.classList.remove('hidden');
        showWelcome = false;
    }
    const messageElement = document.createElement('div');
    messageElement.className = `flex ${role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in-up`;

    const innerDiv = document.createElement('div');
    innerDiv.className = `flex items-start space-x-2 max-w-full ${role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`;

    const avatar = document.createElement('div');
    avatar.className = role === 'user' ? 'user-avatar' : 'ai-avatar';
    avatar.innerHTML = role === 'user' ? '<i class="fas fa-user"></i>' : '<img src="src/dharam.jpg" alt="AI">';

    const messageContent = document.createElement('div');
    messageContent.className = `message-bubble ${role === 'user' ? 'bg-blue-500 text-white' : 'bg-blue-100 text-blue-900'} text-sm md:text-base shadow-md`;

    const contentWrapper = document.createElement('div');
    contentWrapper.className = 'message-content';
    contentWrapper.innerHTML = formatMessage(content);

    messageContent.appendChild(contentWrapper);

    if (role === 'assistant') {
        const actionsDiv = document.createElement('div');
        actionsDiv.className = 'flex mt-2 space-x-2';
        actionsDiv.innerHTML = `
            <button data-action="copy" data-content="${escapeHtml(content)}" class="text-blue-500 hover:text-blue-600 transition-colors duration-300">
                <i class="fas fa-copy"></i>
            </button>
            <button data-action="report" data-content="${escapeHtml(content)}" class="text-blue-500 hover:text-blue-600 transition-colors duration-300">
                <i class="fas fa-flag"></i>
            </button>
            <button data-action="again" data-content="${escapeHtml(content)}" class="text-blue-500 hover:text-blue-600 transition-colors duration-300">
                <i class="fas fa-redo"></i>
            </button>
        `;
        messageContent.appendChild(actionsDiv);
    }

    innerDiv.appendChild(avatar);
    innerDiv.appendChild(messageContent);
    messageElement.appendChild(innerDiv);
    chatContainer.appendChild(messageElement);
    scrollToBottom();
    updateClearHistoryButton();
    conversationHistory.push({ role, content });
    localStorage.setItem('chatHistory', JSON.stringify(conversationHistory));
    messages.push({ role, content });
}

function formatMessage(content) {
    content = content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    content = content.replace(/\*(.*?)\*/g, '<em>$1</em>');
    content = content.replace(/`(.*?)`/g, '<code>$1</code>');
    content = content.replace(/^(#{1,6})\s(.*)$/gm, (match, hashes, text) => `<h${hashes.length}>${text}</h${hashes.length}>`);
    content = content.replace(/^\s*[-*+]\s(.*)$/gm, '<li>$1</li>');
    content = content.replace(/^\d+\.\s(.*)$/gm, '<li>$1</li>');

    const orderedList = content.match(/<li>.*<\/li>/g);
    if (orderedList) {
        content = content.replace(/(<li>.*<\/li>)/s, '<ol>$1</ol>');
    }

    const unorderedList = content.match(/<li>.*<\/li>/g);
    if (unorderedList) {
        content = content.replace(/(<li>.*<\/li>)/s, '<ul>$1</ul>');
    }

    content = content.replace(/\[([^\]]+)\]$$([^)]+)$$/g, (match, text, url) => {
        return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${text}</a>`;
    });

    const links = content.match(/https?:\/\/[^\s]+/g);
    if (links) {
        links.forEach(link => {
            content += `
            <div class="link-preview">
                <a href="${link}" target="_blank" rel="noopener noreferrer" class="text-blue-500 hover:underline">${link}</a>
            </div>`;
        });
    }

    return content;
}

function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

function setThinking(thinking) {
    const existingThinkingElement = chatContainer.querySelector('.thinking-indicator');
    if (thinking) {
        if (!existingThinkingElement) {
            const thinkingElement = document.createElement('div');
            thinkingElement.className = 'flex justify-start animate-fade-in-up thinking-indicator';
            thinkingElement.innerHTML = `
                <div class="flex items-end space-x-2 max-w-[80%]">
                    <div class="w-8 h-8 bg-transparent rounded-full">
                        <img src="src/dharam.jpg" alt="AI" class="ai-logo">
                    </div>
                    <div class="p-3 rounded-lg bg-blue-100 text-sm md:text-base shadow-md">
                        <div class="flex space-x-2">
                            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                            <div class="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
                        </div>
                    </div>
                </div>
            `;
            chatContainer.appendChild(thinkingElement);
        }
        setGenerating(true);
    } else {
        if (existingThinkingElement) {
            existingThinkingElement.remove();
        }
        setGenerating(false);
    }
    scrollToBottom();
}

function setGenerating(generating) {
    isGenerating = generating;
    if (generating) {
        sendIcon.className = 'fas fa-stop h-4 w-4 md:mr-2';
        sendText.textContent = 'Stop';
        sendButton.classList.remove('bg-blue-500', 'hover:bg-blue-600');
        sendButton.classList.add('bg-red-500', 'hover:bg-red-600');
    } else {
        sendIcon.className = 'fas fa-paper-plane h-4 w-4 md:mr-2';
        sendText.textContent = 'Send';
        sendButton.classList.remove('bg-red-500', 'hover:bg-red-600');
        sendButton.classList.add('bg-blue-500', 'hover:bg-blue-600');
    }
}

function loadStoredHistory() {
    try {
        const storedHistory = localStorage.getItem('chatHistory');
        if (storedHistory) {
            conversationHistory = JSON.parse(storedHistory);
            conversationHistory.forEach(message => {
                addMessage(message.role, message.content);
            });
            showWelcome = false;
        } else {
            showWelcomeMessage();
        }
    } catch (error) {
        console.error('Error loading chat history:', error);
        localStorage.removeItem('chatHistory');
        showWelcomeMessage();
    }
}

async function sendMessage(message) {
    if (message.trim()) {
        addMessage('user', message);
        setThinking(true);
        try {
            currentRequest = axios.CancelToken.source();
            const response = await axios.post('https://api.qewertyy.dev/models', {
                messages: [
                    { role: "system", content: schoolData },
                    ...conversationHistory.map(msg => ({
                        role: msg.role,
                        content: msg.content
                    })),
                    { role: "user", content: message }
                ],
                model_id: 23
            }, {
                cancelToken: currentRequest.token,
                timeout: 30000 // 30 seconds timeout
            });
            if (response.data.content && response.data.content[0] && response.data.content[0].text) {
                const aiResponse = response.data.content[0].text;
                addMessage('assistant', aiResponse);
            } else {
                throw new Error('Unexpected response structure');
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else if (error.code === 'ECONNABORTED') {
                addNotification('error', 'Request timed out. Please try again.');
            } else {
                console.error('Error:', error);
                addNotification('error', `Failed to get response. Please try again. ${error}`);
            }
        } finally {
            setThinking(false);
            currentRequest = null;
            scrollToBottom();
        }
    }
}

function addNotification(type, message) {
    const notification = document.createElement('div');
    notification.className = `bg-white p-4 rounded-lg shadow-lg flex items-center space-x-3 ${
        type === 'error' ? 'border-l-4 border-red-500' :
        type === 'report' ? 'border-l-4 border-green-500' :
        type === 'info' ? 'border-l-4 border-yellow-500' :
        'border-l-4 border-blue-500'
    }`;

    const iconClass = type === 'error' ? 'fa-exclamation-triangle text-red-500' :
        type === 'report' ? 'fa-file-alt text-green-500' :
        type === 'info' ? 'fa-info-circle text-yellow-500' :
        'fa-bell text-blue-500';

    notification.innerHTML = `
        <div class="animate-bounce">
            <i class="fas ${iconClass} h-6 w-6"></i>
        </div>
        <div>
            <h3 class="font-semibold ${
                type === 'error' ? 'text-red-800' :
                type === 'report' ? 'text-green-800' :
                type === 'info' ? 'text-yellow-800' :
                'text-blue-800'
            }">${type.charAt(0).toUpperCase() + type.slice(1)}</h3>
            <p class="text-sm ${
                type === 'error' ? 'text-red-600' :
                type === 'report' ? 'text-green-600' :
                type === 'info' ? 'text-yellow-600' :
                'text-blue-600'
            }">${message}</p>
        </div>
        <button onclick="this.parentElement.remove()" class="text-gray-500 hover:${
            type === 'error' ? 'text-red-700' :
            type === 'report' ? 'text-green-700' :
            type === 'info' ? 'text-yellow-700' :
            'text-blue-700'
        }">
            <i class="fas fa-times h-4 w-4"></i>
        </button>
    `;

    notificationsContainer.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function handleCopy(content) {
    navigator.clipboard.writeText(content).then(() => {
        addNotification('info', 'Response copied to clipboard!');
    }).catch(err => {
        console.error('Failed to copy: ', err);
        
        addNotification('error', 'Failed to copy content.');
    });
}

function handleReport(content) {
    reportDialog.classList.remove('hidden');
    document.getElementById('reportEmail').value = '';
    document.getElementById('reportProblem').value = '';
    updateReportContent();
}

async function handleAgain(content) {
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    if (lastUserMessage) {
        setThinking(true);
        try {
            currentRequest = axios.CancelToken.source();
            const response = await axios.post('https://api.qewertyy.dev/models', {
                messages: [
                    { role: "system", content: schoolData },
                    { role: "user", content: lastUserMessage.content }
                ],
                model_id: 23
            }, {
                cancelToken: currentRequest.token
            });

            if (response.data.content && response.data.content[0] && response.data.content[0].text) {
                const aiResponse = response.data.content[0].text;
                setThinking(false);
                addMessage('assistant', aiResponse);
            } else {
                throw new Error('Unexpected response structure');
            }
        } catch (error) {
            if (axios.isCancel(error)) {
                console.log('Request canceled:', error.message);
            } else {
                console.error('Error:', error);
                addNotification('error', 'Failed to regenerate response. Please try again.');
            }
        } finally {
            setThinking(false);
            currentRequest = null;
            scrollToBottom();
        }
    } else {
        addNotification('error', 'No previous user message found to regenerate.');
    }
}

function updateReportContent() {
    const reportedContent = document.getElementById('reportedContent');
    const lastUserMessage = messages.filter(m => m.role === 'user').pop();
    const lastAIMessage = messages.filter(m => m.role === 'assistant').pop();

    if (lastUserMessage && lastAIMessage) {
        reportedContent.value = `User: ${lastUserMessage.content}\n\nAI: ${lastAIMessage.content}`;
    }
}

async function submitReport() {
    const email = document.getElementById('reportEmail').value;
    const problem = document.getElementById('reportProblem').value;
    const reportedContent = document.getElementById('reportedContent').value;

    if (!email || !problem) {
        addNotification('error', 'Please fill in both email and problem description.');
        return;
    }

    const TOKEN = '8188094426:AAHgwqlzOuNY8VckUrYL5sNkENsu-sCQOFQ';
    const CHAT_ID = '5629305049';
    const reportMessage = `Report from ${email}:\n\nProblem: ${problem}\n\nReported Content:\n${reportedContent}`;
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    try {
        const response = await axios.post(url, {
            chat_id: CHAT_ID,
            text: reportMessage,
        });

        if (response.status === 200) {
            addNotification('report', 'Report submitted successfully. Thank you for your feedback!');
            reportDialog.classList.add('hidden');
            document.getElementById('reportEmail').value = '';
            document.getElementById('reportProblem').value = '';
        } else {
            throw new Error('Failed to submit report');
        }
    } catch (error) {
        console.error('Error submitting report:', error);
        addNotification('error', 'Failed to submit report. Please try again.');
    }
}

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (isGenerating) {
        if (currentRequest) {
            currentRequest.cancel('Operation canceled by the user.');
        }
        setThinking(false);
    } else if (message) {
        sendMessage(message);
        userInput.value = '';
    }
});

menuButton.addEventListener('click', () => navbar.classList.remove('hidden'));
closeNavButton.addEventListener('click', () => navbar.classList.add('hidden'));

navButtons.forEach(button => {
    button.addEventListener('click', () => switchSection(button.dataset.section));
});

submitReportButton.addEventListener('click', submitReport);
cancelReportButton.addEventListener('click', () => reportDialog.classList.add('hidden'));

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('contactEmail').value;
    const message = document.getElementById('contactMessage').value;

    if (!email || !message) {
        addNotification('error', 'Please fill in all fields.');
        return;
    }

    const TOKEN = '8188094426:AAHgwqlzOuNY8VckUrYL5sNkENsu-sCQOFQ';
    const CHAT_ID = '5629305049';
    const contactMessage = `&#128236; New contact from ${email}:\n\n&#128172; ${message}`;
    const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

    try {
        const response = await axios.post(url, {
            chat_id: CHAT_ID,
            text: contactMessage,
            parse_mode: 'HTML'
        });

        if (response.status === 200) {
            addNotification('info', "Message sent successfully! We'll reply as soon as possible.");
            document.getElementById('contactEmail').value = '';
            document.getElementById('contactMessage').value = '';
        }
    } catch (error) {
        console.error('Error sending message:', error);
        addNotification('error', 'Failed to send message. Please try again later.');
    }
});

window.addEventListener('load', () => {
    setTimeout(() => {
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transition = 'opacity 0.5s ease-out';
        
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 500);

    loadStoredHistory();

    const hash = window.location.hash.slice(1);
    if (sections[hash]) {
        switchSection(hash);
    }

    updateClearHistoryButton();
    scrollToBottom();
});

clearHistoryBtn.addEventListener('click', showModal);
modalCloseBtn.addEventListener('click', hideModal);
modalCancelBtn.addEventListener('click', hideModal);
modalClearBtn.addEventListener('click', clearHistory);

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, 100);
    };
}

const debouncedScrollToBottom = debounce(scrollToBottom, 100);

chatContainer.addEventListener('click', (event) => {
    if (event.target.closest('button')) {
        const button = event.target.closest('button');
        const action = button.getAttribute('data-action');
        const content = button.getAttribute('data-content');

        if (action === 'copy') {
            handleCopy(content);
        } else if (action === 'report') {
            handleReport(content);
        } else if (action === 'again') {
            handleAgain(content);
        }
    }
});

window.addEventListener('hashchange', () => {
    const hash = window.location.hash.slice(1);
    if (sections[hash]) {
        switchSection(hash);
    }
});

setTimeout(() => {
    addNotification('welcome', 'Welcome to AI Chat! Feel free to ask any questions.');
}, 2000);
