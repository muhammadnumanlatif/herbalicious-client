import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { FaSyncAlt } from 'react-icons/fa';

class GlobalErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Herbalicious Global Error:", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary-wrapper min-vh-100 d-flex align-items-center bg-light">
                    <Container className="text-center py-5">
                        <div className="glass-effect p-5 rounded-5 border shadow-sm mx-auto" style={{ maxWidth: '600px' }}>
                            <div className="display-1 text-warning mb-4">🌿</div>
                            <h2 className="fw-bold mb-3">Something wilted unexpectedly.</h2>
                            <p className="text-muted mb-4">
                                Our botanical engine hit a small snag. Don't worry, your data is safe.
                                We're likely just refreshing our harvest.
                            </p>
                            <Button
                                onClick={() => window.location.reload()}
                                variant="primary"
                                className="rounded-pill px-5 py-2 fw-bold"
                            >
                                <FaSyncAlt className="me-2" /> Refresh Page
                            </Button>
                            <div className="mt-4 small text-muted opacity-50">
                                Global Stability Guard (500 Fallback)
                            </div>
                        </div>
                    </Container>
                </div>
            );
        }

        return this.props.children;
    }
}

export default GlobalErrorBoundary;
