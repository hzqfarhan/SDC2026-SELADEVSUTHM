export const REVIEWED = '2026-10-19';
export const skills = [
  {id:'data',name:'Data literacy',color:'#28baff',terms:['data','analytics','statistics','excel','spreadsheet']},
  {id:'sql',name:'SQL & databases',color:'#3478ff',terms:['sql','database','postgres']},
  {id:'python',name:'Python',color:'#8d55ff',terms:['python','pandas','programming']},
  {id:'ai',name:'AI literacy',color:'#b94aff',terms:['artificial intelligence','machine learning','ai','prompt']},
  {id:'communication',name:'Communication',color:'#ff783b',terms:['communication','presentation','writing','customer','teaching']},
  {id:'critical',name:'Critical thinking',color:'#ffbd22',terms:['critical thinking','problem solving','research','analysis']},
  {id:'sustainability',name:'Sustainability',color:'#00c58c',terms:['sustainability','climate','energy','environment','carbon']},
  {id:'project',name:'Project delivery',color:'#92c91c',terms:['project','planning','agile','operations','coordination']},
  {id:'design',name:'Human-centred design',color:'#ed4593',terms:['design','ux','accessibility','user research']},
  {id:'security',name:'Digital security',color:'#00bace',terms:['security','privacy','cybersecurity','risk']}
] as const;
export type SkillId = typeof skills[number]['id'];
export const skillSDGs:Record<SkillId,{goals:number[];reason:string}>={
 data:{goals:[4,8,17],reason:'Data literacy supports relevant skills and the capacity to use development evidence (targets 4.4, 17.18).'},
 sql:{goals:[9,17],reason:'Database skills can support digital research infrastructure and reusable statistical data (targets 9.5, 17.18).'},
 python:{goals:[4,9],reason:'Programming builds technical skills and can support research capability (targets 4.4, 9.5).'},
 ai:{goals:[4,8,9],reason:'Responsible AI literacy supports learning and human-led technical innovation (targets 4.4, 8.2).'},
 communication:{goals:[4,16,17],reason:'Clear communication supports education, accountability and collaboration (targets 4.4, 16.6).'},
 critical:{goals:[4,16],reason:'Evidence evaluation supports learning and accountable decisions (targets 4.4, 16.6).'},
 sustainability:{goals:[6,7,11,12,13,14,15],reason:'Environmental literacy can inform sector projects and climate education (targets 12.8, 13.3); sector outcomes require specialist validation.'},
 project:{goals:[2,8,9,17],reason:'Project delivery can support sustainable food and infrastructure programmes through coordinated implementation (targets 2.4, 17.17).'},
 design:{goals:[3,5,10,11],reason:'Accessible design can broaden participation in digital services (targets 5.b, 10.2); health and city outcomes are proposed applications.'},
 security:{goals:[9,16],reason:'Digital security supports reliable infrastructure and accountable institutions (targets 9.1, 16.6).'}
};
export type Profile = {name:string;state:string;hours:number;budget:number;narrative:string;levels:Record<SkillId,number>};
export const samples: Profile[] = [
 {name:'Aina · synthetic graduate',state:'Selangor',hours:5,budget:0,narrative:'I enjoy spreadsheets, research and communicating findings. I want to work on useful public data projects.',levels:{data:3,sql:1,python:1,ai:2,communication:4,critical:3,sustainability:2,project:2,design:1,security:1}},
 {name:'Dev · synthetic career switcher',state:'Pulau Pinang',hours:8,budget:50,narrative:'Operations and project coordination with an interest in energy efficiency and sustainability.',levels:{data:2,sql:0,python:0,ai:1,communication:4,critical:3,sustainability:4,project:4,design:1,security:2}},
 {name:'Mei · synthetic developer',state:'Sarawak',hours:6,budget:0,narrative:'Python programming, databases and user research. I want to build accessible digital services.',levels:{data:3,sql:3,python:4,ai:3,communication:2,critical:4,sustainability:1,project:2,design:3,security:2}}
];
export type Role = {id:string;name:string;sector:string;summary:string;requirements:Partial<Record<SkillId,number>>;weights:Partial<Record<SkillId,number>>;onet:string;sdgs:number[];taskExposure:number;augmentation:number;keywords:string};
// Requirement levels, weights and scenario coefficients are authored prototype assumptions,
// informed by the linked occupational tasks, never represented as official O*NET scores.
export const roles:Role[] = [
 {id:'analyst',name:'Business intelligence analyst',sector:'Data & decisions',summary:'Turn data into clear reports that help teams make better decisions.',requirements:{data:4,sql:3,python:2,communication:3,critical:4,ai:2},weights:{data:3,sql:3,python:1,communication:2,critical:2,ai:1},onet:'15-2051.01',sdgs:[4,8,9,16],taskExposure:.65,augmentation:.8,keywords:'data analytics statistics excel spreadsheet SQL databases reports dashboards business research'},
 {id:'sustainability',name:'Sustainability specialist',sector:'Green transition',summary:'Evaluate environmental programmes and communicate practical improvements.',requirements:{sustainability:4,data:3,communication:4,critical:3,project:3},weights:{sustainability:3,data:2,communication:2,critical:2,project:2},onet:'13-1199.05',sdgs:[6,7,11,12,13,14,15],taskExposure:.3,augmentation:.6,keywords:'sustainability environment climate carbon energy conservation programmes operations project'},
 {id:'developer',name:'Software developer',sector:'Digital infrastructure',summary:'Build and test software that serves people and organisations.',requirements:{python:4,sql:3,critical:4,design:2,security:3,ai:3},weights:{python:3,sql:2,critical:2,design:1,security:2,ai:1},onet:'15-1252.00',sdgs:[3,9,10,11],taskExposure:.7,augmentation:.9,keywords:'software python programming databases testing design accessible digital applications'},
 {id:'security',name:'Information security analyst',sector:'Trusted technology',summary:'Assess digital risks and help protect systems and information.',requirements:{security:4,critical:4,python:2,data:2,communication:3,ai:2},weights:{security:4,critical:3,python:1,data:1,communication:2,ai:1},onet:'15-1212.00',sdgs:[9,16],taskExposure:.35,augmentation:.75,keywords:'cybersecurity security privacy risk analysis threat systems protection'},
 {id:'learning',name:'Learning & development specialist',sector:'People & learning',summary:'Design learning experiences and assess whether they help people improve.',requirements:{communication:4,design:3,project:3,ai:2,critical:3},weights:{communication:3,design:2,project:2,ai:1,critical:2},onet:'13-1151.00',sdgs:[1,4,5,8,10,17],taskExposure:.45,augmentation:.7,keywords:'teaching training education communication design learning facilitation writing'},
 {id:'operations',name:'Project management specialist',sector:'Delivery & operations',summary:'Coordinate people, resources, schedules and project outcomes.',requirements:{project:4,communication:4,critical:3,data:2,ai:2},weights:{project:3,communication:3,critical:2,data:1,ai:1},onet:'13-1082.00',sdgs:[2,8,9,12,17],taskExposure:.4,augmentation:.65,keywords:'project operations planning coordination agile budget resources delivery'}
];
export type Course = {id:string;title:string;provider:string;skill:SkillId;url:string;hours:number;cost:number;prerequisites:SkillId[];access:string;outcome:string};
// Hours include our suggested practice task; they are planning estimates, not provider claims.
export const courses:Course[] = [
 {id:'data',title:'Build your first data report',provider:'Microsoft Learn',skill:'data',url:'https://learn.microsoft.com/en-us/training/modules/introduction-power-bi/',hours:6,cost:0,prerequisites:[],access:'Free learning content; optional exams and some software services may cost extra.',outcome:'Create a one-page report and explain its limitations.'},
 {id:'sql',title:'Query a dataset with SQL',provider:'SQLBolt',skill:'sql',url:'https://sqlbolt.com/',hours:8,cost:0,prerequisites:['data'],access:'Free browser exercises; no paid certificate assumed.',outcome:'Write SELECT, JOIN and GROUP BY queries on practice data.'},
 {id:'python',title:'Python foundations',provider:'Python Software Foundation',skill:'python',url:'https://docs.python.org/3/tutorial/',hours:16,cost:0,prerequisites:[],access:'Free documentation. Prior programming concepts help; allow extra practice if new.',outcome:'Clean a small CSV with a reproducible script.'},
 {id:'ai',title:'AI foundations & responsible use',provider:'IBM SkillsBuild',skill:'ai',url:'https://skillsbuild.org/adult-learners',hours:8,cost:0,prerequisites:[],access:'Free catalogue; registration may be required. Confirm current course availability.',outcome:'Compare an AI answer with primary sources and record its errors.'},
 {id:'communication',title:'Communicate a technical finding',provider:'Google Technical Writing',skill:'communication',url:'https://developers.google.com/tech-writing/one',hours:6,cost:0,prerequisites:[],access:'Free course materials; focused on technical writing.',outcome:'Write a plain-language brief for a non-specialist audience.'},
 {id:'critical',title:'Evaluate data and model limits',provider:'Google ML Crash Course',skill:'critical',url:'https://developers.google.com/machine-learning/crash-course',hours:10,cost:0,prerequisites:['data','python'],access:'Free lessons; Python and basic maths recommended.',outcome:'Identify leakage, bias and missing evidence in a sample analysis.'},
 {id:'sustainability',title:'Understand the sustainability goals',provider:'United Nations',skill:'sustainability',url:'https://sdgs.un.org/goals',hours:6,cost:0,prerequisites:[],access:'Free reference material; self-directed study, not an accredited course.',outcome:'Write a local project brief tied to one measurable SDG target.'},
 {id:'project',title:'Project delivery foundations',provider:'IBM SkillsBuild',skill:'project',url:'https://skillsbuild.org/adult-learners',hours:10,cost:0,prerequisites:[],access:'Free catalogue; registration may be required. Select project management content.',outcome:'Create a scoped project plan with risks and milestones.'},
 {id:'design',title:'Design for accessibility',provider:'W3C WAI',skill:'design',url:'https://www.w3.org/WAI/tutorials/',hours:8,cost:0,prerequisites:[],access:'Free tutorials; some technical examples use HTML.',outcome:'Audit a form for labels, keyboard use and readable errors.'},
 {id:'security',title:'Digital security foundations',provider:'IBM SkillsBuild',skill:'security',url:'https://skillsbuild.org/adult-learners',hours:10,cost:0,prerequisites:[],access:'Free catalogue; registration may be required. Select cybersecurity content.',outcome:'Document a basic threat model and data protection checklist.'}
];
export const trends = [
 {id:'talentcorp',title:'Malaysia’s transition spans AI, digital and green skills',publisher:'TalentCorp',published:'2024-11-18',scope:'Malaysia · 10 studied sectors',url:'https://www.talentcorp.com.my/resources/press-releases/talentcorp-launches-landmark-study-on-workforce-impact-of-ai-digitalisation-and-green-economy/',summary:'The workforce impact study examines changing roles and skills across ten sectors. Use it as sector context, not a current vacancy count.',skills:['ai','sustainability','data'] as SkillId[],confidence:'Institutional study',limit:'Sector coverage and study assumptions limit generalisation.'},
 {id:'ilo',title:'Task exposure does not establish job loss',publisher:'ILO / NASK',published:'2025-05-20',scope:'Global · occupational tasks',url:'https://www.ilo.org/publications/generative-ai-and-jobs-refined-global-index-occupational-exposure',summary:'A refined occupational index finds potential for tasks to change. Human input remains important in many exposed occupations.',skills:['critical','ai','communication'] as SkillId[],confidence:'Research report',limit:'Exposure estimates are not adoption rates or Malaysian forecasts.'},
 {id:'divide',title:'Digital access shapes who benefits',publisher:'ILO / World Bank',published:'2026-03-27',scope:'135 countries · comparative study',url:'https://www.ilo.org/resource/news/new-ilo%E2%80%93world-bank-paper-highlights-uneven-global-impact-generative-ai-jobs',summary:'Research highlights how infrastructure and task differences may produce unequal effects from generative AI.',skills:['security','design','ai'] as SkillId[],confidence:'Research release',limit:'Global comparisons do not identify local individual outcomes.'},
 {id:'gpts',title:'Exposure is sensitive to tools and task assumptions',publisher:'Eloundou et al. · arXiv',published:'2023-03-17',scope:'United States · research preprint record',url:'https://arxiv.org/abs/2303.10130',summary:'A task-based analysis explores possible LLM exposure. It explicitly does not predict a development or adoption timeline.',skills:['python','sql','critical'] as SkillId[],confidence:'Open research',limit:'US context; conceptual exposure must not be read as Malaysian demand.'}
];
export const sdgs = [
 ['No poverty','1.4','learning','Low-cost learning can reduce one access barrier to work.','Track access and completion by financial constraint; do not claim income gains.'],
 ['Zero hunger','2.4','operations','Project delivery skills can support food supply and sustainable agriculture programmes.','A proposed sector application; no food-security outcomes measured.'],
 ['Good health & well-being','3.d','developer','Accessible software can support public-health information systems.','Requires health-sector oversight and validated outcomes.'],
 ['Quality education','4.4','learning','Skill-gap plans support relevant technical and vocational learning.','Measure learning completion and independently assessed skill gains.'],
 ['Gender equality','5.b','learning','Accessible digital learning can help broaden participation.','No gender inference or scoring; participation equity needs a consented pilot.'],
 ['Clean water & sanitation','6.3','sustainability','Data and sustainability skills can support water-quality reporting.','Proposed application; no water data or quality claims in this MVP.'],
 ['Affordable & clean energy','7.3','sustainability','Energy-efficiency projects need analysis and implementation skills.','No energy savings have been demonstrated.'],
 ['Decent work & economic growth','8.5','analyst','Explainable transitions help people explore productive work.','No job, salary or placement guarantees; test career usefulness with users.'],
 ['Industry, innovation & infrastructure','9.5','developer','Digital and data capabilities support research and innovation.','A skills contribution, not a measured economic effect.'],
 ['Reduced inequalities','10.2','learning','Free-first plans and readable alternatives reduce interface barriers.','Assess rural connectivity and disability access in user testing.'],
 ['Sustainable cities & communities','11.3','sustainability','Planning and data skills can support participatory urban projects.','State-level context cannot diagnose a neighbourhood.'],
 ['Responsible consumption & production','12.6','operations','Project and sustainability skills can improve organisational reporting.','Verify material reductions before claiming environmental impact.'],
 ['Climate action','13.3','sustainability','Climate literacy can support education and organisational capability.','No emissions reductions are attributed to this prototype.'],
 ['Life below water','14.a','sustainability','Research and data skills can support marine monitoring teams.','A future sector pathway; no marine observations are collected.'],
 ['Life on land','15.9','sustainability','Environmental planning can integrate ecosystem information.','Requires specialist ecological data and review.'],
 ['Peace, justice & strong institutions','16.6','security','Traceable sources and transparent decisions support accountable information use.','A design contribution; institutional impact has not been evaluated.'],
 ['Partnerships for the goals','17.18','operations','Reusable public-data provenance supports collaboration and capacity building.','No formal partnership with any listed data provider is implied.']
].map((s,i)=>({id:i+1,name:s[0],target:s[1],role:s[2],pathway:s[3],limit:s[4],direct:[4,8,10].includes(i+1),url:`https://sdgs.un.org/goals/goal${i+1}`}));
export const sdgColors=['#e5243b','#dda63a','#4c9f38','#c5192d','#ff3a21','#26bde2','#fcc30b','#a21942','#fd6925','#dd1367','#fd9d24','#bf8b2e','#3f7e44','#0a97d9','#56c02b','#00689d','#19486a'];
