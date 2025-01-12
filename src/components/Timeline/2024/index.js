import { Briefcase } from "react-feather"
import { ButtonSet, DateEntry, Notes, TimelineEntry } from "../Entry"

export function Year2024() {
  return (
    <>
      <DateEntry title="2024" />
      <TimelineEntry title="Mentor-Conect " timestamp="May 1st, 2024" Icon={Briefcase} tint="indigo">
        <Notes>
          <p>Mentor Connect is a web platform that facilitates connections between mentors and mentees. The application features interactive user profiles, real-time messaging through WebSockets, and an optimized matching algorithm. Built using React for the frontend, the platform integrates Node.js, Express, and MongoDB for backend operations, providing a robust and scalable solution. Data fetching is efficiently managed using React Query, while GraphQL is used for flexible and streamlined API communication. The platform is designed to deliver a seamless and engaging user experience across devices.</p>
        </Notes>
        <ButtonSet>
          <a className="w-full md:w-auto btn" href="#" target="_blank" rel="noopener noreferrer">
            <span>view website</span>
          </a>
        </ButtonSet>
      </TimelineEntry>
    </>
  )
}
