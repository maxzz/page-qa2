import { useAtomValue } from 'jotai';
import { dataLoadAtom } from '../../store/store';
import { Frontpage } from '../2-main';
import { UIToaster } from '../ui/UiToaster';
import { UISymbolsDefs } from '../ui/icons';

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

        <Frontpage />
    </>);
}

//TODO: add link to https://chromewebstore.google.com/detail/digitalpersona/piimgpjgnagkckjlhjcppbkbjjfjmnbh
