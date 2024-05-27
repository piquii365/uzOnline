import * as React from "react";
import { useParams } from "react-router-dom";

const MySchedule: React.FC = () => {
  const { id } = useParams();
  return <div>MySchedule</div>;
};

export default MySchedule;
