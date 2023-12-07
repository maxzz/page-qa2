import { Fragment } from 'react';
import { convTBrand2Name, convTBrowserShort2Name, ExtnFromConfig, TBrowserShort } from '@/store/apis';
import { FlatTableItem } from './0-reduce-utils';
import { IconBrowser } from '@/components/ui/icons';
import { beautifyDate } from '@/utils/helpers';

const tableHeaderClasses = "pb-1 text-xs border-slate-200 border-b";
const tableItemClasses = (idx: number) => `text-xs ${!idx ? '' : 'opacity-25'}`;

function VersionItem({ idx, item }: { idx: number; item: ExtnFromConfig | undefined; }) {
    return (
        <div className="flex items-center space-x-0.5" title={`Updated on ${beautifyDate(item?.updated)}`}>
            <IconBrowser browser={item?.broIcon} className="w-3 h-3 opacity-50" />
            <div className={tableItemClasses(idx)}>
                {item?.version}
            </div>
        </div>
    );
}

export function TableToBrowser({ browser, table = [] }: { browser: TBrowserShort; table: FlatTableItem[]; }) {
    return (
        <div className="cursor-default">

            {/* Table caption */}
            <div className="mb-1 text-sm font-semibold">
                {`${convTBrowserShort2Name(browser)} extensions`}
            </div>

            {/* Table columns: Brand, QA, Public */}
            <div className="py-1 bg-slate-50 border-slate-300 border rounded shadow overflow-hidden grid grid-cols-3 gap-y-0.5">
                {/* Header */}
                <div className={tableHeaderClasses}>
                    <div className="px-3">Brand</div>
                </div>
                <div className={tableHeaderClasses}>
                    QA
                </div>
                <div className={tableHeaderClasses}>
                    Public
                </div>

                {/* Items */}
                {table.map(
                    (item, idx) => (
                        <Fragment key={idx}>
                            <div className={tableItemClasses(idx)}>
                                <div className="px-3 pt-0.5">{convTBrand2Name(item.brand)}</div>
                            </div>
                            <VersionItem idx={idx} item={item.qa} />
                            <VersionItem idx={idx} item={item.release} />
                        </Fragment>
                    )
                )}
            </div>

        </div>
    );
}
