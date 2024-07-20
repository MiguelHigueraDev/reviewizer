const AppIntro = () => {
  return (
    <div className="mb-5 mt-16">
      {/* Name and logo */}
      <div className="pb-4">
        <h1 className="text-4xl font-bold text-center mb-2">Reviewizer AI 🤖</h1>
      </div>
      {/* How it works */}
      <div>
        <p>Search up to <strong>3</strong> Steam games you are interested in to get an AI summary of their reviews!</p>
      </div>
    </div>
  );
};

export default AppIntro;
