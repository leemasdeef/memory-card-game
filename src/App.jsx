import "./App.css";
import Card from "./Card";
function App() {
  return (
    <div className="bg-[url('/pokemon-party.jpg')] bg-cover bg-center min-h-screen">
      <header className="bg-red-400 text-center py-8">
        <h1 className="md:text-xl font-bold font-press2p">
          Pokemon Memory Card Game
        </h1>
      </header>

      <Card></Card>
    </div>
  );
}

export default App;
