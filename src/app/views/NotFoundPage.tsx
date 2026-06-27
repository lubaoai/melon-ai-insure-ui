function NotFoundPage() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-cream">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary">404</h1>
        <p className="mt-4 text-lg text-text-primary">ページが見つかりません</p>
        <p className="mt-2 text-sm text-text-light">お探しのページは存在しません。</p>
        <a
          href="/"
          className="mt-6 inline-block rounded-lg bg-cta px-6 py-2 font-bold text-text-white shadow-soft transition-colors duration-150 hover:bg-cta-hover"
        >
          トップページへ戻る
        </a>
      </div>
    </div>
  );
}

export default NotFoundPage;
