const Footer = () => {
    return (
      <>
        {/* =================================================================
          FOOTER
        ================================================================= */}
        <footer className="border-t border-slate-100 px-6 py-8">
          <div className="mx-auto max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400 font-mono">
            <span>© {new Date().getFullYear()} Sandip Dolar</span>
            <button
              onClick={() => scrollTo("home")}
              className="hover:text-slate-700 transition-colors"
            >
              back to top ↑
            </button>
          </div>
        </footer>
      </>
    );
}

export default Footer