
import React from "react";


const Resume = React.forwardRef<HTMLDivElement>((_props, ref) => (
  <section
    ref={ref as React.RefObject<HTMLDivElement>}
    className="max-w-3xl mx-auto p-8 glass-effect rounded-3xl border shadow-2xl print:shadow-none print:bg-white text-foreground bg-background"
  >
    <header className="mb-8">
      <h1 className="text-3xl font-bold mb-4 gradient-text">FREDRICK NYANG’AU</h1>
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-4 mb-4">
        <a
          href="/Fredrick_Nyang'au_Resume.pdf"
          download
          className="bg-primary text-white px-4 py-2 rounded-lg shadow-md hover:bg-primary/90 transition-all w-fit border border-primary/30"
        >
          Download PDF
        </a>
        <span className="text-sm text-muted-foreground">or view below</span>
      </div>
    </header>
    <div className="w-full flex justify-center">
      <div className="w-full max-w-2xl glass-effect rounded-2xl border border-primary/20 shadow-lg overflow-hidden">
        <iframe
          src="/Fredrick_Nyang'au_Resume.pdf"
          title="Fredrick Nyang'au Resume PDF"
          className="w-full h-[80vh] bg-background"
          style={{ minHeight: 500, border: 'none', borderRadius: '1rem' }}
        />
      </div>
    </div>
  </section>
));

Resume.displayName = "Resume";
export default Resume;
