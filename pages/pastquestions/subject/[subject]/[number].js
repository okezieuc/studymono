import { sanitySubjectPageQuery, sanitySubjectPageCountQuery } from "lib/sanityQueries";
import { subjectSchema } from "lib/pastQuestionNamingSchema";
import sanity from "lib/sanity";

export default function PastQuestionSubjectPage({ subjectdata, count }) {
  return (<div>
    Data comes here
  </div>)
}

export async function getStaticPaths() {
  let paths = []

  for (let num = 0; num < Object.keys(subjectSchema).length; num++) {
    const subject = Object.keys(subjectSchema)[num]
    const count = await sanity.fetch(sanitySubjectPageCountQuery, {
      subject: subject.toUpperCase(),
    })
    const pageCount = Math.floor((count - 1) / 4) + 1
    for (let i = 0; i < pageCount; i++) {
      paths.push({ params: { subject: subject.toLowerCase(), number: String(i + 1) } })
    }
  }

  return { paths, fallback: false }
}

export async function getStaticProps({ params }) {
  const subject = params.subject
  const page = params.number
  const subjectdata = await sanity.fetch(sanitySubjectPageQuery, {
    subject: subject.toUpperCase(),
    lower: 4 * (page - 1),
    higher: 4 * (page)
  })
  const count = await sanity.fetch(sanitySubjectPageCountQuery, {
    subject: subject.toUpperCase()
  })

  return {
    props: {
      subjectdata,
      count,
    }
  }
}