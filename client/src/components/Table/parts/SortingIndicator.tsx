interface Props {
  isSorted: string;
  descIcon: string;
  ascIcon: string;
}

const SortingIndicator = (props: Props) => {
  return (
    <div className="mx-2">
      {{
        asc: props.ascIcon,
        desc: props.descIcon,
      }[props.isSorted] ?? null}
    </div>
  );
};

export default SortingIndicator;
