import { useAtomValue } from 'jotai';
import { dataLoadAtom } from './store/store';
import { Frontpage } from './components/Frontpage';
import { UIToaster } from './components/UI/UiToaster';
import './App.css';

function DataLoader() {
    useAtomValue(dataLoadAtom);
    return null;
}

function PopperRoot() {
    return <div className="z-50" id="portal"></div>;
}

function App() {
    return (<>
        <UIToaster />
        <PopperRoot />
        <DataLoader />
        <div className="min-h-full overflow-hidden bg-slate-50">
            <Frontpage />
        </div>
    </>);
}

export default App;
