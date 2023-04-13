function NumberDiscount({
  firstVisitTime,
  price,
}: {
  firstVisitTime?: string;
  price: number;
}) {
  if (firstVisitTime && parseInt(firstVisitTime, 10) - Date.now() > 0) {
    return (
      <>
        <span className="fs-3">{price}$</span>
        <small className="mx-2">
          <del> {price * 4}$</del> 75% off
        </small>
      </>
    );
  } else {
    return <>Price: {price} $</>;
  }
}

export default NumberDiscount;
