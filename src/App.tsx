import { useAtomValue } from 'jotai';
import { dataLoadAtom } from './store/store';
import { Frontpage } from './components/2-main';
import { UIToaster } from './components/ui/UiToaster';
import { UISymbolsDefs } from './components/ui/icons';

function DataLoader() {
    useAtomValue(dataLoadAtom);
    return null;
}

function PopperRoot() {
    return (
        <div className="absolute z-50">
            <div id="portal"></div>
        </div>
    );
}

export function App() {
    return (<>
        <DataLoader />
        <UISymbolsDefs />
        <PopperRoot />
        <UIToaster />

        <div className="min-h-full overflow-hidden bg-slate-50">
            <Frontpage />
        </div>
    </>);
}

//TODO: change archive view to grid instead of columns to have order left to right vs top down and left.