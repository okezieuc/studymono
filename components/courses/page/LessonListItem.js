import { handleLogin } from "lib/supabaseClient";
import Link from "next/link";

export default function LessonListItem({
  lesson,
  courseid,
  lessonNumber,
  isLoggedIn,
}) {
  return (
    <div className="flex items-center my-6">
      <div className="text-2xl w-12">{lessonNumber}</div>
      <div className="flex-1">
        <div className="text-xl">
          {isLoggedIn ? (
            <Link href={`/learn/${courseid}/${lesson.slug}`}>
              {lesson.title}
            </Link>
          ) : (
            <button
              onClick={() => handleLogin(`/learn/${courseid}/${lesson.slug}`)}
            >
              {lesson.title}
            </button>
          )}
        </div>
        <div className="text-md">{lesson.description}</div>
      </div>
    </div>
  );
}

// <div className="text-md w-32 text-right">Completed</div>
