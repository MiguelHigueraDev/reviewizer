import Image from 'next/image';
import GameSearch from './components/GameSearch/GameSearch';
import SelectedGamesList from './components/SelectedGames/SelectedGamesList';

export default function Home() {
  return (
    <main className="flex min-h-screen max-w-7xl mx-auto gap-10 items-center justify-center p-24">
      <div className="w-1/2">
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
          <ol>
            <li>
              <div>
                <h3>Search up to 10 Steam games that you are interested in</h3>
                <p>You can also enter a store link or an AppID</p>
              </div>
            </li>
            <li>
              <div>
                <h3>Select a mode</h3>
                <p>Summary Mode</p>
                <p>Contrast Mode</p>
              </div>
            </li>
            <li>
              <div>The AI will select games for you!</div>
            </li>
          </ol>
        </div>
      </div>
      <div className="w-1/2">
        <GameSearch />
      </div>
    </main>
  );
}
