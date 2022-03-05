import { UIToaster } from './components/UI/UiToaster';
import './App.css';
import Frontpage from './components/Frontpage';

function App() {
    return (<>
        <UIToaster />
        <div className="h-screen bg-slate-50">
            <Frontpage />
        </div>
    </>);
}

export default App;
