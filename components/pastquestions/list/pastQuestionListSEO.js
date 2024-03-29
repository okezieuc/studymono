import Head from "next/head";
import blockToText from "lib/blockToText";

export default function PastQuestionListSEO({
  subjectName,
  q1,
  page,
  subjectSlug,
}) {
  return (
    <Head>
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/katex@0.13.11/dist/katex.min.css"
        integrity="sha384-Um5gpz1odJg5Z4HAmzPtgZKdTBHZdw8S29IecapCSB31ligYPhHQZMIlWLYQGVoc"
        crossorigin="anonymous"
      />
      <title>
        {`Practice over 4 Years of ${subjectName} Questions from WAEC and JAMB` +
          (parseInt(page) != 1 ? ` - Page ${page}` : "")}
      </title>
      <meta
        property="og:title"
        content={
          `Practice over 4 Years of ${subjectName} Questions from WAEC and JAMB` +
          (parseInt(page) != 1 ? ` - Page ${page}` : "")
        }
      />
      <meta
        name="description"
        content={
          parseInt(page) == 1
            ? `Many see ${subjectName} as a tricky subject, but we're here to change it. After practicing these ${subjectName} questions from WAEC and JAMB, you should be ready to withstand any tensions these exams bring.`
            : `${subjectName} Page ${page}: ${blockToText(
                q1.question
              )} a. ${blockToText(q1.optiona)} b. ${blockToText(
                q1.optionb
              )} c. ${blockToText(q1.optionc)} d. ${blockToText(
                q1.optiond
              )}`.slice(0, 160)
        }
      />
      <meta
        property="og:description"
        content={
          parseInt(page) == 1
            ? `Many see ${subjectName} as a tricky subject, but we're here to change it. After practicing these ${subjectName} questions from WAEC and JAMB, you should be ready to withstand any tensions these exams bring.`
            : `${subjectName} Page ${page}: ${blockToText(
                q1.question
              )} a. ${blockToText(q1.optiona)} b. ${blockToText(
                q1.optionb
              )} c. ${blockToText(q1.optionc)} d. ${blockToText(
                q1.optiond
              )}`.slice(0, 160)
        }
      />
      <meta
        name="og:image"
        content={`https://res.cloudinary.com/okezieuc/image/upload/studymono/categories/${subjectSlug}.png`}
      />
      <link
        rel="canonical"
        href={`https://www.studymono.com/pastquestions/subject/${subjectSlug}/${page}`}
      />

      <meta
        name="twitter:title"
        content={
          `Practice over 4 Years of ${subjectName} Questions from WAEC and JAMB` +
          (parseInt(page) != 1 ? ` - Page ${page}` : "")
        }
      />
      <meta
        name="twitter:description"
        content={
          parseInt(page) == 1
            ? `Many see ${subjectName} as a tricky subject, but we're here to change it. After practicing these ${subjectName} questions from WAEC and JAMB, you should be ready to withstand any tensions these exams bring.`
            : `${subjectName} Page ${page}: ${blockToText(
                q1.question
              )} a. ${blockToText(q1.optiona)} b. ${blockToText(
                q1.optionb
              )} c. ${blockToText(q1.optionc)} d. ${blockToText(
                q1.optiond
              )}`.slice(0, 160)
        }
      />
      <meta
        name="twitter:image"
        content={`https://res.cloudinary.com/okezieuc/image/upload/studymono/categories/${subjectSlug}.png`}
      />
    </Head>
  );
}
