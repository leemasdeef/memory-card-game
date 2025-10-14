import "./App.css";
import Card from "./Card";
function App() {
  return (
    <div className="bg-[url('public/pokemon-party.jpg')] bg-cover bg-center min-h-screen">
      <header className="bg-red-400 text-center py-8">
        <h1 className="text-4xl font-bold font-press2p">
          Pokemon Memory Card Game
        </h1>
      </header>

      <Card></Card>
    </div>
  );
}

export default App;
