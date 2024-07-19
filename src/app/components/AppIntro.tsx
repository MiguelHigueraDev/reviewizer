const AppIntro = () => {
  return (
    <div className="mb-5 mt-16">
      {/* Name and logo */}
      <div className="pb-4">
        <h1 className="text-4xl font-bold text-center mb-2">Reviewizer AI 🤖</h1>
      </div>
      {/* How it works */}
      <div>
        <p>Search up to <strong>3</strong> Steam games you are interested in</p>
        <p className="mb-2">The AI will summarize their reviews for you and you can decide which one is the best!</p>
        <p className="text-xs mb-2">⚠️ Experimental, games with low amount of reviews or high count of inappropiate reviews may cause errors.</p>
        <p className="text-xs">Made by <a href="https://github.com/MiguelHigueraDev/" target="_blank">MiguelHigueraDev</a></p>
      </div>
    </div>
  );
};

export default AppIntro;
