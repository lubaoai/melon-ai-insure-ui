export function Header() {
  return (
    <header
      role="banner"
      className="border-b-4 border-primary bg-white pb-2"
    >
      {/* モバイル（≤875px）: 中央揃え・縦並び / PC（>875px）: 左寄せ・横並び */}
      <div className="text-center min-[876px]:text-left">
        <ul className="min-[876px]:flex min-[876px]:items-center">
          <li className="pt-2.5 pl-2.5">
            <div className="text-xl font-bold text-primary">
              メロン少額短期保険
            </div>
          </li>
          <li className="pt-1 pl-2.5 min-[876px]:ml-auto min-[876px]:pt-2.5 min-[876px]:pr-2.5">
            <div className="text-sm text-text-light">
              0120-XXX-XXX 平日 9:30～17:30 ※土日・祝日・年末年始を除く
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
}
