import { parseISO, formatDistanceToNow } from "date-fns";
import Text from "./Text";

const TimeAgo = ({ timestamp }) => {
  let timeAgo = "";
  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <Text title={timestamp}>
      &nbsp; <i>{timeAgo}</i>
    </Text>
  );
};
export default TimeAgo;
