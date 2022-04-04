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
                    duration: 5000,
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
    console.log('options', options);
    
    return callToast(message, {
        style: { 
            backgroundColor: 'tomato' ,
        },
        icon: '👏',
    });
};

// export function toast(message: string) {
//     console.log(`%c${message}`, 'color: orange');
//     toastWarning(message);
// }

export function toast(message: string) {
    console.log(`%c${message}`, 'color: orange');
    toastWarning(message);
}

//TODO: set atom to add message to the list of errors popup
