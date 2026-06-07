import { useState } from 'react';
import { FileText, Download, Loader2 } from 'lucide-react';

export default function ResumeDownload() {
  const [isLoading, setIsLoading] = useState(false);

  const handleDownload = async () => {
    if (isLoading) return;
    
    try {
      setIsLoading(true);
      // Lazy load the PDF generator and the document template to avoid impacting initial bundle size
      const { pdf } = await import('@react-pdf/renderer');
      const { ResumePDF } = await import('./ResumePDF');

      const blob = await pdf(<ResumePDF />).toBlob();
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Fredrick_Nyangau_CV.pdf';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error: any) {
      console.error('Failed to generate dynamic PDF, falling back to static', error);
      alert(`PDF Generation Error: ${error?.message || String(error)}`);
      // Temporarily disabled fallback to debug the error
      // window.open('/docs/Fredrick_Nyangau_CV.pdf', '_blank');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDownload}
      disabled={isLoading}
      className={[
        'inline-flex items-center justify-center gap-2',
        'text-text2 font-mono text-[13px] px-4 py-3 rounded-md',
        'bg-surface/30 backdrop-blur-md border border-border-dim',
        'transition-all duration-200 hover:text-text hover:border-text2',
        'no-underline cursor-pointer disabled:opacity-70',
      ].join(' ')}
      aria-label="Download resume"
    >
      <FileText size={15} />
      {isLoading ? 'Generating...' : 'Resume'}
      {isLoading ? (
        <Loader2 size={13} className="animate-spin opacity-50" />
      ) : (
        <Download size={13} className="opacity-50" />
      )}
    </button>
  );
}
