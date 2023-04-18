function ErorrPage({
  statusCode = 400,
  errorMessage,
}: {
  errorMessage: string;
  statusCode: number;
}) {
  return (
    <div className="d-flex align-items-center justify-content-center vh-100">
      <div className="text-center">
        <h1 className="display-1 fw-bold">{statusCode}</h1>
        <p className="fs-3">
          <span className="text-danger">Opps!</span> {errorMessage}
        </p>
        <a href="/" className="btn btn-primary">
          Go Home
        </a>
      </div>
    </div>
  );
}

export default ErorrPage;
