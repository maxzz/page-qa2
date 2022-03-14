import { UIToaster } from './components/UI/UiToaster';
import './App.css';
import Frontpage from './components/Frontpage';
import { useAtomValue } from 'jotai';
import { runFetchReleaseNotesAtom } from './store/store';

function App() {
    useAtomValue(runFetchReleaseNotesAtom);
    return (<>
        <UIToaster />
        <div className="h-screen bg-slate-50">
            <Frontpage />
        </div>
    </>);
}

export default App;
