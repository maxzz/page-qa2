import { useAtomValue } from 'jotai';
import { runFetchConfigAtom, runFetchReleaseNotesAtom } from './store/store';
import { Frontpage } from './components/Frontpage';
import { UIToaster } from './components/UI/UiToaster';
import './App.css';

function App() {
    useAtomValue(runFetchConfigAtom);
    useAtomValue(runFetchReleaseNotesAtom);
    return (<>
        <UIToaster />
        <div className="h-screen bg-slate-50">
            <Frontpage />
        </div>
    </>);
}

export default App;
