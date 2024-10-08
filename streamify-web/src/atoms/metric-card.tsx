import { Skeleton, Typography } from "@mui/material";

interface MetricCardProps {
  title: string;
  value: number | undefined;
  isLoading: boolean;
  className?: string;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  isLoading,
  className,
}) => {
  return (
    <div
      className={`bg-secondary w-full px-5 py-6 rounded-2xl flex flex-col gap-2 drop-shadow-xl ${className}`}
    >
      <Typography className="whitespace-nowrap">{title}</Typography>
      {isLoading ? (
        <Skeleton variant="text" />
      ) : (
        <Typography variant="h4" className="!font-semibold">
          {value}
        </Typography>
      )}
    </div>
  );
};

export default MetricCard;
