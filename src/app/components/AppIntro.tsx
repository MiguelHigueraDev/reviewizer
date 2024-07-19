const AppIntro = () => {
  return (
    <div className="mb-5">
      {/* Name and logo */}
      <div>
        <h1 className="text-4xl font-bold">Reviewizer AI 🤖</h1>
        <p className="font-semibold text-xl">
          Decide on what game to buy using by consulting our AI connoisseur!
        </p>
      </div>
      {/* How it works */}
      <div>
        <h2>How it works</h2>
        <p>Search up to 10 games you are interested in</p>
        <p>The AI will summarize their reviews and you can decide which one is the best!</p>
      </div>
    </div>
  );
};

export default AppIntro;
