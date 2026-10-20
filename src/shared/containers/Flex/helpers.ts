import { IFlexProps } from "@/shared/containers/Flex/types";

export const getFlexClassBase = (props: IFlexProps) => {
  const {
    vert,
    between,
    center,
    centerJ,
    centerA,
    wrap,
    fullH,
    fullW,
  } = props;
  let classNameBase = "flex ";

  // size

  if (fullH) classNameBase += "h-full ";
  if (fullW) classNameBase += "w-full ";

  // flex options

  if (vert) classNameBase += "flex-col ";
  if (wrap) classNameBase += "flex-wrap ";

  // align & justify

  if ([centerJ, between].filter(a => a === true).length > 1) {
    console.warn(
        "Flex.props.centerJ and Flex.props.between both changes flex-justify style, so they can not be used together, please use only one of them at a time, or else they would be applied in next order: centerJ, between"
    )
  }

  if (center) {
    classNameBase += "items-center justify-center ";
    if (centerJ) console.warn('Flex.props.center already include Flex.props.centerJ, please remove Flex.props.centerJ, so code will be cleaner');
    if (centerA) console.warn('Flex.props.center already include Flex.props.centerA, please remove Flex.props.centerA, so code will be cleaner');
  } else {
    if (centerJ && centerA) console.warn('Flex.props.centerJ and Flex.props.centerA together do exactly same thing as Flex.props.center, please change cetnerJ centerA to center, so code will be cleaner')
    if (centerJ) classNameBase += "justify-center ";
    if (centerA) classNameBase += "items-center ";
  }
  if (between) classNameBase += "justify-between ";

  return classNameBase;
};
