export const classNamesParser = (className: string, classNames?: string[]) => {
  return `${className}${classNames ? ' ' + classNames.join(' ') : ''}`;
};
