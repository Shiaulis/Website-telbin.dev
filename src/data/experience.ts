export interface Experience {
	company: string;
	logo?: string;
	positions: Position[];
}

export interface Position {
	title: string;
	period: string;
	location?: string;
	description?: string;
	skills?: string[];
}

export const experiences: Experience[] = [
	{
		company: "Pipedrive",
		positions: [
			{
				title: "Senior iOS Developer",
				period: "Jan 2022 - Present",
				location: "Tallinn, Estonia",
				description: "Working as a main developer and solution architect for a team of 4 developers. Migrated codebase to reusable business logic components using generics, unifying feature functionality. Led feature development from idea to release as a project manager, coordinating a cross-functional team (developers, designer, product manager).",
				skills: ["iOS Development", "Swift", "Software Architecture"]
			},
			{
				title: "iOS Developer",
				period: "Oct 2018 - Jan 2022",
				location: "Tallinn, Estonia",
				description: "Developed iOS applications using Swift and modern iOS frameworks.",
				skills: ["iOS", "Mobile Platforms", "Swift"]
			}
		]
	},
	{
		company: "Readdle",
		positions: [
			{
				title: "iOS Developer",
				period: "Sep 2017 - Sep 2018",
				location: "Odesa, Ukraine",
				description: "While being a software tester figured out that I can be more productive in actual producing apps. Started learning iOS development part time until I became a full-fledged engineer. Worked with popular apps with millions of users."
			},
			{
				title: "Software Test Engineer",
				period: "Nov 2015 - Oct 2017",
				location: "Odesa, Ukraine",
				description: "Responsible for testing consumer apps with millions of users, Documents and PDF Expert. Grew as a specialist not only in manual testing, but also tackled automation with XCTest framework."
			}
		]
	},
	{
		company: "Мой Город",
		positions: [
			{
				title: "Test Engineer",
				period: "Sep 2015 - Dec 2015",
				location: "Odesa, Ukraine",
				description: "As a volunteer helped small charity startup to improve site quality and keep it stable."
			}
		]
	},
	{
		company: "Winner Odesa",
		positions: [
			{
				title: "Parts Department Manager",
				period: "Aug 2010 - Oct 2015",
				location: "Odesa, Ukraine",
				description: "In a manager role was responsible for organizing whole supply chain for several stocks. Created analytics system that helped to predict demand based on sales results."
			}
		]
	},
	{
		company: "TM Auto",
		positions: [
			{
				title: "Parts Advisor",
				period: "Aug 2007 - Jun 2010",
				location: "Odesa, Ukraine",
				description: "Responsible for selling spare parts and keeping stocks organized."
			}
		]
	}
];
