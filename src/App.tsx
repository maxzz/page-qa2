import { useAtomValue } from 'jotai';
import { runFetchArchiveAtom, runFetchConfigAtom, runFetchReleaseNotesAtom } from './store/store';
import { Frontpage } from './components/Frontpage';
import { UIToaster } from './components/UI/UiToaster';
import './App.css';

function Loader() {
    useAtomValue(runFetchConfigAtom);
    useAtomValue(runFetchArchiveAtom);
    useAtomValue(runFetchReleaseNotesAtom);
    return null;
}

function App() {
    return (<>
        <UIToaster />
        <Loader />
        <div className="min-h-full overflow-hidden bg-slate-50">
            <Frontpage />
        </div>
    </>);
}

export default App;
