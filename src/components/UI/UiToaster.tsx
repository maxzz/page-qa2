import React from 'react';
import { toast as callToast, Toaster as ToasterComponent } from 'react-hot-toast';

export function UIToaster() {
    return (
        <div className="toaser">
            <ToasterComponent
                position="bottom-right"
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 45000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                    // Default options for specific types
                    success: {
                        duration: 3000,
                        theme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />
        </div>
    );
}

export const toastWarning: typeof callToast.custom = (message, options) => {
    return callToast(message, {
        style: {
            backgroundColor: 'tomato',
        },
        icon: '👏',
    });
};

export function toast(message: string) {
    //console.log(`%c${message}`, 'color: orange');
    toastWarning(message);
}

export function toastSucceeded(message: string) {
    callToast(message, {
        style: {
            backgroundColor: 'tomato',
        },
        icon: '👏',
    });
}

export function toastError(message: string) {
    callToast.custom((t) =>
        <div className="max-w-[540px] text-red-50 bg-red-600 border-red-700 border-2 rounded shadow-lg shadow-red-900/40">
            <div className="flex items-center justify-between space-x-2">
                <div className="px-3 py-2">{message}</div>
                <div className="w-8 h-8 flex items-center justify-center hover:bg-red-400 active:scale-[.97] cursor-pointer"
                    onClick={() => callToast.dismiss(t.id)}
                >❌</div>
            </div>
        </div>
    );
}

// export function toastError(message: string) {
//     callToast.custom(
//         <div className="px-3 py-2 max-w-[500px] text-red-50 bg-red-600 border-red-700 border-2 rounded shadow-lg shadow-red-900/40">
//             {message}
//         </div>
//     );
// }

//TODO: set atom to add message to the list of errors popup
