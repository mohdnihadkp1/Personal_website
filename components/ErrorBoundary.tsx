import React, { ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-black text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden font-mono">
            {/* Background noise/grid */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 via-black to-black pointer-events-none"></div>

            <div className="relative z-10 max-w-md w-full bg-gray-900/50 backdrop-blur-xl border border-red-500/30 p-8 rounded-3xl shadow-2xl animate-in fade-in zoom-in duration-300">
                <div className="flex justify-center mb-6">
                    <div className="p-4 rounded-full bg-red-500/10 text-red-500 animate-pulse">
                        <AlertTriangle size={48} />
                    </div>
                </div>
                
                <h1 className="text-2xl font-bold text-red-500 mb-2 tracking-widest uppercase">System Malfunction</h1>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                    A critical rendering error has been detected. The session has been suspended to prevent data corruption.
                </p>

                <div className="bg-black/40 rounded-lg p-4 mb-6 text-left overflow-hidden">
                    <code className="text-xs text-red-400 font-mono break-all line-clamp-4">
                        {this.state.error?.message || "Unknown Error"}
                    </code>
                </div>

                <button 
                    onClick={() => window.location.reload()}
                    className="w-full py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                    <RefreshCw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
                    REBOOT SYSTEM
                </button>
            </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
