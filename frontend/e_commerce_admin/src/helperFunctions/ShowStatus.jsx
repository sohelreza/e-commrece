export const ShowStatus = (approval) => {
  if (approval === 0) {
    return (
      <span className="ml-0 pending-text p-2 pb-3 rounded"> pending </span>
    );
  } else if (approval === 1) {
    return (
      <span className="ml-0 approved-text p-2 pb-3 rounded"> approved </span>
    );
  } else {
    return <span className="ml-0"> error </span>;
  }
};
