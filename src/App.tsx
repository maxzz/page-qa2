import { UIToaster } from './components/UI/UiToaster';
import './App.css';
import Frontpage from './components/Frontpage';

function App() {
    return (<>
        <UIToaster />
        <div className="h-screen bg-purple-200 p-4">
            <Frontpage />
        </div>
    </>);
}

export default App;
