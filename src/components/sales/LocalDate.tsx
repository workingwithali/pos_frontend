import { useEffect, useState } from "react";
import dayjs from "dayjs";

const LocalDate = ({ date }: { date: string }) => {
  const [formatted, setFormatted] = useState<string | null>(null);

  useEffect(() => {
    setFormatted(dayjs(date).format("YYYY-MM-DD HH:mm:ss"));
  }, [date]);

  return <>{formatted}</>;
};