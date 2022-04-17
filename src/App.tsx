import { useAtomValue } from 'jotai';
import { dataLoadAtom } from './store/store';
import { Frontpage } from './components/Frontpage';
import { UIToaster } from './components/UI/UiToaster';
import './App.css';

function Loader() {
    useAtomValue(dataLoadAtom);
    return null;
}

function App() {
    return (<>
        <UIToaster />
        <div className="z-50" id="portal"></div>
        <Loader />
        <div className="min-h-full overflow-hidden bg-slate-50">
            <Frontpage />
        </div>
    </>);
}

export default App;
