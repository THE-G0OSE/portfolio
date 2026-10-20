import { getFlexClassBase } from "@/shared/containers/Flex/helpers";
import { IFlexProps } from "@/shared/containers/Flex/types";

export const Flex: React.FC<IFlexProps> = (props) => {
  const { gap = "0", children, className } = props;
  const classNameBase = getFlexClassBase(props);

  return (
    <div style={{ gap }} className={classNameBase + className}>
      {children}
    </div>
  );
};
