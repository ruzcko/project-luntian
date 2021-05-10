import { useEffect, useState } from "react";
import { rand } from "../utils/helpers";

interface Props {
  max?: number;
  frequency?: number;
  n?: number;
}

const useDtWaterLevel = ({ max = 100, frequency = 2000, n = 10 }: Props) => {
  const [data, setData] = useState<Array<number>>([]);
  const [labels, setLabels] = useState<Array<string>>([]);
  const [colors, setColors] = useState<Array<string>>([]);
  const [hour, setHour] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      setData((oldData) => {
        if (date.getHours() !== hour) setHour(() => date.getHours());
        const time = `${date.getMinutes()}:${date.getSeconds()}`;
        const level = rand(max);

        setColors((oldColors) => {
          const nd = oldColors.splice(-n + 1);
          const c = level < 30 ? "#B91C1C4D" : "#1D4ED84D";
          return [...nd, c];
        });

        setLabels((oldLabels) => {
          const nd = oldLabels.splice(-n + 1);
          return [...nd, time];
        });

        console.log(oldData);
        const nd = oldData.splice(-n + 1);
        return [...nd, level];
      });
    }, frequency);

    return () => clearInterval(interval);
  }, [frequency, n, max, hour]);

  return [data, labels, colors, hour];
};

export default useDtWaterLevel;
