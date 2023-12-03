import { YearsGrid } from './4-grid';
import { Legend } from './5-legend';

export function Section3_Archive() {
    return (
        <div className="py-2 text-sm">
            <p>
                List of previously released extensions that are still available on the HID server.
                You can download any version for testing purposes or for any other reason.
                Click an item to download a specific version. Extensions with debug information are protected.
                Contact Max Zakharzhevskiy at HID global for a password.
            </p>
            <YearsGrid />
            <Legend />
        </div>
    );
}
