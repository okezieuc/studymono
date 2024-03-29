const fs = require("fs");
const prettier = require("prettier");
const sanityClient = require("@sanity/client");
const dotenv = require("dotenv");
const path = require("path");
dotenv.config();

const sanity = sanityClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  token: process.env.SANITY_TOKEN,
});

const siteUrl = "https://www.studymono.com";

const getLastMod = (date) => {
  if (date.slice(0, 4) === "2021") {
    return "2022-01-22";
  }
  return date.slice(0, 10);
};

let locations = ["", "/blog", "/terms-and-conditions", "/pastquestions"];

let questionLocations = [];

const dataschema = {
  exams: { WAEC: "WAEC", JAMB: "JAMB" },
  subjects: {
    PHY: "Physics",
    CHEM: "Chemistry",
    BIO: "Biology",
    MATH: "Mathematics",
    ENG: "English",
  },
};

(async () => {
  const prettierConfig = await prettier.resolveConfig("./.prettierrc.js");

  //create blog post pages
  const postsDirectory = path.join(process.cwd(), "_posts");
  const postFiles = fs.readdirSync(postsDirectory);
  postFiles.map((post) => {
    const postUrl = post.replace(/\.md$/, "");
    locations.push(`/blog/${postUrl}`);
  });

  //create /pastquestions/subject/[subject]/[number] pages
  for (let num = 0; num < Object.keys(dataschema.subjects).length; num++) {
    const subject = Object.keys(dataschema.subjects)[num];

    // Find out how many pages of past questions there are for the current subject
    const sanitySubjectPageCountQuery = `count(*[_type == "pastquestion" && subject == $subject && !(_id in path('drafts.**'))])`;
    const count = await sanity.fetch(sanitySubjectPageCountQuery, {
      subject: subject.toUpperCase(),
    });
    const pageCount = Math.floor((count - 1) / 4) + 1;

    // add the required number of pages to the sitemap
    for (let i = 0; i < pageCount; i++) {
      locations.push(
        `/pastquestions/subject/${subject.toLowerCase()}/${i + 1}`
      );
    }
  }

  //create /pastquestions/[...questionid] pages
  const questionQuery =
    () => `*[_type == "pastquestion" && !(_id in path('drafts.**'))]{
		_id,
		_updatedAt
	}`;
  const questionList = await sanity.fetch(questionQuery());
  questionList.map((question) =>
    questionLocations.push({
      url: `/pastquestions/${question._id}`,
      lastmod: getLastMod(question._updatedAt),
    })
  );

  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
					${locations
            .map(
              (loc) => `
						<url>
							<loc>${`${siteUrl}${loc}`}</loc>
							</url>`
            )
            .join("")}${questionLocations
    .map(
      (question) => `
						<url>
							<loc>${`${siteUrl}${question.url}`}</loc>
							<lastmod>${`${question.lastmod}`}</lastmod>
							</url>`
    )
    .join("")}
        </urlset>
    `;

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: "html",
  });

  // eslint-disable-next-line no-sync
  fs.writeFileSync("public/sitemap.xml", formatted);
})();
