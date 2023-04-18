import React from "react";
import ErorrPage from "../../pages/error/ErrorPage";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  componentDidCatch(error, errorInfo) {
    console.log("in ErrorBoundary:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <ErorrPage statusCode={400} errorMessage="Something went wrong." />
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
