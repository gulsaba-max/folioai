import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  props!: Props;
  state!: State;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[ErrorBoundary] Caught render error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '24px', color: '#b00020', background: '#fff', minHeight: '100vh' }}>
          <h1 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>Something went wrong</h1>
          <p style={{ fontSize: '14px', marginBottom: '12px' }}>{this.state.error?.message}</p>
          <pre style={{ fontSize: '12px', whiteSpace: 'pre-wrap', background: '#f5f5f5', padding: '12px', borderRadius: '8px' }}>
            {this.state.error?.stack}
          </pre>
        </div>
      );
    }

    return this.props.children;
  }
}
