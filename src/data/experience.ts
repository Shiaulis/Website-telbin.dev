export interface RolePeriod {
	title: string;
	period: string;
}

export interface Highlight {
	label?: string;
	text: string;
}

export interface Experience {
	company: string;
	location: string;
	period: string;
	roles: RolePeriod[];
	description?: string;
	highlights: Highlight[];
}

export interface Competency {
	category: string;
	items: string;
}

export const competencies: Competency[] = [
	{
		category: "AI & Daily Workflows",
		items: "Practical AI adoption for individuals and teams, custom AI agent instructions and skills, AI-powered personal knowledge systems (Obsidian), workflow automation"
	},
	{
		category: "Complex Systems & Architecture",
		items: "Diving deep into unfamiliar systems, architecture consulting, modularizing legacy code, local persistence and offline sync"
	},
	{
		category: "People, Teaching & Mentoring",
		items: "Technical interviewing (30+ candidates), explaining complex ideas simply, creating training courses, mentoring engineers, cross-team collaboration"
	},
	{
		category: "Continuous Learning & Research",
		items: "Rapidly picking up new tools and domains, testing emerging technologies, turning experiments into practical daily habits"
	},
	{
		category: "Technical Background",
		items: "Swift, Objective-C, basic C / Python / Ruby / HTML & CSS, Git, CI/CD automation, automated testing (XCTest, Swift Testing)"
	}
];

export const experiences: Experience[] = [
	{
		company: "Pipedrive",
		location: "Tallinn, Estonia",
		period: "Oct 2018 – Dec 2026",
		roles: [
			{ title: "Senior Software Engineer", period: "Jan 2022 – Dec 2026" },
			{ title: "Software Engineer", period: "Oct 2018 – Jan 2022" }
		],
		description: "Guided a 5-person engineering team, helping turn everyday customer needs into reliable software while improving how the team works and uses AI.",
		highlights: [
			{
				label: "Helping the Team Use AI",
				text: "Explored and brought AI tools into our daily work; wrote clear instructions and reusable skills for AI agents, reorganized the project structure, and set up automated checks so both AI assistants and teammates from other areas could make changes safely."
			},
			{
				label: "Architecture Consulting, Hiring & Mentorship",
				text: "Acted as the team's go-to advisor for all architectural decisions, helping teammates design solutions and review plans. Conducted 30+ technical interviews, created an internship course from scratch, and mentored an intern into a full-time engineer."
			},
			{
				label: "Building Practical Features",
				text: "Worked closely with designers and product managers to build core features for Pipedrive CRM, like recording voice notes with automatic text transcription, fast offline search, and lead tracking."
			},
			{
				label: "Dealing With Complex Systems",
				text: "Rewrote several old app modules to modern standards, including the persistence layer and synchronization engine."
			},
			{
				label: "Continuous Learning & Modern Tooling",
				text: "Stayed on top of the latest platform capabilities, developer tools, and AI workflows, regularly bringing new features and tooling into our app so customers and the team always had a modern experience."
			}
		]
	},
	{
		company: "Readdle",
		location: "Odesa, Ukraine",
		period: "Nov 2015 – Sep 2018",
		roles: [
			{ title: "Software Engineer", period: "Sep 2017 – Sep 2018" },
			{ title: "Software Test Engineer", period: "Nov 2015 – Oct 2017" }
		],
		highlights: [
			{
				text: "Started in manual testing and taught myself test automation and software development on popular productivity apps (Documents and PDF Expert, used by millions); connected external cloud storage services, cleaned up older code, and automated release checks."
			}
		]
	},
	{
		company: "Winner Odesa",
		location: "Odesa, Ukraine",
		period: "Aug 2010 – Oct 2015",
		roles: [
			{ title: "Parts Department Manager", period: "Aug 2010 – Oct 2015" }
		],
		highlights: [
			{
				text: "Managed a 3-person team and spare-parts inventory across multiple warehouses; taught myself data analysis to build a forecasting tool from past sales, cutting unsold stock by nearly 50%."
			}
		]
	}
];
