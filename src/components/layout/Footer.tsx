export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      role="contentinfo"
      className="bg-primary h-[90px]"
    >
      <div className="px-4 pt-5 text-center text-xs text-text-white">
        <p>Copyright &copy; 2026 - {currentYear+5} メロン少額短期保険株式会社 All Rights Reserved.</p>
      </div>
    </footer>
  );
}
