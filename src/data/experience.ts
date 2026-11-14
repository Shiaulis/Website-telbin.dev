export interface Experience {
	company: string;
	positions: Position[];
}

export interface Position {
	title: string;
	period: string;
	location?: string;
	description?: string;
	highlights?: string[];
	skills?: string[];
}

export const experiences: Experience[] = [
	{
		company: "Pipedrive",
		positions: [
			{
				title: "Senior iOS Developer",
				period: "Jan 2022 - Nov 2026",
				location: "Tallinn, Estonia",
				description: "Set technical direction for a five-person iOS team, combining hands-on development, architecture, and cross-platform project coordination.",
				highlights: [
					"Replaced legacy Objective-C persistence with a modular Swift Core Data stack across the main app and extensions.",
					"Built shared networking infrastructure and modernized synchronization in Swift.",
					"Co-developed CRM search with offline fallback and implemented iOS web authentication with PKCE and two-factor support.",
					"Established shared implementation patterns through architectural plans, code reviews, and reusable generic components.",
					"Developed an iOS internship course and mentored an intern into a full-time developer role.",
					"Refactored CI/CD pipelines, cutting pull request check build times by 50%."
				],
				skills: ["Swift", "Core Data", "Software Architecture", "Technical Leadership", "CI/CD"]
			},
			{
				title: "iOS Developer",
				period: "Oct 2018 - Jan 2022",
				location: "Tallinn, Estonia",
				description: "Led end-to-end feature delivery from planning to release, coordinating developers, design, and product management.",
				highlights: [
					"Built persistence, networking, and business-logic foundations for mobile Leads, connecting custom fields, timelines, linked records, and deep links.",
					"Integrated audio recording, playback, synchronization, and speech transcription into activity notes and post-call workflows.",
					"Built reusable XCUITest infrastructure to simplify UI test development for the QA team.",
					"Contributed to dark mode and improved Dynamic Type, VoiceOver support, and accessible layouts across CRM screens."
				],
				skills: ["Swift", "UIKit", "XCUITest", "Accessibility", "Mobile Platforms"]
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
				description: "Transitioned from QA into full-time iOS engineering on popular consumer apps with millions of users.",
				highlights: [
					"Developed UI and networking features for Documents and PDF Expert, primarily in Objective-C.",
					"Implemented external storage integrations.",
					"Contributed to refactoring legacy modules and app architecture."
				],
				skills: ["iOS Development", "Objective-C", "Networking", "Software Architecture"]
			},
			{
				title: "Software Test Engineer",
				period: "Nov 2015 - Oct 2017",
				location: "Odesa, Ukraine",
				description: "Tested consumer apps used by millions of users, including Documents and PDF Expert.",
				highlights: [
					"Performed manual testing across iOS releases.",
					"Worked on test automation using the XCTest framework."
				],
				skills: ["XCTest", "Test Automation", "QA"]
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
				description: "Tested a charity startup's website as a volunteer, helping improve quality and stability."
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
				description: "Managed a three-person team and oversaw parts supply, inventory, and sales across multiple stocks.",
				highlights: [
					"Created a demand forecasting system using historical sales data, reducing dead stock by nearly 50%."
				]
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
				description: "Handled spare-parts sales and kept inventory organized."
			}
		]
	}
];
