import { useAtomValue } from 'jotai';
import { UIToaster } from '@/components/ui/UiToaster';
import { UISymbolsDefs } from '@/components/ui/icons';
import { dataLoadAtom } from '@/store/store';
import { Frontpage } from './1-layout';

export function App() {
    return (<>
        <DataLoader />
        <UISymbolsDefs />
        <PopperRoot />
        <UIToaster />

        <Frontpage />
    </>);
}

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

//TODO: add link to https://chromewebstore.google.com/detail/digitalpersona/piimgpjgnagkckjlhjcppbkbjjfjmnbh
