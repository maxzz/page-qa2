import { GridAllYears } from './4-grid';
import { Legend } from './6-legend';

export function Section3_Archive() {
    return (
        <div className="py-2 text-sm space-y-2">
            <p>
                The archive stores a list of previously released extensions that are still available on the HID server.
                You can download any version for testing or for any other reason.
            </p>
            <p>
                Click an item to download a specific version. Extensions with debugging information are password protected.
                Contact Max Zakharzhevskiy at HID global to obtain the password.
            </p>

            <GridAllYears />
            <Legend />
        </div>
    );
}

//TODO: check properly state loading and error
//TODO: change archive view to grid instead of columns to have order left to right vs top down and left.
