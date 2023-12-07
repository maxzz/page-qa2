import { Fragment } from 'react';
import { IconBrowser } from '@/components/ui/icons';
import { beautifyDate } from '@/utils/helpers';
import { convTBrand2Name, convTBrowserShort2Name, TBrowserShort } from '@/store/apis';
import { FlatTableItem } from './0-reduce-utils';

const tableHeaderClasses = "border-b border-slate-200 text-xs";
const tableItemClasses = (idx: number) => `text-xs ${!idx ? 'pt-0.5' : 'opacity-25'}`;

export function TableToBrowser({ browser, table = [] }: { browser: TBrowserShort; table: FlatTableItem[]; }) {
    return (
        <div className="cursor-default">

            {/* Table caption */}
            <div className="flex items-center space-x-1">
                <div className="mb-1 pl-3 text-sm font-bold">
                    {`${convTBrowserShort2Name(browser)}`}
                </div>
                <IconBrowser browser={browser} className="w-3 h-3 opacity-70" />
                <div className="mb-1 text-sm font-bold">
                    {`extensions`}
                </div>
            </div>

            {/* Table columns: Brand, QA, Public */}
            <div className="py-1 grid grid-cols-3 bg-slate-100 shadow">
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

                            <div className={tableItemClasses(idx)} title={`Updated on ${beautifyDate(item.qa?.updated)}`}>
                                {item.qa?.version}
                            </div>

                            <div className={tableItemClasses(idx)} title={`Updated on ${beautifyDate(item.release?.updated)}`}>
                                {item.release?.version}
                            </div>
                        </Fragment>
                    )
                )}
            </div>
            
        </div>
    );
}
