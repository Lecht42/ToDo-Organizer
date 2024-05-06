import { Goal } from "../../interfaces";
import "./Goals.css";

interface ContainerProps {
  list: Goal[];
}

const Goals: React.FC<ContainerProps> = ({ list }) => {
  return (
    <div className="container">
      <ul>
        {list.map((e) => (
          <li className={e.completed ? "completed" : "not-completed"}>
            {e.label}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Goals;
